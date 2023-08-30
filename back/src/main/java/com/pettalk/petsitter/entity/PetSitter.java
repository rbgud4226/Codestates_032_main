package com.pettalk.petsitter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PetSitter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long petSitterId;

    private String nowJob;

    private boolean smoking;

    private String info;

    private String motive;

//    @JoinColumn(name = "member_id")
//    @ManyToOne
//    private Member member;

    private String createdAt;
}
