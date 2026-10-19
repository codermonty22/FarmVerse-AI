package com.farmverse.backend.dto.planner;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public class SavedPlanResponse {

    private UUID id;
    private UUID userId;
    private String planName;
    private String cropName;
    private BigDecimal landSize;
    private String landUnit;

    private BigDecimal seedCost;
    private BigDecimal fertilizerCost;
    private BigDecimal laborCost;
    private BigDecimal irrigationCost;
    private BigDecimal machineryCost;
    private BigDecimal transportCost;
    private BigDecimal contingencyPercent;

    private BigDecimal expectedYieldQuintals;
    private BigDecimal sellingPricePerQuintal;

    private BigDecimal totalCost;
    private BigDecimal grossRevenue;
    private BigDecimal netProfit;
    private BigDecimal roiPercent;
    private BigDecimal breakEvenPricePerQuintal;

    private Instant createdAt;

    public SavedPlanResponse() {
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

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BigDecimal getGrossRevenue() {
        return grossRevenue;
    }

    public void setGrossRevenue(BigDecimal grossRevenue) {
        this.grossRevenue = grossRevenue;
    }

    public BigDecimal getNetProfit() {
        return netProfit;
    }

    public void setNetProfit(BigDecimal netProfit) {
        this.netProfit = netProfit;
    }

    public BigDecimal getRoiPercent() {
        return roiPercent;
    }

    public void setRoiPercent(BigDecimal roiPercent) {
        this.roiPercent = roiPercent;
    }

    public BigDecimal getBreakEvenPricePerQuintal() {
        return breakEvenPricePerQuintal;
    }

    public void setBreakEvenPricePerQuintal(BigDecimal breakEvenPricePerQuintal) {
        this.breakEvenPricePerQuintal = breakEvenPricePerQuintal;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
