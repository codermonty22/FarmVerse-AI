package com.farmverse.backend.dto.planner;

import java.math.BigDecimal;
import java.util.List;

public class PlanCalculationResultDto {

    private String planName;
    private String cropName;
    private BigDecimal landSize;
    private String landUnit;

    private BigDecimal directCostsTotal;
    private BigDecimal contingencyAmount;
    private BigDecimal totalCost;
    private BigDecimal costPerAcre;

    private BigDecimal grossRevenue;
    private BigDecimal netProfit;
    private BigDecimal profitPerAcre;
    private BigDecimal roiPercent;
    private BigDecimal breakEvenPricePerQuintal;

    private List<ScenarioAlternativeDto> scenarioAlternatives;

    public PlanCalculationResultDto() {
    }

    public static class ScenarioAlternativeDto {
        private String scenarioName;
        private BigDecimal yieldQuintals;
        private BigDecimal pricePerQuintal;
        private BigDecimal projectedProfit;

        public ScenarioAlternativeDto() {
        }

        public ScenarioAlternativeDto(String scenarioName, BigDecimal yieldQuintals, BigDecimal pricePerQuintal, BigDecimal projectedProfit) {
            this.scenarioName = scenarioName;
            this.yieldQuintals = yieldQuintals;
            this.pricePerQuintal = pricePerQuintal;
            this.projectedProfit = projectedProfit;
        }

        public String getScenarioName() {
            return scenarioName;
        }

        public void setScenarioName(String scenarioName) {
            this.scenarioName = scenarioName;
        }

        public BigDecimal getYieldQuintals() {
            return yieldQuintals;
        }

        public void setYieldQuintals(BigDecimal yieldQuintals) {
            this.yieldQuintals = yieldQuintals;
        }

        public BigDecimal getPricePerQuintal() {
            return pricePerQuintal;
        }

        public void setPricePerQuintal(BigDecimal pricePerQuintal) {
            this.pricePerQuintal = pricePerQuintal;
        }

        public BigDecimal getProjectedProfit() {
            return projectedProfit;
        }

        public void setProjectedProfit(BigDecimal projectedProfit) {
            this.projectedProfit = projectedProfit;
        }
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

    public BigDecimal getDirectCostsTotal() {
        return directCostsTotal;
    }

    public void setDirectCostsTotal(BigDecimal directCostsTotal) {
        this.directCostsTotal = directCostsTotal;
    }

    public BigDecimal getContingencyAmount() {
        return contingencyAmount;
    }

    public void setContingencyAmount(BigDecimal contingencyAmount) {
        this.contingencyAmount = contingencyAmount;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BigDecimal getCostPerAcre() {
        return costPerAcre;
    }

    public void setCostPerAcre(BigDecimal costPerAcre) {
        this.costPerAcre = costPerAcre;
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

    public BigDecimal getProfitPerAcre() {
        return profitPerAcre;
    }

    public void setProfitPerAcre(BigDecimal profitPerAcre) {
        this.profitPerAcre = profitPerAcre;
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

    public List<ScenarioAlternativeDto> getScenarioAlternatives() {
        return scenarioAlternatives;
    }

    public void setScenarioAlternatives(List<ScenarioAlternativeDto> scenarioAlternatives) {
        this.scenarioAlternatives = scenarioAlternatives;
    }
}
