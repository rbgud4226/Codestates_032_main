package com.pettalk.location.dto;

import lombok.Getter;
import lombok.Setter;

public class LocationDTO {

    @Getter
    @Setter
    public static class Post {
        private Long id;
        private double latitude;
        private double longitude;
    }

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private double latitude;
        private double longitude;
    }

}


