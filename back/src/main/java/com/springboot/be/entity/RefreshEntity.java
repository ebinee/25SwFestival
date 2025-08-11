package com.springboot.be.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Getter //@setter 삭제
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "user_id")
   private User user;

   @Column(nullable = false, unique = true)
    private String token;

   @Column(nullable = false)
    private LocalDateTime expiryDate;

    public RefreshEntity(User user, String token, LocalDateTime expiryDate) {
        this.user = user;
        this.token = token;
        this.expiryDate = expiryDate;
    }

}
