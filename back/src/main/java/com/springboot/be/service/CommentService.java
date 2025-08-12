package com.springboot.be.service;

import com.springboot.be.dto.request.CommentCreateRequest;
import com.springboot.be.dto.response.CommentResponse;
import com.springboot.be.entity.Comment;
import com.springboot.be.entity.Photo;
import com.springboot.be.entity.User;
import com.springboot.be.exception.NotFoundException;
import com.springboot.be.repository.CommentRepository;
import com.springboot.be.repository.PhotoRepository;
import com.springboot.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class CommentService {
    private final PhotoRepository photoRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Transactional
    public CommentResponse addComment(Long photoId, Long userId, CommentCreateRequest request) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        Comment comment = new Comment(photo, user, request.getComment());
        Comment saved = commentRepository.save(comment);
        return CommentResponse.from(saved);
    }
}
