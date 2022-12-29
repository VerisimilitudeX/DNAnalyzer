/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.utils.protein;

import java.io.PrintStream;
import java.util.List;

import DNAnalyzer.core.Properties;

/**
 * Prints properties of the proteins in the DNA.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class ProteinAnalysis {

	/**
	 * Prints high coverage regions. High coverage regions are regions of a DNA
	 * sequence that code for
	 * a protein and have a relatively high proportion of guanine and cytosine
	 * nucleotides to the 4
	 * nucleotide bases (45-60% GC-content).
	 *
	 * @param geneList list of genes
	 */
	public static void printHighCoverageRegions(final List<String> geneList, PrintStream out) {
		short count = 1;

		// print the list of genes with the highest GC content
		out.println("\nHigh coverage regions: ");
		out.println("----------------------------------------------------");

		for (final String gene : geneList) {

			// High GC content range
			final float MIN_GC_CONTENT = 0.40f;
			final float MAX_GC_CONTENT = 0.60f;
			if ((Properties.getGCContent(gene) > MIN_GC_CONTENT) && (Properties.getGCContent(gene) < MAX_GC_CONTENT)) {
				out.println(count + ". " + gene);
				count++;
			}
		}
	}

	/**
	 * Prints the longest protein in the DNA sequence along with its length. Longer
	 * genes are most susceptible to disease implications and are especially linked
	 * to neurodevelopmental disorders
	 * (e.g., autism).
	 *
	 * @param proteinList The list of proteins in the DNA sequence
	 *                    {@code @category} Properties
	 * @see "https://www.spectrumnews.org/opinion/viewpoint/length-matters-disease-implications-for-long-genes/"
	 */
	public static void printLongestProtein(final List<String> proteinList, PrintStream out) {
		String longestProtein = "";
		for (final String protein : proteinList) {
			if (protein.length() > longestProtein.length()) {
				longestProtein = protein;
			}
		}
		out.println("\nLongest gene (" + longestProtein.length() + " nucleotides): " + longestProtein);
	}
}
