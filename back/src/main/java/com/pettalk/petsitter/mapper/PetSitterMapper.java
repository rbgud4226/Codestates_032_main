package com.pettalk.petsitter.mapper;

import com.pettalk.petsitter.dto.PetSitterDto;
import com.pettalk.petsitter.entity.PetSitter;
import org.springframework.stereotype.Component;

@Component
public class PetSitterMapper {

    public PetSitter postToPetSitter(PetSitterDto.PostDto postDto) {
        if(postDto == null) {
            return null;
        }
        else {
            PetSitter petSitter = new PetSitter();
//            petSitter.setPetSitterId(postToPetSitter(postDto));
            petSitter.setInfo(postDto.getInfo());
            petSitter.setNowJob(postDto.getNow_job());

            return petSitter;
        }
    }

    public PetSitter patchToPetSitter(PetSitterDto.PatchDto patchDto) {
        if(patchDto == null) {
            return null;
        }
        else {
            PetSitter petsitter = new PetSitter();
            petsitter.setSmoking(patchDto.isSmoking());
            petsitter.setInfo(patchDto.getInfo());
            petsitter.setNowJob(patchDto.getNow_job());
            petsitter.setMotive(patchDto.getMotive());

            return petsitter;
        }
    }

    public PetSitterDto.ResponseDto petSitterToResponse(PetSitter petSitter) {
        if(petSitter == null) {
            return null;
        }
        else {
            PetSitterDto.ResponseDto responseDto = new PetSitterDto.ResponseDto();
//            responseDto.setMember_id(petSitter.getMember().getMemberId);
            responseDto.setPet_sitter_id(petSitter.getPetSitterId());
            responseDto.setNow_job(petSitter.getNowJob());
            responseDto.setSmoking(petSitter.isSmoking());
            responseDto.setInfo(petSitter.getInfo());
            responseDto.setMotive(petSitter.getMotive());
            responseDto.setCreated_at(petSitter.getCreatedAt());

            return responseDto;
        }

    }

}
