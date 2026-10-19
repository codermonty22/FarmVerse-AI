package com.farmverse.backend.dto.catalog;

import com.farmverse.backend.common.AvailabilityStatus;

public class DiseaseDiagnosisResponseDto {

    private AvailabilityStatus status;
    private String engineUsed;
    private String message;
    private DiseaseReferenceDto diagnosis;

    public DiseaseDiagnosisResponseDto() {
    }

    public DiseaseDiagnosisResponseDto(AvailabilityStatus status, String engineUsed, String message, DiseaseReferenceDto diagnosis) {
        this.status = status;
        this.engineUsed = engineUsed;
        this.message = message;
        this.diagnosis = diagnosis;
    }

    public AvailabilityStatus getStatus() {
        return status;
    }

    public void setStatus(AvailabilityStatus status) {
        this.status = status;
    }

    public String getEngineUsed() {
        return engineUsed;
    }

    public void setEngineUsed(String engineUsed) {
        this.engineUsed = engineUsed;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public DiseaseReferenceDto getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(DiseaseReferenceDto diagnosis) {
        this.diagnosis = diagnosis;
    }
}
