package com.pettalk.petsitter.entity;

import com.pettalk.chat.entity.ChatRoom;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class PetSitter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petSitterId;

    private String name;

//    @OneToMany(mappedBy = "petSitter")
//    private List<ChatRoom> room = new ArrayList<>();
}
