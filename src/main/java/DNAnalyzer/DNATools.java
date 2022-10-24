package DNAnalyzer;

/**
 * Functionality for dna
 *
 * @param dna the dna sequence
 */
public record DNATools(String dna) {
    public void isValid() {
        if (!dna.matches("[atgc]+")) {
            throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
        }
    }

    public DNATools replace(final String input, final String replacement) {
        return new DNATools(this.dna.replace(input, replacement));
    }

    public DNATools reverse() {
        return new DNATools(new StringBuilder(dna).reverse().toString());
    }

    public String getDna() {
        return dna;
    }
}
