package com.pettalk.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Size(min = 2, max = 10)
    @Column(nullable = false, length = 10)
    private String nickName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String profileImage;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String password;

    @CreationTimestamp
    private Timestamp createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column
    private String authCode;
}
