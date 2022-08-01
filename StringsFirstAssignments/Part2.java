import java.util.*;
import edu.duke.*;

public class Part2 {
    public String findSimpleGene(String dna, String startCodon, String stopCodon) {
        int startIndex = dna.indexOf("ATG");
        if (startIndex == -1) {
            return "Error: start codon (ATG) not found";
        }
        int stopIndex = dna.indexOf("TAA");
        if (stopIndex == -1) {
            return "Error: stop codon (TAA) not found";
        }
        if (((stopIndex - startIndex + 1) % 3) == 0) {
            return ("Gene is " + dna.substring(startIndex, stopIndex + 3));
        }
        else {
            return "Error: gene length is not a multiple of 3";
        }
    }

    // List DNA sequences for testing
    public void testSimpleGene() {
        ArrayList<String> dnaList = new ArrayList<>(Arrays.asList("ATGGCTATATATAATATATAGC", "ATGCATTAATTAATTAATAATGC", "GCGCATGCATGCATGCTAAGC", "GATGCCTAATGGCTAGCTATAAGCTGC", "GCATGCGCGCGCGCGCTAAGCGGC", "GCGCCGGCCATGGATCTAAGGCCGGCGC", "GCTACATGGTACGTACGTAATAGC", "GATGCTATATAATAGTTATATAGC", "GGCTATGATATATGATATAGC", "ATGATATATATATATATATAGC"));

        /* All 64 potential three-letter combinations of the DNA coding units T, C, A, and G are employed to
        * encode one of these amino acids or to signify the end of a sequence. While DNA can be decoded without 
        * ambiguity, a DNA sequence cannot be predicted from its protein sequence. Because most amino acids have 
        * numerous start codons, several DNA sequences might represent the same protein sequence.
        */

        // Amino acid codon table
        ArrayList<String> Isoleucine = new ArrayList<>(Arrays.asList("ATT", "ATC", "ATA"));
        ArrayList<String> Leucine = new ArrayList<>(Arrays.asList("CTT", "CTC", "CTA", "CTG", "TTA", "TTG"));
        ArrayList<String> Valine = new ArrayList<>(Arrays.asList("GTT", "GTC", "GTA", "GTG"));
        ArrayList<String> Phenylalanine = new ArrayList<>(Arrays.asList("TTT", "TTC"));
        ArrayList<String> Methionine = new ArrayList<>(Arrays.asList("ATG"));
        ArrayList<String> Cysteine = new ArrayList<>(Arrays.asList("TGT", "TGC"));
        ArrayList<String> Alanine = new ArrayList<>(Arrays.asList("GCT", "GCC", "GCA", "GCG"));
        ArrayList<String> Glycine = new ArrayList<>(Arrays.asList("GGT", "GGC", "GGA", "GGG"));
        ArrayList<String> Proline = new ArrayList<>(Arrays.asList("CCT", "CCC", "CCA", "CCG"));
        ArrayList<String> Threonine = new ArrayList<>(Arrays.asList("ACT", "ACC", "ACA", "ACG"));
        ArrayList<String> Serine = new ArrayList<>(Arrays.asList("TCT", "TCC", "TCA", "TCG", "AGT", "AGC"));
        ArrayList<String> Tyrosine = new ArrayList<>(Arrays.asList("TAT", "TAC"));
        ArrayList<String> Tryptophan = new ArrayList<>(Arrays.asList("TGG"));
        ArrayList<String> Glutamine = new ArrayList<>(Arrays.asList("CAA", "CAG"));
        ArrayList<String> Asparagine = new ArrayList<>(Arrays.asList("AAT", "AAC"));
        ArrayList<String> Histidine = new ArrayList<>(Arrays.asList("CAT", "CAC"));
        ArrayList<String> GlutamicAcid = new ArrayList<>(Arrays.asList("GAA", "GAG"));
        ArrayList<String> AsparticAcid = new ArrayList<>(Arrays.asList("GAT", "GAC"));
        ArrayList<String> Lysine = new ArrayList<>(Arrays.asList("AAA", "AAG"));
        ArrayList<String> Arginine = new ArrayList<>(Arrays.asList("CGT", "CGC", "CGA", "CGG", "AGA", "AGG"));
        
        ArrayList<String> Stop = new ArrayList<>(Arrays.asList("TAA", "TAG", "TGA"));
        
        // Asks user for the amino acid that they want to search for and returns the list of start codons for that amino acid
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the amino acid you want to search for: ");
        String aminoAcid = userInput.nextLine();
        // based on user input, print the corresponding list of start codons.
        if (aminoAcid.equals("I") || aminoAcid.equals("isoleucine") || aminoAcid.equals("Isoleucine") || aminoAcid.equals("i")) {
            System.out.println("The start codons for Isoleucine are: " + Isoleucine);
        }
        else if (aminoAcid.equals("L") || aminoAcid.equals("leucine") || aminoAcid.equals("Leucine") || aminoAcid.equals("l")) {
            System.out.println("The start codons for Leucine are: " + Leucine);
        }
        else if (aminoAcid.equals("V") ||aminoAcid.equals("valine") || aminoAcid.equals("Valine") || aminoAcid.equals("v")) {
            System.out.println("The start codons for Valine are: " + Valine);
        }
        else if (aminoAcid.equals("F") || aminoAcid.equals("phenylalanine") || aminoAcid.equals("Phenylalanine") || aminoAcid.equals("f")) {
            System.out.println("The start codons for Phenylalanine are: " + Phenylalanine);
        }
        else if (aminoAcid.equals("M") || aminoAcid.equals("methionine") || aminoAcid.equals("Methionine") || aminoAcid.equals("m")) {
            System.out.println("The start codons for Methionine are: " + Methionine);
        }
        else if (aminoAcid.equals("C") || aminoAcid.equals("cysteine") || aminoAcid.equals("Cysteine") || aminoAcid.equals("c")) {
            System.out.println("The start codons for Cysteine are: " + Cysteine);
        }
        else if (aminoAcid.equals("A") || aminoAcid.equals("alanine") || aminoAcid.equals("Alanine") || aminoAcid.equals("a")) {
            System.out.println("The start codons for Alanine are: " + Alanine);
        }
        else if (aminoAcid.equals("G") || aminoAcid.equals("glycine") || aminoAcid.equals("Glycine") || aminoAcid.equals("g")) {
            System.out.println("The start codons for Glycine are: " + Glycine);
        }
        else if (aminoAcid.equals("P") || aminoAcid.equals("proline") || aminoAcid.equals("Proline") || aminoAcid.equals("p")) {
            System.out.println("The start codons for Proline are: " + Proline);
        }
        else if (aminoAcid.equals("T") || aminoAcid.equals("threonine") || aminoAcid.equals("Threonine") || aminoAcid.equals("t")) {
            System.out.println("The start codons for Threonine are: " + Threonine);
        }
        else if (aminoAcid.equals("S") || aminoAcid.equals("serine") || aminoAcid.equals("Serine") || aminoAcid.equals("s")) {
            System.out.println("The start codons for Serine are: " + Serine);
        }
        else if (aminoAcid.equals("Y") || aminoAcid.equals("tyrosine") || aminoAcid.equals("Tyrosine") || aminoAcid.equals("y")) {
            System.out.println("The start codons for Tyrosine are: " + Tyrosine);
        }

    }
public static void main(String[] args) {
        Part2 p = new Part2();
        p.testSimpleGene();
    }
}

/*
 * Data sources:
 * https://pubmed.ncbi.nlm.nih.gov/12804578/
 * https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
 * http://algoart.com/aatable.htm
 */