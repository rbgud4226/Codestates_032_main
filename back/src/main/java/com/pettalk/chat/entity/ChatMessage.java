package com.pettalk.chat.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    private Long roomId;

    private String message;

    private LocalDateTime createdAt;

    // 사용자의 역할을 나타내는 필드 (예: "applicant" 또는 "petSitter")
    private String userType;

    // 생성자에서 작성 시간 초기화
    public ChatMessage() {
        this.createdAt = LocalDateTime.now();
    }
}
