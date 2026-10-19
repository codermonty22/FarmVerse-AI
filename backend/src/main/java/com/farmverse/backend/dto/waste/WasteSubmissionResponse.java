package com.farmverse.backend.dto.waste;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public class WasteSubmissionResponse {

    private UUID id;
    private UUID userId;
    private String cropSource;
    private String residueType;
    private BigDecimal estimatedQuantityTonnes;
    private LocalDate expectedAvailabilityDate;
    private String district;
    private String state;
    private String contactPhone;
    private String notes;
    private String status;
    private Instant createdAt;

    public WasteSubmissionResponse() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
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
}
