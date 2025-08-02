package com.springboot.be.dto.response;

import com.springboot.be.entity.Photo;
import com.springboot.be.entity.Post;

import java.time.LocalDateTime;

public record PostSummaryDto(Long postId, String content, String thumbnailUrl, int likeCount, int commentCount) {
    public static PostSummaryDto from(Post post) {
        return new PostSummaryDto(
                post.getId(),
                post.getContent(),
                post.getPhotos().isEmpty() ? null : post.getPhotos().get(0).getImageUrl(),
                post.getPhotos().stream().mapToInt(Photo::getLikeCount).sum(),
                post.getComments().size()
        );

    }
}
