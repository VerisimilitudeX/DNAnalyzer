package DNAnalyzer;

import java.util.ArrayList;

// Prints properties of the proteins in the DNA.
public class ProteinAnalysis {

    public void printHighCoverageRegions(final ArrayList<String> geneList) {
        int count = 1;

        // print the list of genes with the highest GC content
        System.out.println("\nHigh coverage regions: ");
        System.out.println("----------------------------------------------------");

        final Properties p = new Properties();

        for (final String gene : geneList) {

            // High GC content range
            final double MIN_GC_CONTENT = 0.40;
            final double MAX_GC_CONTENT = 0.60;
            if (geneList.contains("No gene found")) {
                System.out.println("No gene found");
                break;
            } else if ((p.getGCContent(gene) > MIN_GC_CONTENT) && (p.getGCContent(gene) < MAX_GC_CONTENT)) {
                System.out.println(count + ". " + gene);
                count++;
            }
        }
    }

    public void printLongestGene(final ArrayList<String> geneList) {
        String longestGene = "";
        for (final String gene : geneList) {
            if (gene.length() > longestGene.length()) {
                longestGene = gene;
            }
        }
        System.out.println("\nLongest gene (" + longestGene.length() + " nucleotides): " + longestGene);
    }
}
