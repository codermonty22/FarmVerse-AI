package com.farmverse.backend.dto.catalog;

import java.util.List;

public class GovtSchemeDto {

    private String id;
    private String schemeName;
    private String shortName;
    private String ministry;
    private String category;
    private String subsidyPercentage;
    private String maxAmount;
    private List<String> eligibility;
    private List<String> documentsRequired;
    private String applyUrl;
    private String status;
    private String description;

    public GovtSchemeDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getMinistry() {
        return ministry;
    }

    public void setMinistry(String ministry) {
        this.ministry = ministry;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubsidyPercentage() {
        return subsidyPercentage;
    }

    public void setSubsidyPercentage(String subsidyPercentage) {
        this.subsidyPercentage = subsidyPercentage;
    }

    public String getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(String maxAmount) {
        this.maxAmount = maxAmount;
    }

    public List<String> getEligibility() {
        return eligibility;
    }

    public void setEligibility(List<String> eligibility) {
        this.eligibility = eligibility;
    }

    public List<String> getDocumentsRequired() {
        return documentsRequired;
    }

    public void setDocumentsRequired(List<String> documentsRequired) {
        this.documentsRequired = documentsRequired;
    }

    public String getApplyUrl() {
        return applyUrl;
    }

    public void setApplyUrl(String applyUrl) {
        this.applyUrl = applyUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
