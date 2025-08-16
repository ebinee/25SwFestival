package com.springboot.be.service;

import com.springboot.be.dto.request.PostCreateRequest;
import com.springboot.be.dto.response.CommentDto;
import com.springboot.be.dto.response.PhotoDetailDto;
import com.springboot.be.dto.response.PostDetailDto;
import com.springboot.be.dto.response.PostSummaryDto;
import com.springboot.be.entity.*;
import com.springboot.be.exception.NotFoundException;
import com.springboot.be.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final MarkerRepository markerRepository;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final GlobalPlaceRepository globalPlaceRepository;
    private final GeoCodingService geoCodingService;

    @Transactional
    public void createPost(PostCreateRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        Post post = new Post();
        post.setUser(user);
        post.setTitle(request.getTitle());
        postRepository.save(post);

        for (PostCreateRequest.PhotoData photoData : request.getPhotos()) {
            String address = photoData.getAddress();
            if (address == null || address.isBlank()) {
                throw new IllegalArgumentException("주소가 비어있습니다.");
            }

            GlobalPlace globalPlace = globalPlaceRepository
                    .findByPlaceNameIgnoreCase(address)
                    .orElseGet(() -> {
                        PlaceInfo geo = geoCodingService.forwardGeocoding(address);

                        GlobalPlace newPlace = new GlobalPlace();
                        newPlace.setPlaceName(geo.getFormattedAddress());
                        newPlace.setLatitude(geo.getLatitude());
                        newPlace.setLongitude(geo.getLongitude());
                        return globalPlaceRepository.save(newPlace);
                    });

            Marker marker = markerRepository
                    .findByGlobalPlace(globalPlace)
                    .orElseGet(() -> {
                        Marker newMarker = new Marker();
                        newMarker.setGlobalPlace(globalPlace);
                        return markerRepository.save(newMarker);
                    });

            marker.increasePhotoCount();

            Photo photo = new Photo();
            photo.setPost(post);
            photo.setMarker(marker);
            photo.setImageUrl(photoData.getImageUrl());
            photo.setContent(photoData.getContent());

            String takenAt = photoData.getTakenAt();
            if (takenAt != null && !takenAt.isBlank()) {
                try {
                    photo.setTakenAt(OffsetDateTime.parse(takenAt).toLocalDateTime());
                } catch (Exception e) {
                    photo.setTakenAt(LocalDateTime.parse(
                            takenAt, DateTimeFormatter.ISO_DATE_TIME
                    ));
                }
            }

            photoRepository.save(photo);
        }
    }

    @Transactional(readOnly = true)
    public List<PostSummaryDto> getPostsByUser(Long userId) {
        List<Post> posts = postRepository.findByUserIdOrderByCreatedAtAsc(userId);
        return posts.stream()
                .map(PostSummaryDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public PostDetailDto getPostDetails(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("게시글을 찾을 수 없습니다."));
        List<PhotoDetailDto> photoDetails = post.getPhotos().stream()
                .map(photo -> {
                    List<CommentDto> comments = commentRepository
                            .findByPhoto_IdOrderByCreatedAtAsc(photo.getId())
                            .stream()
                            .map(CommentDto::from)
                            .toList();
                    return PhotoDetailDto.from(photo, comments);
                })
                .toList();

        String period = calcPeriodFromPhotos(post.getPhotos());

        return new PostDetailDto(
                post.getId(),
                post.getTitle(),
                period,
                post.getUser().getUsername(),
                post.getUser().getProfileImage(),
                photoDetails
        );
    }

    private String calcPeriodFromPhotos(List<Photo> photos) {
        LocalDate minDate = null, maxDate = null;
        for (Photo photo : photos) {
            LocalDateTime ta = photo.getTakenAt();
            if (ta == null) continue;
            LocalDate d = ta.toLocalDate();
            if (minDate == null || d.isBefore(minDate)) minDate = d;
            if (maxDate == null || d.isAfter(maxDate)) maxDate = d;
        }
        if (minDate == null) return null;
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;
        return minDate.format(formatter) + " ~ " + maxDate.format(formatter);
    }

}
