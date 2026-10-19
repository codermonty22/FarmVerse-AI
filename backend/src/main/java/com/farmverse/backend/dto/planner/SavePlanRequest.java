package com.farmverse.backend.dto.planner;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.UUID;

public class SavePlanRequest {

    private UUID farmProfileId;

    @NotBlank(message = "Plan name is required")
    private String planName;

    @NotBlank(message = "Crop name is required")
    private String cropName;

    @NotNull(message = "Land size is required")
    @Positive(message = "Land size must be greater than zero")
    private BigDecimal landSize;

    private String landUnit = "Acres";

    private BigDecimal seedCost = BigDecimal.ZERO;
    private BigDecimal fertilizerCost = BigDecimal.ZERO;
    private BigDecimal laborCost = BigDecimal.ZERO;
    private BigDecimal irrigationCost = BigDecimal.ZERO;
    private BigDecimal machineryCost = BigDecimal.ZERO;
    private BigDecimal transportCost = BigDecimal.ZERO;
    private BigDecimal contingencyPercent = new BigDecimal("10.00");

    @NotNull(message = "Expected yield is required")
    @Positive(message = "Expected yield must be greater than zero")
    private BigDecimal expectedYieldQuintals;

    @NotNull(message = "Selling price per quintal is required")
    @Positive(message = "Selling price per quintal must be greater than zero")
    private BigDecimal sellingPricePerQuintal;

    public SavePlanRequest() {
    }

    public UUID getFarmProfileId() {
        return farmProfileId;
    }

    public void setFarmProfileId(UUID farmProfileId) {
        this.farmProfileId = farmProfileId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public BigDecimal getLandSize() {
        return landSize;
    }

    public void setLandSize(BigDecimal landSize) {
        this.landSize = landSize;
    }

    public String getLandUnit() {
        return landUnit;
    }

    public void setLandUnit(String landUnit) {
        this.landUnit = landUnit;
    }

    public BigDecimal getSeedCost() {
        return seedCost;
    }

    public void setSeedCost(BigDecimal seedCost) {
        this.seedCost = seedCost;
    }

    public BigDecimal getFertilizerCost() {
        return fertilizerCost;
    }

    public void setFertilizerCost(BigDecimal fertilizerCost) {
        this.fertilizerCost = fertilizerCost;
    }

    public BigDecimal getLaborCost() {
        return laborCost;
    }

    public void setLaborCost(BigDecimal laborCost) {
        this.laborCost = laborCost;
    }

    public BigDecimal getIrrigationCost() {
        return irrigationCost;
    }

    public void setIrrigationCost(BigDecimal irrigationCost) {
        this.irrigationCost = irrigationCost;
    }

    public BigDecimal getMachineryCost() {
        return machineryCost;
    }

    public void setMachineryCost(BigDecimal machineryCost) {
        this.machineryCost = machineryCost;
    }

    public BigDecimal getTransportCost() {
        return transportCost;
    }

    public void setTransportCost(BigDecimal transportCost) {
        this.transportCost = transportCost;
    }

    public BigDecimal getContingencyPercent() {
        return contingencyPercent;
    }

    public void setContingencyPercent(BigDecimal contingencyPercent) {
        this.contingencyPercent = contingencyPercent;
    }

    public BigDecimal getExpectedYieldQuintals() {
        return expectedYieldQuintals;
    }

    public void setExpectedYieldQuintals(BigDecimal expectedYieldQuintals) {
        this.expectedYieldQuintals = expectedYieldQuintals;
    }

    public BigDecimal getSellingPricePerQuintal() {
        return sellingPricePerQuintal;
    }

    public void setSellingPricePerQuintal(BigDecimal sellingPricePerQuintal) {
        this.sellingPricePerQuintal = sellingPricePerQuintal;
    }
}
