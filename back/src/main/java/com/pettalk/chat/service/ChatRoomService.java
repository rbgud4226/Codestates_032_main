package com.pettalk.chat.service;

import com.pettalk.chat.entity.ChatRoom;
import com.pettalk.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoom createChatRoom(ChatRoom chatRoom){
        return chatRoomRepository.save(chatRoom);
    }

    public boolean chatRoomExists(Long roomId) {
        return chatRoomRepository.existsById(roomId);
    }
}
