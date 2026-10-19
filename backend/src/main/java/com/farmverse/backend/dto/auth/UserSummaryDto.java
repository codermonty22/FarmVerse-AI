package com.farmverse.backend.dto.auth;

import java.util.UUID;

public class UserSummaryDto {

    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private String role;
    private String preferredLanguage;

    public UserSummaryDto() {
    }

    public UserSummaryDto(UUID id, String fullName, String email, String phone, String role, String preferredLanguage) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.preferredLanguage = preferredLanguage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }
}
