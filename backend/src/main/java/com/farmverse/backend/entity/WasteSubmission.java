package com.farmverse.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "waste_submissions")
public class WasteSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "crop_source", nullable = false, length = 100)
    private String cropSource;

    @Column(name = "residue_type", nullable = false, length = 120)
    private String residueType;

    @Column(name = "estimated_quantity_tonnes", nullable = false, precision = 10, scale = 2)
    private BigDecimal estimatedQuantityTonnes;

    @Column(name = "expected_availability_date", nullable = false)
    private LocalDate expectedAvailabilityDate;

    @Column(nullable = false, length = 80)
    private String district;

    @Column(nullable = false, length = 80)
    private String state;

    @Column(name = "contact_phone", nullable = false, length = 20)
    private String contactPhone;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false, length = 30)
    private String status = "PENDING_REVIEW";

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public WasteSubmission() {
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCropSource() {
        return cropSource;
    }

    public void setCropSource(String cropSource) {
        this.cropSource = cropSource;
    }

    public String getResidueType() {
        return residueType;
    }

    public void setResidueType(String residueType) {
        this.residueType = residueType;
    }

    public BigDecimal getEstimatedQuantityTonnes() {
        return estimatedQuantityTonnes;
    }

    public void setEstimatedQuantityTonnes(BigDecimal estimatedQuantityTonnes) {
        this.estimatedQuantityTonnes = estimatedQuantityTonnes;
    }

    public LocalDate getExpectedAvailabilityDate() {
        return expectedAvailabilityDate;
    }

    public void setExpectedAvailabilityDate(LocalDate expectedAvailabilityDate) {
        this.expectedAvailabilityDate = expectedAvailabilityDate;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
