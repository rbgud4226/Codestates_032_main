package com.pettalk.wcboard.controller;

import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.service.WcBoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/wcBoard")
public class WcBoardController {
    private final WcBoardMapper mapper;
    private final WcBoardService service;

    public WcBoardController(WcBoardMapper mapper, WcBoardService service){
        this.mapper = mapper;
        this.service = service;
    }
    @PostMapping // 산책,돌봄 게시글 등록
    public ResponseEntity WcbPost(@Valid @RequestBody WcBoardDto.Post postDto){
//        long authenticatedMemberId = JwtParseInterceptor.getAuthenticatedMemberId();
//
//        requestBody.addQuestionId(questionId);
//        requestBody.addAuthenticatedMemberId(authenticatedMemberId);

        WcBoard createWcBoardPost = service.createWcBoardPost(mapper.wcBoardPostDtoToWcBoard(postDto));

        return new ResponseEntity<> (mapper.wcBoardResponseDtoToWcBoard(createWcBoardPost), HttpStatus.CREATED);
    }

    @PatchMapping("/{wcBoard-id}")
    public ResponseEntity WcbPatch (@Valid @RequestBody WcBoardDto.Patch patchDto,
                                    @Positive @PathVariable("wcBoard-id") long wcBoardId) {
//        long authenticatedMemberId = JwtParseInterceptor.getAuthenticatedMemberId();
//
        patchDto.addwcBoardId(wcBoardId);
//        patchDto.addAuthenticatedMemberId(authenticatedMemberId);

        WcBoard updateWcBoardPost = service.updateWcBoardPost(mapper.wcBoardPatchDtotoWcBoard(patchDto));

        return new ResponseEntity<> (mapper.wcBoardResponseDtoToWcBoard(updateWcBoardPost), HttpStatus.OK);
    }
}