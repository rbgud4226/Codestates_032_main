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
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long animalId;

    private String name;

    // 다른 동물 정보를 나타내는 필드들...

    @ManyToOne
    @JoinColumn(name = "pet_sitter_id")
    private PetSitter petSitter;
}
