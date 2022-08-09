// Import the Java Utility library's Scanner class for reading user input and ArrayList for receiving the amino acid sequence.
import java.util.ArrayList;
import java.util.Scanner;

import resources.StorageResource;

// Creates a new instance of the getAminoAcid class after getting the DNA and amino acid from the user.
public class dnaSequencer {

    // Receives the codons of the amino acid.
    public void getSequenceAndAminoAcid(ArrayList<String> Isoleucine, ArrayList<String> Leucine, ArrayList<String> Valine, ArrayList<String> Phenylalanine, ArrayList<String> Methionine, ArrayList<String> Cysteine, ArrayList<String> Alanine, ArrayList<String> Glycine, ArrayList<String> Proline, ArrayList<String> Threonine, ArrayList<String> Serine, ArrayList<String> Tyrosine, ArrayList<String> Tryptophan, ArrayList<String> Glutamine, ArrayList<String> Asparagine, ArrayList<String> Histidine, ArrayList<String> GlutamicAcid, ArrayList<String> AsparticAcid, ArrayList<String> Lysine, ArrayList<String> Arginine, ArrayList<String> Stop) {
        
        // Gets the DNA sequence from the user.
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the DNA sequence: ");
        String dna = userInput.nextLine().toLowerCase();
        
        // Checks if the DNA sequence is valid (contains only A, T, G, and C nucleotides).
        if (dna == null || dna.length() == 0 || dna.indexOf("b") >= 0 || dna.indexOf("d") >= 0 || dna.indexOf("e") >= 0 || dna.indexOf("f") >= 0 || dna.indexOf("h") >= 0 || dna.indexOf("i") >= 0 || dna.indexOf("j") >= 0 || dna.indexOf("k") >= 0 || dna.indexOf("l") >= 0 || dna.indexOf("m") >= 0 || dna.indexOf("n") >= 0 || dna.indexOf("o") >= 0 || dna.indexOf("p") >= 0 || dna.indexOf("q") >= 0 || dna.indexOf("r") >= 0 || dna.indexOf("s") >= 0 || dna.indexOf("v") >= 0 || dna.indexOf("w") >= 0 || dna.indexOf("x") >= 0 || dna.indexOf("y") >= 0 || dna.indexOf("z") >= 0 || dna.indexOf(1) >= 0 || dna.indexOf(2) >= 0 || dna.indexOf(3) >= 0 || dna.indexOf(4) >= 0 || dna.indexOf(5) >= 0 || dna.indexOf(6) >= 0 || dna.indexOf(7) >= 0 || dna.indexOf(8) >= 0 || dna.indexOf(9) >= 0 || dna.indexOf(0) >= 0 || dna.indexOf(" ") >= 0 || dna.indexOf(",") >= 0 || dna.indexOf(".") >= 0 || dna.indexOf(";") >= 0 || dna.indexOf("'") >= 0 || dna.indexOf("\"") >= 0 || dna.indexOf("!") >= 0 || dna.indexOf("?") >= 0 || dna.indexOf("/") >= 0 || dna.indexOf("\\") >= 0 || dna.indexOf("(") >= 0 || dna.indexOf(")") >= 0 || dna.indexOf("[") >= 0 || dna.indexOf("]") >= 0 || dna.indexOf("{") >= 0 || dna.indexOf("}") >= 0 || dna.indexOf("<") >= 0 || dna.indexOf(">") >= 0 || dna.indexOf("=") >= 0 || dna.indexOf("+") >= 0 || dna.indexOf("-") >= 0 || dna.indexOf("*") >= 0 || dna.indexOf("&") >= 0 || dna.indexOf("^") >= 0 || dna.indexOf("%") >= 0 || dna.indexOf("$") >= 0 || dna.indexOf("#") >= 0 || dna.indexOf("@") >= 0 || dna.indexOf("!") >= 0 || dna.indexOf("~") >= 0 || dna.indexOf("`") >= 0 || dna.indexOf("|") >= 0 || dna.indexOf(".") >= 0 || dna.indexOf(";") >= 0 || dna.indexOf(":") >= 0 || dna.indexOf("'") >= 0 || dna.indexOf("\"") >= 0 || dna.indexOf("<") >= 0 || dna.indexOf(">") >= 0 || dna.indexOf("=") >= 0 || dna.indexOf("+") >= 0 || dna.indexOf("-") >= 0 || dna.indexOf("*") >= 0 || dna.indexOf("&") >= 0 || dna.indexOf("^") >= 0 || dna.indexOf("%") >= 0 || dna.indexOf("$") >= 0 || dna.indexOf("#") >= 0 || dna.indexOf("@") >= 0 || dna.indexOf("!") >= 0) {
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
        findGeneWithAminoAcid fgwaa = new findGeneWithAminoAcid(); // Can be replaced with printGeneWithAminoAcid.
        StorageResource geneList = fgwaa.getAminoAcid(dna, aminoAcid, Isoleucine, Leucine, Valine, Phenylalanine, Methionine, Cysteine, Alanine, Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine, Asparagine, Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop);
        
        // Finds properties of the amino acid/gene strand.
        findProperties fp = new findProperties(); 
        fp.printGeneList(geneList, dna, aminoAcid);
        fp.getGCContent(dna);
    }
}
