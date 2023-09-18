package com.pettalk.member.dto;

import com.pettalk.wcboard.dto.WcBoardDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class GetMembersDto {
    private List<WcBoardDto.getMemberResponse> wcBoardList;
    private long totalBoard;

    public GetMembersDto(List<WcBoardDto.getMemberResponse> wcBoardList, long totalBoard) {
        this.wcBoardList = wcBoardList;
        this.totalBoard = totalBoard;
    }
}
