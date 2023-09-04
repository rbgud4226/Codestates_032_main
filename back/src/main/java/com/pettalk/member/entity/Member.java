package com.pettalk.member.entity;

import com.pettalk.chat.entity.ChatRoom;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String nickName;

//    @OneToMany(mappedBy = "member")
//    private List<ChatRoom> room = new ArrayList<>();


}
