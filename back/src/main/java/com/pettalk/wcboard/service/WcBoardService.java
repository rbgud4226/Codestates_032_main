package com.pettalk.wcboard.service;

import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.WcBoardRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WcBoardService {
    private final WcBoardRepository wcBoardRepository;

    public WcBoardService (WcBoardRepository wcBoardRepository){ this.wcBoardRepository = wcBoardRepository; }

    public WcBoard createWcBoardPost (WcBoard wcboard){
        wcboard.setPostStatus(WcBoard.PostStatus.DEFAULT);
        // 로그인한 멤버 id 가져오기
        // 이 도끼가 너의 도끼냐? 검증 멤버의 findVerify 활용
        // Member nickName 가져오기
        wcboard.setCreatedAt(LocalDateTime.now());
        wcBoardRepository.save(wcboard);
        return wcboard;

    }

}
