package com.pettalk.wcboard.repository;

import com.pettalk.wcboard.entity.WcBoard;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Optional;

public interface WcBoardRepository extends JpaRepository<WcBoard, Long> {
    Optional<WcBoard> findById(long wcBoardId);
//    Page<WcBoard> findByPostStatus(WcBoard.PostStatus postStatus, PageRequest pageRequest);  혹시 모를.. 게시글 상태로 조회
    Page<WcBoard> findByWcTagContaining(String wcTag, Pageable pageable);
//    Page<WcBoard> findPostAreaTag(String areaTag, PageRequest pageRequest);
//    Page<WcBoard> findPostAnimalTag(String animalTag, PageRequest pageRequest);

}