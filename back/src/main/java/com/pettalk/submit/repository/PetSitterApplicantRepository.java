package com.pettalk.submit.repository;

import com.pettalk.submit.entity.PetSitterApplicant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PetSitterApplicantRepository extends JpaRepository<PetSitterApplicant, Long> {
    List<PetSitterApplicant> findByWcboardId (Long wcboardId);
    List<PetSitterApplicant> findByPetSitter_PetSitterId (Long petSitterId);
    Optional<PetSitterApplicant> findPetsitterIdByWcboardId (Long wcboardid);

    Long countByPetSitter_PetSitterId (Long petSitterId);
}
