package com.farmverse.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "farm_business_plans")
public class FarmBusinessPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_profile_id")
    private FarmProfile farmProfile;

    @Column(name = "plan_name", nullable = false, length = 150)
    private String planName;

    @Column(name = "crop_name", nullable = false, length = 100)
    private String cropName;

    @Column(name = "land_size", nullable = false, precision = 10, scale = 2)
    private BigDecimal landSize;

    @Column(name = "land_unit", nullable = false, length = 20)
    private String landUnit = "Acres";

    @Column(name = "seed_cost", nullable = false, precision = 12, scale = 2)
    private BigDecimal seedCost = BigDecimal.ZERO;

    @Column(name = "fertilizer_cost", nullable = false, precision = 12, scale = 2)
    private BigDecimal fertilizerCost = BigDecimal.ZERO;

    @Column(name = "labor_cost", nullable = false, precision = 12, scale = 2)
    private BigDecimal laborCost = BigDecimal.ZERO;

    @Column(name = "irrigation_cost", nullable = false, precision = 12, scale = 2)
    private BigDecimal irrigationCost = BigDecimal.ZERO;

    @Column(name = "machinery_cost", nullable = false, precision = 12, scale = 2)
    private BigDecimal machineryCost = BigDecimal.ZERO;

    @Column(name = "transport_cost", nullable = false, precision = 12, scale = 2)
    private BigDecimal transportCost = BigDecimal.ZERO;

    @Column(name = "contingency_percent", nullable = false, precision = 5, scale = 2)
    private BigDecimal contingencyPercent = new BigDecimal("10.00");

    @Column(name = "expected_yield_quintals", nullable = false, precision = 10, scale = 2)
    private BigDecimal expectedYieldQuintals;

    @Column(name = "selling_price_per_quintal", nullable = false, precision = 12, scale = 2)
    private BigDecimal sellingPricePerQuintal;

    @Column(name = "total_cost", nullable = false, precision = 14, scale = 2)
    private BigDecimal totalCost;

    @Column(name = "gross_revenue", nullable = false, precision = 14, scale = 2)
    private BigDecimal grossRevenue;

    @Column(name = "net_profit", nullable = false, precision = 14, scale = 2)
    private BigDecimal netProfit;

    @Column(name = "roi_percent", nullable = false, precision = 8, scale = 2)
    private BigDecimal roiPercent;

    @Column(name = "break_even_price_per_quintal", nullable = false, precision = 12, scale = 2)
    private BigDecimal breakEvenPricePerQuintal;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public FarmBusinessPlan() {
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

    public FarmProfile getFarmProfile() {
        return farmProfile;
    }

    public void setFarmProfile(FarmProfile farmProfile) {
        this.farmProfile = farmProfile;
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

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
