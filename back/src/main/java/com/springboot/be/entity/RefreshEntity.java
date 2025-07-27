package com.springboot.be.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
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
}
