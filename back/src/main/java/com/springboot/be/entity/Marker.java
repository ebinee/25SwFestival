package com.springboot.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Marker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int postCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "global_place_id")
    private GlobalPlace globalPlace;

    @OneToMany(mappedBy = "marker")
    private List<Photo> photos = new ArrayList<>();

    public void increasePostCount() {
        this.postCount++;
    }

    public void decreasePostCount() {
        if (this.postCount > 0) this.postCount--;
    }
}
