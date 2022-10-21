package DNAnalyzer;

/**
 * Functionality for dna
 * @param dna the dna sequence
 */
public record Dna(String dna) {
    public void isValid() {
        if (!dna.matches("[atgc]+")) {
            throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
        }
    }
    public Dna replace(String input, String replacement) {
        return new Dna(this.dna.replace(input, replacement));
    }

    public Dna reverse() {
        return new Dna(new StringBuilder(dna).reverse().toString());
    }

    public String getDna() {
        return dna;
    }
}
