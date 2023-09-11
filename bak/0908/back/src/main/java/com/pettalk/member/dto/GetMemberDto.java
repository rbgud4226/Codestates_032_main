package com.pettalk.member.dto;

import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class GetMemberDto {
    @NotBlank
    private String nickName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String profileImage;

    private List<WcBoardDto.Response> wcBoardDtoGet;

    public GetMemberDto(String nickName, String email, String phone, String profileImage, List<WcBoardDto.Response> wcBoardDtoGet) {
        this.nickName = nickName;
        this.email = email;
        this.phone = phone;
        this.profileImage = profileImage;
        this.wcBoardDtoGet = wcBoardDtoGet;
    }
}
