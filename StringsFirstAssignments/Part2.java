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

    public void testSimpleGene() {
        List<String> dnaList = new ArrayList<>();
        dnaList.add("ATGGCTATATATAATATATAGC");
        dnaList.add("ATGCATTAATTAATTAATAATGC");
        dnaList.add("GCGCATGCATGCATGCTAAGC");
        dnaList.add("GATGCCTAATGGCTAGCTATAAGCTGC");
        dnaList.add("GCATGCGCGCGCGCGCTAAGCGGC");
        dnaList.add("GCGCCGGCCATGGATCTAAGGCCGGCGC");
        dnaList.add("GCTACATGGTACGTACGTAATAGC");
        dnaList.add("GATGCTATATAATAGTTATATAGC");
        dnaList.add("GGCTATGATATATGATATAGC");
        dnaList.add("ATGATATATATATATATATAGC");

        /* All 64 potential three-letter combinations of the DNA coding units T, C, A, and G are employed to
        * encode one of these amino acids or to signify the end of a sequence. While DNA can be decoded without 
        * ambiguity, a DNA sequence cannot be predicted from its protein sequence. Because most amino acids have 
        * numerous codons, several DNA sequences might represent the same protein sequence.
        */

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
        
        // ask user for the amino acid that they want to search for in the DNA strand, using the corresponding amino acid lists above.
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the amino acid you want to search for: ");
        String aminoAcid = userInput.nextLine();
        userInput.close();
        System.out.println(aminoAcid);

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