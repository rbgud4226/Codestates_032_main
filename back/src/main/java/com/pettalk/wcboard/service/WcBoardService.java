package com.pettalk.wcboard.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.WcBoardRepository;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WcBoardService {
    private final WcBoardRepository wcBoardRepository;

    public WcBoardService(WcBoardRepository wcBoardRepository){ this.wcBoardRepository = wcBoardRepository; }

    public WcBoard createWcBoardPost (WcBoard wcboard){
        wcboard.setPostStatus(WcBoard.PostStatus.DEFAULT);
        // 로그인한 멤버 id 가져오기
        // 이 도끼가 너의 도끼냐? 멤버 검증 로직 활용
        // memberService.findMember(WcBoard.getMember().getMemberId());
        wcboard.setCreatedAt(LocalDateTime.now());
        wcBoardRepository.save(wcboard);
        return wcboard;
    }

    public WcBoard updateWcBoardPost (WcBoard wcboard) {
        WcBoard findPost = findVerifyPost(wcboard.getWcBoardId());

        Optional.ofNullable(wcboard.getTitle())
                .ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(wcboard.getContent())
                .ifPresent(content -> findPost.setContent(content));

        return wcBoardRepository.save(findPost);
    }


    public WcBoard findPost(long wcBoardId){
        return findVerifyPost(wcBoardId);
    }

    public WcBoard findVerifyPost (long wcBoardId) {
        Optional<WcBoard> optionalPOST = wcBoardRepository.findById(wcBoardId);

        WcBoard wcBoard =
                optionalPOST.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return wcBoard;
    }


}
