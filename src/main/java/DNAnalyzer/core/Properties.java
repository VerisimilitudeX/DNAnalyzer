/*
 * Copyright © 2024 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */
package DNAnalyzer.core;

import java.io.PrintStream;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

import DNAnalyzer.core.DNAAnalysis.BasePairIndex;
import static DNAnalyzer.core.DNAAnalysis.countBasePairs;
import DNAnalyzer.data.aminoAcid.AminoAcid;
import DNAnalyzer.data.aminoAcid.AminoAcidFactory;

/**
 * Prints the list of proteins and their respective properties found in the DNA.
 *
 * @author Piyush Acharya (@VerisimilitudeX)
 * @version 1.2.1
 */
public class Properties {

    /**
     * Gets the version of the application.
     *
     * @return The version of the application
     * @category Properties
     */
    public static String getVersion() {
        return "3.0.0-beta.0";
    }

    /**
     * Prints the list of proteins found in the DNA.
     *
     * @param proteinList The list of proteins to be printed
     * @param aminoAcid The amino acid to be searched for {@code @category}
     * Output
     */
    public static void printProteinList(
            final List<String> proteinList, final String aminoAcid, PrintStream out) {

        // Changes the 1 letter or 3 letter abbreviation of the amino acids into the
        // full name
        final AminoAcid acid = AminoAcidFactory.getAminoAcid(aminoAcid);

        out.println("Proteins coded for " + acid.getFullName() + ": ");
        out.println("----------------------------------------------------");
        short count = 1;
        for (final String gene : proteinList) {
            out.println(count + ". " + gene);
            count++;
        }
    }

    /**
     * Gets the GC content of a gene.
     *
     * @param dna The DNA sequence to be analyzed
     * @return The GC content of the DNA sequence
     * @category Properties
     * @see
     * "https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/gc-content"
     */
    public static float getGCContent(String dna) {
        float gcContent = 0;
        if (dna.length() == 0) {
            return gcContent;
        }

        dna = dna.toLowerCase();
        float gcLen = (float) calculateLengthOfCG(dna);
        gcContent = gcLen / dna.length();

        return gcContent;
    }

    /**
     * Calculate the total number of characters that are 'g' or 'c' of a given
     * DNA String
     *
     * @param dna The DNA sequence that was analyzed
     * @category Property
     */
    public static int calculateLengthOfCG(String dna) {
        int gcLength = 0;
        char[] dnaCharArray = dna.toCharArray();

        for (char letter : dnaCharArray) {
            if (letterIsCorG(letter)) {
                gcLength++;
            }
        }

        return gcLength;
    }

    /**
     * Checks if a letter is either 'c' or 'g'
     *
     * @param aLetter The letter to check
     * @category Property
     */
    public static boolean letterIsCorG(char aLetter) {
        return (aLetter == 'c') || (aLetter == 'g');
    }

    /**
     * Prints the nucleotide count of the DNA sequence.
     *
     * @param dna The DNA sequence that was analyzed {@code @category} Output
     */
    public static void printNucleotideCount(final String dna, PrintStream out) {
        out.println("Nucleotide count:");
        long[] counts = countBasePairs(dna);
        out.println(
                "A"
                + ": "
                + counts[BasePairIndex.ADENINE]
                + " ("
                + (float) counts[BasePairIndex.ADENINE] / dna.length() * 100
                + "%)");
        out.println(
                "T"
                + ": "
                + counts[BasePairIndex.THYMINE]
                + " ("
                + (float) counts[BasePairIndex.THYMINE] / dna.length() * 100
                + "%)");
        out.println(
                "G"
                + ": "
                + counts[BasePairIndex.GUANINE]
                + " ("
                + (float) counts[BasePairIndex.GUANINE] / dna.length() * 100
                + "%)");
        out.println(
                "C"
                + ": "
                + counts[BasePairIndex.CYTOSINE]
                + " ("
                + (float) counts[BasePairIndex.CYTOSINE] / dna.length() * 100
                + "%)");
        out.println(
                "N"
                + ": "
                + counts[BasePairIndex.UNKNOWN]
                + " ("
                + (((float) counts[BasePairIndex.UNKNOWN] / dna.length()) * 100)
                + "%)");
        out.println("Total: " + dna.length());
    }

    /**
     * Checks if the DNA sequence is random or not.
     *
     * @param dna The DNA sequence that was analyzed
     * @return Whether the DNA sequence is random or not {@code @category}
     * Properties
     */
    public static boolean isRandomDNA(final String dna) {
        long[] nucleotideCount = countBasePairs(dna);
        int[] percentages
                = Arrays.stream(nucleotideCount).mapToInt(c -> nucleotidePercentage(c, dna)).toArray();

        int a = percentages[BasePairIndex.ADENINE];
        int t = percentages[BasePairIndex.THYMINE];
        int g = percentages[BasePairIndex.GUANINE];
        int c = percentages[BasePairIndex.CYTOSINE];

        IntStream diffs
                = IntStream.of(
                        Math.abs(a - t),
                        Math.abs(a - g),
                        Math.abs(a - c),
                        Math.abs(t - g),
                        Math.abs(t - c),
                        Math.abs(g - c));

        return diffs.allMatch(diff -> diff <= 2);
    }

    /**
     * Calculates the percentage of given amount of nucleotide in the dna
     * sequence/
     *
     * @param nucleotideCount Number of nucleotides (int)
     * @param dna DNA sequence
     * @return the percentage of nucleotides in that DNA sequence
     */
    private static int nucleotidePercentage(final long nucleotideCount, final String dna) {
        return (int) (((float) nucleotideCount) / dna.length() * 100);
    }
}
