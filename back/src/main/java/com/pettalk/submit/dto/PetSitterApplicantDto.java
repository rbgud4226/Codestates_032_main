package com.pettalk.submit.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
public class PetSitterApplicantDto {
    @Getter
    @Setter
    public static class petSitterApplicantResponse {
        private String name;
        private String nowJob;
        private boolean smoking;
        private String petSitterImage;

        //Todo 리뷰 포함되야하나?
    }
}
