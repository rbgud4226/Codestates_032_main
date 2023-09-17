package com.pettalk.submit.mapper;

import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.submit.entity.PetSitterApplicant;
import com.pettalk.wcboard.dto.WcBoardDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PetSitterApplicantMapper {

    default List<WcBoardDto.petSitterApplicantResponse> petSitterApplicantToPetSitterApplicantResponse (List<PetSitterApplicant> petSitterApplicant){
        if ( petSitterApplicant == null ) {
            return null;
        }

        List<WcBoardDto.petSitterApplicantResponse> list = new ArrayList<WcBoardDto.petSitterApplicantResponse>( petSitterApplicant.size() );
        for ( PetSitterApplicant petSitterApplicant1 : petSitterApplicant ) {
            list.add( petSitterApplicantTopetSitterApplicantResponse( petSitterApplicant1 ) );
        }

        return list;
    }

    private WcBoardDto.petSitterApplicantResponse petSitterApplicantTopetSitterApplicantResponse(PetSitterApplicant petSitterApplicant) {
        if ( petSitterApplicant == null ) {
            return null;
        }

        WcBoardDto.petSitterApplicantResponse petSitterApplicantResponse = new WcBoardDto.petSitterApplicantResponse();
        PetSitter petSitter = petSitterApplicant.getPetSitter();
        petSitterApplicantResponse.setName(petSitter.getName());
        petSitterApplicantResponse.setNowJob(petSitter.getNowJob());
        petSitterApplicantResponse.setSmoking(petSitter.isSmoking());
        petSitterApplicantResponse.setPetSitterImage(petSitter.getPetSitterImage());


        return petSitterApplicantResponse;
    }
}
