package com.pettalk.wcboard.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.entity.Member;
import com.pettalk.member.repository.MemberRepository;

import com.pettalk.member.service.MemberService;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.repository.PetSitterRepository;
import com.pettalk.petsitter.service.PetSitterService;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.PetSitterApplicant;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.PetSitterApplicantRepository;
import com.pettalk.wcboard.repository.WcBoardRepository;
import com.pettalk.wcboard.specification.WcBoardSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor //private final 된것만
@Slf4j
public class WcBoardService {
    private final WcBoardRepository wcBoardRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final PetSitterService petSitterService;
    private final PetSitterApplicantRepository paRepository;

    //구현 주요 로직 로그인한 경우에만 게시글 작성 가능
    // 컨트롤러와 동일하게 멤버검증 부분 테스트와 서버용 분리
    //멤버 검증 로직 포함
    public WcBoard createWcBoardPost (WcBoard wcboard, Long memberId){
        wcboard.setPostStatus(WcBoard.PostStatus.DEFAULT);
        wcboard.setCreatedAt(LocalDateTime.now());
        //멤버 아이디 가져오기
        memberService.findVerifyMember(memberId);
        wcboard.setMember(memberService.findVerifyMember(memberId)); // 게시글에 멤버아이디 등록

//        wcboard.getMember().getPetSitter().setPetSitterId(member.getPetSitter().getPetSitterId());

        wcBoardRepository.save(wcboard);
        return wcboard;
    }

    //테스트용
//    public WcBoard createWcBoardPost(WcBoard wcboard) {
//        wcboard.setPostStatus(WcBoard.PostStatus.DEFAULT);
//        //멤버 아이디 가져오기
//
//        wcboard.setCreatedAt(LocalDateTime.now());
//        wcBoardRepository.save(wcboard);
//        return wcboard;
//    }

    // 구현 주요 로직 : 로그인한 상태라도 본인의 게시글이 아니면 수정 불가
    public WcBoard updateWcBoardPost(WcBoard wcboard, Long memberId) {
        wcboard.setMember(memberService.findVerifyMember(memberId));    //멤버 아이디 가져오기
        WcBoard findPost = findVerifyPost(wcboard.getWcboardId());      //보드 아이디 가져오기

        if (wcboard.getPostStatus() == WcBoard.PostStatus.DEFAULT) {
            Optional.ofNullable(wcboard.getTitle())
                    .ifPresent(title -> findPost.setTitle(title));
            Optional.ofNullable(wcboard.getContent())
                    .ifPresent(content -> findPost.setContent(content)); // TODO : 타이틀과 내용말고 다른것도 수정 추가 필요
        } else {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }
        return wcBoardRepository.save(findPost);
    }

    // wcBoardId 검색해주는 메서드
    public WcBoard findWcBoardPost(Long wcboardId) {
        WcBoard findPost = findVerifyPost(wcboardId);
        memberService.findNickName(findPost.getMember().getMemberId());

        System.out.println(findPost.getMember().getMemberId() + "멤버 아이디 테스트");

        if(wcboardId == null){
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }else{
            return findVerifyPost(wcboardId);
        }
    }

    //전체 글 조회 (최신순 정렬)
    public Page<WcBoard> findAllPosts(int page, int size, Long memberId) {
        memberService.findNickName(memberId);
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("wcboardId").descending());
        return wcBoardRepository.findAll(pageRequest);
    }


    //백업
    public WcBoard whoPetSitterId(WcBoardDto.SubmitPost wcboard, Long memberId) {
        //토큰에서 petsitterId를 가져왔기 때문에 검증 필요 없음
        //가져온 petsitterId가 null이면 펫시터 등록을 안한 상태
        Member member = memberService.findVerifyMember(memberId);

        Long petSitterId = member.getPetSitter().getPetSitterId();

        PetSitter petSitter = petSitterService.findVerifiedPetSitter(petSitterId);
        boolean checkPetSitter = petSitter.getPetSitterId() != null;

        log.info("신청시 펫시터 등록 여부 : " + checkPetSitter);

        WcBoard findWcBoard = wcBoardRepository.findById(wcboard.getWcboardId())
                .orElseThrow(() ->
                        new RuntimeException("게시글이 없어요!"));
        if (!checkPetSitter) {
            throw new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND);
        } else {
            PetSitterApplicant petSitterApplicant = new PetSitterApplicant();
            petSitterApplicant.setWcboardId(wcboard.getWcboardId());
            petSitterApplicant.setPetSitter(petSitter);
            paRepository.save(petSitterApplicant);
            return findWcBoard;
        }
    }

    /**
     * Todo 방어로직
     * 1. 자신이 게시글에 신청할 경우 > 완료
     * 2. 펫시터 아이디가 없는 경우 > 완료
     * 3. 동일한 시간대에 여러게시글에 신청
     */
    public ResponseEntity submitPetSitter(Long memberId, WcBoardDto.SubmitPost submitPost, Long wcboardId) {
        Member findMember = memberService.findVerifyMember(memberId);
        WcBoard findPost = findVerifyPost(wcboardId);

        if (isOwnPost(findMember, findPost)) {
            return ResponseEntity.ok("자신의 게시글에 신청할수 없어요!");
        } else if (!isPetSitter(findMember)) {
            return ResponseEntity.ok("펫시터를 아직 등록하지 않으셨네요!");
        } else {
            return ResponseEntity.ok("신청 완료!");
        }
    }

    private boolean isOwnPost(Member member, WcBoard wcBoard) {
        return member.getMemberId().equals(wcBoard.getMember().getMemberId());
    }

    private boolean isPetSitter(Member member) {
        return member.getPetSitter() != null;
    }

    /** 0908 태그 다중적용이 안되어 일시 비활성화 처리
    public Page<WcBoard> findPostByWcTag(int page, int size, String wcTag) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("wcboardId").descending());
        return wcBoardRepository.findByWcTagContaining(wcTag, pageRequest);
    }

    public Page<WcBoard> findPostByAnimalTag(int page, int size, String animalTag) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("wcboardId").descending());
        return wcBoardRepository.findByAnimalTagContaining(animalTag, pageRequest);
    }

    public Page<WcBoard> findPostByAreaTag(int page, int size, String areaTag) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("wcboardId").descending());
        return wcBoardRepository.findByAreaTagContaining(areaTag, pageRequest);
    }
     */
    //태그사용 조회
    public Page<WcBoard> findAllWithTags(int page, int size, String wcTag, String animalTag, String areaTag, Long memberId) {
        Specification<WcBoard> spec = (root, query, criteriaBuilder) -> null;

        if (wcTag != null)
            spec = spec.and(WcBoardSpecification.equalWcTagWithTag(wcTag));

        if (animalTag != null)
            spec = spec.and(WcBoardSpecification.equalAnimalTagWithTag(animalTag));

        if (areaTag != null)
            spec = spec.and(WcBoardSpecification.equalAreaTagWithTag(areaTag));

        Pageable pageable = PageRequest.of(page, size);
        memberService.findNickName(memberId);
        return wcBoardRepository.findAll(spec, pageable);
    }

    public void deletePost(Long wcboardId) {
        WcBoard findPost = findVerifyPost(wcboardId);

        if(!findPost.getPostStatus().equals(WcBoard.PostStatus.DEFAULT)) { // 진행중인 게시글만 삭제 가능
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED); // 삭제 불가능 예외처리 TODO : 에러코드 수정 필요
        }
        /**
         * 멤버와 연결후 구현 / 게시글 작성자만 삭제 가능한 로직
         if(!findPost.getMember().getMemberId().equals(MemberService.getLoginUserId())) { // 게시글 작성자만 삭제 가능
         throw new BusinessLogicException(ExceptionCode.NOT_RESOURCE_OWNER); // 삭제 불가능 예외처리
         }
         */
        wcBoardRepository.delete(findPost);
    }


    // 게시글 찾고 없으면 예외처리
    public WcBoard findVerifyPost (Long wcboardId) {
        Optional<WcBoard> optionalPOST = wcBoardRepository.findById(wcboardId);

        WcBoard findWcBoardPost =
                optionalPOST.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return findWcBoardPost;
    }


    public List<PetSitterApplicant> findApplicantPetsitter(Long wcboardId) {
        List<PetSitterApplicant> petSitterApplicantList = paRepository.findByWcboardId(wcboardId);
        return petSitterApplicantList;
    }
}
