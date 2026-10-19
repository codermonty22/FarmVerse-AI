package com.farmverse.backend.dto.catalog;

import java.util.List;

public class IndustryBuyerDto {

    private String id;
    private String companyName;
    private String buyerType;
    private List<String> commoditiesInterested;
    private Integer purchaseCapacityTonnesMonth;
    private String location;
    private String contactPerson;
    private String contactPhone;
    private String email;
    private String verificationStatus;
    private String procurementSeason;

    public IndustryBuyerDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getBuyerType() {
        return buyerType;
    }

    public void setBuyerType(String buyerType) {
        this.buyerType = buyerType;
    }

    public List<String> getCommoditiesInterested() {
        return commoditiesInterested;
    }

    public void setCommoditiesInterested(List<String> commoditiesInterested) {
        this.commoditiesInterested = commoditiesInterested;
    }

    public Integer getPurchaseCapacityTonnesMonth() {
        return purchaseCapacityTonnesMonth;
    }

    public void setPurchaseCapacityTonnesMonth(Integer purchaseCapacityTonnesMonth) {
        this.purchaseCapacityTonnesMonth = purchaseCapacityTonnesMonth;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public String getProcurementSeason() {
        return procurementSeason;
    }

    public void setProcurementSeason(String procurementSeason) {
        this.procurementSeason = procurementSeason;
    }
}
