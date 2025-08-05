package com.springboot.be.repository;

import com.springboot.be.entity.OAuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuthUserRepository extends JpaRepository<OAuthUser, Long> {
    Optional<OAuthUser> findByProviderAndProviderId(String provider, String providerId);
}