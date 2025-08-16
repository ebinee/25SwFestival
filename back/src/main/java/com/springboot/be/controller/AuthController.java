package com.springboot.be.controller;

import com.springboot.be.dto.request.LoginRequest;
import com.springboot.be.dto.request.SignupRequest;
import com.springboot.be.dto.response.JwtResponse;
import com.springboot.be.dto.response.MessageResponse;
import com.springboot.be.entity.RefreshEntity;
import com.springboot.be.entity.User;
import com.springboot.be.repository.RefreshRepository;
import com.springboot.be.repository.UserRepository;
import com.springboot.be.security.jwt.JwtUtils;
import com.springboot.be.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "*", maxAge = 3600) // 모든 도메인에서의 CORS 요청 허용, 캐시 시간 3600초
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager; // 로그인 인증 처리

    @Autowired
    UserRepository userRepository; // 사용자 정보를 DB에서 조회/저장하기 위한 JPA Repository

    @Autowired
    PasswordEncoder encoder; // 비밀번호 암호화를 위한 PasswordEncoder

    @Autowired
    JwtUtils jwtUtils; // JWT 토큰 생성 및 검증 유틸리티

    @Autowired
    RefreshRepository refreshRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String username = userDetails.getUsername();
        String userEmail = userDetails.getEmail();
        Long userId = userDetails.getId();

        String accessToken = jwtUtils.generateToken(userEmail, "access", 1000 * 60 * 15);
        String refreshToken = jwtUtils.generateToken(userEmail, "refresh", 1000L * 60 * 60 * 24 * 30);

        User user = userRepository.findByEmail(userEmail).orElseThrow();
        refreshRepository.findByUser(user).ifPresent(refreshRepository::delete);

        RefreshEntity tokenEntity = RefreshEntity.builder()
                .user(user)
                .token(refreshToken)
                .expiryDate(LocalDateTime.now().plusDays(30))
                .build();

        refreshRepository.save(tokenEntity);

        return ResponseEntity.ok(new JwtResponse(
                accessToken,
                refreshToken,
                userId,
                username,
                userDetails.getEmail()
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));

        }

        //create new user account
        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),
                signUpRequest.getGender(),
                signUpRequest.getBirthDate()
        );


        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


}

