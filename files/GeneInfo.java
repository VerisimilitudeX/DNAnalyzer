import java.util.ArrayList;

public class GeneInfo {

    public void highGCContent(ArrayList<String> geneList) {
        int count = 1;
        // print the list of genes with the highest GC content
        System.out.println();
        System.out.println("High coverage regions: ");
        System.out.println("----------------------------------------------------");

        Properties p = new Properties();

        for (String gene : geneList) {
            if (geneList.contains("No gene found")) {
                System.out.println("No gene found");
                break;
            } else if (p.getGCContent(gene) > 0.40 && p.getGCContent(gene) < 0.60) {
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
