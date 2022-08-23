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


        long startTime = System.currentTimeMillis();
        // Load DNA file and concatenate lines
        Scanner sc = new Scanner(new File("files/dna/dnalong.fa"));
        StringBuilder dna = new StringBuilder();
        while (sc.hasNextLine()) {
            dna.append(sc.nextLine().trim().toLowerCase());
        }
        System.out.println("Load time: " + (System.currentTimeMillis() - startTime) + "ms");

        startTime = System.currentTimeMillis();
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
                default: break;
            }
            System.out.println("Error: Invalid characters are present in DNA sequence.");
            return;
        }
        System.out.println("Validate time: " + (System.currentTimeMillis() - startTime) + "ms");

        // Gets the amino acid from the user.
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the amino acid: ");
        String aminoAcid = userInput.nextLine().toLowerCase();

        userInput.close();

        startTime = System.currentTimeMillis();
        // Prevents the user from entering an RNA sequence. In the last decade, using
        // DNA sequences instead of RNA sequences has been a more common practice.
        dna = new StringBuilder(dna.toString().replace("u", "t"));
        System.out.println("Replace time: " + (System.currentTimeMillis() - startTime) + "ms");

        startTime = System.currentTimeMillis();
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
        System.out.println("Properties time: " + (System.currentTimeMillis() - startTime) + "ms");

        startTime = System.currentTimeMillis();
        // Prints the GC-con    tent of the genomic sequence.
        double gcContent = p.getGCContent(dna.toString());
        System.out.println("\nGC-content (genome): " + gcContent);
        System.out.println("GC-Content time: " + (System.currentTimeMillis() - startTime) + "ms");

        startTime = System.currentTimeMillis();
        // Returns a HashMap containing the number of each nucleotide in the DNA
        // sequence.
        HashMap<Character, Integer> nucleotideCount = p.getNucleotideCount(dna.toString());
        System.out.println("Nucleotide count: " + nucleotideCount);
        System.out.println("Nucleotide count time: " + (System.currentTimeMillis() - startTime) + "ms");

        startTime = System.currentTimeMillis();
        // Finds and prints GC-content higher than 0.35
        GeneInfo gi = new GeneInfo();
        gi.highGCContent(geneList);
        System.out.println("High GC areas time: " + (System.currentTimeMillis() - startTime) + "ms");

        startTime = System.currentTimeMillis();
        // Finds and prints the longest gene in the DNA sequence and its length.
        gi.longestGene(geneList);
        System.out.println();
        System.out.println("Longest gene time: " + (System.currentTimeMillis() - startTime) + "ms");

        startTime = System.currentTimeMillis();
        AminoAcidProperties aap = new AminoAcidProperties(dna, 1, 0, 5);
        aap.printCodonCounts();
        System.out.println("AAP time: " + (System.currentTimeMillis() - startTime) + "ms");
    }
}