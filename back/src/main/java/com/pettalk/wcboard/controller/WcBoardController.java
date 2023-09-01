package com.pettalk.wcboard.controller;

import com.pettalk.response.MultiResponseDto;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.service.WcBoardService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.List;

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

/**     long authenticatedMemberId = JwtParseInterceptor.getAuthenticatedMemberId(); TODO : 멤버와 연결후 로그인한 아이디 가져오기 기능 추가
        postDto.addQuestionId(wcBoardId);
        postDto.addAuthenticatedMemberId(authenticatedMemberId); */

        WcBoard createdWcBoardPost = service.createWcBoardPost(mapper.wcBoardPostDtoToWcBoard(postDto));

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapper.wcBoardResponseDtoToWcBoard(createdWcBoardPost));
    }

    @PatchMapping("/{wcBoard-id}")
    public ResponseEntity WcbPatch (@Valid @RequestBody WcBoardDto.Patch patchDto,
                                    @Positive @PathVariable("wcBoard-id") long wcBoardId) {

        /**long authenticatedMemberId = JwtParseInterceptor.getAuthenticatedMemberId(); TODO : 멤버와 연결후 로그인한 아이디 가져오기 기능 추가
        patchDto.addAuthenticatedMemberId(authenticatedMemberId);
         */
        patchDto.addwcBoardId(wcBoardId);
        WcBoard updatedWcBoardPost = service.updateWcBoardPost(mapper.wcBoardPatchDtotoWcBoard(patchDto));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(mapper.wcBoardResponseDtoToWcBoard(updatedWcBoardPost));
    }
    /** 단일 게시글 조회

    @GetMapping("/{wcBoard-id}")
    public ResponseEntity WcbGet (@PathVariable("wcBoard-id") @Min(1) long wcBoardId) {
        //        long authenticatedMemberId = JwtParseInterceptor.getAuthenticatedMemberId(); 멤버 id 받아오기
        WcBoard findPost = service.findWcBoardPost(wcBoardId); //authenticatedMemberId

        return new ResponseEntity<> (mapper.wcBoardResponseDtoToWcBoard(findPost), HttpStatus.OK);
    }

    */

    /**
     * RequestParam 으로 tag에 대한 값을 받아오는데 굳이 DB에 있어야될 필요성이 있나?
     * tag 기능 자체가 검색이랑 비슷해서 태그정보를 클라이언트 측에서 받으면
     * 태그로 필터링된 관련 게시글을 전체 로드 하면됨
     * TODO : 필터를 통한 전체글 조회 기능 8월 31일 WcTag 구현완료 > 테스트 필요
     */
    @GetMapping // 메인 페이지 전체 게시글 로드
    public ResponseEntity findAllPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<WcBoard> pageWcBoardPosts = service.findAllPosts(page - 1, size); // 페이지 처리
        List<WcBoard> posts = pageWcBoardPosts.getContent(); // 전체 게시글 내용 불러오기

        return new ResponseEntity<> (
                new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
    }

    @GetMapping("/wcBoard/walkcare") // 산책 돌봄 태그 선택 시 표출
    public ResponseEntity findPostsWcTag(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @RequestParam String wcTag) {

        Page<WcBoard> pageWcBoardPosts = service.findPostWcTag(page - 1, size, wcTag);
        List<WcBoard> posts = pageWcBoardPosts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
    }



//    @GetMapping("/animalkind") //
//    public ResponseEntity findPostsAnimalTag(@Positive @RequestParam int page,
//                                             @Positive @RequestParam int size,
//                                             @RequestParam String tag) { // < tag 명칭을 정해야됨
//        Page<WcBoard> pageWcBoardPosts = service.filterByWcTag(page - 1, size, tag);
//        List<WcBoard> posts = pageWcBoardPosts.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
//    }
//
//    @GetMapping("/area") //
//    public ResponseEntity findPostsAreaTag(@Positive @RequestParam int page,
//                                           @Positive @RequestParam int size,
//                                           @RequestParam String tag) { // < tag 명칭을 정해야됨
//        Page<WcBoard> pageWcBoardPosts = service.filterByWcTag(page - 1, size, tag);
//        List<WcBoard> posts = pageWcBoardPosts.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
//    }

}