package com.farmverse.backend.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class FeatureAvailabilityResponse<T> {

    private String featureKey;
    private AvailabilityStatus status;
    private String reason;
    private List<String> missingPrerequisites;
    private T payload;
    private Instant evaluatedAt;

    public FeatureAvailabilityResponse() {
        this.evaluatedAt = Instant.now();
    }

    public FeatureAvailabilityResponse(String featureKey, AvailabilityStatus status, String reason, List<String> missingPrerequisites, T payload) {
        this.featureKey = featureKey;
        this.status = status;
        this.reason = reason;
        this.missingPrerequisites = missingPrerequisites;
        this.payload = payload;
        this.evaluatedAt = Instant.now();
    }

    public static <T> FeatureAvailabilityResponse<T> available(String featureKey, T payload) {
        return new FeatureAvailabilityResponse<>(featureKey, AvailabilityStatus.AVAILABLE, "Feature operational and live data returned", null, payload);
    }

    public static <T> FeatureAvailabilityResponse<T> unavailable(String featureKey, AvailabilityStatus status, String reason, List<String> missingPrerequisites) {
        return new FeatureAvailabilityResponse<>(featureKey, status, reason, missingPrerequisites, null);
    }

    public String getFeatureKey() {
        return featureKey;
    }

    public void setFeatureKey(String featureKey) {
        this.featureKey = featureKey;
    }

    public AvailabilityStatus getStatus() {
        return status;
    }

    public void setStatus(AvailabilityStatus status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public List<String> getMissingPrerequisites() {
        return missingPrerequisites;
    }

    public void setMissingPrerequisites(List<String> missingPrerequisites) {
        this.missingPrerequisites = missingPrerequisites;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public Instant getEvaluatedAt() {
        return evaluatedAt;
    }

    public void setEvaluatedAt(Instant evaluatedAt) {
        this.evaluatedAt = evaluatedAt;
    }
}
