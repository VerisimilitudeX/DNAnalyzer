import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
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
            ArrayList<String> Lysine, ArrayList<String> Arginine, ArrayList<String> Stop) throws FileNotFoundException {

        // Load DNA file and concatenate lines
        Scanner sc = new Scanner(new File("files/dna/brca1line.fa"));
        StringBuilder dna = new StringBuilder();
        while (sc.hasNextLine()) {
            dna.append(sc.nextLine().trim().toLowerCase());
        }

        // Checks if the DNA sequence is valid (contains only A, T, G, and C
        // nucleotides).
        if (dna.length() == 0) {
            System.out.println("Error: Invalid characters are present in DNA sequence.");
            return;
        }
        for (int i = 0; i < dna.length(); i++) {
            switch (dna.charAt(i)) {
                case 'a': continue;
                case 't': continue;
                case 'g': continue;
                case 'c': continue;
                default: break;
            }
            System.out.println("Error: Invalid characters are present in DNA sequence.");
            return;
        }

        // Gets the amino acid from the user.
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the amino acid: ");
        String aminoAcid = userInput.nextLine().toLowerCase();
        userInput.close();

        // Prevents the user from entering an RNA sequence. In the last decade, using
        // DNA sequences instead of RNA sequences has been a more common practice.
        dna = new StringBuilder(dna.toString().replace("u", "t"));

        // Creates a new instance of the getAminoAcid class and sends the DNA, amino
        // acid, and start codons to the class.
        // Gets a StorageResource containing the genes of the amino acid.
        GeneFromProtein gfp = new GeneFromProtein(); // Can be replaced with printGeneWithAminoAcid.
        ArrayList<String> geneList = gfp.getAminoAcid(dna.toString(), aminoAcid, Isoleucine, Leucine, Valine,
                Phenylalanine,
                Methionine, Cysteine, Alanine, Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine,
                Asparagine, Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop);

        // The findProperties class finds properties of the amino acid/gene strand.
        Properties p = new Properties();

        // Prints the list of amino acid genes found in the StorageResource object.
        p.printGeneList(geneList, aminoAcid);

        // Prints the GC-content of the genomic sequence.
        double gcContent = p.getGCContent(dna.toString());
        System.out.println("\nGC-content (genome): " + gcContent);

        // Returns a HashMap containing the number of each nucleotide in the DNA
        // sequence.
        HashMap<Character, Integer> nucleotideCount = p.getNucleotideCount(dna.toString());
        System.out.println("Nucleotide count: " + nucleotideCount);

        // Finds and prints GC-content higher than 0.35
        GeneInfo gi = new GeneInfo();
        gi.highGCContent(geneList);

        // Finds and prints the longest gene in the DNA sequence and its length.
        gi.longestGene(geneList);
        System.out.println();
    }
}