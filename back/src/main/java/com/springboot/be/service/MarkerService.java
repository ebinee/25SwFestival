package com.springboot.be.service;

import com.springboot.be.dto.response.MarkerDetailResponse;
import com.springboot.be.dto.response.MarkerSummaryDto;
import com.springboot.be.entity.GlobalPlace;
import com.springboot.be.entity.Marker;
import com.springboot.be.entity.PhotoLike;
import com.springboot.be.entity.Post;
import com.springboot.be.exception.NotFoundException;
import com.springboot.be.repository.GlobalPlaceRepository;
import com.springboot.be.repository.MarkerRepository;
import com.springboot.be.repository.PhotoLikeRepository;
import com.springboot.be.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarkerService {
    private final MarkerRepository markerRepository;
    private final PostRepository postRepository;
    private final GlobalPlaceRepository globalPlaceRepository;
    private final PhotoLikeRepository photoLikeRepository;

    public List<MarkerSummaryDto> searchPlace(String keyword) {
        return markerRepository.findByGlobalPlace_PlaceNameContaining(keyword)
                .stream()
                .map(MarkerSummaryDto::from)
                .toList();
    }

    public List<MarkerSummaryDto> searchRegion(String region, Double lat, Double lng, Double radius) {
        // region 이름 기반 검색
        if (region != null && (lat == null || lng == null)) {
            GlobalPlace place = globalPlaceRepository.findByPlaceName(region)
                    .orElseThrow(() -> new NotFoundException("해당 지역을 찾을 수 없습니다: " + region));
            lat = place.getLatitude();
            lng = place.getLongitude();
        }

        // 좌표 기반 검색
        if (lat != null && lng != null) {
            return convertToDto(markerRepository.findWithinRadius(lat, lng, radius));
        }

        throw new NotFoundException("검색할 지역 정보를 입력하세요.");
    }

    public List<MarkerSummaryDto> getPopularMarkers() {
        return convertToDto(markerRepository.findPopularMarkers());
    }

    public List<MarkerSummaryDto> getFavoriteMarkers(Long userId) {
        List<PhotoLike> likedPhotos = photoLikeRepository.findByUserIdWithMarker(userId);
        List<Marker> likedMarkers = likedPhotos.stream()
                .map(photoLike -> photoLike.getPhoto().getPost().getMarker())
                .distinct()
                .toList();
        return convertToDto(likedMarkers);
    }

    public MarkerDetailResponse getMarkerDetail(Long markerId) {
        Marker marker = markerRepository.findById(markerId)
                .orElseThrow(() -> new NotFoundException("해당 마커를 찾을 수 없습니다."));
        List<Post> posts = postRepository.findByMarkerId(markerId);
        return MarkerDetailResponse.from(marker, posts);
    }

    private List<MarkerSummaryDto> convertToDto(List<Marker> markers) {
        return markers.stream()
                .map(MarkerSummaryDto::from)
                .toList();
    }
}
