package com.farmverse.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MobileOtpRequest {

    @NotBlank(message = "Phone number is required")
    @Size(min = 10, max = 15, message = "Phone must be a valid 10-15 digit number")
    private String phone;

    public MobileOtpRequest() {
    }

    public MobileOtpRequest(String phone) {
        this.phone = phone;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
