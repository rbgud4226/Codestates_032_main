package com.pettalk.wcboard.entity;

import com.pettalk.PettalkApplication;
import com.pettalk.chat.entity.ChatRoom;
import com.pettalk.member.entity.Member;
import com.pettalk.petsitter.entity.PetSitter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class WcBoard { //..
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wcboardId;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column
    private String images;


    @Column(nullable = false)
    private String wcTag;
    @Column(nullable = false)
    private String animalTag;
    @Column(nullable = false)
    private String areaTag;


    @Column
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column
    private LocalDateTime startTime = LocalDateTime.now();
    @Column
    private LocalDateTime endTime = LocalDateTime.now();
    @Enumerated(value = EnumType.STRING)
    @Column
    private PostStatus postStatus = PostStatus.DEFAULT;



    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "petSitter_id")
    private PetSitter petSitter;

//    @OneToMany(mappedBy = "wcboard")
//    @JoinColumn(name = "room_id")
//    private ChatRoom chatRoom;

    public enum PostStatus{
        DEFAULT("기본 상태"), // 기본 게시된 상태
        IN_RESERVATION("예약중"), // 예약중인 상태
        IN_PROGRESS("진행중"), // 산책/돌봄 진행중인 상태
        COMPLETE("완료"); // 모든 과정이 끝난 상태

        @Getter
        private String status;

        PostStatus(String status) { this.status = status; }
    }


}
