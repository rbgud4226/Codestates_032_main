package com.pettalk.submit.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.entity.Member;
import com.pettalk.member.service.MemberService;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.service.PetSitterService;
import com.pettalk.submit.entity.PetSitterApplicant;
import com.pettalk.submit.repository.PetSitterApplicantRepository;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.WcBoardRepository;
import com.pettalk.wcboard.service.WcBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor //private final 된것만
@Slf4j
public class PetSitterApplicantService {
    private final WcBoardRepository wcBoardRepository;
    private final MemberService memberService;
    private final PetSitterService petSitterService;
    private final WcBoardService wcBoardService;
    private final PetSitterApplicantRepository paRepository;

    public ResponseEntity submitPetSitter(Long memberId, Long wcboardId) {
        Member findMember = memberService.findVerifyMember(memberId);
        WcBoard findPost = wcBoardService.findVerifyPost(wcboardId);
        findPost.setPostStatus(WcBoard.PostStatus.IN_RESERVATION);

        Member member = memberService.findVerifyMember(memberId);

        Long petSitterId = member.getPetSitter().getPetSitterId();
        PetSitter petSitter = petSitterService.findVerifiedPetSitter(petSitterId);

        log.info("펫시터가 parepository에 존재하는지 확인 : " + petSitterExists(petSitterId));

        if (hasAlreadyApplied(wcboardId, petSitterId)) {
            return ResponseEntity.ok("이미 신청한 게시글 입니다!");
        } else if (isOwnPost(findMember, findPost)) {
            return ResponseEntity.ok("자신의 게시글에 신청할 수 없어요!");
        } else if (!isPetSitter(findMember)) {
            return ResponseEntity.ok("펫시터를 아직 등록하지 않으셨어요!");
        } else {
            PetSitterApplicant petSitterApplicant = new PetSitterApplicant();
            petSitterApplicant.setWcboardId(wcboardId);
            petSitterApplicant.setPetSitter(petSitter);
            paRepository.save(petSitterApplicant);
            return ResponseEntity.ok("신청 완료!");
        }
    }

    public List<PetSitterApplicant> findApplicantPetsitter(Long wcboardId) {
        List<PetSitterApplicant> petSitterApplicantList = paRepository.findByWcboardId(wcboardId);
        return petSitterApplicantList;
    }

    private boolean isOwnPost(Member member, WcBoard wcBoard) {
        return member.getMemberId().equals(wcBoard.getMember().getMemberId());
    }

    private boolean isPetSitter(Member member) {
        return member.getPetSitter() != null;
    }

    public boolean petSitterExists(Long petSitterId) {
        return paRepository.existsById(petSitterId);
    }

    private boolean hasAlreadyApplied(Long wcboardId, Long petSitterId) {
        List<PetSitterApplicant> existingApplicants = findApplicantPetsitter(wcboardId);
        return existingApplicants.stream()
                .anyMatch(applicant -> applicant.getPetSitter().getPetSitterId().equals(petSitterId));
    }
}
