package com.springboot.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(nullable = false)
    private String imageUrl;

    @Lob
    private String content;

    private Double latitude;
    private Double longitude;

    @CreatedDate
    private LocalDateTime createdAt;

    private LocalDateTime takenAt;
    private Integer sequence;
    private Integer likeCount = 0;

    @OneToMany(mappedBy = "photo")
    private List<PhotoLike> likes = new ArrayList<>();

    @OneToMany(mappedBy = "photo")
    private List<Comment> comments = new ArrayList<>();

    public void increaseLike() {
        this.likeCount++;
    }

    public void decreaseLike() {
        if (this.likeCount > 0) {
            this.likeCount--;
        }
    }
}
