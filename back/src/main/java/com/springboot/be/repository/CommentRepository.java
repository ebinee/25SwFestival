package com.springboot.be.repository;

import com.springboot.be.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPhoto_Id(Long photoId);
}
