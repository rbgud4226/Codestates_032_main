package com.pettalk.wcboard.mapper;

import com.pettalk.wcboard.utils.LocalDateTimeFormatting;
import com.pettalk.member.entity.Member;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.PetSitterApplicant;
import com.pettalk.wcboard.entity.WcBoard;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.pettalk.wcboard.utils.LocalDateTimeFormatting.formatLocalDateTime;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface WcBoardMapper {
//     @Mapping(source = "memberId", target = "member.memberId") // 추후에 member에 맞게 수정
     WcBoard wcBoardPostDtoToWcBoard(WcBoardDto.Post postDto);
     WcBoard wcBoardPatchDtotoWcBoard(WcBoardDto.Patch patchDto);
     //디폴트 구현
     WcBoardDto.PostResponse wcBoardResponseDtoToWcBoard(WcBoard wcBoard);

//     WcBoardDto.GetResponse wcBoardGetResponseDtoToWcBoard (WcBoard wcBoard);

     //디폴트로 구현
//     List<WcBoardDto.Response> wcBoardsResponseDtoToWcBoard (List<WcBoard> wcBoards);



     default WcBoardDto.GetResponse wcBoardGetResponseDtoToWcBoard(WcBoard wcBoard) {
          if ( wcBoard == null ) {
               return null;
          }

          Long wcboardId = null;
          String title = null;
          String content = null;
          String images = null;
          String wcTag = null;
          String animalTag = null;
          String areaTag = null;
          String postStatus = null;
          String startTime = null;
          String endTime = null;
          String createdAt = null;

          wcboardId = wcBoard.getWcboardId();
          title = wcBoard.getTitle();
          content = wcBoard.getContent();
          images = wcBoard.getImages();
          wcTag = wcBoard.getWcTag();
          animalTag = wcBoard.getAnimalTag();
          areaTag = wcBoard.getAreaTag();

          //createdAt 포매팅 적용후 String 타입으로 변환
          createdAt = wcBoard.getCreatedAt();

          if ( wcBoard.getPostStatus() != null ) {
               postStatus = wcBoard.getPostStatus().name();
          }
          //LocalDateTime 형식일 경우 작성
//          if ( wcBoard.getCreatedAt() != null ) {
//               createdAt = DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( wcBoard.getCreatedAt() );
//          }

          String nickName = null;
          Member findMember = wcBoard.getMember();
          nickName = findMember.getNickName();

          WcBoardDto.GetResponse response = new WcBoardDto.GetResponse( wcboardId, title, content, images, wcTag, animalTag, areaTag, postStatus, startTime, endTime, createdAt, nickName );

          return response;
     }

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

     default List<WcBoardDto.Response> wcBoardsResponseDtoToWcBoard(List<WcBoard> wcBoards) {
          if ( wcBoards == null ) {
               return null;
          }

          List<WcBoardDto.Response> list = new ArrayList<WcBoardDto.Response>( wcBoards.size() );
          for ( WcBoard wcBoard : wcBoards ) {
               list.add( wcBoardsResponseDtoToWcBoards( wcBoard ) );
          }

          return list;
     }

     private WcBoardDto.Response wcBoardsResponseDtoToWcBoards(WcBoard wcBoard) {
          if (wcBoard == null) {
               return null;
          }

          WcBoardDto.Response response = new WcBoardDto.Response();
          Member member = wcBoard.getMember();

          response.setWcboardId(wcBoard.getWcboardId());
          response.setTitle(wcBoard.getTitle());
          response.setContent(wcBoard.getContent());
          response.setImages(wcBoard.getImages());
          response.setWcTag(wcBoard.getWcTag());
          response.setAnimalTag(wcBoard.getAnimalTag());
          response.setAreaTag(wcBoard.getAreaTag());
          response.setStartTime(formatLocalDateTime(wcBoard.getStartTime()));
          response.setEndTime(formatLocalDateTime(wcBoard.getEndTime()));
          response.setPostStatus(wcBoard.getPostStatus().name());
          response.setCreatedAt(wcBoard.getCreatedAt());
          response.setNickName(member.getNickName());

          return response;
     }




}
