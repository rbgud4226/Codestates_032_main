package com.pettalk.petsitter.repository;

import com.pettalk.petsitter.entity.PetSitter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetSitterRepository extends JpaRepository<PetSitter, Long> {

}
