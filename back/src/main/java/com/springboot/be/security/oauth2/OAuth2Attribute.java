package com.springboot.be.security.oauth2;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;


@Getter
public class OAuth2Attribute {
    public String provider;
    public String providerId;
    public String email;
    private String name;
    private Map<String, Object> attributes;

    private OAuth2Attribute(String provider, String providerId, String email, String name, Map<String, Object> attributes) {
        this.provider = provider;
        this.providerId = providerId;
        this.email = email;
        this.name = name;
        this.attributes = attributes;
    }

    public static OAuth2Attribute of(String provider, String userNameAttributeName, Map<String, Object> attributes) {
        switch (provider) {
            case "google":
                return ofGoogle(userNameAttributeName, attributes);

            case "naver":
                return ofNaver(userNameAttributeName, (Map<String, Object>) attributes.get("response"));
            case "kakao":
                return ofKaKao(userNameAttributeName, attributes);
            default:
                throw new IllegalArgumentException("Unknown provider " + provider);
        }
    }

    private static OAuth2Attribute ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return new OAuth2Attribute("google",
                (String) attributes.get("sub"),
                (String) attributes.get("email"),
                (String) attributes.get("name"),
                attributes);
    }

    private static OAuth2Attribute ofNaver(String userNameAttributeName, Map<String, Object> response) {
        return new OAuth2Attribute("naver",
                (String) response.get("id"),
                (String) response.get("email"),
                (String) response.get("name"),
                response);
    }

    private static OAuth2Attribute ofKaKao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        return new OAuth2Attribute("kakao",
                String.valueOf(attributes.get("id")),
                (String) kakaoAccount.get("email"),
                (String) profile.get("nickname"),
                attributes);
    }

    public Map<String, Object> convertToMap(){
        Map<String, Object> map = new HashMap<>();
        map.put("provider", provider);
        map.put("providerId", providerId);
        map.put("email", email);
        map.put("name", name);
        return map;
    }

}

