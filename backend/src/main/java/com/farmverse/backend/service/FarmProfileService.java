package com.farmverse.backend.service;

import com.farmverse.backend.dto.farm.CreateFarmProfileRequest;
import com.farmverse.backend.dto.farm.FarmProfileResponse;
import com.farmverse.backend.dto.farm.UpdateFarmProfileRequest;
import com.farmverse.backend.entity.FarmProfile;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.exception.ResourceNotFoundException;
import com.farmverse.backend.repository.FarmProfileRepository;
import com.farmverse.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class FarmProfileService {

    private final FarmProfileRepository farmProfileRepository;
    private final UserRepository userRepository;

    public FarmProfileService(FarmProfileRepository farmProfileRepository, UserRepository userRepository) {
        this.farmProfileRepository = farmProfileRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public FarmProfileResponse getProfileByUserId(UUID userId) {
        FarmProfile profile = farmProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm profile not found for user: " + userId));
        return toResponse(profile);
    }

    @Transactional
    public FarmProfileResponse createOrUpdate(UUID userId, CreateFarmProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        FarmProfile profile = farmProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    FarmProfile p = new FarmProfile();
                    p.setUser(user);
                    return p;
                });

        if (request.getFarmName() != null) {
            profile.setFarmName(request.getFarmName().trim());
        }
        profile.setState(request.getState().trim());
        profile.setDistrict(request.getDistrict().trim());
        profile.setVillage(request.getVillage() != null ? request.getVillage().trim() : null);
        profile.setLandSize(request.getLandSize());
        profile.setLandUnit(request.getLandUnit() != null ? request.getLandUnit() : "Acres");
        profile.setSoilType(request.getSoilType());
        profile.setWaterAvailability(request.getWaterAvailability());
        profile.setBudgetRange(request.getBudgetRange());
        profile.setFarmingExperience(request.getFarmingExperience());

        if (request.getMachineryAvailable() != null) {
            profile.setMachineryAvailable(new ArrayList<>(request.getMachineryAvailable()));
        }
        if (request.getCropsGrown() != null) {
            profile.setCropsGrown(new ArrayList<>(request.getCropsGrown()));
        }
        profile.setOnboarded(true);

        FarmProfile saved = farmProfileRepository.save(profile);
        return toResponse(saved);
    }

    @Transactional
    public FarmProfileResponse update(UUID userId, UpdateFarmProfileRequest request) {
        FarmProfile profile = farmProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm profile not found for user: " + userId));

        if (request.getFarmName() != null) {
            profile.setFarmName(request.getFarmName().trim());
        }
        if (request.getState() != null) {
            profile.setState(request.getState().trim());
        }
        if (request.getDistrict() != null) {
            profile.setDistrict(request.getDistrict().trim());
        }
        if (request.getVillage() != null) {
            profile.setVillage(request.getVillage().trim());
        }
        if (request.getLandSize() != null) {
            profile.setLandSize(request.getLandSize());
        }
        if (request.getLandUnit() != null) {
            profile.setLandUnit(request.getLandUnit());
        }
        if (request.getSoilType() != null) {
            profile.setSoilType(request.getSoilType());
        }
        if (request.getWaterAvailability() != null) {
            profile.setWaterAvailability(request.getWaterAvailability());
        }
        if (request.getBudgetRange() != null) {
            profile.setBudgetRange(request.getBudgetRange());
        }
        if (request.getFarmingExperience() != null) {
            profile.setFarmingExperience(request.getFarmingExperience());
        }
        if (request.getMachineryAvailable() != null) {
            profile.setMachineryAvailable(new ArrayList<>(request.getMachineryAvailable()));
        }
        if (request.getCropsGrown() != null) {
            profile.setCropsGrown(new ArrayList<>(request.getCropsGrown()));
        }

        FarmProfile saved = farmProfileRepository.save(profile);
        return toResponse(saved);
    }

    @Transactional
    public void deleteProfile(UUID userId) {
        FarmProfile profile = farmProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm profile not found for user: " + userId));
        farmProfileRepository.delete(profile);
    }

    public FarmProfileResponse toResponse(FarmProfile farmProfile) {
        FarmProfileResponse resp = new FarmProfileResponse();
        resp.setId(farmProfile.getId());
        resp.setUserId(farmProfile.getUser().getId());
        resp.setFarmerName(farmProfile.getUser().getFullName());
        resp.setFarmName(farmProfile.getFarmName());
        resp.setState(farmProfile.getState());
        resp.setDistrict(farmProfile.getDistrict());
        resp.setVillage(farmProfile.getVillage());
        resp.setLandSize(farmProfile.getLandSize());
        resp.setLandUnit(farmProfile.getLandUnit());
        resp.setSoilType(farmProfile.getSoilType());
        resp.setWaterAvailability(farmProfile.getWaterAvailability());
        resp.setBudgetRange(farmProfile.getBudgetRange());
        resp.setFarmingExperience(farmProfile.getFarmingExperience());
        resp.setMachineryAvailable(farmProfile.getMachineryAvailable() != null ? new ArrayList<>(farmProfile.getMachineryAvailable()) : new ArrayList<>());
        resp.setCropsGrown(farmProfile.getCropsGrown() != null ? new ArrayList<>(farmProfile.getCropsGrown()) : new ArrayList<>());
        resp.setOnboarded(farmProfile.isOnboarded());
        resp.setCreatedAt(farmProfile.getCreatedAt());
        resp.setUpdatedAt(farmProfile.getUpdatedAt());
        return resp;
    }
}
