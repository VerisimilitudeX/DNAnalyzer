package DNAnalyzer;

import DNAnalyzer.codon.CodonFrame;
import DNAnalyzer.protein.ProteinAnalysis;
import DNAnalyzer.protein.ProteinFinder;

import java.io.PrintStream;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Optional.ofNullable;

/**
 * Provides functionality to analyze the DNA
 *
 * @param dna       then DNA to be analyzed
 * @param protein   the DNA sequence
 * @param aminoAcid name of amino acid
 */
public record DNAAnalysis(DNATools dna, String protein, String aminoAcid) {
    public DNAAnalysis isValidDna() {
        dna.isValid();
        return this;
    }

    public DNAAnalysis replaceDNA(final String input, final String replacement) {
        return new DNAAnalysis(dna.replace(input, replacement), protein, aminoAcid);
    }

    public DNAAnalysis reverseDna() {
        return new DNAAnalysis(dna.reverse(), protein, aminoAcid);
    }

    // Create protein list
    // Output the proteins, GC content, and nucleotide cnt found in the DNA
    public DNAAnalysis printProteins(PrintStream out) {
        ofNullable(dna).map(DNATools::getDna).ifPresent(dna -> {
            Properties.printProteinList(getProteins(aminoAcid), aminoAcid);

            out.println("\nGC-content (genome): " + Properties.getGCContent(dna) + "\n");
            Properties.printNucleotideCount(dna, out);
        });
        return this;
    }

    //used as helper method for output-codons, used to generate reading frames
    public ReadingFrames configureReadingFrames(final int minCount, final int maxCount, PrintStream out){
        final short READING_FRAME = 1;
        final String dna = this.dna.getDna();
        final ReadingFrames aap = new ReadingFrames(new CodonFrame(dna, READING_FRAME, minCount, maxCount));
        out.print("\n");
        aap.printCodonCounts(out);
        return aap;
    }

    //used as helper method for output codons, handles protein decisions
    public DNAAnalysis proteinSequence(PrintStream out) {
        final String dna = this.dna.getDna();

        if (protein != null) {
            final Pattern p = Pattern.compile(protein);
            final Matcher m = p.matcher(dna);
            if (m.find()) {
                out.println(
                        "\nProtein sequence found at index " + m.start() + " in the DNA sequence.");
            } else {
                out.println("\nProtein sequence not found in the DNA sequence.");
            }
        }
        return this; 
    }

    // Output the number of codons based on the reading frame the user wants to look
    // at, and minimum and maximum filters
    public DNAAnalysis outPutCodons(final int minCount, final int maxCount, PrintStream out) {
        configureReadingFrames(minCount, maxCount, out);
        proteinSequence(out);

        return this;
    }

    public DNAAnalysis printLongestProtein(PrintStream out) {
        ProteinAnalysis.printLongestProtein(getProteins(aminoAcid), out);
        return this;
    }

    private List<String> getProteins(final String aminoAcid) {
        return ProteinFinder.getProtein(dna.getDna(), aminoAcid);
    }
}
