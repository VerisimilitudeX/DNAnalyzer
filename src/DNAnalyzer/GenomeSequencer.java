package DNAnalyzer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Scanner;

// Creates a new instance of the getAminoAcid class after getting the DNA and amino acid from the user.
public class GenomeSequencer {

    // Receives the codons of the amino acid.
    public void getSequenceAndAminoAcid(final CodonData cd) throws IOException, InterruptedException {

        // Load DNA file and concatenate lines
        String dna = Files.readString(Path.of("assets/dna/real/brca1line.fa")).replace("\n", "").toLowerCase();

        // Checks if the DNA sequence is valid (contains only A, T, G, and C
        // nucleotides).
        if (dna.length() == 0) {
            System.out.println("Error: Invalid characters are present in DNA sequence.");
            return;
        }
        for (int i = 0; i < dna.length(); i++) {
            switch (dna.charAt(i)) {
                case 'a':
                case 't':
                case 'g':
                case 'c':
                    continue;
                default:
                    System.out.println("Error: Invalid characters are present in DNA sequence.");
                    break;
            }
        }

        // Gets the amino acid from the user.
        final Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the amino acid: ");
        final String userAminoAcid = userInput.nextLine().toLowerCase();

        userInput.close();

        // Prevents the user from entering an RNA sequence. In the last decade, using
        // DNA sequences instead of RNA sequences has been a more common practice.
        dna = dna.replace("u", "t");

        // Creates a new instance of the getAminoAcid class and sends the DNA, amino
        // acid, and start codons to the class.
        // Gets a StorageResource containing the genes of the amino acid.
        final GeneFromProtein gfp = new GeneFromProtein(); // Can be replaced with printGeneWithAminoAcid.
        final ArrayList<String> geneList = gfp.getAminoAcid(dna, userAminoAcid, cd.getAminoAcid(AminoAcidNames.ISOLEUCINE), cd.getAminoAcid(AminoAcidNames.LEUCINE), cd.getAminoAcid(AminoAcidNames.VALINE), cd.getAminoAcid(AminoAcidNames.PHENYLALANINE), cd.getAminoAcid(AminoAcidNames.METHIONINE), cd.getAminoAcid(AminoAcidNames.CYSTEINE), cd.getAminoAcid(AminoAcidNames.ALANINE), cd.getAminoAcid(AminoAcidNames.GLYCINE), cd.getAminoAcid(AminoAcidNames.PROLINE), cd.getAminoAcid(AminoAcidNames.THREONINE), cd.getAminoAcid(AminoAcidNames.SERINE), cd.getAminoAcid(AminoAcidNames.TYROSINE), cd.getAminoAcid(AminoAcidNames.TRYPTOPHAN), cd.getAminoAcid(AminoAcidNames.GLUTAMINE), cd.getAminoAcid(AminoAcidNames.ASPARAGINE), cd.getAminoAcid(AminoAcidNames.HISTIDINE), cd.getAminoAcid(AminoAcidNames.GLUTAMIC_ACID), cd.getAminoAcid(AminoAcidNames.ASPARTIC_ACID), cd.getAminoAcid(AminoAcidNames.LYSINE), cd.getAminoAcid(AminoAcidNames.ARGININE), cd.getAminoAcid(AminoAcidNames.STOP));

        // The findProperties class finds properties of the amino acid/gene strand.
        final Properties p = new Properties();

        // Prints the list of amino acid genes found in the StorageResource object.
        p.printGeneList(geneList, userAminoAcid);

        // Prints the GC-con tent of the genomic sequence.
        final double gcContent = p.getGCContent(dna);
        System.out.println("\nGC-content (genome): " + gcContent + "\n");

        // Returns a HashMap containing the number of each nucleotide in the DNA
        // sequence.
        p.printNucleotideCount(dna);

        // Finds and prints GC-content higher than 0.35
        final GeneInfo gi = new GeneInfo();
        gi.highGCContent(geneList);

        // Finds and prints the longest gene in the DNA sequence and its length.
        gi.longestGene(geneList);
        System.out.println();

        final int READING_FRAME = 1;
        final int MIN_COUNT = 5;
        final int MAX_COUNT = 10;

        final AminoAcidProperties aap = new AminoAcidProperties(dna, READING_FRAME, MIN_COUNT, MAX_COUNT);
        aap.printCodonCounts();

        final boolean randomtf = p.isRandomDNA(dna);
        if (randomtf) {
            System.out.println("\nWARNING: DNA sequence has been detected to be random.\n");
        }
    }
}
