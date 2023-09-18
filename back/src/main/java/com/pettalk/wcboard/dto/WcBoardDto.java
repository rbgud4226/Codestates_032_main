package com.pettalk.wcboard.dto;

import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.entity.WcBoard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class WcBoardDto {
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post {
        private Long wcboardId;
        @NotNull (message = "공백이 아니어야 합니다")
        private String title;

        @NotNull (message = "공백이 아니어야 합니다")
        private String content;

        private String images;

        @NotNull (message = "1개 이상 선택해주세요")
        private String wcTag;

        @NotNull (message = "1개 이상 선택해주세요")
        private String animalTag;

        @NotNull (message = "1개 이상 선택해주세요")
        private String areaTag;

        private String startTime;
        private String endTime;
        private String postStatus;
        private String createdAt;

    }
    @AllArgsConstructor
    @Getter
    public static class Patch {
        private Long wcboardId;
        private String title;
        private String content;
        private String images;
        private String wcTag;
        private String animalTag;
        private String areaTag;
        private String startTime;
        private String endTime;
        private String postStatus;
        public void addwcBoardId(Long wcboardId) {
            this.wcboardId = wcboardId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class PostResponse {
        private Long wcboardId;
        private String title;
        private String content;
        private String images;
        private String wcTag;
        private String animalTag;
        private String areaTag;
        private String startTime;
        private String endTime;
        private String postStatus;
    }




    @Getter
    @Setter
    public static class Response {
        private Long wcboardId;
        private String title;
        private String content;
        private String images;
        private String wcTag;
        private String animalTag;
        private String areaTag;
        private String postStatus;
        private String startTime;
        private String endTime;
        private String createdAt;
        private String nickName;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class GetResponse {
        private Long wcboardId;
        private String title;
        private String content;
        private String images;
        private String wcTag;
        private String animalTag;
        private String areaTag;
        private String postStatus;
        private String startTime;
        private String endTime;
        private String createdAt;
        private String nickName;
    }

    @Getter
    @Setter
    public static class petSitterApplicantResponse {
        private String name;
        private String nowJob;
        private boolean smoking;
        private String petSitterImage;
        //Todo 리뷰 포함되야하나?
    }

    @Getter
    @Setter
    public static class getMemberResponse {
        private Long wcboardId;
        private String title;
        private String content;
        private String images;
        private String wcTag;
        private String animalTag;
        private String areaTag;
        private String postStatus;
        private String startTime;
        private String endTime;
        private String createdAt;
        private String nickName;
        private String name;
    }
    @Getter
    @Setter
    public static class WcBoardWithPetSitterInfo {
        private WcBoard wcBoard;
        private String petSitterNickname;
        private String petSitterImage;

    }
}
