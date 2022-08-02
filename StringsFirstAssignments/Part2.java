import java.util.*;
import edu.duke.*;

public class Part2 {
    /*
     * Find the longest gene in a DNA string.
     * @param dna is a String containing the DNA sequence
     * @return the longest gene found or an empty string if no gene is found
    */

    /*
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
    */

    public void testSimpleGene() {

        /* All 64 potential three-letter combinations of the DNA coding units T, C, A, and G are employed to
        * encode one of these amino acids or to signify the end of a sequence. While DNA can be decoded without 
        * ambiguity, a DNA sequence cannot be predicted from its protein sequence. Because most amino acids have 
        * numerous start codons, several DNA sequences might represent the same protein sequence.
        */

        // Amino acid start codon table
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
        
        // Amino acid stop codon table
        ArrayList<String> Stop = new ArrayList<>(Arrays.asList("TAA", "TAG", "TGA"));
        
        // Asks user for the amino acid that they want to search for and returns the list of start codons for that amino acid
        Scanner userInput = new Scanner(System.in);
        System.out.println("Enter the DNA sequence: ");
        String dna = userInput.nextLine().toLowerCase();
        System.out.println("Enter the amino acid: ");
        String aminoAcid = userInput.nextLine().toLowerCase();
        userInput.close();

        // Input can either be the amino acid name or the amino acid's one-letter symbol. We have plans to add a way to search for the amino acid's three-letter symbol as well.
        if (aminoAcid.equals("isoleucine") || aminoAcid.equals("i")) {
            int loopcount = 0;
            while (loopcount < 6) {
                int count = 1;
                for (String startcodon : Isoleucine) {
                    int startcodonindex = dna.indexOf(startcodon.toLowerCase());
                    if (startcodonindex == -1) {
                        continue;
                    }
                    for (String stopcodon : Stop) {
                        int stopcodonindex = dna.indexOf(stopcodon.toLowerCase(), startcodonindex + 3);
                        if (stopcodonindex == -1) {
                            break;
                        }
                        if (startcodonindex != -1 && stopcodonindex != -1) {
                            System.out.println("Gene " + count + " is " + dna.substring(startcodonindex, stopcodonindex + 3));
                            count++;
                        }
                    }
                }
                loopcount++;
            }
        }
        // Insert code that was deleted here.
    }
    
    public String findGeneWithAminoAcid(String dna, String aminoAcid, ArrayList <String> Isoleucine, ArrayList <String> Leucine, ArrayList <String> Valine, ArrayList <String> Phenylalanine, ArrayList <String> Methionine, ArrayList <String> Cysteine, ArrayList <String> Alanine, ArrayList <String> Glycine, ArrayList <String> Proline, ArrayList <String> Threonine, ArrayList <String> Serine, ArrayList <String> Tyrosine, ArrayList <String> Tryptophan, ArrayList <String> Glutamine, ArrayList <String> Asparagine, ArrayList <String> Histidine, ArrayList <String> GlutamicAcid, ArrayList <String> AsparticAcid, ArrayList <String> Lysine, ArrayList <String> Arginine, ArrayList <String> Stop) {
        // match the amino acid entered to one of the lists above and store it in a variable called aminoAcidList
        ArrayList<String> aminoAcidList = new ArrayList<String>();
        if (aminoAcid.equals("isoleucine") || aminoAcid.equals("i")) {
            aminoAcidList.addAll(Isoleucine);
        } else if (aminoAcid.equals("leucine") || aminoAcid.equals("l")) {
            aminoAcidList.addAll(Leucine);
        } else if (aminoAcid.equals("valine") || aminoAcid.equals("v")) {
            aminoAcidList.addAll(Valine);
        } else if (aminoAcid.equals("phenylalanine") || aminoAcid.equals("f")) {
            aminoAcidList.addAll(Phenylalanine);
        } else if (aminoAcid.equals("methionine") || aminoAcid.equals("m")) {
            aminoAcidList.addAll(Methionine);
        } else if (aminoAcid.equals("cysteine") || aminoAcid.equals("c")) {
            aminoAcidList.addAll(Cysteine);
        } else if (aminoAcid.equals("alanine") || aminoAcid.equals("a")) {
            aminoAcidList.addAll(Alanine);
        } else if (aminoAcid.equals("glycine") || aminoAcid.equals("g")) {
            aminoAcidList.addAll(Glycine);
        } else if (aminoAcid.equals("proline") || aminoAcid.equals("p")) {
            aminoAcidList.addAll(Proline);
        } else if (aminoAcid.equals("threonine") || aminoAcid.equals("t")) {
            aminoAcidList.addAll(Threonine);
        } else if (aminoAcid.equals("serine") || aminoAcid.equals("s")) {
            aminoAcidList.addAll(Serine);
        } else if (aminoAcid.equals("tyrosine") || aminoAcid.equals("y")) {
            aminoAcidList.addAll(Tyrosine);
        } else if (aminoAcid.equals("tryptophan") || aminoAcid.equals("w")) {
            aminoAcidList.addAll(Tryptophan);
        } else if (aminoAcid.equals("glutamine") || aminoAcid.equals("q")) {
            aminoAcidList.addAll(Glutamine);
        } else if (aminoAcid.equals("asparagine") || aminoAcid.equals("n")) {
            aminoAcidList.addAll(Asparagine);
        } else if (aminoAcid.equals("histidine") || aminoAcid.equals("h")) {
            aminoAcidList.addAll(Histidine);
        } else if (aminoAcid.equals("glutamicacid") || aminoAcid.equals("e")) {
            aminoAcidList.addAll(GlutamicAcid);
        } else if (aminoAcid.equals("asparticacid") || aminoAcid.equals("d")) {
            aminoAcidList.addAll(AsparticAcid);
        } else if (aminoAcid.equals("lysine") || aminoAcid.equals("k")) {
            aminoAcidList.addAll(Lysine);
        } else if (aminoAcid.equals("arginine") || aminoAcid.equals("r")) {
            aminoAcidList.addAll(Arginine);
        } else if (aminoAcid.equals("stop") || aminoAcid.equals("*")) {
            aminoAcidList.addAll(Stop);
        } else {
            System.out.println("Invalid amino acid");
            return "";
        }
        
        String gene = "";

        int loopcount = 0;
        while (loopcount < 6) {
            int count = 1;
            for (String startcodon : aminoAcidList) {
                int startcodonindex = dna.indexOf(startcodon.toLowerCase());
                if (startcodonindex == -1) {
                    continue;
                }
                for (String stopcodon : Stop) {
                    int stopcodonindex = dna.indexOf(stopcodon.toLowerCase(), startcodonindex + 3);
                    if (stopcodonindex == -1) {
                        break;
                    }
                    if (startcodonindex != -1 && stopcodonindex != -1) {
                        gene.concat("Gene " + count + " is " + dna.substring(startcodonindex, stopcodonindex + 3));
                        count++;
                    }
                }
            }
            loopcount++;
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