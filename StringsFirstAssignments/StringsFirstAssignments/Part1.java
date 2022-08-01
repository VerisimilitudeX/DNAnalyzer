import java.util.*;

class Part1 {
    public String findSimpleGene(String dna) {
        int startIndex = dna.indexOf("ATG");
        if (startIndex == -1) {
            return "";
        }
        int stopIndex = dna.indexOf("TAA");
        if (stopIndex == -1) {
            return "";
        }
        if (((stopIndex - startIndex + 1) % 3) == 0) {
            String gene = "Gene is " + dna.substring(startIndex, stopIndex + 3);
            return gene;
        }
    }

    public void testSimpleGene() {
        List<String> dnaList = new ArrayList<>();
        dnaList.add("ATGGCTATATATATATATAGC");
        dnaList.add("GCATTAATTAATTAATAATGC");
        dnaList.add("GCGCATGCATGCATGCGC");
        dnaList.add("GATGCCTAATGGCTAGCTATAAGCTGC");
        dnaList.add("GCATGCGCGCGCGCGCTAAGCGGC");
        dnaList.add("GCGCCGGCCATGTAAGGCCGGCGC");
        dnaList.add("GCTACATGGTACGTACGTAATAGC");
        dnaList.add("GATGCTATATAATAGTTATATAGC");
        dnaList.add("GGCTATATATATGATATAGTAAC");
        for (String dna : dnaList) {
            System.out.println("DNA strand is " + dna);
            System.out.println(findSimpleGene(dna));
        }
    }
public static void main(String[] args) {
        Part1 p = new Part1();
        p.testSimpleGene();
    }
}