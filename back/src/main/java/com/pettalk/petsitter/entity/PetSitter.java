package com.pettalk.petsitter.entity;

import com.pettalk.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDateTime;
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

    @ElementCollection
    private List<String> exAnimal;

    private String info;

    @JoinColumn(name = "member_id")
    @OneToOne
    private Member member;

//    @JoinColumn
//    @ManyToOne
//    private WcBoard wcBoard;


    private LocalDateTime createdAt;

}
