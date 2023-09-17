package com.pettalk.submit.repository;

import com.pettalk.submit.entity.PetSitterApplicant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetSitterApplicantRepository extends JpaRepository<PetSitterApplicant, Long> {
    List<PetSitterApplicant> findByWcboardId (Long wcboardId);
}
