package com.farmverse.backend.dto.catalog;

import com.farmverse.backend.common.AvailabilityStatus;

public class DiseaseDiagnosisRequestDto {

    private String crop;
    private String symptomsDescription;
    private String imageBase64;
    private String fileName;

    public DiseaseDiagnosisRequestDto() {
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public String getSymptomsDescription() {
        return symptomsDescription;
    }

    public void setSymptomsDescription(String symptomsDescription) {
        this.symptomsDescription = symptomsDescription;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
