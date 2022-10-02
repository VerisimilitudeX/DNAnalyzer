/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur. 
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging, 
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances. 
 * 
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */

package DNAnalyzer;

import java.io.IOException;
import java.util.List;

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
     * @category Output
     * @param proteinList The list of proteins to be printed
     * @param aminoAcid   The amino acid to be searched for
     * @throws InterruptedException
     * @throws IOException
     */
    public static void printProteinList(List<String> proteinList, final String aminoAcid)
            throws InterruptedException, IOException {

        // Clears the console
        Main.clearTerminal();

        // Changes the 1 letter or 3 letter abbreviation of the amino acids into the
        // full name
        String aminoAcidFullName = "";
        switch (aminoAcid) {
            case "a", "alanine", "ala" -> aminoAcidFullName = "Alanine";
            case "c", "cysteine", "cys" -> aminoAcidFullName = "Cysteine";
            case "d", "aspartic acid", "asp" -> aminoAcidFullName = "Aspartic acid";
            case "e", "glutamic acid", "glu" -> aminoAcidFullName = "Glutamic acid";
            case "f", "phenylalanine", "phe" -> aminoAcidFullName = "Phenylalanine";
            case "g", "glycine", "gly" -> aminoAcidFullName = "Glycine";
            case "h", "histidine", "his" -> aminoAcidFullName = "Histidine";
            case "i", "isoleucine", "ile" -> aminoAcidFullName = "Isoleucine";
            case "k", "lysine", "lys" -> aminoAcidFullName = "Lysine";
            case "l", "leucine", "leu" -> aminoAcidFullName = "Leucine";
            case "m", "methionine", "met" -> aminoAcidFullName = "Methionine";
            case "n", "asparagine", "asn" -> aminoAcidFullName = "Asparagine";
            case "p", "proline", "pro" -> aminoAcidFullName = "Proline";
            case "q", "glutamine", "gln" -> aminoAcidFullName = "Glutamine";
            case "r", "arginine", "arg" -> aminoAcidFullName = "Arginine";
            case "s", "serine", "ser" -> aminoAcidFullName = "Serine";
            case "t", "threonine", "thr" -> aminoAcidFullName = "Threonine";
            case "v", "valine", "val" -> aminoAcidFullName = "Valine";
            case "w", "tryptophan", "trp" -> aminoAcidFullName = "Tryptophan";
            default -> System.out.println("Invalid amino acid");
        }

        System.out.println("Proteins coded for " + aminoAcidFullName + ": ");
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
     * @see "https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/gc-content"
     * @category Properties
     * @param dna The DNA sequence to be analyzed
     * @return The GC content of the DNA sequence
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
     * Formats the nucleotide sequence into a readable format.
     * 
     * @category Output
     * @param dna        The DNA sequence that was analyzed
     * @param count      The count of the nucleotide in the DNA sequence
     * @param nucleotide The nucleotide that was searched for
     */
    private static void formatNucleotideCount(final String dna, final int count, final String nucleotide) {
        System.out.println(nucleotide + ": " + count + " (" + (float) count / dna.length() * 100 + "%)");
    }

    /**
     * Counts the number of nucleotides in the DNA sequence.
     * 
     * @category Properties
     * @param dna
     * @return The list of the number of nucleotides in the DNA sequence.
     */
    private static int[] countNucleotides(final String dna) {
        final int[] nucleotideCount = new int[4];
        for (final char letter : dna.toCharArray()) {
            switch (letter) {
                case 'a' -> nucleotideCount[0]++;
                case 't' -> nucleotideCount[1]++;
                case 'g' -> nucleotideCount[2]++;
                case 'c' -> nucleotideCount[3]++;
                default -> {
                }
            }
        }

        return nucleotideCount;
    }

    /**
     * Prints the nucleotide count of the DNA sequence.
     * 
     * @category Output
     * @param dna The DNA sequence that was analyzed
     */
    public static void printNucleotideCount(final String dna) {
        final int[] nucleotideCount = countNucleotides(dna);

        System.out.println("Nucleotide count:");
        formatNucleotideCount(dna, nucleotideCount[0], "A");
        formatNucleotideCount(dna, nucleotideCount[1], "T");
        formatNucleotideCount(dna, nucleotideCount[2], "G");
        formatNucleotideCount(dna, nucleotideCount[3], "C");
    }

    /**
     * Checks if the DNA sequence is random or not.
     * 
     * @category Properties
     * @param dna The DNA sequence that was analyzed
     * @return Whether the DNA sequence is random or not
     */
    public static boolean isRandomDNA(final String dna) {
        final int[] nucleotideCount = countNucleotides(dna);

        final int a = (int) (((float) nucleotideCount[0]) / dna.length() * 100);
        final int t = (int) (((float) nucleotideCount[1]) / dna.length() * 100);
        final int g = (int) (((float) nucleotideCount[2]) / dna.length() * 100);
        final int c = (int) (((float) nucleotideCount[3]) / dna.length() * 100);

        // If the percentage of each nucleotide is between 2% of one another, then it is
        // random
        return (Math.abs(a - t) <= 2) && (Math.abs(a - g) <= 2) && (Math.abs(a - c) <= 2) && (Math.abs(t - g) <= 2)
                && (Math.abs(t - c) <= 2) && (Math.abs(g - c) <= 2);
    }
}
