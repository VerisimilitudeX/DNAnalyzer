/*
 * Copyright © 2025 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code provides a simplified representation of genetic metrics used to
 * generate a workout plan. It is not intended for medical or scientific use.
 * For further inquiries, please contact reach out to contact@dnanalyzer.live
 */
package DNAnalyzer.fitness;

/**
 * Container for basic genetic metrics related to fitness traits.
 * Values range from 0.0 to 1.0 and are purely illustrative.
 */
public record FitnessGenes(
    double muscleFiberGene,
    double vo2MaxGene,
    double injuryRiskGene,
    double recoveryGene) {}
