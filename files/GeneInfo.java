import java.util.ArrayList;

public class GeneInfo {
    public void highGCContent(ArrayList<String> geneList) {
        System.out.println("");
        System.out.println("Gene(s) with the highest coverage: ");
        System.out.println("----------------------------------------------------");
        int count = 1;
        for (String gene : geneList) {
            Properties fp = new Properties();
            double geneGCContent = fp.getGCContent(gene);
            if (geneGCContent >= 0.45 && geneGCContent <= 0.60) {
                System.out.println(count + ". " + gene);
                count++;
            }
        }
    }

    public void longestGene(ArrayList<String> geneList) {
        int maxLen = 0;
        String longestGene = "";
        for (String gene : geneList) {
            if (gene.length() > maxLen) {
                maxLen = gene.length();
                longestGene = gene;
            }
        }
        System.out.println();
        System.out.println("Longest gene (" + maxLen + " nucleotides): " + longestGene);
    }
}
