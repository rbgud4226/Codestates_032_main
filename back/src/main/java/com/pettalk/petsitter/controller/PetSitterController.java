package com.pettalk.petsitter.controller;


import com.pettalk.petsitter.dto.PetSitterDto;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.mapper.PetSitterMapper;
import com.pettalk.petsitter.service.PetSitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Path;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@CrossOrigin(origins = "*", allowedHeaders = "*") //모든 출처와 헤더에 대해 허용된 상태이므로 나중에 고칠 것.
@Controller
@RequestMapping("/petsitter")
@RequiredArgsConstructor
@Validated
public class PetSitterController {

    private final static String PETSITTER_DEFAULT_URL = "/petsitter";

    private final PetSitterMapper mapper;

    private final PetSitterService service;

//TODO:다른 패키지들과 합치기 전이므로 주석처리해둔 것들이 존재함.

    @PostMapping
    public ResponseEntity postPetSitter(@Valid @RequestBody PetSitterDto.PostDto postDto) {

//        memberService.findMember(postDto.getMember_id());

        PetSitter petSitter = service.createPetSitter(mapper.postToPetSitter(postDto));

        URI location = UriComponentsBuilder
                .fromPath(PETSITTER_DEFAULT_URL)
                .pathSegment(String.valueOf(petSitter.getPetSitterId()))
                .build()
                .toUri();

        return ResponseEntity.created(location).build();

    }

    @PatchMapping("/{pet-sitter-id}")
    public ResponseEntity patchPetSitter(@PathVariable("pet-sitter-id") @Positive long petSitterId,
            @Valid @RequestBody PetSitterDto.PatchDto patchDto) {

        PetSitter petSitter = mapper.patchToPetSitter(patchDto);

        petSitter.setPetSitterId(petSitterId);

        PetSitter response = service.updatePetSitter(petSitter);

        return new ResponseEntity<>(mapper.petSitterToResponse(response), HttpStatus.OK);
    }

    @GetMapping("/{pet-sitter-id}")
    public ResponseEntity getPetSitter(@PathVariable("/petsitter/{pet-sitter-id}") @Positive long PetSitterId) {

        PetSitter petSitter = service.findPetSitter(PetSitterId);

        return new ResponseEntity<>(mapper.petSitterToResponse(petSitter), HttpStatus.OK);
    }

//    @GetMapping("/{pet-sitter-id}/recent")
//    public  ResponseEntity getRecentCare(@PathVariable("/{pet-sitter-id}") ) {
//
//    }
}
