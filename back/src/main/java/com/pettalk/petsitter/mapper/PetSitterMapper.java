package com.pettalk.petsitter.mapper;

import com.pettalk.petsitter.dto.PetSitterDto;
import com.pettalk.petsitter.entity.PetSitter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PetSitterMapper {

    public PetSitter postToPetSitter(PetSitterDto.PostDto postDto) {
        if(postDto == null) {
            return null;
        }
        else {
            PetSitter petSitter = new PetSitter();
//            petSitter.setPetSitterId(postToPetSitter(postDto));
            petSitter.setIntroduce(postDto.getIntroduce());
            petSitter.setNowJob(postDto.getNow_job());
            petSitter.setSmoking(postDto.isSmoking());
            petSitter.setExAnimal(postDto.getExAnimal());
            petSitter.setInfo(postDto.getInfo());
            petSitter.setCreatedAt(LocalDateTime.now());


            return petSitter;
        }
    }

    public PetSitter patchToPetSitter(PetSitterDto.PatchDto patchDto) {
        if(patchDto == null) {
            return null;
        }
        else {
            PetSitter petSitter = new PetSitter();
            petSitter.setIntroduce(patchDto.getIntroduce());
            petSitter.setNowJob(patchDto.getNow_job());
            petSitter.setSmoking(patchDto.isSmoking());
            petSitter.setExAnimal(patchDto.getExAnimal());
            petSitter.setInfo(patchDto.getInfo());

            return petSitter;
        }
    }

    public PetSitterDto.ResponseDto petSitterToResponse(PetSitter petSitter) {
        if(petSitter == null) {
            return null;
        }
        else {
            PetSitterDto.ResponseDto responseDto = new PetSitterDto.ResponseDto();
//            responseDto.setMember_id(petSitter.getMember().getMemberId);
            responseDto.setIntroduce(petSitter.getIntroduce());
            responseDto.setNow_job(petSitter.getNowJob());
            responseDto.setSmoking(petSitter.isSmoking());
            responseDto.setExAnimal(petSitter.getExAnimal());
            responseDto.setInfo(petSitter.getInfo());
            responseDto.setCreated_at(petSitter.getCreatedAt());

            return responseDto;
        }
    }
}
