package com.pettalk.submit.controller;

import com.pettalk.argumentresolver.LoginMemberId;
import com.pettalk.member.service.MemberService;
import com.pettalk.submit.dto.TimeFilter;
import com.pettalk.submit.entity.PetSitterApplicant;
import com.pettalk.submit.mapper.PetSitterApplicantMapper;
import com.pettalk.submit.service.PetSitterApplicantService;
import com.pettalk.submit.service.TimeService;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.service.WcBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/submit")
@RequiredArgsConstructor
@Slf4j
public class PetSitterApplicantController {
    private final PetSitterApplicantMapper mapper;
    private final PetSitterApplicantService service;
    private final TimeService timeService;
    private final MemberService memberService;

    //게시글에 펫시터 신청
    @PostMapping("/{wcboard-id}")
    public ResponseEntity PetSitterSubmit(@LoginMemberId Long memberId,
                                          @Positive @PathVariable("wcboard-id") Long wcboardId) {
        return service.submitPetSitter(memberId, wcboardId);
    }

    //신청자 조회
    @GetMapping("/{wcboard-id}")
    public ResponseEntity getPetSitterApplicant(@PathVariable("wcboard-id") @Positive Long wcboardId){
//        WcBoard findPost = findVerifyPost(wcboardId);
//        memberService.findNickName(findPost.getMember().getMemberId());

        List<PetSitterApplicant> petSitterApplicantList = service.findApplicantPetsitter(wcboardId);
        return new ResponseEntity<>(mapper.petSitterApplicantToPetSitterApplicantResponse(petSitterApplicantList), HttpStatus.OK);
    }

    //시간 방어로


}
