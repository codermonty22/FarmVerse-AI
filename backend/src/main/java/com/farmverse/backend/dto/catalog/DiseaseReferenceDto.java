package com.farmverse.backend.dto.catalog;

import java.util.List;

public class DiseaseReferenceDto {

    private String id;
    private String diseaseName;
    private String scientificName;
    private String crop;
    private String severity;
    private Double confidence;
    private String symptoms;
    private String cause;
    private List<String> organicTreatments;
    private List<String> chemicalTreatments;
    private List<String> preventiveMeasures;
    private String universityVerificationSource;

    public DiseaseReferenceDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public Double getConfidence() {
        return confidence;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public List<String> getOrganicTreatments() {
        return organicTreatments;
    }

    public void setOrganicTreatments(List<String> organicTreatments) {
        this.organicTreatments = organicTreatments;
    }

    public List<String> getChemicalTreatments() {
        return chemicalTreatments;
    }

    public void setChemicalTreatments(List<String> chemicalTreatments) {
        this.chemicalTreatments = chemicalTreatments;
    }

    public List<String> getPreventiveMeasures() {
        return preventiveMeasures;
    }

    public void setPreventiveMeasures(List<String> preventiveMeasures) {
        this.preventiveMeasures = preventiveMeasures;
    }

    public String getUniversityVerificationSource() {
        return universityVerificationSource;
    }

    public void setUniversityVerificationSource(String universityVerificationSource) {
        this.universityVerificationSource = universityVerificationSource;
    }
}
