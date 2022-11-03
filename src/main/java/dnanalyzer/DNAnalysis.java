/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact reach out to contact@dnanalyzer.live
 */
package dnanalyzer;

import static java.util.Optional.ofNullable;

import DNAnalyzer.codon.CodonFrame;
import DNAnalyzer.protein.ProteinAnalysis;
import DNAnalyzer.protein.ProteinFinder;

import java.util.List;
import java.util.function.IntPredicate;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import dnanalyzer.codon.CodonFrame;
import dnanalyzer.protein.ProteinAnalysis;
import dnanalyzer.protein.ProteinFinder;

/**
 * Provides functionality to analyze the DNA
 *
 * @param dna       then DNA to be analyzed
 * @param protein   tshe DNA sequence
 * @param aminoAcid name of amino acid
 */
public record DNAnalysis(DNATools dna, String protein, String aminoAcid) {

    public DNAnalysis isValidDna() {
        dna.isValid();
        return this;
    }

    public DNAnalysis replaceDNA(final String input, final String replacement) {
        return new DNAnalysis(dna.replace(input, replacement), protein, aminoAcid);
    }

    public DNAnalysis reverseDna() {
        return new DNAnalysis(dna.reverse(), protein, aminoAcid);
    }

    // Create protein list
    // Output the proteins, GC content, and nucleotide cnt found in the DNA
    public DNAnalysis printProteins() {
        ofNullable(dna).map(DNATools::getDna).ifPresent(dna -> {
            Properties.printProteinList(getProteins(aminoAcid), aminoAcid);

            System.out.println("\nGC-content (genome): " + Properties.getGCContent(dna) + "\n");
            Properties.printNucleotideCount(dna);
        });
        return this;
    }

    //Outputs the high coverage regions of a DNA
    public DNAAnalysis printHighCoverageRegions() {
        ofNullable(dna).map(DNATools::dna).ifPresent(dna -> {
            ProteinAnalysis.printHighCoverageRegions(getProteins(aminoAcid));
        });
        return this;
    }

    //used as helper method for output-codons, used to generate reading frames
    public void configureReadingFrames(final int minCount, final int maxCount){
        final short READING_FRAME = 1;
        final String dna = this.dna.getDna();
        final ReadingFrames aap = new ReadingFrames(new CodonFrame(dna, READING_FRAME, minCount, maxCount));
        System.out.print("\n");
        aap.printCodonCounts();
    }

    // used as helper method for output codons, handles protein decisions
    public void proteinSequence() {
        final String dna = this.dna.getDna();

        if (protein != null) {
            final Pattern p = Pattern.compile(protein);
            final Matcher m = p.matcher(dna);
            if (m.find()) {
                System.out.println("\nProtein sequence found at index " + m.start() + " in the DNA sequence.");
            } else {
                System.out.println("\nProtein sequence not found in the DNA sequence.");
            }
        }
    }

    // Output the number of codons based on the reading frame the user wants to look
    // at, and minimum and maximum filters
    public DNAnalysis outPutCodons(final int minCount, final int maxCount) {
        configureReadingFrames(minCount, maxCount);
        proteinSequence();

        return this;
    }

    public void printLongestProtein() {
        ProteinAnalysis.printLongestProtein(getProteins(aminoAcid));
    }

    private List<String> getProteins(final String aminoAcid) {
        return ProteinFinder.getProtein(dna.getDna(), aminoAcid);
    }

    /**
     * countBasePairsStream returns total counts of each DNA base pair found in the
     * provided String.
     *
     * @param dnaString String of DNA bases. Accepts lowercase and uppercase
     *                  Strings.
     * @return returns an array of long(primitive type). long[0] = count of
     *         ADENINE bases long[1] = count of THYMINE bases long[2] = count of
     *         GUANINE
     *         bases long[3] = count of CYTOSINE bases
     *
     * Constants for the indices can be found in public static class
     * {@link BasePairIndex} for convenience/consistency.
     */
    public static long[] countBasePairs(String dnaString) {
        return new BasePairCounter(dnaString)
            .countAdenine()
            .countThymine()
            .countGuanine()
            .countCytosine()
            .getCounts();
    }

    /**
     * Constants to be used as indices for the long[] returned by countBasePairs and
     * countBasePairsStream.
     */
    public static class BasePairIndex {

        public static final int ADENINE = 0;
        public static final int CYTOSINE = 3;
        public static final int GUANINE = 2;
        public static final int THYMINE = 1;
    }

    /**
     * Constants to obtain the corresponding ASCII int values for letters used to
     * represent DNA bases.
     */
    public static class AsciiInt {

        public static final int LOWERCASE_A = 97;
        public static final int LOWERCASE_C = 99;
        public static final int LOWERCASE_G = 103;
        public static final int LOWERCASE_T = 116;
        public static final int UPPERCASE_A = 65;
        public static final int UPPERCASE_C = 67;
        public static final int UPPERCASE_G = 71;
        public static final int UPPERCASE_T = 84;

    }
}
