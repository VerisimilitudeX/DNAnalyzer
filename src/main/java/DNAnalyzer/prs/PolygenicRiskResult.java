package DNAnalyzer.prs;

import DNAnalyzer.prs.PolygenicRiskCalculator.VariantContribution;

import java.util.List;

/**
 * Value object with summary statistics for a polygenic risk score calculation.
 */
public record PolygenicRiskResult(
        String name,
        int totalVariants,
        int matchedVariants,
        int missingVariants,
        double rawScore,
        double normalisedScore,
        double coverage,
        List<VariantContribution> contributions
) {
}

