package com.springboot.be.service;

import com.springboot.be.dto.request.PostCreateRequest;
import com.springboot.be.dto.response.PostResponse;
import com.springboot.be.entity.Marker;
import com.springboot.be.entity.Photo;
import com.springboot.be.entity.Post;
import com.springboot.be.repository.MarkerRepository;
import com.springboot.be.repository.PhotoRepository;
import com.springboot.be.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final MarkerRepository markerRepository;
    private final PhotoRepository photoRepository;

    @Transactional
    public void createPost(PostCreateRequest request) {
        // TODO: 사용자 인증 로직 구현.
        Marker marker = markerRepository.findById(request.getMarkerId())
                .orElseThrow(() -> new IllegalArgumentException("마커 없음"));
        Post post = new Post();
        post.setUser(null);
        post.setMarker(marker);
        post.setTitle(request.getTitle());
        postRepository.save(post);

        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

        for (PostCreateRequest.PhotoData photoData : request.getPhotos()) {
            Photo photo = new Photo();
            photo.setPost(post);
            photo.setImageUrl(photoData.getImageUrl());
            photo.setComment(photoData.getComment());
            photo.setLatitude(photoData.getLatitude());
            photo.setLongitude(photoData.getLongitude());
            photo.setTakenAt(LocalDateTime.parse(photoData.getTakenAt(), formatter));
            photoRepository.save(photo);
        }
    }

    public List<PostResponse> getPostsByUser(Long userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        return posts.stream()
                .map(this::toDto)
                .toList();
    }

    public PostResponse getPostDetails(Long postId) {
        Post Post = postRepository.findById(postId).orElseThrow();
        return toDto(Post);
    }

    private PostResponse toDto(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .markerId(post.getMarker().getId())
                .username(post.getUser() != null ? post.getUser().getNickname() : "회원 없음")
                .photos(post.getPhotos().stream().map(photo -> PostResponse.PhotoDto.builder()
                        .id(photo.getId())
                        .url(photo.getImageUrl())
                        .comment(photo.getComment())
                        .likeCount(photo.getLikes().size())
                        .commentCount(photo.getComments().size())
                        .liked(false)
                        .build()).toList())
                .build();
    }
}
