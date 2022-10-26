package DNAnalyzer;

import DNAnalyzer.codon.CodonFrame;
import DNAnalyzer.protein.ProteinAnalysis;
import DNAnalyzer.protein.ProteinFinder;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Optional.ofNullable;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * Provides functionality to analyze the DNA
 *
 * @param dna then DNA to be analyzed
 * @param protein the DNA sequence
 * @param aminoAcid name of amino acid
 */
public record DNAAnalysis(Dna dna, String protein, String aminoAcid) {

    public DNAAnalysis isValidDna() {
        dna.isValid();
        return this;
    }

    public DNAAnalysis replaceDNA(String input, String replacement) {
        return new DNAAnalysis(dna.replace(input, replacement), protein, aminoAcid);
    }

    public DNAAnalysis reverseDna() {
        return new DNAAnalysis(dna.reverse(), protein, aminoAcid);
    }

    // Create protein list
    // Output the proteins, GC content, and nucleotide cnt found in the DNA
    public DNAAnalysis printProteins() {
        ofNullable(dna).map(Dna::getDna).ifPresent(dna -> {
            Properties.printProteinList(getProteins(aminoAcid), aminoAcid);

            System.out.println("\nGC-content (genome): " + Properties.getGCContent(dna) + "\n");
            Properties.printNucleotideCount(dna);
        });
        return this;
    }

    // Output the number of codons based on the reading frame the user wants to look
    // at, and minimum and maximum filters
    public DNAAnalysis outPutCodons(int minCount, int maxCount) {
        final short READING_FRAME = 1;
        final String dna = this.dna.getDna();
        final ReadingFrames aap
                = new ReadingFrames(new CodonFrame(dna, READING_FRAME, minCount, maxCount));
        System.out.print("\n");
        aap.printCodonCounts();

        // Find protein sequence in DNA
        if (protein != null) {
            final Pattern p = Pattern.compile(protein);
            final Matcher m = p.matcher(dna);
            if (m.find()) {
                System.out.println(
                        "\nProtein sequence found at index " + m.start() + " in the DNA sequence.");
            } else {
                System.out.println("\nProtein sequence not found in the DNA sequence.");
            }
        }
        return this;
    }

    public DNAAnalysis printLongestProtein() {
        ProteinAnalysis.printLongestProtein(getProteins(aminoAcid));
        return this;
    }

    private List<String> getProteins(String aminoAcid) {
        return new ProteinFinder().getProtein(dna.getDna(), aminoAcid);
    }

    /**
     * countBasePairsStream returns total counts of each DNA base pair found in
     * the provided String.
     *
     * @param dnaString String of DNA bases. Accepts lowercase and uppercase
     * Strings.
     * @return returns an array of long(primitive type). long[0] = count of
     * ADENINE bases long[1] = count of THYMINE bases long[2] = count of GUANINE
     * bases long[3] = count of CYTOSINE bases
     *
     * Constants for the indices can be found in public static class
     * BasePairIndex for convenience/consistency.
     */
    public static long[] countBasePairs(String dnaString) {
        long[] basePairTotals = {0, 0, 0, 0};

        if (dnaString != null) {
            long aCount = dnaString.chars().parallel().filter(
                    c -> c == AsciiInt.UPPERCASE_A || c == AsciiInt.LOWERCASE_A)
                    .count();
            long tCount = dnaString.chars().parallel().filter(
                    c -> c == AsciiInt.UPPERCASE_T || c == AsciiInt.LOWERCASE_T)
                    .count();
            long gCount = dnaString.chars().parallel().filter(
                    c -> c == AsciiInt.UPPERCASE_G || c == AsciiInt.LOWERCASE_G)
                    .count();
            long cCount = dnaString.chars().parallel().filter(
                    c -> c == AsciiInt.UPPERCASE_C || c == AsciiInt.LOWERCASE_C)
                    .count();

            basePairTotals[BasePairIndex.ADENINE] = aCount;
            basePairTotals[BasePairIndex.THYMINE] = tCount;
            basePairTotals[BasePairIndex.GUANINE] = gCount;
            basePairTotals[BasePairIndex.CYTOSINE] = cCount;
        }

        return basePairTotals;
    }

    /**
     * Constants to be used as indices for the long[] returned by countBasePairs
     * and countBasePairsStream.
     */
    public static class BasePairIndex {

        public static final int ADENINE = 0;
        public static final int THYMINE = 1;
        public static final int GUANINE = 2;
        public static final int CYTOSINE = 3;
    }

    /**
     * Constants to obtain the corresponding ASCII int values for letters used
     * to represent DNA bases.
     */
    public static class AsciiInt {

        public static final int UPPERCASE_A = 65;
        public static final int UPPERCASE_T = 84;
        public static final int UPPERCASE_G = 71;
        public static final int UPPERCASE_C = 67;
        public static final int LOWERCASE_A = 97;
        public static final int LOWERCASE_T = 116;
        public static final int LOWERCASE_G = 103;
        public static final int LOWERCASE_C = 99;

    }
}
