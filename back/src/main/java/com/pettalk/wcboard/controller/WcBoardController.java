package com.pettalk.wcboard.controller;

import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.service.WcBoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/wcboard")
public class WcBoardController {
    private final WcBoardMapper mapper;
    private final WcBoardService service;

    public WcBoardController(WcBoardMapper mapper, WcBoardService service){
        this.mapper = mapper;
        this.service = service;
    }
    @PostMapping("") // 산책,돌봄 게시글 등록
    public ResponseEntity WcbPost(@Valid @RequestBody WcBoardDto.Post postDto){
//        WcBoard posting = mapper.wcBoardPostDtoToWcBoard(postDto);
//        WcBoard response = service.createWcBoardPost(posting);
//
        WcBoard createWcBoardPost = service.createWcBoardPost(mapper.wcBoardPostDtoToWcBoard(postDto));

        return new ResponseEntity<> (mapper.wcBoardResponseDtoToWcBoard(createWcBoardPost), HttpStatus.CREATED);
    }

}


//        requestBody.addWcBoardId();
//        requestBody.addAuthenticatedMemberId(authenticatedMemberId); patch에 활용