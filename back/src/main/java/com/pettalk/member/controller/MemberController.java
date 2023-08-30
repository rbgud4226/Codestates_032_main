package com.pettalk.member.controller;

import com.pettalk.member.dto.GetMemberDto;
import com.pettalk.member.dto.PatchMemberDto;
import com.pettalk.member.dto.PostMemberDto;
import com.pettalk.member.entity.Member;
import com.pettalk.member.mapper.MemberMapper;
import com.pettalk.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity<?> logout() {
        try {
            memberService.logoutAndRemoveRefreshToken(); // refreshToken 삭제 및 로그아웃 처리
            return new ResponseEntity<>("로그아웃 완료되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity memberSignUp(@Valid @RequestBody PostMemberDto requestBody) {
        Member member = memberService.createMember(mapper.memberPostToMember(requestBody));
        return new ResponseEntity<>("회원가입 완료되었습니다", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<GetMemberDto> memberGet(){
       GetMemberDto getMemberDto = memberService.getMember();
        return new ResponseEntity<>(getMemberDto,HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity memberupdate(@RequestBody PatchMemberDto requestBody){
            Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));
        return new ResponseEntity<>("\"nickname\" : \"" + requestBody.getNickName(), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity memberDelete() {
            memberService.deleteMember();
            return new ResponseEntity <>("회원 탈퇴가 완료되었습니다", HttpStatus.OK);
    }
  }