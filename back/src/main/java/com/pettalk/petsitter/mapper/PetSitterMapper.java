package com.pettalk.petsitter.mapper;


import com.pettalk.petsitter.dto.PetSitterDto;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface PetSitterMapper {
    PetSitter postToPetSitter(PetSitterDto.PostDto postDto);
    PetSitter patchToPetSitter(PetSitterDto.PatchDto patchDto);
    PetSitterDto.ResponseDto petSitterToResponse(PetSitter petSitter);
    List<PetSitterDto.multiResponse> wcBoardstoPetSitterMultiDto (List<WcBoard> wcBoards);
}
