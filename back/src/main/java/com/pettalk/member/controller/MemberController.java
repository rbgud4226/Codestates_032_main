package com.pettalk.member.controller;

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
    public ResponseEntity logout() {
        try {
            memberService.logoutAndRemoveRefreshToken();
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
    public ResponseEntity memberGet(){
        try {
            GetMemberDto getMemberDto = memberService.getMember();
            return new ResponseEntity<>(getMemberDto, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/gets")
    public ResponseEntity getMemberBoards() {
        try {
            List<WcBoardDto.Response> wcBoardDtoResponses = memberService.getMembers();
            return new ResponseEntity<>(wcBoardDtoResponses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PatchMapping
    public ResponseEntity memberupdate(@RequestBody PatchMemberDto requestBody){
        try {
            Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));
            return new ResponseEntity<>("\"nickname\" : \"" + requestBody.getNickName(), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping
    public ResponseEntity memberDelete() {
        try {
            memberService.deleteMember();
            return new ResponseEntity<>("회원 탈퇴가 완료되었습니다", HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
  }