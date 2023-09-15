package com.pettalk.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomRequestDto {
    private String userType;
    private String message;
}
