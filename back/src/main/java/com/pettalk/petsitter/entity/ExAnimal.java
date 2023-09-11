package com.pettalk.petsitter.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ExAnimal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Dog;
    private String Other;
    @ManyToOne
    @JoinColumn(name = "petSitter_id")
    private PetSitter petSitter;
}
