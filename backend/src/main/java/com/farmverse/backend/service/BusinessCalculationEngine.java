package com.farmverse.backend.service;

import com.farmverse.backend.dto.planner.CalculatePlanRequest;
import com.farmverse.backend.dto.planner.PlanCalculationResultDto;
import com.farmverse.backend.dto.planner.PlanCalculationResultDto.ScenarioAlternativeDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessCalculationEngine {

    private static final int SCALE = 2;
    private static final RoundingMode ROUNDING_MODE = RoundingMode.HALF_UP;

    public PlanCalculationResultDto calculate(CalculatePlanRequest request) {
        BigDecimal seedCost = nullSafe(request.getSeedCost());
        BigDecimal fertilizerCost = nullSafe(request.getFertilizerCost());
        BigDecimal laborCost = nullSafe(request.getLaborCost());
        BigDecimal irrigationCost = nullSafe(request.getIrrigationCost());
        BigDecimal machineryCost = nullSafe(request.getMachineryCost());
        BigDecimal transportCost = nullSafe(request.getTransportCost());
        BigDecimal contingencyPercent = request.getContingencyPercent() != null ? request.getContingencyPercent() : new BigDecimal("10.00");

        BigDecimal directCostsTotal = seedCost
                .add(fertilizerCost)
                .add(laborCost)
                .add(irrigationCost)
                .add(machineryCost)
                .add(transportCost)
                .setScale(SCALE, ROUNDING_MODE);

        BigDecimal contingencyAmount = directCostsTotal
                .multiply(contingencyPercent)
                .divide(new BigDecimal("100"), SCALE, ROUNDING_MODE);

        BigDecimal totalCost = directCostsTotal.add(contingencyAmount).setScale(SCALE, ROUNDING_MODE);

        BigDecimal landSize = request.getLandSize() != null && request.getLandSize().compareTo(BigDecimal.ZERO) > 0
                ? request.getLandSize()
                : BigDecimal.ONE;

        BigDecimal costPerAcre = totalCost.divide(landSize, SCALE, ROUNDING_MODE);

        BigDecimal expectedYield = nullSafe(request.getExpectedYieldQuintals());
        BigDecimal sellingPrice = nullSafe(request.getSellingPricePerQuintal());

        BigDecimal grossRevenue = expectedYield.multiply(sellingPrice).setScale(SCALE, ROUNDING_MODE);
        BigDecimal netProfit = grossRevenue.subtract(totalCost).setScale(SCALE, ROUNDING_MODE);
        BigDecimal profitPerAcre = netProfit.divide(landSize, SCALE, ROUNDING_MODE);

        BigDecimal roiPercent = BigDecimal.ZERO;
        if (totalCost.compareTo(BigDecimal.ZERO) > 0) {
            roiPercent = netProfit.multiply(new BigDecimal("100")).divide(totalCost, SCALE, ROUNDING_MODE);
        }

        BigDecimal breakEvenPrice = BigDecimal.ZERO;
        if (expectedYield.compareTo(BigDecimal.ZERO) > 0) {
            breakEvenPrice = totalCost.divide(expectedYield, SCALE, ROUNDING_MODE);
        }

        // 3 Sensitivity Scenarios: Pessimistic, Realistic, Optimistic
        List<ScenarioAlternativeDto> scenarios = new ArrayList<>();

        // 1. Pessimistic (-20% yield, -15% price)
        BigDecimal pessYield = expectedYield.multiply(new BigDecimal("0.80")).setScale(SCALE, ROUNDING_MODE);
        BigDecimal pessPrice = sellingPrice.multiply(new BigDecimal("0.85")).setScale(SCALE, ROUNDING_MODE);
        BigDecimal pessRevenue = pessYield.multiply(pessPrice).setScale(SCALE, ROUNDING_MODE);
        BigDecimal pessProfit = pessRevenue.subtract(totalCost).setScale(SCALE, ROUNDING_MODE);
        scenarios.add(new ScenarioAlternativeDto("Pessimistic (-20% Yield, -15% Price)", pessYield, pessPrice, pessProfit));

        // 2. Realistic (Base values)
        scenarios.add(new ScenarioAlternativeDto("Realistic (Expected Market Baseline)", expectedYield, sellingPrice, netProfit));

        // 3. Optimistic (+15% yield, +10% price)
        BigDecimal optYield = expectedYield.multiply(new BigDecimal("1.15")).setScale(SCALE, ROUNDING_MODE);
        BigDecimal optPrice = sellingPrice.multiply(new BigDecimal("1.10")).setScale(SCALE, ROUNDING_MODE);
        BigDecimal optRevenue = optYield.multiply(optPrice).setScale(SCALE, ROUNDING_MODE);
        BigDecimal optProfit = optRevenue.subtract(totalCost).setScale(SCALE, ROUNDING_MODE);
        scenarios.add(new ScenarioAlternativeDto("Optimistic (+15% Yield, +10% Price)", optYield, optPrice, optProfit));

        PlanCalculationResultDto result = new PlanCalculationResultDto();
        result.setPlanName(request.getPlanName());
        result.setCropName(request.getCropName());
        result.setLandSize(request.getLandSize());
        result.setLandUnit(request.getLandUnit() != null ? request.getLandUnit() : "Acres");
        result.setDirectCostsTotal(directCostsTotal);
        result.setContingencyAmount(contingencyAmount);
        result.setTotalCost(totalCost);
        result.setCostPerAcre(costPerAcre);
        result.setGrossRevenue(grossRevenue);
        result.setNetProfit(netProfit);
        result.setProfitPerAcre(profitPerAcre);
        result.setRoiPercent(roiPercent);
        result.setBreakEvenPricePerQuintal(breakEvenPrice);
        result.setScenarioAlternatives(scenarios);

        return result;
    }

    private BigDecimal nullSafe(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO;
    }
}
