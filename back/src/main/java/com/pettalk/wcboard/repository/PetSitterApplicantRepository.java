package com.pettalk.wcboard.repository;

import com.pettalk.petsitter.entity.PetSitter;
import com.pettalk.wcboard.entity.PetSitterApplicant;
import com.pettalk.wcboard.entity.WcBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetSitterApplicantRepository extends JpaRepository<PetSitterApplicant, Long> {
    List<PetSitterApplicant> findByMember_MemberId(Long memberId);

    List<PetSitterApplicant> findByWcboardId (Long wcboardId);

    PetSitter findPetSitterByWcboardId(Long wcboardId);
}
