package com.springboot.be.repository;

import com.springboot.be.entity.TravelPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelPathRepository extends JpaRepository<TravelPath, Long> {
    List<TravelPath> findRecommendedByRegion(String region);
}
