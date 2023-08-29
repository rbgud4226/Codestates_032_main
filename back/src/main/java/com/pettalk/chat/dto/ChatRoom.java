package com.pettalk.chat.dto;

import com.pettalk.chat.entity.ChatEntity;
import com.pettalk.chat.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>(); // 이 채팅방에 속한 websocket 세션들을 저장하는 필드

    @Builder
    public ChatRoom(String roomId, String name){
        this.roomId = roomId; // 채팅방 고유 아이디
        this.name = name; // 채팅방 이름
    }

    public void handleActions(WebSocketSession session, ChatEntity chatEntity, ChatService chatService){
        if(chatEntity.getType().equals(ChatEntity.MessageType.ENTER)){ // 메세지 타입이 ENTER면 채팅방 생성
            sessions.add(session);
            chatEntity.setMessage(chatEntity.getSender()+ "님이 입장했습니다.");
        }
        sendMessage(chatEntity, chatService);
    }

    private <T> void sendMessage(T entity, ChatService chatService) {
        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, entity));
    }
}
