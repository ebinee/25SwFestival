package com.springboot.be.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.springboot.be.entity.Photo;

import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record PhotoDto(
        Long photoId,
        String content,
        String imageUrl,
        int likeCount,
        int commentCount,
        LocalDateTime createdAt,
        String authorName,
        String authorProfileImage,
        List<CommentDto> comments
) {
    public static PhotoDto summary(Photo photo) {

        int commentCount = photo.getComments() == null ? 0 : photo.getComments().size();

        String authorName = null;
        String authorProfileImage = null;
        if (photo.getPost() != null && photo.getPost().getUser() != null) {
            authorName = photo.getPost().getUser().getUsername();
            authorProfileImage = photo.getPost().getUser().getProfileImage();
        }

        return new PhotoDto(
                photo.getId(),
                photo.getContent(),
                photo.getImageUrl(),
                photo.getLikeCount(),
                commentCount,
                photo.getCreatedAt(),
                authorName,
                authorProfileImage,
                null
        );
    }

    public static PhotoDto detail(Photo photo, List<CommentDto> comments) {

        int commentCount = photo.getComments() == null ? 0 : photo.getComments().size();

        String authorName = null;
        String authorProfileImage = null;
        if (photo.getPost() != null && photo.getPost().getUser() != null) {
            authorName = photo.getPost().getUser().getUsername();
            authorProfileImage = photo.getPost().getUser().getProfileImage();
        }

        return new PhotoDto(
                photo.getId(),
                photo.getContent(),
                photo.getImageUrl(),
                photo.getLikeCount(),
                commentCount,
                photo.getCreatedAt(),
                authorName,
                authorProfileImage,
                comments
        );
    }
}
