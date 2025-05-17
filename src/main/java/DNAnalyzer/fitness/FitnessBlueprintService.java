/*
 * Copyright © 2025 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This class generates a very simple workout plan based on genetic markers.
 * The logic is illustrative only and should not be considered scientific advice.
 */
package DNAnalyzer.fitness;

import java.util.ArrayList;
import java.util.List;

/** Utility for building a minimal fitness blueprint from genetic data. */
public class FitnessBlueprintService {

  /**
   * Build a workout plan using basic heuristics.
   *
   * @param genes Metrics representing relative trait values from 0.0 to 1.0
   * @return A basic workout plan
   */
  public WorkoutPlan buildPlan(FitnessGenes genes) {
    List<String> plan = new ArrayList<>();

    // Muscle fiber gene influences strength vs endurance emphasis
    if (genes.muscleFiberGene() > 0.5) {
      plan.add("Focus on strength training 3x per week.");
    } else {
      plan.add("Focus on endurance training 3x per week.");
    }

    // VO2 max gene influences cardio style
    if (genes.vo2MaxGene() > 0.5) {
      plan.add("Include interval cardio sessions.");
    } else {
      plan.add("Include steady-state cardio sessions.");
    }

    // Injury risk gene adjusts mobility work
    if (genes.injuryRiskGene() > 0.5) {
      plan.add("Incorporate extra mobility and warm-up exercises.");
    }

    // Recovery gene adjusts rest periods
    if (genes.recoveryGene() < 0.5) {
      plan.add("Schedule additional rest days.");
    }

    return new WorkoutPlan(plan);
  }
}
