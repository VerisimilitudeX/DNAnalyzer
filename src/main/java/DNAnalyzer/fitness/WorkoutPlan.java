/*
 * Copyright © 2025 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Simple representation of a workout plan derived from DNA metrics.
 * This is provided for demonstration and is not medical advice.
 */
package DNAnalyzer.fitness;

import java.util.List;

/**
 * Represents a basic workout plan consisting of textual recommendations.
 */
public class WorkoutPlan {
  private final List<String> workouts;

  public WorkoutPlan(List<String> workouts) {
    this.workouts = workouts;
  }

  /** Returns the workout recommendations. */
  public List<String> getWorkouts() {
    return workouts;
  }
}
