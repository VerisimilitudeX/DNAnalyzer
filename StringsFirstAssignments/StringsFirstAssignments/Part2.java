import java.util.*;

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

        ArrayList<String> Isoleucine = new ArrayList<>(Arrays.asList("ATT", "ATC", "ATA"));
        ArrayList<String> Leucine = new ArrayList<>(Arrays.asList("ATT", "ATC", "ATA"));

        List<String> stopCodonList= new ArrayList<>();
        stopCodonList.add("TAA");
        stopCodonList.add("TAG");
        stopCodonList.add("TGA");
        

        // ask user for the amino acid that they want to search for in the DNA strand, using the corresponding amino acid lists above.

    }
public static void main(String[] args) {
        Part1 p = new Part1();
        p.testSimpleGene();
    }
}

/*
 * Data sources:
 * https://pubmed.ncbi.nlm.nih.gov/12804578/
 * https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
 * http://algoart.com/aatable.htm
 */