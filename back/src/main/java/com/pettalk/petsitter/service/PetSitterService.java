package com.pettalk.petsitter.service;


import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.member.entity.Member;
import com.pettalk.member.repository.MemberRepository;
import com.pettalk.member.service.MemberDetailService;
import com.pettalk.member.service.MemberService;
import com.pettalk.petsitter.dto.PetSitterDto;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.mapper.PetSitterMapper;
import com.pettalk.petsitter.repository.PetSitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PetSitterService {

    private final PetSitterRepository petSitterRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public PetSitter createPetSitter(PetSitter petSitter) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();
        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCESS_DENIED));

        petSitter.setMember(findMember);
        petSitter.setPetSitterId(petSitter.getPetSitterId());
        petSitter.setIntroduce(petSitter.getIntroduce());
        petSitter.setNowJob(petSitter.getNowJob());
        petSitter.setSmoking(petSitter.isSmoking());
        petSitter.setExAnimal(petSitter.getExAnimal());
        petSitter.setInfo(petSitter.getInfo());
        petSitter.setCreatedAt(LocalDateTime.now());

        PetSitter savedPetSitter = petSitterRepository.save(petSitter);

        return savedPetSitter;
    }

//    public PetSitter updatePetSitter(PetSitter petSitter) {
//
//        PetSitter findPetSitter = findVerifiedPetSitter(petSitter.getPetSitterId());
//        Member findMember = memberRepository.findById(petSitter.getMember().getMemberId())
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//
//        petSitter.setMember(findMember);
//        petSitter.setPetSitterId(findPetSitter.getPetSitterId());
//
//        return petSitter;
//    }

    @Transactional(readOnly = true)
    public PetSitter findVerifiedPetSitter(long petSitterId) {
        Optional<PetSitter> optionalPetSitter = petSitterRepository.findById(petSitterId);

        PetSitter findPetSitter = optionalPetSitter
        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));

        return findPetSitter;
    }

    public PetSitter findPetSitter(long petSitterId) {

        PetSitter findPetSitter = verifyExistPetSitter(petSitterId);

        return findPetSitter;
    }

    private PetSitter verifyExistPetSitter(long petSitterId) {

        PetSitter petSitter = petSitterRepository.findById(petSitterId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));

        return petSitter;
    }

    private Member verifyExistMemberId(long memberId) {
        Member existingMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return existingMember;
    }

}
