package com.pettalk.location.controller;

import com.pettalk.location.dto.LocationDTO;
import com.pettalk.location.entity.LocationEntity;
import com.pettalk.location.mapper.LocationMapper;
import com.pettalk.location.service.LocationService;
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

