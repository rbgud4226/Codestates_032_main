package com.pettalk.wcboard.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.WcBoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WcBoardService {
    private final WcBoardRepository wcBoardRepository;

    public WcBoardService(WcBoardRepository wcBoardRepository){ this.wcBoardRepository = wcBoardRepository; }

    //구현 주요 로직 로그인한 경우에만 게시글 작성 가능
    public WcBoard createWcBoardPost (WcBoard wcboard){
        wcboard.setPostStatus(WcBoard.PostStatus.DEFAULT);
        // 로그인한 멤버 id 가져오기
        // 이 도끼가 너의 도끼냐? 멤버 검증 로직 활용
        // memberService.findMember(WcBoard.getMember().getMemberId());
        wcboard.setCreatedAt(LocalDateTime.now());
        wcBoardRepository.save(wcboard);
        return wcboard;
    }

    // 구현 주요 로직 : 로그인한 상태라도 본인의 게시글이 아니면 수정 불가
    public WcBoard updateWcBoardPost (WcBoard wcboard) {
        WcBoard findPost = findVerifyPost(wcboard.getWcBoardId()); // TODO : 멤버 아이디 불러와서 검증 로직 구현 필요

        if (wcboard.getPostStatus() == WcBoard.PostStatus.DEFAULT){
            Optional.ofNullable(wcboard.getTitle())
                    .ifPresent(title -> findPost.setTitle(title));
            Optional.ofNullable(wcboard.getContent())
                    .ifPresent(content -> findPost.setContent(content)); // TODO : 타이틀과 내용말고 다른것도 수정 추가 필요
        }else{
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND); // TODO : 수정불가 에러코드로 변경 예정
        }


        return wcBoardRepository.save(findPost);
    }

    // wcBoardId 검색해주는 메서드
    public WcBoard findWcBoardPost(long wcBoardId){
        return findVerifyPost(wcBoardId);
    }

    //전체 글 조회 (최신순 정렬)
    public Page<WcBoard> findAllPosts(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return wcBoardRepository.findAll(pageRequest);
    }

    public Page<WcBoard> findPostWcTag(int page, int size, String wcTag) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return wcBoardRepository.findByWcTagContaining(wcTag, pageRequest);
    }



    // 게시글 찾고 없으면 예외처리
    public WcBoard findVerifyPost (long wcBoardId) {
        Optional<WcBoard> optionalPOST = wcBoardRepository.findById(wcBoardId);

        WcBoard findWcBoardPost =
                optionalPOST.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)); // TODO : 게시글 없음으로 에러 변경
        return findWcBoardPost;
    }


}
