package com.pettalk.wcboard.mapper;

import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface WcBoardMapper {
//     @Mapping(source = "memberId", target = "member.memberId") // 추후에 member에 맞게 수정
     WcBoard wcBoardPostDtoToWcBoard(WcBoardDto.Post postDto);
     WcBoard wcBoardPatchDtotoWcBoard(WcBoardDto.Patch patchDto);
//     @Mapping(source = "", target = "")
     WcBoardDto.Response wcBoardResponseDtoToWcBoard(WcBoard wcBoard);
     List<WcBoardDto.Response> wcBoardsResponseDtoToWcBoard (List<WcBoard> wcBoards);
}
