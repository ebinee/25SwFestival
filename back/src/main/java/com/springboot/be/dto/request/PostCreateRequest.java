package com.springboot.be.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class PostCreateRequest {
    private String title;
    private Long markerId;
    private List<PhotoData> photos;

    @Data
    public static class PhotoData {
        private String ImageUrl;
        private String comment;
        private Double latitude;
        private Double longitude;
        private String takenAt;
    }
}
