package com.springboot.be.security.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.be.dto.response.JwtResponse;
import com.springboot.be.entity.RefreshEntity;
import com.springboot.be.entity.User;
import com.springboot.be.repository.RefreshRepository;
import com.springboot.be.repository.UserRepository;
import com.springboot.be.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RefreshRepository refreshRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                       Authentication authentication) throws IOException{
        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
        String email = (String)  oAuth2User.getAttribute("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        String accessToken = jwtUtils.generateToken(user.getEmail(), "access", 1000*60*15);
        String refreshToken = jwtUtils.generateToken(user.getEmail(), "refresh", 1000L*60*60*24*30);

        refreshRepository.findByUser(user).ifPresent(refreshRepository::delete);
        refreshRepository.save(new RefreshEntity(user, refreshToken, LocalDateTime.now().plusDays(30)));

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        JwtResponse jwtResponse = new JwtResponse(
                accessToken,
                refreshToken,
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );

        ObjectMapper objectMapper = new ObjectMapper();
        String responseBody = objectMapper.writeValueAsString(jwtResponse);
        response.getWriter().write(responseBody);

    }
}
