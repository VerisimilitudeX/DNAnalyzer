import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Scanner;

// Creates a new instance of the getAminoAcid class after getting the DNA and amino acid from the user.
public class GenomeSequencer {

    // Receives the codons of the amino acid.
    public void getSequenceAndAminoAcid(ArrayList<String> Isoleucine, ArrayList<String> Leucine,
            ArrayList<String> Valine, ArrayList<String> Phenylalanine, ArrayList<String> Methionine,
            ArrayList<String> Cysteine, ArrayList<String> Alanine, ArrayList<String> Glycine, ArrayList<String> Proline,
            ArrayList<String> Threonine, ArrayList<String> Serine, ArrayList<String> Tyrosine,
            ArrayList<String> Tryptophan, ArrayList<String> Glutamine, ArrayList<String> Asparagine,
            ArrayList<String> Histidine, ArrayList<String> GlutamicAcid, ArrayList<String> AsparticAcid,
            ArrayList<String> Lysine, ArrayList<String> Arginine, ArrayList<String> Stop)
            throws IOException, InterruptedException {

        // Load DNA file and concatenate lines
        String dna = Files.readString(Path.of("assets/dna/dnalong.fa")).replace("\n", "").toLowerCase();

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
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the amino acid: ");
        String aminoAcid = userInput.nextLine().toLowerCase();

        userInput.close();

        // Prevents the user from entering an RNA sequence. In the last decade, using
        // DNA sequences instead of RNA sequences has been a more common practice.
        dna = dna.replace("u", "t");

        // Creates a new instance of the getAminoAcid class and sends the DNA, amino
        // acid, and start codons to the class.
        // Gets a StorageResource containing the genes of the amino acid.
        GeneFromProtein gfp = new GeneFromProtein(); // Can be replaced with printGeneWithAminoAcid.
        ArrayList<String> geneList = gfp.getAminoAcid(dna, aminoAcid, Isoleucine, Leucine, Valine,
                Phenylalanine,
                Methionine, Cysteine, Alanine, Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine,
                Asparagine, Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop);

        // The findProperties class finds properties of the amino acid/gene strand.
        Properties p = new Properties();

        // Prints the list of amino acid genes found in the StorageResource object.
        p.printGeneList(geneList, aminoAcid);

        // Prints the GC-con tent of the genomic sequence.
        double gcContent = p.getGCContent(dna);
        System.out.println("\nGC-content (genome): " + gcContent + "\n");

        // Returns a HashMap containing the number of each nucleotide in the DNA
        // sequence.
        p.printNucleotideCount(dna);

        // Finds and prints GC-content higher than 0.35
        GeneInfo gi = new GeneInfo();
        gi.highGCContent(geneList);

        // Finds and prints the longest gene in the DNA sequence and its length.
        gi.longestGene(geneList);
        System.out.println();

        AminoAcidProperties aap = new AminoAcidProperties(dna, 1, 0, 5);
        aap.printCodonCounts();
    }
}
