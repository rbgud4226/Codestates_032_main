package com.pettalk.review.entity;


import com.pettalk.petsitter.entity.PetSitter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @Column
    private String content;
    @Column
    private String memberNickName;
    @Column
    private Float star;

//    @ManyToOne
//    @JoinColumn(name = "petSitter_id")
//    private PetSitter petSitter;
}
