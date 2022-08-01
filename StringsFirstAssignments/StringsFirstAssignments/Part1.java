import java.util.*;

public class Part1 {
    public String findSimpleGene(String dna) {
        int startIndex = dna.indexOf("ATG");
        if (startIndex == -1) {
            return "";
        }
        int stopIndex = dna.indexOf("TAA");
        if (stopIndex == -1) {
            return "";
        }
        if (((stopIndex - startIndex) % 3) == 0) {
            return dna.substring(startIndex, stopIndex + 3);
        }
        else {
            return "";
        }
    }

    public void testSimpleGene() {
        List<String> dnaList = new ArrayList<>();
        dnaList.add("ATGATCTAATTTATGCTGCAACGGTGAAGA");
        dnaList.add("TAAGCTTTCCCTAAAGGGCCGAG");
        dnaList.add("ATGATCTAATAG");
        dnaList.add("ATGATCTAATTTATGCTGCAACGGTAATGAAGA");
        dnaList.add("ATGATCTAATTTATGCTGCAACGGTGAAGA");
        for (String dna : dnaList) {
            System.out.println("DNA strand is " + dna);
            String gene = findSimpleGene(dna);
            System.out.println("Gene is " + gene);
        }
    }
}
