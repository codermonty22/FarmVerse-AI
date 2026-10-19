package com.farmverse.backend.dto.catalog;

import java.math.BigDecimal;
import java.util.List;

public class WasteOpportunityDto {

    private String id;
    private String cropSource;
    private String residueType;
    private String valorizedProduct;
    private String technologyRequired;
    private String industrialDemand;
    private BigDecimal estimatedRevenuePerTonne;
    private String investmentLevel;
    private BigDecimal carbonReductionPerTonne;
    private List<String> buyerCategories;
    private String description;

    public WasteOpportunityDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getValorizedProduct() {
        return valorizedProduct;
    }

    public void setValorizedProduct(String valorizedProduct) {
        this.valorizedProduct = valorizedProduct;
    }

    public String getTechnologyRequired() {
        return technologyRequired;
    }

    public void setTechnologyRequired(String technologyRequired) {
        this.technologyRequired = technologyRequired;
    }

    public String getIndustrialDemand() {
        return industrialDemand;
    }

    public void setIndustrialDemand(String industrialDemand) {
        this.industrialDemand = industrialDemand;
    }

    public BigDecimal getEstimatedRevenuePerTonne() {
        return estimatedRevenuePerTonne;
    }

    public void setEstimatedRevenuePerTonne(BigDecimal estimatedRevenuePerTonne) {
        this.estimatedRevenuePerTonne = estimatedRevenuePerTonne;
    }

    public String getInvestmentLevel() {
        return investmentLevel;
    }

    public void setInvestmentLevel(String investmentLevel) {
        this.investmentLevel = investmentLevel;
    }

    public BigDecimal getCarbonReductionPerTonne() {
        return carbonReductionPerTonne;
    }

    public void setCarbonReductionPerTonne(BigDecimal carbonReductionPerTonne) {
        this.carbonReductionPerTonne = carbonReductionPerTonne;
    }

    public List<String> getBuyerCategories() {
        return buyerCategories;
    }

    public void setBuyerCategories(List<String> buyerCategories) {
        this.buyerCategories = buyerCategories;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
