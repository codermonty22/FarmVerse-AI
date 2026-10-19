package com.farmverse.backend.dto.auth;

import com.farmverse.backend.dto.farm.FarmProfileResponse;

public class AuthResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private UserSummaryDto user;
    private FarmProfileResponse farmProfile;

    public AuthResponse() {
    }

    public AuthResponse(String accessToken, UserSummaryDto user, FarmProfileResponse farmProfile) {
        this.accessToken = accessToken;
        this.user = user;
        this.farmProfile = farmProfile;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public UserSummaryDto getUser() {
        return user;
    }

    public void setUser(UserSummaryDto user) {
        this.user = user;
    }

    public FarmProfileResponse getFarmProfile() {
        return farmProfile;
    }

    public void setFarmProfile(FarmProfileResponse farmProfile) {
        this.farmProfile = farmProfile;
    }
}
