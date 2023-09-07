package com.pettalk.member.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.dto.GetMemberDto;
import com.pettalk.member.entity.Member;
import com.pettalk.member.entity.RefreshToken;
import com.pettalk.member.mapper.MemberMapper;
import com.pettalk.member.repository.MemberRepository;
import com.pettalk.member.repository.RefreshTokenRepository;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.repository.WcBoardRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberMapper membermapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final WcBoardRepository wcBoardRepository;
    private final WcBoardMapper wcBoardMapper;



    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, MemberMapper membermapper, RefreshTokenRepository refreshTokenRepository,WcBoardRepository wcBoardRepository, WcBoardMapper wcBoardMapper) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.membermapper = membermapper;
        this.refreshTokenRepository = refreshTokenRepository;
        this.wcBoardRepository = wcBoardRepository;
        this.wcBoardMapper = wcBoardMapper;

    }
    public Member createMember(Member member) {
        if(verifyExistsEmail(member.getEmail())){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        };
        String encrytedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encrytedPassword);;
        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    private boolean verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }


    public Member updateMember(Member member) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();

        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCESS_DENIED));
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
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() ->  new BusinessLogicException(ExceptionCode.ACCESS_DENIED));
        GetMemberDto memberDtoGet = membermapper.memberToGetMemberDto(findMember);
        return memberDtoGet;
    }
    // 진짜

    public List<WcBoardDto.Response> getMembers(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() ->  new BusinessLogicException(ExceptionCode.ACCESS_DENIED));
        List<WcBoardDto.Response> wcBoardDtoGet = wcBoardMapper.wcBoardsResponseDtoToWcBoard(wcBoardRepository.findByMember_MemberId(findMember.getMemberId()));
        return wcBoardDtoGet;

    }


    public void deleteMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCESS_DENIED));
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByMember(findMember);
        refreshTokenOptional.ifPresent(refreshToken -> {
            refreshTokenRepository.delete(refreshToken);
        });
        memberRepository.delete(findMember);
    }

    public void logoutAndRemoveRefreshToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCESS_DENIED));
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByMember(findMember);
        refreshTokenOptional.ifPresent(refreshToken -> {
            refreshTokenRepository.delete(refreshToken);
        });
        SecurityContextHolder.clearContext(); // 기타 로그아웃 관련 처리를 수행합니다. 예를 들어, SecurityContext를 클리어하는 등
    }

    public Member findMemberByEmail(String memberEmail) {
        return memberRepository.findByEmail(memberEmail).get();
    }

}
