package com.farmverse.backend.dto.dashboard;

import com.farmverse.backend.dto.farm.FarmProfileResponse;
import com.farmverse.backend.dto.planner.SavedPlanResponse;
import java.math.BigDecimal;
import java.util.List;

public class DashboardSummaryResponse {

    private FarmProfileResponse farmProfile;
    private long totalSavedPlansCount;
    private long totalWasteSubmissionsCount;
    private BigDecimal totalProjectedInvestment;
    private BigDecimal totalProjectedRevenue;
    private BigDecimal totalProjectedProfit;
    private List<SavedPlanResponse> recentBusinessPlans;

    // Availability flags for data-dependent sections
    private boolean marketDataFeedConfigured;
    private boolean diseaseScannerServiceConfigured;
    private boolean mlRecommendationEngineConfigured;

    public DashboardSummaryResponse() {
    }

    public FarmProfileResponse getFarmProfile() {
        return farmProfile;
    }

    public void setFarmProfile(FarmProfileResponse farmProfile) {
        this.farmProfile = farmProfile;
    }

    public long getTotalSavedPlansCount() {
        return totalSavedPlansCount;
    }

    public void setTotalSavedPlansCount(long totalSavedPlansCount) {
        this.totalSavedPlansCount = totalSavedPlansCount;
    }

    public long getTotalWasteSubmissionsCount() {
        return totalWasteSubmissionsCount;
    }

    public void setTotalWasteSubmissionsCount(long totalWasteSubmissionsCount) {
        this.totalWasteSubmissionsCount = totalWasteSubmissionsCount;
    }

    public BigDecimal getTotalProjectedInvestment() {
        return totalProjectedInvestment;
    }

    public void setTotalProjectedInvestment(BigDecimal totalProjectedInvestment) {
        this.totalProjectedInvestment = totalProjectedInvestment;
    }

    public BigDecimal getTotalProjectedRevenue() {
        return totalProjectedRevenue;
    }

    public void setTotalProjectedRevenue(BigDecimal totalProjectedRevenue) {
        this.totalProjectedRevenue = totalProjectedRevenue;
    }

    public BigDecimal getTotalProjectedProfit() {
        return totalProjectedProfit;
    }

    public void setTotalProjectedProfit(BigDecimal totalProjectedProfit) {
        this.totalProjectedProfit = totalProjectedProfit;
    }

    public List<SavedPlanResponse> getRecentBusinessPlans() {
        return recentBusinessPlans;
    }

    public void setRecentBusinessPlans(List<SavedPlanResponse> recentBusinessPlans) {
        this.recentBusinessPlans = recentBusinessPlans;
    }

    public boolean isMarketDataFeedConfigured() {
        return marketDataFeedConfigured;
    }

    public void setMarketDataFeedConfigured(boolean marketDataFeedConfigured) {
        this.marketDataFeedConfigured = marketDataFeedConfigured;
    }

    public boolean isDiseaseScannerServiceConfigured() {
        return diseaseScannerServiceConfigured;
    }

    public void setDiseaseScannerServiceConfigured(boolean diseaseScannerServiceConfigured) {
        this.diseaseScannerServiceConfigured = diseaseScannerServiceConfigured;
    }

    public boolean isMlRecommendationEngineConfigured() {
        return mlRecommendationEngineConfigured;
    }

    public void setMlRecommendationEngineConfigured(boolean mlRecommendationEngineConfigured) {
        this.mlRecommendationEngineConfigured = mlRecommendationEngineConfigured;
    }
}
