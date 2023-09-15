package com.pettalk.member.service;

import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.dto.GetMemberDto;
import com.pettalk.member.entity.Member;
import com.pettalk.member.entity.RefreshToken;
import com.pettalk.member.mapper.MemberMapper;
import com.pettalk.member.repository.MemberRepository;
import com.pettalk.member.repository.RefreshTokenRepository;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
//import com.pettalk.wcboard.mapper.WcBoardMapperImpl;
import com.pettalk.wcboard.repository.WcBoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.*;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberMapper membermapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final WcBoardRepository wcBoardRepository;
    private final WcBoardMapper wcBoardMapper;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, MemberMapper membermapper, RefreshTokenRepository refreshTokenRepository, WcBoardRepository wcBoardRepository, WcBoardMapper wcBoardMapper) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.membermapper = membermapper;
        this.refreshTokenRepository = refreshTokenRepository;
        this.wcBoardRepository = wcBoardRepository;
        this.wcBoardMapper = wcBoardMapper;


    }

    public Member createMember(Member member) {
        if (verifyExistsEmail(member.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
        ;
        String encrytedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encrytedPassword);
        ;
        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    private boolean verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    public Member updateMember(Member member, Long memberId) {

        Member findMember = findVerifyMember(memberId);
        if (member.getNickName().trim().length() <= 3) {
            throw new RuntimeException("닉네임이 NULL값 입니다");
        } else {
            Optional.ofNullable(member.getNickName().trim()).ifPresent(nickName -> findMember.setNickName(nickName));
        }
        return memberRepository.save(findMember);
    }


    public GetMemberDto getMember(Long memberId, int page, int size) {
        Member findMember = findVerifyMember(memberId);
        boolean checkPetSitter = findMember.getPetSitter() != null;

        Long petSitterId = null;
        String petSitterProfileImage = null;
        if (checkPetSitter) {
            petSitterId = findMember.getPetSitter().getPetSitterId();
            petSitterProfileImage = findMember.getPetSitter().getMember().getProfileImage();
        }
        Pageable pageable = PageRequest.of(page-1, size);
        List<WcBoard.PostStatus> wcBoardStatus = Arrays.asList(WcBoard.PostStatus.COMPLETE);
        Page<WcBoard> wcBoards = wcBoardRepository.findByMember_MemberIdAndPostStatusIn(findMember.getMemberId(), wcBoardStatus, pageable);

        List<WcBoardDto.Response> wcBoardDtoGet = wcBoardMapper.wcBoardsResponseDtoToWcBoard(wcBoards.getContent());
        Collections.sort(wcBoardDtoGet, Comparator.comparing(WcBoardDto.Response::getStartTime).reversed());
        return new GetMemberDto(findMember.getNickName(), findMember.getEmail(), findMember.getPhone(), findMember.getProfileImage(), wcBoardDtoGet, checkPetSitter, petSitterId);
    }

    public List<WcBoardDto.Response> getMembers(Long memberId, int page, int size) {
        Member findMember = findVerifyMember(memberId);

        Pageable pageable = PageRequest.of(page - 1, size);
        List<WcBoard.PostStatus> wcBoardStatus = Arrays.asList(WcBoard.PostStatus.COMPLETE, WcBoard.PostStatus.IN_PROGRESS);
        Page<WcBoard> wcBoards = wcBoardRepository.findByMember_MemberIdAndPostStatusIn(findMember.getMemberId(), wcBoardStatus, pageable);

        List<WcBoardDto.Response> wcBoardDtoGet = wcBoardMapper.wcBoardsResponseDtoToWcBoard(wcBoards.getContent());
        Collections.sort(wcBoardDtoGet, Comparator.comparing(WcBoardDto.Response::getStartTime).reversed());
        return wcBoardDtoGet;
    }

    public void deleteMember(Long memberId) {
        Member findMember = findVerifyMember(memberId);
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByMember(findMember);
        refreshTokenOptional.ifPresent(refreshToken -> {
            refreshTokenRepository.delete(refreshToken);
        });
        memberRepository.delete(findMember);
    }

    public void logoutAndRemoveRefreshToken(Long memberId) {
        Member findMember = findVerifyMember(memberId);
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByMember(findMember);
        refreshTokenOptional.ifPresent(refreshToken -> {
            refreshTokenRepository.delete(refreshToken);
        });
        SecurityContextHolder.clearContext(); // 기타 로그아웃 관련 처리를 수행합니다. 예를 들어, SecurityContext를 클리어하는 등
    }

    public Member findVerifyMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if(optionalMember.isEmpty()){
            return null;
        }

        return optionalMember.get();
    }

    public Member findMemberByPrincipal(String principal) {
        Optional<Member> optionalMember = memberRepository.findByEmailOrKakaoId(principal, principal);
        if (!optionalMember.isPresent()) {
            return null;
        }
        Member member = optionalMember.get();
        return member;
    }

    public Member findVerifyNickName (Long memberId) {
        Optional<Member> optionalNickName = memberRepository.findById(memberId);

        Member findMembersNickName =
                optionalNickName.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMembersNickName;
    }

    public Member findNickName(Long memberId) { return findVerifyNickName(memberId); }

}
