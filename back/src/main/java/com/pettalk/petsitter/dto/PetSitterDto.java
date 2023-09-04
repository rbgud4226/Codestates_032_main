package com.pettalk.petsitter.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class PetSitterDto {

    @Getter
    @Setter
    public static class PostDto {

        private long pet_sitter_id;

//        private long member_id;

        @NotBlank(message = "자기소개를 작성해 주세요.")
        private String introduce;

        @NotBlank(message = "현재 하시는 일을 작성해주세요.")
        private String now_job;

        @NotNull(message = "흡연 여부를 체크해주세요.")
        private boolean smoking;

        private List<String> exAnimal; //맡아본 적 있는 동물.

        @NotBlank(message = "반려 경험 및 경력을 작성해주세요.")
        @Size(max = 200, message = "최대 200자까지 작성 가능합니다.")
        private String info; //케어 경험 혹은 경력 200자 이내

        private String created_at;
    }

    @Getter
    @Setter
    public static class PatchDto {

        private long pet_sitter_id;

        @NotBlank(message = "자기소개를 작성해 주세요.")
        private String introduce;

        @NotBlank(message = "현재 하시는 일을 작성해주세요.")
        private String now_job;

        @NotNull(message = "흡연 여부를 체크해주세요.")
        private boolean smoking;

        private List<String> exAnimal; //맡아본 적 있는 동물.

        @NotBlank(message = "반려 경험 및 경력을 작성해주세요.")
        @Size(max = 200, message = "최대 200자까지 작성 가능합니다.")
        private String info; //케어 경험 혹은 경력 200자 이내

        private String created_at;

    }

    @Getter
    @Setter
    public static class ResponseDto {

        private long pet_sitter_id;

//        private long member_id;

        private String introduce;

        private String now_job;

        private boolean smoking;

        private List<String> exAnimal; //맡아본 적 있는 동물.

        private String info; //케어 경험 혹은 경력 200자 이내

        private String created_at;

    }

//    @Getter
//    @Setter
//    public static class ResentCareDto {
//
//        private List<String> WcBoard;
//
//    }
}
