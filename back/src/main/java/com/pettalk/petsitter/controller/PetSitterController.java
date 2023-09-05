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

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@CrossOrigin(origins = "*", allowedHeaders = "*") //모든 출처와 헤더에 대해 허용된 상태이므로 나중에 고칠 것.
@Controller
@RequestMapping
@RequiredArgsConstructor
@Validated
public class PetSitterController {

    private final static String PETSITTER_DEFULT_URL = "/petsitter";

    private final PetSitterMapper mapper;

    private final PetSitterService service;

//    private final

    @PostMapping("/petsitter")
    public ResponseEntity postPetSitter(@Valid @RequestBody PetSitterDto.PostDto postDto) {

//        memberService.findMember(postDto.getMember_id());

        PetSitter petSitter = service.createPetSitter(mapper.postToPetSitter(postDto));

        URI location = UriComponentsBuilder
                .fromPath(PETSITTER_DEFULT_URL)
                .pathSegment(String.valueOf(petSitter.getPetSitterId()))
                .build()
                .toUri();

        return ResponseEntity.created(location).build();

    }

    @PatchMapping("/petsitter/{pet-sitter-id}")
    public ResponseEntity patchPetSitter(@PathVariable("pet-sitter-id") @Positive long petSitterId,
            @Valid @RequestBody PetSitterDto.PatchDto patchDto) {

        PetSitter petSitter = mapper.patchToPetSitter(patchDto);

        petSitter.setPetSitterId(petSitterId);

        PetSitter response = service.updatePetSitter(petSitter);

        return new ResponseEntity<>(mapper.petSitterToResponse(response), HttpStatus.OK);
    }

    @GetMapping("/petsitter/{pet-sitter-id}")
    public ResponseEntity getPetSitter(@PathVariable("/petsitter/{pet-sitter-id}") @Positive long PetSitterId) {

        PetSitter petSitter = service.findPetSitter(PetSitterId);

        return new ResponseEntity<>(mapper.petSitterToResponse(petSitter), HttpStatus.OK);
    }
}
