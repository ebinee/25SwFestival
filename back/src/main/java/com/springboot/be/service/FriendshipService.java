package com.springboot.be.service;

import com.springboot.be.dto.request.SendFriendRequest;
import com.springboot.be.dto.request.UnfriendRequest;
import com.springboot.be.dto.response.FriendSearchResponse;
import com.springboot.be.dto.response.FriendSummaryResponse;
import com.springboot.be.dto.response.IdResponse;
import com.springboot.be.dto.response.MessageResponse;
import com.springboot.be.entity.Friendship;
import com.springboot.be.entity.FriendshipStatus;
import com.springboot.be.entity.User;
import com.springboot.be.repository.FriendshipRepository;
import com.springboot.be.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FriendshipService {
    private final FriendshipRepository friendshipRepo;
    private final UserRepository userRepo;

    private User getUserOrThrow(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자: " + email));
    }

    public IdResponse sendRequest(SendFriendRequest req) {
        String fromEmail = req.fromEmail();
        String toEmail   = req.toEmail();

        if (fromEmail.equalsIgnoreCase(toEmail))
            throw new IllegalArgumentException("자기 자신에게는 요청 불가");

        User from = getUserOrThrow(fromEmail);
        User to   = getUserOrThrow(toEmail);

        friendshipRepo.findBetween(fromEmail, toEmail).ifPresent(f -> {
            throw new IllegalStateException("이미 관계가 존재합니다(요청/수락/거절)");
        });

        Friendship f = new Friendship(); // status 기본값: PENDING
        f.setFromTo(from, to);
        try {
            return new IdResponse(friendshipRepo.save(f).getId());
        } catch (DataIntegrityViolationException e) { // 동시요청 경합 대비 최종 방어
            throw new IllegalStateException("이미 관계가 존재합니다(동시 요청 충돌)", e);
        }
    }

    public MessageResponse accept(Long requestId, String toEmail) {
        Friendship f = friendshipRepo.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("요청 없음: " + requestId));
        if (!f.isReceiver(toEmail)) throw new IllegalStateException("수락 권한 없음");
        if (!f.isPending())         throw new IllegalStateException("대기 상태가 아님");
        f.setStatus(FriendshipStatus.ACCEPTED);
        return new MessageResponse("ACCEPTED");
    }

    public MessageResponse reject(Long requestId, String toEmail) {
        Friendship f = friendshipRepo.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("요청 없음: " + requestId));
        if (!f.isReceiver(toEmail)) throw new IllegalStateException("거절 권한 없음");
        if (!f.isPending())         throw new IllegalStateException("대기 상태가 아님");
        f.setStatus(FriendshipStatus.REJECTED);
        return new MessageResponse("REJECTED");
    }

    public MessageResponse unfriend(UnfriendRequest req) {
        var fOpt = friendshipRepo.findBetween(req.aEmail(), req.bEmail());
        if (fOpt.isEmpty() || !fOpt.get().isAccepted())
            throw new IllegalStateException("현재 친구 상태가 아님");
        friendshipRepo.delete(fOpt.get());
        return new MessageResponse("UNFRIENDED");
    }

    @Transactional
    public List<FriendSummaryResponse> listFriends(String email) {
        return friendshipRepo.findFriendsUnion(email)
                .stream()
                .map(FriendSummaryResponse::of)
                .toList();
    }

    @Transactional
    public List<FriendSummaryResponse> listIncoming(String email) {
        return friendshipRepo.findByToUser_EmailAndStatus(email, FriendshipStatus.PENDING)
                .stream()
                .map(f -> FriendSummaryResponse
                        .of(f.getFromUser()))
                .toList();
    }

    private final UserRepository userRepository;

    public Optional<FriendSearchResponse> searchByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(user -> new FriendSearchResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getProfileImage()
                ));
    }
}
