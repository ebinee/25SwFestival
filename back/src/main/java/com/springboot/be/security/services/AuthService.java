package com.springboot.be.security.services;

import com.springboot.be.entity.User;
import com.springboot.be.repository.RefreshRepository;
import com.springboot.be.repository.UserRepository;
import com.springboot.be.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RefreshRepository refreshRepository;

    @Transactional
    public void logout(String authorization) {
        if (authorization == null || !authorization.toLowerCase().startsWith("bearer ")) {
            throw new IllegalArgumentException("Authorization 헤더 형식 오류");
        }
        String accessToken = authorization.substring(7).trim();
        if (!jwtUtils.validateJwtToken(accessToken)) {
            throw new IllegalStateException("유효하지 않은 액세스 토큰");
        }
        String email = jwtUtils.getEmailFromJwtToken(accessToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없음"));

        refreshRepository.deleteByUser(user); // @Modifying + @Transactional 필요
    }
}
