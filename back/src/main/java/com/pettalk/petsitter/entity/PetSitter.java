package com.pettalk.petsitter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PetSitter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long petSitterId;

    private String introduce;

    private String nowJob;

    private boolean smoking;

    @OneToMany(mappedBy = "petSitter")
    private List<Animal> exAnimal;

    private String info;

//    @JoinColumn(name = "member_id")
//    @ManyToOne
//    private Member member;

//    @JoinColumn
//    @ManyToOne
//    private WcBoard wcBoard;


    private String createdAt;

}
