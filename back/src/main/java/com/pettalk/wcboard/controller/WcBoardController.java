package com.pettalk.wcboard.controller;

import com.pettalk.argumentresolver.LoginMemberId;
import com.pettalk.response.MultiResponseDto;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.repository.WcBoardRepository;
import com.pettalk.wcboard.service.WcBoardService;
import com.pettalk.wcboard.specification.WcBoardSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/wcboard")
@RequiredArgsConstructor
@Slf4j
public class WcBoardController {
    private final WcBoardMapper mapper;
    private final WcBoardService service;
    private final WcBoardRepository repository;


    @PostMapping // 산책,돌봄 게시글 등록
    public ResponseEntity WcbPost(@Valid @RequestBody WcBoardDto.Post postDto){ //, @LoginMemberId Long memberId
//        log.info(memberId + "MemberId");
/**     long authenticatedMemberId = JwtParseInterceptor.getAuthenticatedMemberId(); TODO : 멤버와 연결후 로그인한 아이디 가져오기 기능 추가
        postDto.addQuestionId(wcBoardId);
        postDto.addAuthenticatedMemberId(authenticatedMemberId); */

        WcBoard createdWcBoardPost = service.createWcBoardPost(mapper.wcBoardPostDtoToWcBoard(postDto)); //memberId

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapper.wcBoardResponseDtoToWcBoard(createdWcBoardPost));
    }

    @PatchMapping("/{wcboard-id}")
    public ResponseEntity WcbPatch (@Valid @RequestBody WcBoardDto.Patch patchDto,
                                    @Positive @PathVariable("wcboard-id") Long wcboardId) {

        /**long authenticatedMemberId = JwtParseInterceptor.getAuthenticatedMemberId(); TODO : 멤버와 연결후 로그인한 아이디 가져오기 기능 추가
        patchDto.addAuthenticatedMemberId(authenticatedMemberId);
         */
        patchDto.addwcBoardId(wcboardId);
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
     * TODO : 필터를 통한 전체글 조회 기능 8월 31일 WcTag 구현완료 > 테스트 필요 > 테스트 완료!
     */
    @GetMapping // 메인 페이지 전체 게시글 로드 @@
    public ResponseEntity findAllPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        log.info("page : " + page +", " + "size : " + size);
        Page<WcBoard> pageWcBoardPosts = service.findAllPosts(page - 1, size); // 페이지 처리
        List<WcBoard> posts = pageWcBoardPosts.getContent(); // 전체 게시글 내용 불러오기

        return new ResponseEntity<> (
                new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
    }

    /**
     * 태그를 활용한 검색의 주요 로직
     *
     * 1. 첫번째 태그를 적용한다.
     * 2. 두번째 태그가 적용되면 첫번째 태그가 적용된 게시글은 남아있어야한다.
     * 3. 세번째 태그가 적용되면 첫번째, 두번째 태그가 적용된 게시글은 남아있어야한다.
     * 4. 태그를 해제 하면 해제된 순서대로 태그 필터가 빠져야한다.
     *
     * 0908
     * 현재 로직 : wcTag, animalTag, areaTag 는 각각 개별로 동작하여
     * 하나의 태그가 적용되면 나머지는 적용안되는 상태..
     * 9월 8일 현재 일시 비활성화 처리 후
     * JPA Specification을 Custom해서 적용해볼 예정
     */

    /**
     @GetMapping("/walkcare")// 산책 돌봄 태그 선택 시 표출
     public ResponseEntity findPostsWcTag(@Positive @RequestParam int page,
     @Positive @RequestParam int size,
     @RequestParam String wcTag) {

     Page<WcBoard> pageWcBoardPosts = service.findPostByWcTag(page - 1, size, wcTag);
     List<WcBoard> posts = pageWcBoardPosts.getContent();

     return new ResponseEntity<>(
     new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
     }


     @GetMapping("/animalkind") //동물 종류 선택시 필터
     public ResponseEntity findPostsAnimalTag(@Positive @RequestParam int page,
     @Positive @RequestParam int size,
     @RequestParam String animalTag) {
     Page<WcBoard> pageWcBoardPosts = service.findPostByAnimalTag(page - 1, size, animalTag);
     List<WcBoard> posts = pageWcBoardPosts.getContent();

     return new ResponseEntity<>(
     new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
     }


     @GetMapping("/area") // 지역 선택시 필터
     public ResponseEntity findPostsAreaTag(@Positive @RequestParam int page,
     @Positive @RequestParam int size,
     @RequestParam String areaTag) {
     Page<WcBoard> pageWcBoardPosts = service.findPostByAreaTag(page - 1, size, areaTag);
     List<WcBoard> posts = pageWcBoardPosts.getContent();

     return new ResponseEntity<>(
     new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);
     }*/
    @GetMapping("/myself")
    public List<WcBoard> findAll(@RequestParam(name = "page") int page,
                                 @RequestParam(name = "size") int size,
                                 @RequestParam(name = "wcTag", required = false) String wcTag,
                                 @RequestParam(name = "animalTag", required = false) String animalTag,
                                 @RequestParam(name = "areaTag", required = false) String areaTag){
        Specification<WcBoard> spec = (root, query, criteriaBuilder) -> null;

        if (wcTag != null)
            spec = spec.and(WcBoardSpecification.equalWcTagWithTag(wcTag));

        if (animalTag != null)
            spec = spec.and(WcBoardSpecification.equalAnimalTagWithTag(animalTag));

        if (areaTag != null)
            spec = spec.and(WcBoardSpecification.equalAreaTagWithTag(areaTag));

        return repository.findAll(spec);
    }




    @DeleteMapping("/{wcboard-id}")
    public ResponseEntity WcbDelete(@PathVariable("wcboard-id") Long wcboardId) {



        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}