package com.springboot.be.controller;

import com.springboot.be.dto.request.CommentCreateRequest;
import com.springboot.be.dto.response.CommentResponse;
import com.springboot.be.dto.response.PhotoDetailResponse;
import com.springboot.be.service.CommentService;
import com.springboot.be.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;
    private final CommentService commentService;

    @GetMapping("/{photoId}")
    public ResponseEntity<PhotoDetailResponse> getPhoto(@PathVariable Long photoId) {
        return ResponseEntity.ok(photoService.getPhotoDetail(photoId));
    }

    @GetMapping("/{photoId}/comments")
    public ResponseEntity<List<CommentResponse>> getComment(@PathVariable Long photoId) {
        return ResponseEntity.ok(commentService.getComments(photoId));
    }

    @PostMapping("/{photoId}/comments")
    public ResponseEntity<Void> addComment(@PathVariable Long photoId, @RequestBody CommentCreateRequest request) {
        commentService.addComment(photoId, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{photoId}/like")
    public ResponseEntity<Void> likePhoto(@PathVariable Long photoId) {
        photoService.likePhoto(photoId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{photoId}/like")
    public ResponseEntity<Void> unlikePhoto(@PathVariable Long photoId) {
        photoService.unlikePhoto(photoId);
        return ResponseEntity.ok().build();
    }
}
