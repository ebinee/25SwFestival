package com.springboot.be.service;

import com.springboot.be.dto.request.CommentCreateRequest;
import com.springboot.be.dto.response.CommentResponse;
import com.springboot.be.entity.Comment;
import com.springboot.be.entity.Photo;
import com.springboot.be.exception.NotFoundException;
import com.springboot.be.repository.CommentRepository;
import com.springboot.be.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final PhotoRepository photoRepository;
    private final CommentRepository commentRepository;

    public List<CommentResponse> getComments(Long photoId) {
        return commentRepository.findByPhoto_Id(photoId).stream()
                .map(CommentResponse::from)
                .toList();
    }

    public void addComment(Long photoId, CommentCreateRequest request) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));
        // TODO: 사용자 인증 로직
        Comment comment = new Comment(photo, request.getComment());
        commentRepository.save(comment);
    }
}
