package com.pettalk.member.entity;

import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.entity.PetSitterApplicant;
import com.pettalk.wcboard.entity.WcBoard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
    private PetSitter petSitter;
}
