package com.pettalk.chat.repository;

import com.pettalk.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    boolean existsByWcBoardId(Long wcBoardId);
}
