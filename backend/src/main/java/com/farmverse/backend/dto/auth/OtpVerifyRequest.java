package com.farmverse.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OtpVerifyRequest {

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "OTP code is required")
    @Size(min = 4, max = 6, message = "OTP code must be 4 to 6 digits")
    private String otpCode;

    public OtpVerifyRequest() {
    }

    public OtpVerifyRequest(String phone, String otpCode) {
        this.phone = phone;
        this.otpCode = otpCode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }
}
