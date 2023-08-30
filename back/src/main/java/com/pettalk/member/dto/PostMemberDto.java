package com.pettalk.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class PostMemberDto {
    @NotNull
    private String nickName;

    @Email(message = "유효한 이메일 형식이 아닙니다.")
    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$")
    private String phone;

    @NotNull
    private String profileImage;
}
