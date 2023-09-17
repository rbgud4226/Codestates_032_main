package com.pettalk.submit.entity;

import com.pettalk.petsitter.entity.PetSitter;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class PetSitterApplicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petSitterApplicantId;

//    @ManyToOne
//    @JoinColumn(name = "wcboard_id")
//    private WcBoard wcboard;

    @ManyToOne
    @JoinColumn(name = "petSitter_id")
    private PetSitter petSitter;

    private Long wcboardId;

//    @OneToOne
//    @JoinColumn(name = )
//    private String startTime;
//    private String endTime;
}
