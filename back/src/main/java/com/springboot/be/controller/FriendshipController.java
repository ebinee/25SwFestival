package com.springboot.be.controller;

import com.springboot.be.dto.request.SendFriendRequest;
import com.springboot.be.dto.request.UnfriendRequest;
import com.springboot.be.dto.response.FriendSummaryResponse;
import com.springboot.be.dto.response.IdResponse;
import com.springboot.be.dto.response.MessageResponse;
import com.springboot.be.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService service;
    private final FriendshipService friendshipService;

    // 친구 요청 보내기
    @PostMapping("/requests")
    public IdResponse send(@RequestBody SendFriendRequest req) {
        return service.sendRequest(req);
    }

    // 수락(수신자 이메일은 쿼리스트링)
    @PostMapping("/requests/{id}/accept")
    public MessageResponse accept(@PathVariable Long id, @RequestParam String email) {
        return service.accept(id, email);
    }

    // 거절
    @PostMapping("/requests/{id}/reject")
    public MessageResponse reject(@PathVariable Long id, @RequestParam String email) {
        return service.reject(id, email);
    }

    // 친구 삭제
    @DeleteMapping
    public MessageResponse unfriend(@RequestBody UnfriendRequest req) {
        return service.unfriend(req);
    }

    // 목록 조회
    @GetMapping
    public List<FriendSummaryResponse> list(@RequestParam String email) {
        return service.listFriends(email);
    }

    @GetMapping("/requests/incoming")
    public List<FriendSummaryResponse> incoming(@RequestParam String email) {
        return service.listIncoming(email);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchByEmail(@RequestParam String email) {
        var result = friendshipService.searchByEmail(email);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("해당 이메일의 사용자를 찾을 수 없습니다.");
        }
    }
}
