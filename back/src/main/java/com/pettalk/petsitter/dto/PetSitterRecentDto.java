package com.pettalk.petsitter.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PetSitterRecentDto {

    @Setter
    @Getter
    public static class RecentCareDto {

        private long petSitterId;
        private long wcBoardId;
        private long wcTag;
        private String startTime;
        private String endTime;

    }
}
