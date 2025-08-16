package com.springboot.be.dto.response;

import com.springboot.be.entity.Marker;
import com.springboot.be.entity.Post;

import java.util.List;

public record MarkerDetailDto(
        Long id,
        String placeName,
        double latitude,
        double longitude,
        List<PostSummaryDto> posts) {
    public static MarkerDetailDto from(Marker marker, List<Post> posts) {
        return new MarkerDetailDto(
                marker.getId(),
                marker.getGlobalPlace().getPlaceName(),
                marker.getGlobalPlace().getLatitude(),
                marker.getGlobalPlace().getLongitude(),
                posts.stream().map(PostSummaryDto::from).toList()
        );
    }
}
