package com.springboot.be.repository;

import com.springboot.be.entity.PhotoLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhotoLikeRepository extends JpaRepository<PhotoLike, Long> {

    @Query("""
                SELECT pl FROM PhotoLike pl
                JOIN FETCH pl.photo p
                JOIN FETCH p.post po
                JOIN FETCH po.marker
                WHERE pl.user.id = :userId
            """)
    List<PhotoLike> findByUserIdWithMarker(@Param("userId") Long userId);
}
