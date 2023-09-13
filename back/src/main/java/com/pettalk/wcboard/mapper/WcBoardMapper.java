package com.pettalk.wcboard.mapper;

import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.PetSitterApplicant;
import com.pettalk.wcboard.entity.WcBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface WcBoardMapper {
//     @Mapping(source = "memberId", target = "member.memberId") // 추후에 member에 맞게 수정
     WcBoard wcBoardPostDtoToWcBoard(WcBoardDto.Post postDto);
     WcBoard wcBoardPatchDtotoWcBoard(WcBoardDto.Patch patchDto);
     //     WcBoard WcBoardToWcBoardSubmitDto(WcBoardDto.SubmitResponse submitResponse);
     WcBoardDto.Response wcBoardResponseDtoToWcBoard(WcBoard wcBoard);
     List<WcBoardDto.Response> wcBoardsResponseDtoToWcBoard (List<WcBoard> wcBoards);

//     default WcBoardDto.SubmitResponse submitDtoToWcBoard (WcBoard wcBoard) {
//          WcBoardDto.SubmitResponse submitResponse =
//                  WcBoardDto.SubmitResponse.builder()
//                          .wcboardId(wcBoard.getWcboardId())
//                          .petSitterId(wcBoard.getPetSitter().getPetSitterId())
//                          .name(wcBoard.getPetSitter().getName())
//                          .nowJob(wcBoard.getPetSitter().getNowJob())
//                          .petSitterImage(wcBoard.getPetSitter().getPetSitterImage())
//                          .smoking(wcBoard.getPetSitter().isSmoking())
//                          .submitTime(LocalDateTime.now())
//                          .build();
//          return submitResponse;
//     }

     //엔티티 생성으로 인한 PetSitterApplicant 수동 매핑
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
