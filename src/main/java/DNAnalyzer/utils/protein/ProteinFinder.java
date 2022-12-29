/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.utils.protein;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import DNAnalyzer.data.codon.CodonDataConstants;
import DNAnalyzer.data.codon.CodonDataUtils;

/**
 * Find proteins in a DNA sequence (contains the main algorithm).
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */

public class ProteinFinder {

	/**
	 * Utility classes should not have public constructors
	 */
	private ProteinFinder() {
	}

	/**
	 * Gets proteins from dna and amino acid
	 *
	 * @param dna       dna
	 * @param aminoAcid amino acid
	 * @return list of proteins
	 */
	public static List<String> getProtein(final String dna, final String aminoAcid) {

		final List<String> proteinList = new ArrayList<>();
		final List<String> aminoAcidList = new ArrayList<>(CodonDataUtils.getAminoAcid(aminoAcid));

		// Outer loop loops through the start codons for the amino acids that the user
		// entered.
		// store the start index
		for (final String startCodon : aminoAcidList) {
			addProtein(dna, proteinList, dna.indexOf(startCodon.toLowerCase()));
		}

		// if no proteins are found, return null
		if (proteinList.isEmpty()) {
			// Return null if no protein found in DNA sequence
			System.out.println("No proteins found");
			return Collections.emptyList();
		}

		// Return list of proteins found in the DNA sequence
		return proteinList;
	}

	/**
	 * Add protein to protein list
	 *
	 * @param dna         DNA sequence
	 * @param proteinList List of proteins
	 * @param startIndex  Start index for checking for proteins
	 */
	private static void addProtein(final String dna, final List<String> proteinList, final int startIndex) {

		// Inner loop loops through the stop that the user entered.
		// store the stopIndex
		// if index is not -1 then store the substring of dna with start and stop index
		// in the protein list
		final List<String> stopCodonList = CodonDataConstants.STOP;
		int stopIndex;
		for (final String stopCodon : stopCodonList) {

			stopIndex = dna.indexOf(stopCodon.toLowerCase(), startIndex + 3);

			if ((startIndex != -1) && (stopIndex != -1)) {
				proteinList.add(dna.substring(startIndex, stopIndex + 3).toUpperCase());
				break;
			}

		}
	}

}
