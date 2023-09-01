package com.pettalk.petsitter.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PetSitterDto {

    @Getter
    @Setter
    public static class PostDto {

        private long pet_sitter_id;

//        private long member_id;

        @NotBlank(message = "현재 하시는 일을 작성해주세요.")
        private String now_job;

        @NotNull(message = "흡연 여부를 체크해주세요.")
        private boolean smoking;

        @NotBlank(message = "반려 경험 및 경력을 작성해주세요.")
        private String info;

        @NotBlank(message = "지원동기를 작성해주세요.")
        private String motive;

        private String created_at;
    }

    @Getter
    @Setter
    public static class PatchDto {

        private long pet_sitter_id;

        @NotBlank(message = "현재 하시는 일을 작성해주세요.")
        private String now_job;

        @NotNull(message = "흡연 여부를 체크해주세요.")
        private boolean smoking;

        @NotBlank(message = "현재 하시는 일을 작성해주세요.")
        private String info;

        @NotBlank(message = "현재 하시는 일을 작성해주세요.")
        private String motive;

    }

    @Getter
    @Setter
    public static class ResponseDto {

        private long pet_sitter_id;

//        private long member_id;

        private String now_job;

        private boolean smoking;

        private String info;

        private String motive;

        private String created_at;

    }
}
