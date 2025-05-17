package DNAnalyzer.core;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility for calculating polygenic risk scores based on a map of SNP
 * genotypes and a CSV file of weights.
 */
public class PolygenicRiskCalculator {

    /**
     * Container for an allele and its associated weight.
     *
     * @param allele risk allele character
     * @param weight weight for each copy of the allele
     */
    public record RiskWeight(char allele, double weight) {}

    /**
     * Load risk allele weights from a CSV file. The CSV must contain three
     * columns: SNP identifier, risk allele, and numeric weight. Lines starting
     * with '#' are ignored.
     *
     * @param filePath path to the CSV file
     * @return map of SNP to RiskWeight
     * @throws IOException if the file cannot be read
     */
    public static Map<String, RiskWeight> loadWeights(String filePath) throws IOException {
        Map<String, RiskWeight> weights = new HashMap<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("#") || line.trim().isEmpty()) {
                    continue;
                }
                String[] parts = line.split(",");
                if (parts.length < 3) {
                    continue;
                }
                String snp = parts[0].trim();
                char allele = parts[1].trim().toUpperCase().charAt(0);
                double weight = Double.parseDouble(parts[2].trim());
                weights.put(snp, new RiskWeight(allele, weight));
            }
        }
        return weights;
    }

    /**
     * Compute the polygenic risk score using genotype data and allele weights.
     * Each occurrence of the risk allele contributes its weight to the score.
     *
     * @param genotypeData map of SNP identifier to genotype string (e.g. "AG")
     * @param weights map of SNP identifier to RiskWeight
     * @return calculated risk score
     */
    public static double computeScore(
            Map<String, String> genotypeData, Map<String, RiskWeight> weights) {
        double score = 0.0;
        for (Map.Entry<String, RiskWeight> entry : weights.entrySet()) {
            String snp = entry.getKey();
            RiskWeight weight = entry.getValue();
            String genotype = genotypeData.get(snp);
            if (genotype == null) {
                continue;
            }
            char allele = weight.allele();
            int count = 0;
            for (char g : genotype.toUpperCase().toCharArray()) {
                if (g == allele) {
                    count++;
                }
            }
            score += count * weight.weight();
        }
        return score;
    }

    private PolygenicRiskCalculator() {}
}
