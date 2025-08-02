package com.springboot.be.repository;

import com.nimbusds.oauth2.sdk.token.RefreshToken;
import com.springboot.be.entity.RefreshEntity;
import com.springboot.be.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshRepository extends JpaRepository<RefreshEntity, Integer> {

    Optional<RefreshEntity> findByUser(User user);
    void deleteByUser(User user);

}
