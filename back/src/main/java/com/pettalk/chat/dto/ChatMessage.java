package com.pettalk.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatMessage {
    private String id;
    private String sender;
    private String message;

}
