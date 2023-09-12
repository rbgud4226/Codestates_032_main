package com.pettalk.petsitter.dto;

import com.pettalk.wcboard.dto.WcBoardDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.ElementCollection;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
//import com.pettalk.petsitter.entity.ExAnimal;

public class PetSitterDto {

//    private final List<WcBoardDto.Response> wcBoardDtoGet;
//
//    public GetPetSitterDto(String nickName, String email, String phone, String profileImage, List<WcBoardDto.Response> wcBoardDtoGet) {
//        this.nickName = nickName;
//        this.email = email;
//        this.phone = phone;
//        this.profileImage = profileImage;
//        this.wcBoardDtoGet = wcBoardDtoGet;
//    }


    @Getter
    @Setter
    public static class PostDto {

        private long petSitterId;

//        private long memberId;

        @NotBlank(message = "이름을 적어주세요.")
        private String name;

        @NotBlank(message = "자기소개를 작성해 주세요.")
        private String introduce;

        @NotNull(message = "현재 직업을 선택해주세요.")
        private String nowJob;

        @NotNull(message = "흡연 여부를 체크해주세요.")
        private boolean smoking;
//        private boolean Cat;
//        private boolean Dog;
//        private boolean Other;

        private List<String> exAnimal; //맡아본 적 있는 동물.

        @NotBlank(message = "반려 경험 및 경력을 작성해주세요.")
        @Size(max = 200, message = "최대 200자까지 작성 가능합니다.")
        private String info; //케어 경험 혹은 경력 200자 이내

        private LocalDateTime createdAt;
    }



    @Getter
    @Setter
    public static class PatchDto {

        private long petSitterId;

        @NotBlank(message = "이름을 적어주세요.")
        private String name;

        @NotBlank(message = "자기소개를 작성해 주세요.")
        private String introduce;

        @NotBlank(message = "현재 직업을 선택해주세요.")
        private String nowJob;

        @NotNull(message = "흡연 여부를 체크해주세요.")
        private boolean smoking;
//        private boolean Cat;
//        private boolean Dog;
//        private boolean Other;

        private List<String> exAnimal; //맡아본 적 있는 동물.

        @NotBlank(message = "반려 경험 및 경력을 작성해주세요.")
        @Size(max = 200, message = "최대 200자까지 작성 가능합니다.")
        private String info; //케어 경험 혹은 경력 200자 이내

    }

    @Getter
    @Setter
    public static class ResponseDto {

        private long petSitterId;

//        private long memberId;

        private String name;

        private String introduce;

        private String nowJob;

        private boolean smoking;
//        private boolean Cat;
//        private boolean Dog;
//        private boolean Other;

        private List<String> exAnimal; //맡아본 적 있는 동물.

        private String info; //케어 경험 혹은 경력 200자 이내

        private LocalDateTime createdAt;

    }
    @AllArgsConstructor
    @Getter
    public static class multiResponse{
        private Long wcboardId;
        private String wcTag;
        private String nickName;
        private String startTime;
        private String endTime;
        private String memberImage;
    }
}
