package com.farmverse.backend.service;

import com.farmverse.backend.common.ApiResponse;
import com.farmverse.backend.dto.auth.*;
import com.farmverse.backend.dto.farm.FarmProfileResponse;
import com.farmverse.backend.entity.FarmProfile;
import com.farmverse.backend.entity.Role;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.exception.BadRequestException;
import com.farmverse.backend.exception.ResourceNotFoundException;
import com.farmverse.backend.exception.UnauthorizedException;
import com.farmverse.backend.repository.FarmProfileRepository;
import com.farmverse.backend.repository.UserRepository;
import com.farmverse.backend.security.JwtTokenProvider;
import com.farmverse.backend.security.UserPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final FarmProfileRepository farmProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final FarmProfileService farmProfileService;

    public AuthService(UserRepository userRepository,
                       FarmProfileRepository farmProfileRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       FarmProfileService farmProfileService) {
        this.userRepository = userRepository;
        this.farmProfileRepository = farmProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.farmProfileService = farmProfileService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            if (userRepository.existsByEmail(request.getEmail().trim())) {
                throw new BadRequestException("An account with this email address already exists.");
            }
        }

        if (request.getPhone() != null && !request.getPhone().trim().isEmpty()) {
            if (userRepository.existsByPhone(request.getPhone().trim())) {
                throw new BadRequestException("An account with this mobile phone number already exists.");
            }
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail() != null && !request.getEmail().trim().isEmpty() ? request.getEmail().trim() : null);
        user.setPhone(request.getPhone() != null && !request.getPhone().trim().isEmpty() ? request.getPhone().trim() : null);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_FARMER);
        user.setPreferredLanguage(request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "en");
        user.setActive(true);

        User savedUser = userRepository.save(user);

        // Bootstrap basic farm profile
        FarmProfile farmProfile = new FarmProfile();
        farmProfile.setUser(savedUser);
        farmProfile.setFarmName(savedUser.getFullName() + "'s Farm");
        farmProfile.setState("Maharashtra");
        farmProfile.setDistrict("Nashik");
        farmProfile.setVillage("Niphad");
        farmProfile.setLandSize(new BigDecimal("5.00"));
        farmProfile.setLandUnit("Acres");
        farmProfile.setSoilType("Black Soil (Regur)");
        farmProfile.setWaterAvailability("Canal + Borewell (High)");
        farmProfile.setBudgetRange("Moderate (₹1L - ₹3L)");
        farmProfile.setFarmingExperience("10+ years");
        farmProfile.setMachineryAvailable(new ArrayList<>());
        farmProfile.setCropsGrown(new ArrayList<>());
        farmProfile.setOnboarded(true);

        farmProfileRepository.save(farmProfile);

        String token = jwtTokenProvider.generateTokenFromUserId(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail() != null ? savedUser.getEmail() : savedUser.getPhone());
        UserSummaryDto userSummary = toUserSummary(savedUser);
        FarmProfileResponse profileResponse = farmProfileService.toResponse(farmProfile);

        return new AuthResponse(token, userSummary, profileResponse);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String identifier = request.getIdentifier().trim();
        Optional<User> userOpt = identifier.contains("@")
                ? userRepository.findByEmail(identifier)
                : userRepository.findByPhone(identifier);

        if (userOpt.isEmpty()) {
            // Also try finding by phone if email search didn't match and vice-versa
            userOpt = userRepository.findByEmail(identifier);
            if (userOpt.isEmpty()) {
                userOpt = userRepository.findByPhone(identifier);
            }
        }

        if (userOpt.isEmpty()) {
            throw new UnauthorizedException("Invalid credentials. Please check your email/mobile or password.");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid credentials. Please check your email/mobile or password.");
        }

        if (!user.isActive()) {
            throw new UnauthorizedException("Your account is currently disabled. Please contact administrator.");
        }

        String principalSubject = user.getEmail() != null ? user.getEmail() : user.getPhone();
        String token = jwtTokenProvider.generateTokenFromUserId(
                user.getId(),
                user.getFullName(),
                principalSubject);
        UserSummaryDto userSummary = toUserSummary(user);

        FarmProfileResponse farmProfileResponse = farmProfileRepository.findByUserId(user.getId())
                .map(farmProfileService::toResponse)
                .orElse(null);

        return new AuthResponse(token, userSummary, farmProfileResponse);
    }

    @Transactional(readOnly = true)
    public UserSummaryDto getCurrentUser(UserPrincipal principal) {
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + principal.getId()));
        return toUserSummary(user);
    }

    @Transactional
    public UserSummaryDto updateProfile(UserPrincipal principal, UserSummaryDto updateDto) {
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + principal.getId()));

        if (updateDto.getFullName() != null && !updateDto.getFullName().trim().isEmpty()) {
            user.setFullName(updateDto.getFullName().trim());
        }
        if (updateDto.getPreferredLanguage() != null && !updateDto.getPreferredLanguage().trim().isEmpty()) {
            user.setPreferredLanguage(updateDto.getPreferredLanguage().trim());
        }

        User updated = userRepository.save(user);
        return toUserSummary(updated);
    }

    public ApiResponse<String> sendMobileOtp(MobileOtpRequest request) {
        String phone = request.getPhone().trim();
        // In real-world integration, SMS gateway like Twilio or Kaleyra/Gupshup is called.
        // For development sandbox, we provide deterministic verification OTP: 123456
        return ApiResponse.ok("OTP sent successfully to " + phone + ". (Demo verification OTP is 123456)", "123456");
    }

    @Transactional
    public AuthResponse verifyMobileOtp(OtpVerifyRequest request) {
        String phone = request.getPhone().trim();
        String otp = request.getOtpCode().trim();

        if (!"123456".equals(otp)) {
            throw new UnauthorizedException("Invalid OTP code. Please enter the valid 6-digit code.");
        }

        Optional<User> existingUser = userRepository.findByPhone(phone);
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
        } else {
            user = new User();
            user.setFullName("Kisan User");
            user.setPhone(phone);
            user.setPasswordHash(passwordEncoder.encode(UUID.randomUUID().toString()));
            user.setRole(Role.ROLE_FARMER);
            user.setPreferredLanguage("en");
            user.setActive(true);
            user = userRepository.save(user);

            FarmProfile farmProfile = new FarmProfile();
            farmProfile.setUser(user);
            farmProfile.setFarmName("My Farm");
            farmProfile.setState("Maharashtra");
            farmProfile.setDistrict("Nashik");
            farmProfile.setVillage("Niphad");
            farmProfile.setLandSize(new BigDecimal("5.00"));
            farmProfile.setLandUnit("Acres");
            farmProfile.setSoilType("Black Soil (Regur)");
            farmProfile.setWaterAvailability("Canal + Borewell (High)");
            farmProfile.setBudgetRange("Moderate (₹1L - ₹3L)");
            farmProfile.setFarmingExperience("5-10 years");
            farmProfileRepository.save(farmProfile);
        }

        String token = jwtTokenProvider.generateTokenFromUserId(
                user.getId(),
                user.getFullName(),
                user.getPhone());
        UserSummaryDto userSummary = toUserSummary(user);
        FarmProfileResponse farmProfileResponse = farmProfileRepository.findByUserId(user.getId())
                .map(farmProfileService::toResponse)
                .orElse(null);

        return new AuthResponse(token, userSummary, farmProfileResponse);
    }

    public UserSummaryDto toUserSummary(User user) {
        return new UserSummaryDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().name(),
                user.getPreferredLanguage()
        );
    }
}
