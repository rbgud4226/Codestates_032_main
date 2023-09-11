package com.pettalk.petsitter.controller;


import com.pettalk.member.entity.Member;
import com.pettalk.member.mapper.MemberMapper;
import com.pettalk.member.service.MemberService;
import com.pettalk.petsitter.dto.PetSitterDto;
import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.petsitter.mapper.PetSitterMapper;
import com.pettalk.petsitter.service.PetSitterService;
import com.pettalk.response.MultiResponseDto;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.repository.WcBoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*") //모든 출처와 헤더에 대해 허용된 상태이므로 나중에 고칠 것.
@Controller
@RequestMapping("/petsitter")
@RequiredArgsConstructor
@Validated
@Slf4j
public class PetSitterController {

    private final PetSitterMapper mapper;
    private final PetSitterService service;
    private final WcBoardRepository wcBoardRepository;
    private final WcBoardMapper wcBoardMapper;

//다른 패키지들과 합치기 전이므로 주석처리해둔 것들이 존재함.

    @PostMapping
    public ResponseEntity postPetSitter(@Valid @RequestBody PetSitterDto.PostDto postDto) {

        PetSitter petSitter = service.createPetSitter(mapper.postToPetSitter(postDto));

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapper.petSitterToResponse(petSitter));

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
    public ResponseEntity getPetSitter(@PathVariable("pet-sitter-id") @Positive long petSitterId) {
        try{
        PetSitter petSitter = service.findPetSitter(petSitterId);
        return new ResponseEntity<>(petSitter, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

//    @GetMapping("/{pet-sitter-id}/recent")
//    public  ResponseEntity getRecentWalkCare(@PathVariable("pet-sitter-id") @Positive long petsitterId) {
//
//        List<WcBoard> (petsitterId);
//        List<WcBoardDto.Response> wcBoardDtoGet = wcBoardMapper.wcBoardsResponseDtoToWcBoard(wcBoardRepository.findByMember_MemberId(findMember.getMemberId()));
//        return wcBoardDtoGet;
//
//        //TODO: 워크케어보드의 닉네임, 시작, 끝나는 일자, 산책돌봄 태그와 펫시터의 이름.
//
//    }
}
