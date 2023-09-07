package com.pettalk.member.controller;

import com.pettalk.argumentresolver.LoginMemberId;
import com.pettalk.member.dto.GetMemberDto;
import com.pettalk.member.dto.PatchMemberDto;
import com.pettalk.member.dto.PostMemberDto;
import com.pettalk.member.entity.Member;
import com.pettalk.member.mapper.MemberMapper;
import com.pettalk.member.repository.MemberRepository;
import com.pettalk.member.service.MemberService;
import com.pettalk.wcboard.dto.WcBoardDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated

public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;
    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@LoginMemberId Long memberId) {
        try {
            memberService.logoutAndRemoveRefreshToken(memberId);
            return new ResponseEntity<>("로그아웃 완료되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping
    public ResponseEntity memberSignUp(@Valid @RequestBody PostMemberDto requestBody) {
        try {
            Member member = memberService.createMember(mapper.memberPostToMember(requestBody));
            return new ResponseEntity<>("회원가입 완료되었습니다", HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping
    public ResponseEntity memberGet(@LoginMemberId Long memberId){
        try {
            GetMemberDto getMemberDto = memberService.getMember(memberId);
            return new ResponseEntity<>(getMemberDto, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/recent")
    public ResponseEntity getMemberBoards(@LoginMemberId Long memberId) {
        try {
            List<WcBoardDto.Response> wcBoardDtoResponses = memberService.getMembers(memberId);
            return new ResponseEntity<>(wcBoardDtoResponses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PatchMapping
    public ResponseEntity memberupdate(@RequestBody PatchMemberDto requestBody,
                                       @LoginMemberId Long memberId){
        try {
            Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody), memberId);
            return new ResponseEntity<>("\"nickname\" : \"" + requestBody.getNickName(), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping
    public ResponseEntity memberDelete(@LoginMemberId Long memberId) {
        try {
            memberService.deleteMember(memberId);
            return new ResponseEntity<>("회원 탈퇴가 완료되었습니다", HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
  }
