package com.pettalk.chat.service;

import com.pettalk.chat.dto.ChatRoomCompleteDto;
import com.pettalk.chat.entity.ChatRoom;
import com.pettalk.chat.exception.ChatRoomException;
import com.pettalk.chat.repository.ChatRoomRepository;
import com.pettalk.member.entity.Member;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.service.PetSitterService;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.WcBoardRepository;
import com.pettalk.wcboard.service.WcBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final WcBoardService wcBoardService;
    private final WcBoardRepository wcBoardRepository;
    private final PetSitterService petSitterService;

    public ChatRoom createChatRoom(ChatRoom chatRoom){
        boolean chatRoomExists = chatRoomRepository.existsByWcBoardId(chatRoom.getWcBoardId());
        if (chatRoomExists){
            throw new ChatRoomException("Chatroom already exists in this board");
        }
        return chatRoomRepository.save(chatRoom);
    }

    public boolean chatRoomExists(Long roomId) {
        return chatRoomRepository.existsById(roomId);
    }

    public ChatRoom getChatRoom(Long wcboardId, Long memberId) {
        ChatRoom chatRoom = chatRoomRepository.findById(wcboardId).orElseThrow(() -> new ChatRoomException("채팅방이 없습니다."));
        if(chatRoom.getMemberId() != memberId){
            throw new ChatRoomException("본인의 채팅방이 없습니다.");
        }

        return chatRoom;
    }

    public void chatAccept(Long wcBoardId) {
        WcBoard wcBoard = wcBoardService.findVerifyPost(wcBoardId);
        wcBoard.setPostStatus(WcBoard.PostStatus.IN_PROGRESS);
        wcBoardRepository.save(wcBoard);
    }

    public void chatReject(Long wcBoardId) {
        WcBoard wcBoard = wcBoardService.findVerifyPost(wcBoardId);
        wcBoard.setPostStatus(WcBoard.PostStatus.DEFAULT);
        wcBoardRepository.save(wcBoard);
    }

    public void chatComplete(ChatRoomCompleteDto completeDto) {
        WcBoard wcBoard = wcBoardService.findVerifyPost(completeDto.getWcboardId());
        PetSitter petSitter = petSitterService.findPetSitter(completeDto.getPetSitterId());
        wcBoard.setPostStatus(WcBoard.PostStatus.COMPLETE);
        wcBoard.setPetSitter(petSitter);
        wcBoardRepository.save(wcBoard);
    }
}
