// Import the Java Utility library's Scanner class for reading user input and ArrayList for receiving the amino acid sequence.
import java.util.ArrayList;
import java.util.Scanner;
import resources.FileResource;
import resources.StorageResource;

// Creates a new instance of the getAminoAcid class after getting the DNA and amino acid from the user.
public class GenomeSequencer {

    // Receives the codons of the amino acid.
    public void getSequenceAndAminoAcid(ArrayList<String> Isoleucine, ArrayList<String> Leucine, ArrayList<String> Valine, ArrayList<String> Phenylalanine, ArrayList<String> Methionine, ArrayList<String> Cysteine, ArrayList<String> Alanine, ArrayList<String> Glycine, ArrayList<String> Proline, ArrayList<String> Threonine, ArrayList<String> Serine, ArrayList<String> Tyrosine, ArrayList<String> Tryptophan, ArrayList<String> Glutamine, ArrayList<String> Asparagine, ArrayList<String> Histidine, ArrayList<String> GlutamicAcid, ArrayList<String> AsparticAcid, ArrayList<String> Lysine, ArrayList<String> Arginine, ArrayList<String> Stop) {
        
        // Gets the DNA sequence from the user.
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the filename: ");
        String filename = userInput.nextLine().toLowerCase();

        FileResource fr = new FileResource("dna/" + filename);
        String dna = fr.asString().toLowerCase();
        
        // Checks if the DNA sequence is valid (contains only A, T, G, and C nucleotides).
        if ((dna.length() == 0) || dna.contains("b") || dna.contains("d") || dna.contains("e") || dna.contains("f") || dna.contains("h") || dna.contains("i") || dna.contains("j") || dna.contains("k") || dna.contains("l") || dna.contains("m") || dna.contains("n") || dna.contains("o") || dna.contains("p") || dna.contains("q") || dna.contains("r") || dna.contains("s") || dna.contains("v") || dna.contains("w") || dna.contains("x") || dna.contains("y") || dna.contains("z") || (dna.indexOf(1) >= 0) || (dna.indexOf(2) >= 0) || (dna.indexOf(3) >= 0) || (dna.indexOf(4) >= 0) || (dna.indexOf(5) >= 0) || (dna.indexOf(6) >= 0) || (dna.indexOf(7) >= 0) || (dna.indexOf(8) >= 0) || (dna.indexOf(9) >= 0) || (dna.indexOf(0) >= 0) || dna.contains(" ") || dna.contains(",") || dna.contains(".") || dna.contains(";") || dna.contains("'") || dna.contains("\"") || dna.contains("!") || dna.contains("?") || dna.contains("/") || dna.contains("\\") || dna.contains("(") || dna.contains(")") || dna.contains("[") || dna.contains("]") || dna.contains("{") || dna.contains("}") || dna.contains("<") || dna.contains(">") || dna.contains("=") || dna.contains("+") || dna.contains("-") || dna.contains("*") || dna.contains("&") || dna.contains("^") || dna.contains("%") || dna.contains("$") || dna.contains("#") || dna.contains("@") || dna.contains("~") || dna.contains("`") || dna.contains("|") || dna.contains(":")) {
            System.out.println("Error: Invalid characters are present in DNA sequence.");
            userInput.close();
            return;
        }

        // Gets the amino acid from the user.
        System.out.println("Enter the amino acid: ");
        String aminoAcid = userInput.nextLine().toLowerCase();
        userInput.close();

        // Prevents the user from entering an RNA sequence. In the last decade, using DNA sequences instead of RNA sequences has been a more common practice.
        dna = dna.replaceAll("u", "t");

        // Creates a new instance of the getAminoAcid class and sends the DNA, amino acid, and start codons to the class.
        // Gets a StorageResource containing the genes of the amino acid.
        FindGeneWithAminoAcid findGene = new FindGeneWithAminoAcid(); // Can be replaced with printGeneWithAminoAcid.
        StorageResource geneList = findGene.getAminoAcid(dna, aminoAcid, Isoleucine, Leucine, Valine, Phenylalanine, Methionine, Cysteine, Alanine, Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine, Asparagine, Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop);
        
        // The findProperties class finds properties of the amino acid/gene strand.
        FindProperties fp = new FindProperties();

        // Prints the list of amino acid genes found in the StorageResource object.
        fp.printGeneList(geneList, aminoAcid);

        // Prints the GC-content of the genomic sequence.
        double gcContent = fp.getGCContent(dna);
        System.out.println("\nGC-content (genome): " + gcContent);

        // Finds and prints GC-content higher than 0.35 
        ProcessGenes pg = new ProcessGenes();
        pg.highGCContent(geneList);

        // Finds and prints the longest gene in the DNA sequence and its length.
        pg.longestGene(geneList);
    }
}