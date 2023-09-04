package com.pettalk.chat.controller;

import com.pettalk.chat.dto.ChatRoomPostDto;
import com.pettalk.chat.dto.ChatRoomRequestDto;
import com.pettalk.chat.dto.ChatRoomResponseDto;
import com.pettalk.chat.entity.ChatMessage;
import com.pettalk.chat.entity.ChatRoom;
import com.pettalk.chat.exception.ChatRoomNotFoundException;
import com.pettalk.chat.mapper.ChatMessageMapper;
import com.pettalk.chat.mapper.ChatRoomMapper;
import com.pettalk.chat.repository.ChatMessageRepository;
import com.pettalk.chat.service.ChatMessageService;
import com.pettalk.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatRoomController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatRoomService chatRoomService;
    private final ChatRoomMapper chatRoomMapper;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatMessageService chatMessageService;
    private final ChatMessageMapper chatMessageMapper;

    // 채팅방 생성
    @PostMapping("/chat")
    public ResponseEntity createChatRoom(@RequestBody ChatRoomPostDto chatRoomPostDto){
        log.info(chatRoomPostDto.getMemberId().toString());
        log.info(chatRoomPostDto.getPetSitterId().toString());
        ChatRoom chatRoom = chatRoomService.createChatRoom(chatRoomMapper.chatRoomPostDtoToChatRoom(chatRoomPostDto));
        ChatRoomResponseDto response = chatRoomMapper.chatRoomToChatRoomResponseDto(chatRoom);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 채팅방 기록 불러오기
    @GetMapping("/chat/{roomId}")
    public ResponseEntity getChatHistory(@PathVariable Long roomId){
        List<ChatMessage> chatHistory = chatMessageRepository.findByRoomIdOrderByCreatedAtAsc(roomId);
        return new ResponseEntity<>(chatHistory, HttpStatus.OK);
    }

    // 메세지 보내기와 저장
    @MessageMapping("/{roomId}")
    public void message(@DestinationVariable("roomId") Long roomId, ChatRoomRequestDto chatMessage){
        log.info(String.valueOf(roomId));
        if(!chatRoomService.chatRoomExists(roomId)){
            throw new ChatRoomNotFoundException("Chat Room not found");
        }
        simpMessageSendingOperations.convertAndSend("/sub/room/" + roomId, chatMessage);
        chatMessageService.createChatMessage(chatMessageMapper.chatRoomRequestToChatMessage(chatMessage), roomId);
    }

}
