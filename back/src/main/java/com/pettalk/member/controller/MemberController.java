package com.pettalk.member.controller;

import com.pettalk.member.dto.GetMemberDto;
import com.pettalk.member.dto.PatchMemberDto;
import com.pettalk.member.dto.PostMemberDto;
import com.pettalk.member.entity.Member;
import com.pettalk.member.mapper.MemberMapper;
import com.pettalk.member.service.MemberService;
import com.pettalk.sms.service.SmsService;
import org.springframework.data.domain.Page;
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
    private final PasswordEncoder passwordEncoder;
    private final SmsService smsService;

    public MemberController(MemberService memberService, MemberMapper mapper, PasswordEncoder passwordEncoder, SmsService smsService) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.smsService = smsService;
    }

    @PostMapping("/test") //일반회원가입 테스트
    public ResponseEntity membertestSignUp(@Valid @RequestBody PostMemberDto requestBody) {
        try {
            Member member = memberService.createMember(mapper.memberPostToMember(requestBody));
            return new ResponseEntity<>("회원가입 완료되었습니다", HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        try {
            memberService.logoutAndRemoveRefreshToken(); // refreshToken 삭제 및 로그아웃 처리
            return new ResponseEntity<>("로그아웃 완료되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping
    public ResponseEntity memberSignUp(@Valid @RequestBody PostMemberDto requestBody) {
        try {
            Member tempMember = mapper.memberPostToMember(requestBody);
            String encryptedPassword = passwordEncoder.encode(tempMember.getPassword());
            tempMember.setPassword(encryptedPassword);
            smsService.cacheMemberInfo(tempMember);

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

    @GetMapping("/{page}/{size}")
    public ResponseEntity<?> memberGets(@PathVariable int page, @PathVariable int size){
        try {
            if (page < 0) {
                page = 0;
            }
            Page<Member> pageMembers = memberService.getMembers(page,size);
            List<Member> members = pageMembers.getContent();
            return new ResponseEntity<>(members, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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