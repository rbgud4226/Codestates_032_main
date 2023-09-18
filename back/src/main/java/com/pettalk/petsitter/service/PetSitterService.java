package com.pettalk.petsitter.service;


import com.pettalk.argumentresolver.LoginMemberId;
import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.entity.Member;
import com.pettalk.member.repository.MemberRepository;
import com.pettalk.member.service.MemberService;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.repository.PetSitterRepository;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.PetSitterApplicant;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.PetSitterApplicantRepository;
import com.pettalk.wcboard.repository.WcBoardRepository;
import com.pettalk.wcboard.service.WcBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PetSitterService {

    private final PetSitterRepository petSitterRepository;
    private final MemberRepository memberRepository;
    private final WcBoardRepository wcBoardRepository;
    private final WcBoardService wcBoardService;
    private final MemberService memberService;
    private final PetSitterApplicantRepository petSitterApplicantRepository;

    public PetSitter createPetSitter(PetSitter petSitter) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String principal = (String) authentication.getPrincipal();
        Member findMember = memberService.findMemberByPrincipal(principal);

        if(findMember.getPetSitter() != null && findMember.getPetSitter().getPetSitterId() != null) {
            throw new BusinessLogicException(ExceptionCode.PETSITTER_EXISTS);
        }
        else {
            petSitter.setMember(findMember);
            petSitter.setPetSitterId(petSitter.getPetSitterId());
            petSitter.setName(petSitter.getName());
            petSitter.setIntroduce(petSitter.getIntroduce());
            petSitter.setNowJob(petSitter.getNowJob());
            petSitter.setSmoking(petSitter.isSmoking());
            petSitter.setExAnimal(petSitter.getExAnimal());
            petSitter.setInfo(petSitter.getInfo());
            petSitter.setCreatedAt(LocalDateTime.now());

            return petSitterRepository.save(petSitter);
        }
    }

    public PetSitter updatePetSitter(PetSitter petSitter, Long memberId) {
        PetSitter findPetSitter = findVerifiedPetSitter(petSitter.getPetSitterId());
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        petSitter.setMember(findMember);
        petSitter.setPetSitterId(findPetSitter.getPetSitterId());
        petSitter.setName(petSitter.getName());
        petSitter.setIntroduce(petSitter.getIntroduce());
        petSitter.setNowJob(petSitter.getNowJob());
        petSitter.setSmoking(petSitter.isSmoking());
        petSitter.setExAnimal(petSitter.getExAnimal());
        petSitter.setInfo(petSitter.getInfo());
        return petSitterRepository.save(petSitter);
    }

    @Transactional(readOnly = true)
    public PetSitter findVerifiedPetSitter(long petSitterId) {
        Optional<PetSitter> optionalPetSitter = petSitterRepository.findById(petSitterId);

        PetSitter findPetSitter = optionalPetSitter
        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));

        return findPetSitter;
    }

    public PetSitter findPetSitter(long petSitterId) {

        PetSitter findPetSitter = verifyExistPetSitter(petSitterId);

        return findPetSitter;
    }

    private PetSitter verifyExistPetSitter(long petSitterId) {

        PetSitter petSitter = petSitterRepository.findById(petSitterId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));

        return petSitter;
    }

    //    private WcBoard
//    public Page<WcBoard> getRecentInfo(PetSitter petSitter, int page, int size) {
//        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("wcboardId").descending());
//
//
//        return wcBoardRepository.findByMember_MemberId(petSitterMemberId, pageRequest);
//        return wcBoardRepository.findByPetSitter_PetSitterId(petSitter.getPetSitterId(), pageRequest);
//        //닉네임은 member쪽에서., 시작끝시간, 산책돌봄태그, 클라이언트 이미지
//    }

//    public Page<WcBoard> getRecentInfo(Long memberId, int page, int size) {
//        PetSitter findPetSitter = findVerifiedPetSitter(memberId);
//
//        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("wcboardId").descending());
//        List<WcBoard.PostStatus> wcBoardStatus = Arrays.asList(WcBoard.PostStatus.COMPLETE, WcBoard.PostStatus.IN_PROGRESS);
//        Page<WcBoard> wcBoards = wcBoardRepository.findByPetSitter_PetSitterIdAndPostStatusIn(findPetSitter.getPetSitterId(), wcBoardStatus, pageable);
//
//        return wcBoards;
//    }

    public List<WcBoard> getRecentPost(Long memberId) {

        Member member = memberService.findVerifyMember(memberId);
        Long petSitterId = member.getPetSitter().getPetSitterId();
        List<PetSitterApplicant> findApplicants = petSitterApplicantRepository.findByPetSitter_PetSitterId(petSitterId);

//        List<WcBoard.PostStatus> wcBoardStatus = Arrays.asList(WcBoard.PostStatus.COMPLETE, WcBoard.PostStatus.IN_PROGRESS, WcBoard.PostStatus.IN_RESERVATION);
//
//        return wcBoardRepository.findByPetSitter_PetSitterIdAndPostStatusIn(findApplicants, wcBoardStatus);
        return findApplicants.stream()
                .map(petSitterApplicant -> {
                    WcBoard wcboard = wcBoardRepository.findByWcboardId(petSitterApplicant.getWcboardId());
                    if (wcboard != null) {
                        List<WcBoard.PostStatus> wcBoardStatus = Arrays.asList(WcBoard.PostStatus.COMPLETE, WcBoard.PostStatus.IN_PROGRESS, WcBoard.PostStatus.IN_RESERVATION);

                        return wcBoardRepository.findByPostStatusIn(wcBoardStatus);
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public Page<WcBoard> getRecentInfo(Long memberId, int page, int size) {

        Member member = memberService.findVerifyMember(memberId);
        PetSitter findPetSitter = member.getPetSitter();

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("wcboardId").descending());
        List<WcBoard.PostStatus> wcBoardStatus = Arrays.asList(WcBoard.PostStatus.COMPLETE);
        Page<WcBoard> wcBoards = wcBoardRepository.findByPetSitter_PetSitterIdAndPostStatusIn(findPetSitter.getPetSitterId(), wcBoardStatus, pageable);

        return wcBoards;
    }

}