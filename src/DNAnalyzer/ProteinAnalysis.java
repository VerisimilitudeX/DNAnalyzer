package DNAnalyzer;

import java.util.ArrayList;

/**
 * Prints properties of the proteins in the DNA.
 * 
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class ProteinAnalysis {

    /**
     * Prints high coverage regions. High coverage regions are regions of a DNA
     * sequence that code for a protein and have a relatively high proportion of
     * guanine and cytosine nucleotides to the 4 nucleotide bases (45-60%
     * GC-content).
     * 
     * @param geneList
     */
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
            if ((p.getGCContent(gene) > MIN_GC_CONTENT) && (p.getGCContent(gene) < MAX_GC_CONTENT)) {
                System.out.println(count + ". " + gene);
                count++;
            }
        }
    }

    /**
     * Prints the longest protein in the DNA sequence along with its length. Longer
     * genes are most susceptible to disease implications and are especially linked
     * to neurodevelopmental disorders (e.g., autism).
     * 
     * @see https://www.spectrumnews.org/opinion/viewpoint/length-matters-disease-implications-for-long-genes/
     * @category Properties
     * @param proteinList The list of proteins in the DNA sequence
     */
    public void printLongestProtein(final ArrayList<String> proteinList) {
        String longestGene = "";
        for (final String gene : proteinList) {
            if (gene.length() > longestGene.length()) {
                longestGene = gene;
            }
        }
        System.out.println("\nLongest gene (" + longestGene.length() + " nucleotides): " + longestGene);
    }
}
