package com.pettalk.wcboard.repository;

import com.pettalk.wcboard.entity.WcBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WcBoardRepository extends JpaRepository<WcBoard, Long> {
    Optional<WcBoard> findById(long id);

}