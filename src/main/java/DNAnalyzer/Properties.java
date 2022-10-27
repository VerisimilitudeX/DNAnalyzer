/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer;

import DNAnalyzer.aminoAcid.AminoAcid;
import DNAnalyzer.aminoAcid.AminoAcidFactory;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Prints the list of proteins and their respective properties found in the DNA.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 1.2.1
 */
public class Properties {

    /**
     * Prints the list of proteins found in the DNA.
     *
     * @param proteinList The list of proteins to be printed
     * @param aminoAcid   The amino acid to be searched for
     * {@code @category} Output
     */
    public static void printProteinList(final List<String> proteinList, final String aminoAcid) {

        // Changes the 1 letter or 3 letter abbreviation of the amino acids into the
        // full name
        final AminoAcid acid = AminoAcidFactory.getAminoAcid(aminoAcid);

        System.out.println("Proteins coded for " + acid.getFullName() + ": ");
        System.out.println("----------------------------------------------------");
        short count = 1;
        for (final String gene : proteinList) {
            System.out.println(count + ". " + gene);
            count++;
        }
    }

    /**
     * Gets the GC content of a gene.
     *
     * @param dna The DNA sequence to be analyzed
     * @return The GC content of the DNA sequence
     * {@code @category} Properties
     * @see "https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/gc-content"
     */
    public static float getGCContent(String dna) {
        dna = dna.toLowerCase();
        float gcLen = 0;
        // increment gcLen for each 'g' or 'c' encountered in a dna
        for (final char letter : dna.toCharArray()) {
            if ((letter == 'c') || (letter == 'g')) {
                gcLen++;
            }
        }
        return (gcLen / dna.length());
    }

    /**
     * Counts the number of nucleotides in the DNA sequence.
     *
     * @param dna sequence
     * @return The mapping between the nucleotides and their count in given DNA
     * sequence.
     * {@code @category} Properties
     */
    private static Map<Character, Integer> countNucleotides(final String dna) {
        final Map<Character, Integer> nucleotidesCount = new HashMap<>(Map.of('a', 0, 't', 0, 'g', 0, 'c', 0));
        dna.chars()
                .mapToObj(c -> (char) c)
                .forEach(
                        letter -> {
                            final int newValue = nucleotidesCount.get(letter) + 1;
                            nucleotidesCount.replace(letter, newValue);
                        });
        return nucleotidesCount;
    }

    /**
     * Prints the nucleotide count of the DNA sequence.
     *
     * @param dna The DNA sequence that was analyzed
     * {@code @category} Output
     */
    public static void printNucleotideCount(final String dna) {
        final Map<Character, Integer> nucleotideCountMapping = countNucleotides(dna);
        System.out.println("Nucleotide count:");
        
        System.out.println("A" + ": " + nucleotideCountMapping.get('a') + 
                " (" + (float) nucleotideCountMapping.get('a') / dna.length() * 100 + "%)");
        System.out.println("T" + ": " + nucleotideCountMapping.get('t') + 
                " (" + (float) nucleotideCountMapping.get('t') / dna.length() * 100 + "%)");
        System.out.println("G" + ": " + nucleotideCountMapping.get('g') + 
                " (" + (float) nucleotideCountMapping.get('g') / dna.length() * 100 + "%)");
        System.out.println("C" + ": " + nucleotideCountMapping.get('c') + 
                " (" + (float) nucleotideCountMapping.get('c') / dna.length() * 100 + "%)");
    }

    /**
     * Checks if the DNA sequence is random or not.
     *
     * @param dna The DNA sequence that was analyzed
     * @return Whether the DNA sequence is random or not
     * {@code @category} Properties
     */
    public static boolean isRandomDNA(final String dna) {
        final Map<Character, Integer> nucleotideCountMapping = countNucleotides(dna);
        // Convert Map values to Integer[]
        final Integer[] nucleotideCount = nucleotideCountMapping.values().toArray(new Integer[0]);

        // This sorts the array to get min and max value
        Arrays.sort(nucleotideCount);

        // Only calculate 2 Percentages, as only the highest difference (max - min) is
        // relevant
        final int maxPercent = nucleotidePercentage(nucleotideCount[3], dna);
        final int minPercent = nucleotidePercentage(nucleotideCount[0], dna);
        // If the percentage of each nucleotide is between 2% of one another, then it is
        // random
        return (maxPercent - minPercent) <= 2;
    }

    /**
     * Calculates the percentage of given amount of nucleotide in the dna sequence/
     *
     * @param nucleotideCount Number of nucleotides (int)
     * @param dna DNA sequence
     * @return the percentage of nucleotides in that DNA sequence
     */
    private static int nucleotidePercentage(final int nucleotideCount, final String dna) {
        return (int) (((float) nucleotideCount) / dna.length() * 100);
    }
}
