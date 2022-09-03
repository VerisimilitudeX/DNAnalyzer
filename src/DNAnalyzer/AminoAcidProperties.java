package DNAnalyzer;

import java.util.HashMap;

public class AminoAcidProperties {
    private final HashMap<String, Integer> codonCounts;
    private final String dna;

    // Variables for reading frame properties
    private final int readingFrame;
    private final int min;
    private final int max;

    // Constructor to get the DNA sequence and reading frame properties
    public AminoAcidProperties(final String dna, final int startRefFrame, final int min, final int max) {
        codonCounts = new HashMap<>();
        this.readingFrame = startRefFrame;
        this.min = min;
        this.max = max;
        this.dna = dna;
    }

    // Method to get the codon counts in the specified reading frame
    private void buildCodonMap(final int readingFrame2, final String dna) {
        codonCounts.clear();
        for (int i = (int) readingFrame2; i < dna.length(); i += 3) {
            try {
                if (codonCounts.containsKey(dna.substring(i, i + 3))) {
                    codonCounts.put(dna.substring(i, i + 3), codonCounts.get(dna.substring(i, i + 3)) + 1);
                } else {
                    codonCounts.put(dna.substring(i, i + 3), 1);
                }
            } catch (final Exception e) {
                // do nothing
            }
        }
    }

    // Method to filter through the codon counts found in the specified reading
    // frame based on the min and max values
    public void printCodonCounts() {
        buildCodonMap(readingFrame, dna);
        System.out.println("Codons in reading frame " + readingFrame + " (" + min + "-" + max + " occurrences)" + ":");
        System.out.println("----------------------------------------------------");
        for (final String codon : codonCounts.keySet()) {
            if (codonCounts.get(codon) >= min && codonCounts.get(codon) <= max) {
                System.out.println(codon.toUpperCase() + ": " + codonCounts.get(codon));
            }
        }
    }
}
