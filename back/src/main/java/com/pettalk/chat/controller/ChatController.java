package com.pettalk.chat.controller;

import com.pettalk.chat.dto.ChatMessage;
//import com.pettalk.chat.dto.ChatRoom;
//import com.pettalk.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ChatController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/hello")
    public void message(ChatMessage chatMessage){
        simpMessageSendingOperations.convertAndSend("/sub/channel/" + chatMessage.getId(), chatMessage);
    }

}
