package com.springboot.be.security.pwreset;

import com.springboot.be.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;

import static org.springframework.security.core.token.Sha512DigestUtils.sha;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PasswordResetService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ResetTokenStore tokenStore;
    private final MailService mailService;

    private static final Duration TOKEN_TTL = Duration.ofMinutes(5);

    @Transactional
    public void requestReset(String email, String baseUrl){
        userRepository.findByEmail(email).ifPresent(user ->{
            String rawToken = generateToken();
            String tokenHash = sha256(rawToken);
            tokenStore.save(tokenHash, user.getId(),TOKEN_TTL);

            String link = baseUrl+"/reset?token="+rawToken;
            mailService.sendPasswordResetMail(user.getEmail(), link, (int) TOKEN_TTL.toMinutes());

            System.out.println("로컬 개발용 토큰 확인 링크 : "+link+ "배포 시에 제외할 것");
        });

    }

    @Transactional
    public void confirmReset(String rawToken, String newPassword){
        String tokenHash = sha256(rawToken);
        var userIdOpt = tokenStore.load(tokenHash);

        if(userIdOpt.isEmpty())  throw new IllegalArgumentException("Invalid or expired token");

        validatePasswordPolicy(newPassword);

        var user = userRepository.findById(userIdOpt.get())
                .orElseThrow(()-> new IllegalArgumentException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));

        tokenStore.delete(tokenHash);
    }

    private void validatePasswordPolicy(String pw){
        if(pw==null || pw.length()>45) throw new IllegalArgumentException("password length out of range");
        if (pw.contains(" ")) throw new IllegalArgumentException("no spaces allowed");
    }

    private String generateToken(){
        byte[] buf = new byte[32];
        new SecureRandom().nextBytes(buf);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(buf);

    }

    private String sha256(String raw){
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] d =  md.digest(raw.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(d);
        } catch(Exception e){
            throw new IllegalStateException(e);
        }
    }

}
