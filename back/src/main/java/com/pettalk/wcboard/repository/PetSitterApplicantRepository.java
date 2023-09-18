package com.pettalk.wcboard.repository;

import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.entity.PetSitterApplicant;
import com.pettalk.wcboard.entity.WcBoard;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetSitterApplicantRepository extends JpaRepository<PetSitterApplicant, Long> {
    List<PetSitterApplicant> findByMember_MemberId(Long memberId);

    List<PetSitterApplicant> findByWcboardId (Long wcboardId);

    @Query("SELECT p FROM PetSitterApplicant p WHERE p.wcboardId = :wcboardId")
    PetSitterApplicant findPetSitterApplicantByWcboardId(@Param("wcboardId") Long wcboardId);

    PetSitter findPetSitterByWcboardId(Long wcboardId);
    List<PetSitterApplicant> findByPetSitter_PetSitterId(Long petSitterId);
}
