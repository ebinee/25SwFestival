package com.springboot.be.dto.response;

import com.springboot.be.entity.Marker;
import com.springboot.be.entity.Post;

import java.util.List;

public record MarkerDetailResponse(
        Long id,
        String placeName,
        double latitude,
        double longitude,
        List<PostSummaryDto> posts) {
    public static MarkerDetailResponse from(Marker marker, List<Post> posts) {
        return new MarkerDetailResponse(
                marker.getId(),
                marker.getGlobalPlace().getPlaceName(),
                marker.getGlobalPlace().getLatitude(),
                marker.getGlobalPlace().getLongitude(),
                posts.stream().map(PostSummaryDto::from).toList()
        );
    }
}
