import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Character;

public class Properties {
    public void printGeneList(ArrayList<String> geneList, String aminoAcid) {
        // Changes the 1 letter or 3 letter abbreviation of the amino acids into the
        // full name
        String aminoAcidFull = "";
        switch (aminoAcid) {
            case "a", "alanine", "ala" -> aminoAcidFull = "Alanine";
            case "c", "cysteine", "cys" -> aminoAcidFull = "Cysteine";
            case "d", "aspartic acid", "asp" -> aminoAcidFull = "Aspartic acid";
            case "e", "glutamic acid", "glu" -> aminoAcidFull = "Glutamic acid";
            case "f", "phenylalanine", "phe" -> aminoAcidFull = "Phenylalanine";
            case "g", "glycine", "gly" -> aminoAcidFull = "Glycine";
            case "h", "histidine", "his" -> aminoAcidFull = "Histidine";
            case "i", "isoleucine", "ile" -> aminoAcidFull = "Isoleucine";
            case "k", "lysine", "lys" -> aminoAcidFull = "Lysine";
            case "l", "leucine", "leu" -> aminoAcidFull = "Leucine";
            case "m", "methionine", "met" -> aminoAcidFull = "Methionine";
            case "n", "asparagine", "asn" -> aminoAcidFull = "Asparagine";
            case "p", "proline", "pro" -> aminoAcidFull = "Proline";
            case "q", "glutamine", "gln" -> aminoAcidFull = "Glutamine";
            case "r", "arginine", "arg" -> aminoAcidFull = "Arginine";
            case "s", "serine", "ser" -> aminoAcidFull = "Serine";
            case "t", "threonine", "thr" -> aminoAcidFull = "Threonine";
            case "v", "valine", "val" -> aminoAcidFull = "Valine";
            case "w", "tryptophan", "trp" -> aminoAcidFull = "Tryptophan";
            default -> System.out.println("Invalid amino acid");
        }

        // "Clears" the console screen
        int count = 1;
        for (int i = 0; i < 50; i++) {
            System.out.println();
            try {
                Thread.sleep(5);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("Genes coded for " + aminoAcidFull + ": ");
        System.out.println("----------------------------------------------------");
        for (String gene : geneList) {
            if (geneList.contains("No gene found")) {
                System.out.println("No gene found");
                break;
            }
            System.out.println(count + ". " + gene);
            count++;
        }
    }

    public double getGCContent(String dna) {
        dna = dna.toLowerCase();
        double gcLen = 0;
        for (char letter : dna.toCharArray()) {
            if (letter == 'c'|| letter == 'g') {
                gcLen++;
            }
        }
        return (gcLen / dna.length());
    }

    public HashMap<Character, Integer> getNucleotideCount(String dna) {
        HashMap<Character, Integer> nucleotideCount = new HashMap<>();
        nucleotideCount.put('A', 0);
        nucleotideCount.put('T', 0);
        nucleotideCount.put('G', 0);
        nucleotideCount.put('C', 0);

        for (char letter : dna.toCharArray()) {
            nucleotideCount.put(Character.toUpperCase(letter), nucleotideCount.get('A') + 1);
        }

        return nucleotideCount;
    }
}