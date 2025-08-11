package com.springboot.be.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostResponse {
    private Long id;
    private String title;
    private Long markerId;
    private String username;
    private List<PhotoDto> photos;

    @Data
    @Builder
    public static class PhotoDto {
        private Long id;
        private String url;
        private String comment;
        private int likeCount;
        private int commentCount;
        private boolean liked;
    }
}
