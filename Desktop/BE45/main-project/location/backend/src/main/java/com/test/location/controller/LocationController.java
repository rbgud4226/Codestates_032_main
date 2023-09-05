package com.test.location.controller;

import com.test.location.dto.LocationDTO;
import com.test.location.entity.LocationEntity;
import com.test.location.mapper.LocationMapper;
import com.test.location.service.LocationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
public class LocationController {

    private final LocationService service;

    private final LocationMapper mapper;

    public LocationController(LocationService service, LocationMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity saveLocation(@RequestBody LocationDTO.Post postDto) {
        LocationEntity createdLocation = service.saveLocation(mapper.LocationPostDto(postDto));


        log.info(postDto.getLatitude() + "latitude");
        log.info(postDto.getLongitude() + "longitude");
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapper.LocationResponse(createdLocation));
    }
}
