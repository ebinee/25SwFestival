package com.springboot.be.controller;

import com.springboot.be.dto.common.ApiResponse;
import com.springboot.be.dto.request.PostCreateRequest;
import com.springboot.be.dto.response.PostDetailDto;
import com.springboot.be.dto.response.PostSummaryDto;
import com.springboot.be.security.services.UserDetailsImpl;
import com.springboot.be.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public ApiResponse<Void> createPost(@RequestBody PostCreateRequest request, @AuthenticationPrincipal UserDetailsImpl user) {
        postService.createPost(request, user.getId());
        return ApiResponse.<Void>created("게시글 생성 성공", null);
    }

    @GetMapping
    public ApiResponse<List<PostSummaryDto>> getPosts(@RequestParam(required = false) Long userId) {
        List<PostSummaryDto> posts = postService.getPostsByUser(userId);
        return ApiResponse.success("게시글 목록 조회 성공", posts);
    }

    @GetMapping("/{postId}")
    public ApiResponse<PostDetailDto> getPostDetail(@PathVariable Long postId) {
        PostDetailDto post = postService.getPostDetails(postId);
        return ApiResponse.success("게시글 상세 조회 성공", post);
    }
}
