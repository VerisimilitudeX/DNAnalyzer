import java.util.ArrayList;

public class GeneInfo {

    public void highGCContent(ArrayList<String> geneList) {
        int count = 1;
        // print the list of genes with the highest GC content
        System.out.println("\nHigh coverage regions: ");
        System.out.println("----------------------------------------------------");

        Properties p = new Properties();

        for (String gene : geneList) {
            // High GC content range
            double MIN_GC_CONTENT = 0.40;
            double MAX_GC_CONTENT = 0.60;
            if (geneList.contains("No gene found")) {
                System.out.println("No gene found");
                break;
            } else if (p.getGCContent(gene) > MIN_GC_CONTENT && p.getGCContent(gene) < MAX_GC_CONTENT) {
                System.out.println(count + ". " + gene);
                count++;
            }
        }
    }

    public void longestGene(ArrayList<String> geneList) {
        String longestGene = "";
        for (String gene : geneList) {
            if (gene.length() > longestGene.length()) {
                longestGene = gene;
            }
        }
        System.out.println("\nLongest gene (" + longestGene.length() + " nucleotides): " + longestGene);
    }
}
