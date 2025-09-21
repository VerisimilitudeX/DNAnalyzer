package DNAnalyzer.prs;

import DNAnalyzer.prs.GenotypeData.GenotypeRecord;
import DNAnalyzer.prs.RiskWeightTable.RiskWeightEntry;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Applies SNP weights to a genotype dataset in order to compute polygenic risk scores.
 */
public final class PolygenicRiskCalculator {

    public PolygenicRiskResult calculate(GenotypeData genotypeData, RiskWeightTable weightTable) {
        List<VariantContribution> contributions = new ArrayList<>();

        double rawScore = 0.0;
        double maxMagnitude = 0.0;
        int matched = 0;
        int missing = 0;

        for (RiskWeightEntry entry : weightTable.entries()) {
            maxMagnitude += Math.abs(entry.weight()) * 2.0d;

            GenotypeRecord record = genotypeData.get(entry.rsid()).orElse(null);
            if (record == null) {
                missing++;
                contributions.add(VariantContribution.missing(entry.rsid(), entry.riskAllele(), entry.weight(), "No genotype call"));
                continue;
            }

            int dosage = record.countAllele(entry.riskAllele());
            if (dosage < 0) {
                missing++;
                contributions.add(VariantContribution.missing(entry.rsid(), entry.riskAllele(), entry.weight(), "Uncallable genotype: " + record.genotype()));
                continue;
            }

            double contribution = dosage * entry.weight();
            rawScore += contribution;
            matched++;
            contributions.add(VariantContribution.matched(record.rsid(), record.genotype(), entry.riskAllele(), dosage, entry.weight(), contribution));
        }

        double normalisedScore = maxMagnitude == 0.0 ? 0.0 : rawScore / maxMagnitude;
        double coverage = weightTable.entries().isEmpty() ? 0.0 : matched / (double) weightTable.entries().size();

        return new PolygenicRiskResult(
                weightTable.name(),
                weightTable.entries().size(),
                matched,
                missing,
                rawScore,
                normalisedScore,
                coverage,
                Collections.unmodifiableList(contributions)
        );
    }

    /**
     * Individual SNP contribution towards the overall score.
     */
    public record VariantContribution(
            String rsid,
            String genotype,
            String riskAllele,
            int dosage,
            double weight,
            double contribution,
            boolean matched,
            String note
    ) {

        private static VariantContribution matched(
                String rsid,
                String genotype,
                String riskAllele,
                int dosage,
                double weight,
                double contribution
        ) {
            return new VariantContribution(rsid, genotype, riskAllele, dosage, weight, contribution, true, "");
        }

        private static VariantContribution missing(
                String rsid,
                String riskAllele,
                double weight,
                String note
        ) {
            return new VariantContribution(rsid, "--", riskAllele, -1, weight, 0.0d, false, note);
        }
    }
}

