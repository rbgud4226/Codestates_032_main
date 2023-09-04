package com.pettalk.chat.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

//    @ManyToOne
//    @JoinColumn(name = "pet_sitter_id")
//    private PetSitter petSitter;

    private Long memberId;

    private Long petSitterId;

//    private String message;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public ChatRoom() {
        this.createdAt = LocalDateTime.now();
    }

}
