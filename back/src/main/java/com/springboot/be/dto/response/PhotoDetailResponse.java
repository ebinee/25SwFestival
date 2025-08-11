package com.springboot.be.dto.response;

import com.springboot.be.entity.Photo;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PhotoDetailResponse {
    private Long id;
    private String url;
    private String comment;
    private int likeCount;
    private int commentCount;
    private String takenAt;
    private Double latitude;
    private Double longitude;

    public static PhotoDetailResponse from(Photo photo) {
        return PhotoDetailResponse.builder()
                .id(photo.getId())
                .url(photo.getImageUrl())
                .comment(photo.getComment())
                .likeCount(photo.getLikeCount())
                .commentCount(photo.getCommentCount())
                .takenAt(photo.getTakenAt() != null ? photo.getTakenAt().toString() : null)
                .latitude(photo.getLatitude())
                .longitude(photo.getLongitude())
                .build();
    }
}
