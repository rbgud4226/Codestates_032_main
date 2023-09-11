package com.pettalk.petsitter.mapper;


import com.pettalk.petsitter.dto.PetSitterDto;
import com.pettalk.petsitter.entity.PetSitter;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface PetSitterMapper {
    PetSitter postToPetSitter(PetSitterDto.PostDto postDto);
    PetSitter patchToPetSitter(PetSitterDto.PatchDto patchDto);
    PetSitterDto.ResponseDto petSitterToResponse(PetSitter petSitter);
}
