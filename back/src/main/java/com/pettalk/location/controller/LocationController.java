package com.pettalk.location.controller;

import com.pettalk.location.dto.LocationDTO;
import com.pettalk.location.entity.LocationEntity;
import com.pettalk.location.mapper.LocationMapper;
import com.pettalk.location.service.LocationService;
import com.pettalk.response.LocationMultiResponseDto;
import com.pettalk.response.LocationSingleResponseDto;
import com.pettalk.response.MultiResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/location")
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


        log.info(postDto.getLat() + "latitude");
        log.info(postDto.getLon() + "longitude");
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapper.LocationPostResponse(createdLocation));
    }

    @GetMapping("/{id}")
    public ResponseEntity getLocation (@PathVariable("id") @Positive Long locationId) {
        List<LocationEntity> listedLocation = service.findAllLocation(locationId);

        List<LocationDTO.Get> locationDtos = mapper.LocationGetDtoToLocationEntity(listedLocation);

        return new ResponseEntity<>(locationDtos, HttpStatus.OK);
    }

}

