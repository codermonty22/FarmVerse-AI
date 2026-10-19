package com.farmverse.backend.dto.catalog;

import java.math.BigDecimal;
import java.util.List;

public class CropCatalogDto {

    private String id;
    private String cropName;
    private String hindiName;
    private String marathiName;
    private String variety;
    private String season;
    private String category;
    private Integer durationDays;
    private String expectedYieldPerAcre;
    private BigDecimal costOfCultivationPerAcre;
    private BigDecimal expectedRevenuePerAcre;
    private BigDecimal estimatedNetProfitPerAcre;
    private String waterRequirement;
    private List<String> suitableSoilTypes;
    private String climateSuitability;
    private String marketDemand;
    private Integer matchScore;
    private String suitabilityReason;
    private List<String> riskFactors;
    private String stubbleValorizationPotential;
    private List<String> keyPractices;

    public CropCatalogDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public String getHindiName() {
        return hindiName;
    }

    public void setHindiName(String hindiName) {
        this.hindiName = hindiName;
    }

    public String getMarathiName() {
        return marathiName;
    }

    public void setMarathiName(String marathiName) {
        this.marathiName = marathiName;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public String getExpectedYieldPerAcre() {
        return expectedYieldPerAcre;
    }

    public void setExpectedYieldPerAcre(String expectedYieldPerAcre) {
        this.expectedYieldPerAcre = expectedYieldPerAcre;
    }

    public BigDecimal getCostOfCultivationPerAcre() {
        return costOfCultivationPerAcre;
    }

    public void setCostOfCultivationPerAcre(BigDecimal costOfCultivationPerAcre) {
        this.costOfCultivationPerAcre = costOfCultivationPerAcre;
    }

    public BigDecimal getExpectedRevenuePerAcre() {
        return expectedRevenuePerAcre;
    }

    public void setExpectedRevenuePerAcre(BigDecimal expectedRevenuePerAcre) {
        this.expectedRevenuePerAcre = expectedRevenuePerAcre;
    }

    public BigDecimal getEstimatedNetProfitPerAcre() {
        return estimatedNetProfitPerAcre;
    }

    public void setEstimatedNetProfitPerAcre(BigDecimal estimatedNetProfitPerAcre) {
        this.estimatedNetProfitPerAcre = estimatedNetProfitPerAcre;
    }

    public String getWaterRequirement() {
        return waterRequirement;
    }

    public void setWaterRequirement(String waterRequirement) {
        this.waterRequirement = waterRequirement;
    }

    public List<String> getSuitableSoilTypes() {
        return suitableSoilTypes;
    }

    public void setSuitableSoilTypes(List<String> suitableSoilTypes) {
        this.suitableSoilTypes = suitableSoilTypes;
    }

    public String getClimateSuitability() {
        return climateSuitability;
    }

    public void setClimateSuitability(String climateSuitability) {
        this.climateSuitability = climateSuitability;
    }

    public String getMarketDemand() {
        return marketDemand;
    }

    public void setMarketDemand(String marketDemand) {
        this.marketDemand = marketDemand;
    }

    public Integer getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(Integer matchScore) {
        this.matchScore = matchScore;
    }

    public String getSuitabilityReason() {
        return suitabilityReason;
    }

    public void setSuitabilityReason(String suitabilityReason) {
        this.suitabilityReason = suitabilityReason;
    }

    public List<String> getRiskFactors() {
        return riskFactors;
    }

    public void setRiskFactors(List<String> riskFactors) {
        this.riskFactors = riskFactors;
    }

    public String getStubbleValorizationPotential() {
        return stubbleValorizationPotential;
    }

    public void setStubbleValorizationPotential(String stubbleValorizationPotential) {
        this.stubbleValorizationPotential = stubbleValorizationPotential;
    }

    public List<String> getKeyPractices() {
        return keyPractices;
    }

    public void setKeyPractices(List<String> keyPractices) {
        this.keyPractices = keyPractices;
    }
}
