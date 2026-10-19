package com.farmverse.backend.dto.waste;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;

public class WasteSubmissionRequest {

    @NotBlank(message = "Crop source is required")
    private String cropSource;

    @NotBlank(message = "Residue type is required")
    private String residueType;

    @NotNull(message = "Estimated quantity is required")
    @Positive(message = "Estimated quantity must be greater than zero")
    private BigDecimal estimatedQuantityTonnes;

    @NotNull(message = "Availability date is required")
    @FutureOrPresent(message = "Availability date must be today or in the future")
    private LocalDate expectedAvailabilityDate;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Contact phone is required")
    private String contactPhone;

    private String notes;

    public WasteSubmissionRequest() {
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
}
