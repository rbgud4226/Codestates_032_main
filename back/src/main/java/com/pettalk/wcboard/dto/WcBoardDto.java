package com.pettalk.wcboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class WcBoardDto {
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post { // 0829 위치는 어떤 정보를 줘야할까..
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

        private String createdAt;

        private String postStatus;

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


    }


}
