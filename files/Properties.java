import java.util.*;

import resources.StorageResource;

public class Properties {
    public void printGeneList(StorageResource geneList, String aminoAcid) {
        int count = 1;
        for (int i = 0; i < 100; i++) {
            System.out.println();
        }
        System.out.println("List of genes coded for " + aminoAcid + " in the DNA strand: ");
        System.out.println("----------------------------------------------------");
        for (String gene : geneList.data()) {
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
        HashMap<String, Integer> nucleotideCount = new HashMap<String, Integer>();
        nucleotideCount.put("A", 0);
        nucleotideCount.put("T", 0);
        nucleotideCount.put("G", 0);
        nucleotideCount.put("C", 0);

        for (String letter : dna.split("")) {
            letter = letter.toUpperCase();
            if (letter.equals("A")) {
                nucleotideCount.put("A", nucleotideCount.get("A") + 1);
            } else if (letter.equals("T")) {
                nucleotideCount.put("T", nucleotideCount.get("T") + 1);
            } else if (letter.equals("G")) {
                nucleotideCount.put("G", nucleotideCount.get("G") + 1);
            } else if (letter.equals("C")) {
                nucleotideCount.put("C", nucleotideCount.get("C") + 1);
            }
        }
        
        return nucleotideCount;
    }
}