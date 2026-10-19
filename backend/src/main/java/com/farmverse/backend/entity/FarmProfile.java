package com.farmverse.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "farm_profiles")
public class FarmProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "farm_name", length = 150)
    private String farmName;

    @Column(nullable = false, length = 80)
    private String state;

    @Column(nullable = false, length = 80)
    private String district;

    @Column(length = 100)
    private String village;

    @Column(name = "land_size", nullable = false, precision = 10, scale = 2)
    private BigDecimal landSize;

    @Column(name = "land_unit", nullable = false, length = 20)
    private String landUnit = "Acres";

    @Column(name = "soil_type", length = 60)
    private String soilType;

    @Column(name = "water_availability", length = 80)
    private String waterAvailability;

    @Column(name = "budget_range", length = 60)
    private String budgetRange;

    @Column(name = "farming_experience", length = 50)
    private String farmingExperience;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "farm_machinery", joinColumns = @JoinColumn(name = "farm_profile_id"))
    @Column(name = "machinery_name")
    private List<String> machineryAvailable;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "farm_crops_grown", joinColumns = @JoinColumn(name = "farm_profile_id"))
    @Column(name = "crop_name")
    private List<String> cropsGrown;

    @Column(name = "is_onboarded", nullable = false)
    private boolean onboarded = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public FarmProfile() {
    }

    public FarmProfile(User user, String state, String district, String village, BigDecimal landSize, String landUnit, String soilType, String waterAvailability) {
        this.user = user;
        this.state = state;
        this.district = district;
        this.village = village;
        this.landSize = landSize;
        this.landUnit = landUnit != null ? landUnit : "Acres";
        this.soilType = soilType;
        this.waterAvailability = waterAvailability;
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public boolean isOnboarded() {
        return onboarded;
    }

    public void setOnboarded(boolean onboarded) {
        this.onboarded = onboarded;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
