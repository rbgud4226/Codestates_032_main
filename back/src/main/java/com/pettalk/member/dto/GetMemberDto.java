package com.pettalk.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
@Getter
@Setter
public class GetMemberDto {
    @NotNull
    private String nickName;

    @Email
    @NotNull
    private String email;

    @NotNull
    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$")
    private String phone;

    @NotNull
    private String profileImage;
}
