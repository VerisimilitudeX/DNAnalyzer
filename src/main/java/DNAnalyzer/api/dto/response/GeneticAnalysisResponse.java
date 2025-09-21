package DNAnalyzer.api.dto.response;

import java.util.List;

public record GeneticAnalysisResponse(
        String fileName,
        int variantCount,
        double callRate,
        AncestrySummary ancestry,
        List<RiskScore> riskScores,
        List<String> warnings) {

    public record AncestrySummary(String bestPopulation,
            double bestMatchRate,
            List<PopulationMatch> populations,
            String formattedSummary) {
    }

    public record PopulationMatch(String population,
            double matchRate,
            int matchedMarkers,
            int comparedMarkers,
            int totalMarkers,
            int missingMarkers) {
    }

    public record RiskScore(String name,
            double rawScore,
            double normalisedScore,
            double coverage,
            int matchedVariants,
            int missingVariants,
            List<RiskVariant> variants) {
    }

    public record RiskVariant(String rsid,
            String genotype,
            String riskAllele,
            int dosage,
            double weight,
            double contribution,
            boolean matched,
            String note) {
    }
}
