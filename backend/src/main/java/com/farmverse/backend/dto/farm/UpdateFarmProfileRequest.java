package com.farmverse.backend.dto.farm;

import java.math.BigDecimal;
import java.util.List;

public class UpdateFarmProfileRequest {

    private String farmName;
    private String state;
    private String district;
    private String village;
    private BigDecimal landSize;
    private String landUnit;
    private String soilType;
    private String waterAvailability;
    private String budgetRange;
    private String farmingExperience;
    private List<String> machineryAvailable;
    private List<String> cropsGrown;

    public UpdateFarmProfileRequest() {
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
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

    public String getSoilType() {
        return soilType;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public String getWaterAvailability() {
        return waterAvailability;
    }

    public void setWaterAvailability(String waterAvailability) {
        this.waterAvailability = waterAvailability;
    }

    public String getBudgetRange() {
        return budgetRange;
    }

    public void setBudgetRange(String budgetRange) {
        this.budgetRange = budgetRange;
    }

    public String getFarmingExperience() {
        return farmingExperience;
    }

    public void setFarmingExperience(String farmingExperience) {
        this.farmingExperience = farmingExperience;
    }

    public List<String> getMachineryAvailable() {
        return machineryAvailable;
    }

    public void setMachineryAvailable(List<String> machineryAvailable) {
        this.machineryAvailable = machineryAvailable;
    }

    public List<String> getCropsGrown() {
        return cropsGrown;
    }

    public void setCropsGrown(List<String> cropsGrown) {
        this.cropsGrown = cropsGrown;
    }
}
