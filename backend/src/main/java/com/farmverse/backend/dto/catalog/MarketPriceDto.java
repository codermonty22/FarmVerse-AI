package com.farmverse.backend.dto.catalog;

import java.math.BigDecimal;
import java.util.List;

public class MarketPriceDto {

    private String id;
    private String commodity;
    private String variety;
    private String market;
    private String district;
    private String state;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal modalPrice;
    private String priceDate;
    private String trend; // UP, DOWN, STABLE
    private BigDecimal arrivalsTonnes;
    private BigDecimal priceChangePercentage;
    private List<HistoricalPricePointDto> historical7Days;

    public MarketPriceDto() {
    }

    public static class HistoricalPricePointDto {
        private String date;
        private BigDecimal price;

        public HistoricalPricePointDto() {
        }

        public HistoricalPricePointDto(String date, BigDecimal price) {
            this.date = date;
            this.price = price;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCommodity() {
        return commodity;
    }

    public void setCommodity(String commodity) {
        this.commodity = commodity;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public String getMarket() {
        return market;
    }

    public void setMarket(String market) {
        this.market = market;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(BigDecimal minPrice) {
        this.minPrice = minPrice;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(BigDecimal maxPrice) {
        this.maxPrice = maxPrice;
    }

    public BigDecimal getModalPrice() {
        return modalPrice;
    }

    public void setModalPrice(BigDecimal modalPrice) {
        this.modalPrice = modalPrice;
    }

    public String getPriceDate() {
        return priceDate;
    }

    public void setPriceDate(String priceDate) {
        this.priceDate = priceDate;
    }

    public String getTrend() {
        return trend;
    }

    public void setTrend(String trend) {
        this.trend = trend;
    }

    public BigDecimal getArrivalsTonnes() {
        return arrivalsTonnes;
    }

    public void setArrivalsTonnes(BigDecimal arrivalsTonnes) {
        this.arrivalsTonnes = arrivalsTonnes;
    }

    public BigDecimal getPriceChangePercentage() {
        return priceChangePercentage;
    }

    public void setPriceChangePercentage(BigDecimal priceChangePercentage) {
        this.priceChangePercentage = priceChangePercentage;
    }

    public List<HistoricalPricePointDto> getHistorical7Days() {
        return historical7Days;
    }

    public void setHistorical7Days(List<HistoricalPricePointDto> historical7Days) {
        this.historical7Days = historical7Days;
    }
}
