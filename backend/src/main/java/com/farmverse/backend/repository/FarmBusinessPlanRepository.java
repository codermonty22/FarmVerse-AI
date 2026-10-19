package com.farmverse.backend.repository;

import com.farmverse.backend.entity.FarmBusinessPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmBusinessPlanRepository extends JpaRepository<FarmBusinessPlan, UUID> {

    List<FarmBusinessPlan> findAllByUserIdOrderByCreatedAtDesc(UUID userId);

    Page<FarmBusinessPlan> findAllByUserId(UUID userId, Pageable pageable);

    Optional<FarmBusinessPlan> findByIdAndUserId(UUID id, UUID userId);

    long countByUserId(UUID userId);
}
