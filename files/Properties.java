import java.util.ArrayList;
import java.util.HashMap;

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
        for (String letter : dna.split("")) {
            if (letter.equals("c") || letter.equals("g")) {
                gcLen++;
            }
        }
        return (gcLen / dna.length());
    }

    public HashMap<String, Integer> getNucleotideCount(String dna) {
        HashMap<String, Integer> nucleotideCount = new HashMap<>();
        nucleotideCount.put("A", 0);
        nucleotideCount.put("T", 0);
        nucleotideCount.put("G", 0);
        nucleotideCount.put("C", 0);

        for (String letter : dna.split("")) {
            letter = letter.toUpperCase();
            switch (letter) {
                case "A" -> nucleotideCount.put("A", nucleotideCount.get("A") + 1);
                case "T" -> nucleotideCount.put("T", nucleotideCount.get("T") + 1);
                case "G" -> nucleotideCount.put("G", nucleotideCount.get("G") + 1);
                case "C" -> nucleotideCount.put("C", nucleotideCount.get("C") + 1);
            }
        }

        return nucleotideCount;
    }
}