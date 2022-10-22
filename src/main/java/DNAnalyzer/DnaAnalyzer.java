package DNAnalyzer;

import DNAnalyzer.codon.CodonFrame;
import DNAnalyzer.protein.ProteinAnalysis;
import DNAnalyzer.protein.ProteinFinder;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Optional.ofNullable;

/**
 * Provides functionality to analyze the DNA
 *
 * @param dna then DNA to be analyzed
 * @param protein the DNA sequence
 * @param aminoAcid name of amino acid
 */
public record DnaAnalyzer(Dna dna, String protein, String aminoAcid) {
    public DnaAnalyzer isValidDna() {
        dna.isValid();
        return this;
    }

    public DnaAnalyzer replaceDNA(String input, String replacement) {
        return new DnaAnalyzer(dna.replace(input, replacement), protein, aminoAcid);
    }

    public DnaAnalyzer reverseDna() {
        return new DnaAnalyzer(dna.reverse(), protein, aminoAcid);
    }

    // Create protein list
    // Output the proteins, GC content, and nucleotide cnt found in the DNA
    public DnaAnalyzer printProteins() {
        ofNullable(dna).map(Dna::getDna).ifPresent(dna -> {
            Properties.printProteinList(getProteins(aminoAcid), aminoAcid);

            System.out.println("\nGC-content (genome): " + Properties.getGCContent(dna) + "\n");
            Properties.printNucleotideCount(dna);
        });
        return this;
    }

    //used as helper method for output-codons, used to generate reading frames
    public ReadingFrames configureReadingFrames(int minCount, int maxCount){
        final short READING_FRAME = 1;
        final String dna = this.dna.getDna();
        final ReadingFrames aap =
                new ReadingFrames(new CodonFrame(dna, READING_FRAME, minCount, maxCount));
        System.out.print("\n");
        aap.printCodonCounts();
        return aap;
    }

    //used as helper method for output codons, handles protein decisions
    public DnaAnalyzer proteinSequence() {
        final String dna = this.dna.getDna();

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

    // Output the number of codons based on the reading frame the user wants to look
    // at, and minimum and maximum filters
    public DnaAnalyzer outPutCodons(int minCount, int maxCount) {
        configureReadingFrames(minCount, maxCount);
        proteinSequence();

        return this;
    }

    public DnaAnalyzer printLongestProtein() {
        ProteinAnalysis.printLongestProtein(getProteins(aminoAcid));
        return this;
    }

    private List<String> getProteins(String aminoAcid) {
        return new ProteinFinder().getProtein(dna.getDna(), aminoAcid);
    }
}
