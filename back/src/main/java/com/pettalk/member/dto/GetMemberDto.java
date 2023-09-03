package com.pettalk.member.dto;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class GetMemberDto {
    @NotNull
    private String nickName;

    @Email
    @NotNull
    private String email;

    @NotNull
    private String phone;

    @NotNull
    private String profileImage;
}
