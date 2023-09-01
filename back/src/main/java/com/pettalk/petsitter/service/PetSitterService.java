package com.pettalk.petsitter.service;


import com.pettalk.exception.BusinessLogicException;
import com.pettalk.exception.ExceptionCode;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.mapper.PetSitterMapper;
import com.pettalk.petsitter.repository.PetSitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PetSitterService {

    @Autowired
    private final PetSitterRepository petSitterRepository;

//    private final MemberService memberService;


    public PetSitter createPetSitter(PetSitter petSitter) {
        //TODO:Member쪽 작성 필요.
//        Member findMember = memberService.findVerifiedMember(petSitter.getMember().getMemberId());
//        petSitter.setMember(findMember);
//        findMember.getPetSitter().add(petSitter);

        return petSitterRepository.save(petSitter);
    }

    public PetSitter updatePetSitter(PetSitter petSitter) {

        PetSitter findPetSitter = findVerifiedPetSitter(petSitter.getPetSitterId());

        return findPetSitter;
    }

    @Transactional(readOnly = true)
    public PetSitter findVerifiedPetSitter(long petSitterId) {
        Optional<PetSitter> optionalPetSitter = petSitterRepository.findById(petSitterId);


        PetSitter findPetSitter = optionalPetSitter
        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

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
}
