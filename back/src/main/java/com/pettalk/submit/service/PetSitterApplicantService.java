package com.pettalk.submit.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.entity.Member;
import com.pettalk.member.service.MemberService;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.service.PetSitterService;
import com.pettalk.submit.dto.PetSitterApplicantDto;
import com.pettalk.submit.dto.TimeFilter;
import com.pettalk.submit.entity.PetSitterApplicant;
import com.pettalk.submit.repository.PetSitterApplicantRepository;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.repository.WcBoardRepository;
import com.pettalk.wcboard.service.WcBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor //private final 된것만
@Slf4j
public class PetSitterApplicantService {
    private final MemberService memberService;
    private final PetSitterService petSitterService;
    private final WcBoardService wcBoardService;
    private final PetSitterApplicantRepository paRepository;
    private final TimeService timeService;

    public ResponseEntity submitPetSitter(Long memberId, Long wcboardId) {
        Member findMember = memberService.findVerifyMember(memberId);
        WcBoard findPost = wcBoardService.findVerifyPost(wcboardId); //wcBoardRepository.finallById(wcboardId);

        findPost.setPostStatus(WcBoard.PostStatus.IN_RESERVATION);

        Member member = memberService.findVerifyMember(memberId);

        Long petSitterId = member.getPetSitter().getPetSitterId();
        PetSitter petSitter = petSitterService.findVerifiedPetSitter(petSitterId);
        Long countPetSitterId = paRepository.countByPetSitter_PetSitterId(petSitterId);


        if (countPetSitterId != 0) {
            List<TimeFilter> timefilter = timeService.getTimeByPetSitterId(petSitterId);
            if (this.checkDupTime(findPost, timefilter)) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else if (hasAlreadyApplied(wcboardId, petSitterId)) {
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

    private boolean checkDupTime(WcBoard wcboard, List<TimeFilter> timeFilterList) {
        LocalDateTime boardStartTime = wcboard.getStartTime();
        LocalDateTime boardEndTime = wcboard.getEndTime();

        return timeFilterList.stream()
                .anyMatch(timeFilter -> isOverlap(boardStartTime, boardEndTime, timeFilter.getStartTIme(), timeFilter.getEndTime()));
    }

    private boolean isOverlap(LocalDateTime start1, LocalDateTime end1, LocalDateTime start2, LocalDateTime end2) {
        return start1.isBefore(end2) && start2.isBefore(end1);
    }
}
