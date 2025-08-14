package com.springboot.be.controller;

import com.springboot.be.dto.response.JwtResponse;
import com.springboot.be.dto.request.LoginRequest;
import com.springboot.be.dto.response.MessageResponse;
import com.springboot.be.dto.request.SignupRequest;
import com.springboot.be.entity.RefreshEntity;
import com.springboot.be.entity.User;
import com.springboot.be.repository.RefreshRepository;
import com.springboot.be.repository.UserRepository;
import com.springboot.be.security.TokenRequestDto;
import com.springboot.be.security.TokenResponseDto;
import com.springboot.be.security.jwt.JwtUtils;
import com.springboot.be.security.oauth2.OneTimeCodeService;
import com.springboot.be.security.pwreset.PasswordResetConfirmDto;
import com.springboot.be.security.pwreset.PasswordResetRequestDto;
import com.springboot.be.security.pwreset.PasswordResetService;
import com.springboot.be.security.services.AuthService;
import com.springboot.be.security.services.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600) // 모든 도메인에서의 CORS 요청 허용, 캐시 시간 3600초
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager; // 로그인 인증 처리

    private final UserRepository userRepository; // 사용자 정보를 DB에서 조회/저장하기 위한 JPA Repository

    private final PasswordEncoder encoder; // 비밀번호 암호화를 위한 PasswordEncoder

    private final JwtUtils jwtUtils; // JWT 토큰 생성 및 검증 유틸리티

    private final RefreshRepository refreshRepository;

    private final AuthService authService;

    private final PasswordResetService service;

    public static record ExchangeRequest(String code) {}

    private final OneTimeCodeService oneTimeCodeService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String username = userDetails.getUsername();
        String userEmail = userDetails.getEmail();
        Long userId = userDetails.getId();

        String accessToken = jwtUtils.generateToken(userEmail, "access", 1000*60*15);
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
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest){
        if(userRepository.existsByEmail(signUpRequest.getEmail())){
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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorization) {
        authService.logout(authorization);
        return ResponseEntity.ok(Map.of("message", "로그아웃 완료"));
    }


    @PostMapping("/token/reissue")
    public ResponseEntity<?> reissue(@RequestBody TokenRequestDto request) {
        String refreshToken = request.getRefreshToken();

        // 1. RefreshToken 유효성 검사
        if (!jwtUtils.validateJwtToken(refreshToken)) {
            throw new RuntimeException("Refresh Token 형식 불일치");
        }

        // 2. RefreshToken에서 email 추출 → User 조회
        String email = jwtUtils.getEmailFromJwtToken(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없음"));

        // 3. RefreshEntity 조회
        RefreshEntity refreshEntity = refreshRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("RefreshToken 없음"));

        // 4. RefreshToken 일치 여부 확인
        if (!refreshEntity.getToken().equals(refreshToken)) {
            throw new RuntimeException("Refresh Token 불일치");
        }

        // 5. 새로운 토큰 발급
        String newAccessToken = jwtUtils.generateToken(email, "access", 1000*60*15);
        String newRefreshToken = jwtUtils.generateToken(email, "refresh", 1000L * 60 * 60 * 24 * 30);

        // 6. DB 갱신
        refreshEntity.updateToken(newRefreshToken);
        refreshRepository.save(refreshEntity);

        // 7. 응답
        return ResponseEntity.ok(new TokenResponseDto(newAccessToken, newRefreshToken));
    }

    @PostMapping("/pwreset/request")
    public ResponseEntity<?> request(@Valid @RequestBody PasswordResetRequestDto dto,
                                     HttpServletRequest req) {
        String baseUrl = Optional.ofNullable(req.getHeader("X-Reset-Base-Url"))
                .orElse("http://localhost:5173");
        service.requestReset(dto.email(), baseUrl);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/pwreset/confirm")
    public ResponseEntity<Void> confirm(@RequestBody PasswordResetConfirmDto dto) {
        service.confirmReset(dto.token(), dto.newPassword());
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/exchange")
    public ResponseEntity<JwtResponse> exchange(@RequestBody ExchangeRequest req) {
        return ResponseEntity.ok(oneTimeCodeService.consume(req.code())); // JSON으로 토큰/유저정보 내려감
    }


}

