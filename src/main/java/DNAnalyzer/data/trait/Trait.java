package DNAnalyzer.data.trait;

/**
 * Simple record representing a trait prediction rule.
 */
public record Trait(
    String name,
    String snp,
    String allele,
    String positivePrediction,
    String negativePrediction) {}
