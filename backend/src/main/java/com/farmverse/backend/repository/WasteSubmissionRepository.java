package com.farmverse.backend.repository;

import com.farmverse.backend.entity.WasteSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WasteSubmissionRepository extends JpaRepository<WasteSubmission, UUID> {

    List<WasteSubmission> findAllByUserIdOrderByCreatedAtDesc(UUID userId);

    Page<WasteSubmission> findAllByUserId(UUID userId, Pageable pageable);

    Optional<WasteSubmission> findByIdAndUserId(UUID id, UUID userId);

    long countByUserId(UUID userId);
}
