package com.pettalk.member.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.dto.GetMemberDto;
import com.pettalk.member.entity.Member;
import com.pettalk.member.entity.RefreshToken;
import com.pettalk.member.mapper.MemberMapper;
import com.pettalk.member.repository.MemberRepository;
import com.pettalk.member.repository.RefreshTokenRepository;
import com.pettalk.utils.CustomAuthorityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberMapper mapper;
    private final RefreshTokenRepository refreshTokenRepository;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils, MemberMapper mapper, RefreshTokenRepository refreshTokenRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = customAuthorityUtils;
        this.mapper = mapper;
        this.refreshTokenRepository = refreshTokenRepository;

    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        String encrytedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encrytedPassword);
//        List<String> roles = authorityUtils.createRoles(member.getEmail());  //DB에 유저 ROLE 저장
//        member.setRoles(roles);
        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    public Member updateMember(Member member) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();

        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if (member.getNickName().trim().length() <= 3) {
            throw new RuntimeException("닉네임이 NULL값 입니다");
        } else {
            Optional.ofNullable(member.getNickName().trim()).ifPresent(nickName -> findMember.setNickName(nickName));
        }
        return memberRepository.save(findMember);
    }

    public GetMemberDto getMember(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return mapper.memberToGetMemberDto(findMember);
    }

    public void deleteMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        memberRepository.delete(findMember);
    }

    private boolean verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    public void logoutAndRemoveRefreshToken() {
        // 현재 사용자 인증 정보를 가져옵니다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();

        // 이메일로 회원 정보를 찾습니다.
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 해당 회원과 연관된 refreshToken을 찾습니다.
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByMember(findMember);

        // refreshToken이 있으면 삭제합니다.
        refreshTokenOptional.ifPresent(refreshToken -> {
            refreshTokenRepository.delete(refreshToken);
        });

        // 기타 로그아웃 관련 처리를 수행합니다. 예를 들어, SecurityContext를 클리어하는 등
        SecurityContextHolder.clearContext();
    }
}
