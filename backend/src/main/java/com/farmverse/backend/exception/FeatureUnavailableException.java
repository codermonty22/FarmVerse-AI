package com.farmverse.backend.exception;

import com.farmverse.backend.common.AvailabilityStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class FeatureUnavailableException extends RuntimeException {

    private final String featureKey;
    private final AvailabilityStatus status;
    private final List<String> missingPrerequisites;

    public FeatureUnavailableException(String featureKey, String message, AvailabilityStatus status, List<String> missingPrerequisites) {
        super(message);
        this.featureKey = featureKey;
        this.status = status;
        this.missingPrerequisites = missingPrerequisites;
    }

    public String getFeatureKey() {
        return featureKey;
    }

    public AvailabilityStatus getStatus() {
        return status;
    }

    public List<String> getMissingPrerequisites() {
        return missingPrerequisites;
    }
}
