package com.pettalk.oauth.entity;

import com.pettalk.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class KakaoRefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    @Column
    private String refreshToken;

    @OneToOne
    private Member member;
}
