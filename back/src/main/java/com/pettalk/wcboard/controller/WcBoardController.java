package com.pettalk.wcboard.controller;

import com.pettalk.argumentresolver.LoginMemberId;
import com.pettalk.member.service.MemberService;
import com.pettalk.response.MultiResponseDto;
import com.pettalk.wcboard.dto.WcBoardDto;
import com.pettalk.wcboard.entity.WcBoard;
import com.pettalk.wcboard.mapper.WcBoardMapper;
import com.pettalk.wcboard.service.WcBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/wcboard")
@RequiredArgsConstructor
@Slf4j
public class WcBoardController {
    private final WcBoardMapper mapper;
    private final WcBoardService service;
    private final MemberService memberService;


    @PostMapping
    public ResponseEntity WcbPost(@Valid @RequestBody WcBoardDto.Post postDto,
                                  @LoginMemberId @Positive Long memberId){
        log.info(memberId + "Controller MemberId");

        WcBoard createdWcBoardPost = service.createWcBoardPost(mapper.wcBoardPostDtoToWcBoard(postDto), memberId);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapper.wcBoardResponseDtoToWcBoard(createdWcBoardPost));
    }

    //게시글에 펫시터 신청
//    @PostMapping("/submit/{wcboard-id}")
//    public ResponseEntity PetSitterSubmit(@LoginMemberId Long memberId,
//                                          @Positive @PathVariable("wcboard-id") Long wcboardId) {
//        return service.submitPetSitter(memberId, wcboardId);
//    }
        /**
         * Todo 방어로직
         * 1. 자신이 게시글에 신청할 경우 > 완료
         * 2. 펫시터 아이디가 없는 경우 > 완료
         * 3. 동일한 시간대에 여러게시글에 신청 > 흠...

         * 방어로직 설계
            Member findMember = memberService.findVerifyMember(memberId);   //토큰에서 멤버아이디 가져오기
            WcBoard findPost = service.findVerifyPost(wcboardId);
            Long postMemberId = findPost.getMember().getMemberId();         //게시글 작성자 멤버아이디
            Long loginMemberId = findMember.getMemberId();                  //로그인한 멤버의 멤버아이디
            log.info("토큰으로 찾은 멤버아이디 : " + memberId);
            log.info("로그인한 멤버의 멤버아이디 : " + loginMemberId);
            log.info("게시글 작성자의 멤버아이디 : " + postMemberId);

            //펫시터 등록 여부 조회 널포인트 예외 처리
            Long petSitterId = null;
            PetSitter petSitter = findMember.getPetSitter();
            if (petSitter != null) {
                petSitterId = petSitter.getPetSitterId();
            }

            //방어로직
            if (loginMemberId.equals(postMemberId)) {
                return ResponseEntity
                        .ok()
                        .body("자신의 게시글에 신청할수 없어요!");

            }else if (petSitterId == null){
                return ResponseEntity
                        .ok()
                        .body("펫시터를 아직 등록하지 않으셨네요!");
            }else {
                return ResponseEntity
                        .ok()
                        .body("신청 완료!");
            }
         */

    @PatchMapping("/{wcboard-id}")
    public ResponseEntity WcbPatch (@Valid @RequestBody WcBoardDto.Patch patchDto,
                                    @Positive @PathVariable("wcboard-id") Long wcboardId,
                                    @LoginMemberId @Positive Long memberId) {
        log.info("수정 진행 시 멤버아이디 : " + memberId);

        patchDto.addwcBoardId(wcboardId);
        WcBoard updatedWcBoardPost = service.updateWcBoardPost(mapper.wcBoardPatchDtotoWcBoard(patchDto), memberId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(mapper.wcBoardResponseDtoToWcBoard(updatedWcBoardPost));
    }

    /**
     * 태그
     * RequestParam 으로 tag에 대한 값을 받아오는데 굳이 DB에 있어야될 필요성이 있나?
     * tag 기능 자체가 검색이랑 비슷해서 태그정보를 클라이언트 측에서 받으면
     * 태그로 필터링된 관련 게시글을 전체 로드 하면됨
     * TODO : 필터를 통한 전체글 조회 기능 8월 31일 WcTag 구현완료 > 테스트 필요 > 테스트 완료!
     */

    //신청자 조회
//    @GetMapping("/submit/{wcboard-id}")
//    public ResponseEntity getPetSitterApplicant(@PathVariable("wcboard-id") @Positive Long wcboardId){
//        List<PetSitterApplicant> petSitterApplicantList = service.findApplicantPetsitter(wcboardId);
//        return new ResponseEntity<>(mapper.petSitterApplicantToPetSitterApplicantResponse(petSitterApplicantList),HttpStatus.OK);
//    }

    //게시글 단일 조회
    @GetMapping("/{wcboard-id}")
    public ResponseEntity findPost(@PathVariable("wcboard-id") @Positive Long wcboardId) {
        WcBoard wcBoard = service.findWcBoardPost(wcboardId);

        log.info("단일조회 보드아이디 테스트 : " + wcboardId);
        log.info("단일조회 멤버아이디 테스트 : " + wcBoard.getMember().getMemberId());

        if (wcboardId == null){
            return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .body("작성된 글이 없어요!");
        }else{
            return new ResponseEntity<>(mapper.wcBoardGetResponseDtoToWcBoard(wcBoard), HttpStatus.OK);
        }
    }

    @GetMapping // 메인 페이지 전체 게시글 로드
    public ResponseEntity findAllPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Page<WcBoard> pageWcBoardPosts = service.findAllPosts(page - 1, size); // 페이지 처리
        log.info ("게시글 전체 조회 컨텐츠 내용" + pageWcBoardPosts.getContent());
        List<WcBoard> posts = pageWcBoardPosts.getContent(); // 전체 게시글 내용 불러오기

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts), HttpStatus.OK);

    }
    /**
     * 태그를 활용한 검색의 주요 로직
     * 1. 첫번째 태그를 적용한다.
     * 2. 두번째 태그가 적용되면 첫번째 태그가 적용된 게시글은 남아있어야한다.
     * 3. 세번째 태그가 적용되면 첫번째, 두번째 태그가 적용된 게시글은 남아있어야한다.
     * 4. 태그를 해제 하면 해제된 순서대로 태그 필터가 빠져야한다.
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
     */
    //태그 기반 전체조회
    @GetMapping("/tag")
    public ResponseEntity findAllWithTags(
            @RequestParam(name = "page") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "wcTag", required = false) String wcTag,
            @RequestParam(name = "animalTag", required = false) String animalTag,
            @RequestParam(name = "areaTag", required = false) String areaTag){

        Page<WcBoard> pageWcBoardPosts = service.findAllWithTags(page -1, size, wcTag, animalTag, areaTag);
        List<WcBoard> posts = pageWcBoardPosts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.wcBoardsResponseDtoToWcBoard(posts), pageWcBoardPosts),HttpStatus.OK);
    }

    //게시글 삭제
    @DeleteMapping("/{wcboard-id}")
    public ResponseEntity WcbDelete(@PathVariable("wcboard-id") Long wcboardId) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        memberService.findMemberByPrincipal(principal.toString());

        if ("anonymousUser".equals(principal)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("권한이 없어요!");
        }else {
            service.deletePost(wcboardId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("삭제 완료!");
        }
    }
}
