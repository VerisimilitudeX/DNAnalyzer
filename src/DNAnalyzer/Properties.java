package DNAnalyzer;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Prints the lit of proteins and their respective properties found in the DNA.
 * 
 * @author @Verisimilitude11 (Piyush Acharya)
 * @author @Nv7-GitHub (Nishant Vikramaditya)
 * @version 1.2.1
 */

public class Properties {
    public void printGeneList(final ArrayList<String> geneList, final String aminoAcid)
            throws InterruptedException, IOException {
        Main.clearTerminal();

        // Changes the 1 letter or 3 letter abbreviation of the amino acids into the
        // full name
        String aminoAcidFull = "";
        switch (aminoAcid) {
            case "a", "alanine", "ala" -> aminoAcidFull = "Alanine";
            case "c", "cysteine", "cys" -> aminoAcidFull = "Cysteine";
            case "d", "aspartic acid", "asp" -> aminoAcidFull = "Aspartic acid";
            case "e", "glutamic acid", "glu" -> aminoAcidFull = "Glutamic acid";
            case "f", "phenylalanine", "phe" -> aminoAcidFull = "Phenylalanine";
            case "g", "glycine", "gly" -> aminoAcidFull = "Glycine";
            case "h", "histidine", "his" -> aminoAcidFull = "Histidine";
            case "i", "isoleucine", "ile" -> aminoAcidFull = "Isoleucine";
            case "k", "lysine", "lys" -> aminoAcidFull = "Lysine";
            case "l", "leucine", "leu" -> aminoAcidFull = "Leucine";
            case "m", "methionine", "met" -> aminoAcidFull = "Methionine";
            case "n", "asparagine", "asn" -> aminoAcidFull = "Asparagine";
            case "p", "proline", "pro" -> aminoAcidFull = "Proline";
            case "q", "glutamine", "gln" -> aminoAcidFull = "Glutamine";
            case "r", "arginine", "arg" -> aminoAcidFull = "Arginine";
            case "s", "serine", "ser" -> aminoAcidFull = "Serine";
            case "t", "threonine", "thr" -> aminoAcidFull = "Threonine";
            case "v", "valine", "val" -> aminoAcidFull = "Valine";
            case "w", "tryptophan", "trp" -> aminoAcidFull = "Tryptophan";
            default -> System.out.println("Invalid amino acid");
        }

        System.out.println("Genes coded for " + aminoAcidFull + ": ");
        System.out.println("----------------------------------------------------");
        int count = 1;
        for (final String gene : geneList) {
            System.out.println(count + ". " + gene);
            count++;
        }
    }

    public double getGCContent(String dna) {
        dna = dna.toLowerCase();
        double gcLen = 0;
        for (final char letter : dna.toCharArray()) {
            if ((letter == 'c') || (letter == 'g')) {
                gcLen++;
            }
        }
        return (gcLen / dna.length());
    }

    private void printNucleotideChar(final String dna, final int count, final String nucleotide) {
        System.out.println(nucleotide + ": " + count + " (" + (double) count / dna.length() * 100 + "%)");
    }

    private int[] countNucleotides(final String dna) {
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

    public void printNucleotideCount(final String dna) {
        final int[] nucleotideCount = countNucleotides(dna);

        System.out.println("Nucleotide count:");
        printNucleotideChar(dna, nucleotideCount[0], "A");
        printNucleotideChar(dna, nucleotideCount[1], "T");
        printNucleotideChar(dna, nucleotideCount[2], "G");
        printNucleotideChar(dna, nucleotideCount[3], "C");
    }

    // Check if the DNA is random or not
    public boolean isRandomDNA(final String dna) {
        final int[] nucleotideCount = countNucleotides(dna);

        final int a = (int) (((double) nucleotideCount[0]) / dna.length() * 100);
        final int t = (int) (((double) nucleotideCount[1]) / dna.length() * 100);
        final int g = (int) (((double) nucleotideCount[2]) / dna.length() * 100);
        final int c = (int) (((double) nucleotideCount[3]) / dna.length() * 100);

        // If the percentage of each nucleotide is between 2% of one another, then it is
        // random
        return (Math.abs(a - t) <= 2) && (Math.abs(a - g) <= 2) && (Math.abs(a - c) <= 2) && (Math.abs(t - g) <= 2)
                && (Math.abs(t - c) <= 2) && (Math.abs(g - c) <= 2);
    }
}
