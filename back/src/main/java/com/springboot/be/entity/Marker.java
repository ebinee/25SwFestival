package com.springboot.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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

    private Integer postCount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "global_place_id")
    private GlobalPlace globalPlace;

    @OneToMany(mappedBy = "marker")
    private List<Post> posts = new ArrayList<>();
}
