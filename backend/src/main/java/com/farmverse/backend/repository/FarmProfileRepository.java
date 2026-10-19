package com.farmverse.backend.repository;

import com.farmverse.backend.entity.FarmProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmProfileRepository extends JpaRepository<FarmProfile, UUID> {

    Optional<FarmProfile> findByUserId(UUID userId);

    boolean existsByUserId(UUID userId);
}
