package com.pettalk.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pettalk.petsitter.entity.PetSitter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column
    private String kakaoId;

    @Size(min = 2, max = 10)
    @Column(length = 10)
    private String nickName;

    @Column
    private String email;

    @Column
    private String profileImage;

    @Column
    private String phone;

    @Column
    private String password;

    @CreationTimestamp
    private Timestamp createdAt;

    @OneToOne(mappedBy = "member")
    private PetSitter petSitter;

}
