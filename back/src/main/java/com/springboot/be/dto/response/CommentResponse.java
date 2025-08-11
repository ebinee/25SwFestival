package com.springboot.be.dto.response;

import com.springboot.be.entity.Comment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponse {
    private Long id;
    private String username;
    private String comment;
    private LocalDateTime createdAt;

    public static CommentResponse from(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .username(comment.getUser().getNickname())
                .comment(comment.getComment())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
