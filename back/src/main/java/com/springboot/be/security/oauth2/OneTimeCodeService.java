package com.springboot.be.security.oauth2;

import com.springboot.be.dto.response.JwtResponse;
import org.springframework.stereotype.Component;
import java.time.Duration;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OneTimeCodeService {
    private static class Entry {
        final JwtResponse jwt; final long expireAt;
        Entry(JwtResponse jwt, long expireAt) { this.jwt = jwt; this.expireAt = expireAt; }
    }
    private final Map<String, Entry> store = new ConcurrentHashMap<>();

    //일회용 코드 발급 로직
    public String issue(JwtResponse jwt, Duration ttl) {
        String code = UUID.randomUUID().toString();
        store.put(code, new Entry(jwt, System.currentTimeMillis() + ttl.toMillis()));
        return code;
    }

    public JwtResponse consume(String code) {
        Entry e = store.remove(code);
        if (e == null || e.expireAt < System.currentTimeMillis())
            throw new IllegalArgumentException("code expired or invalid");
        return e.jwt;
    }
}