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
 
package DNAnalyzer.data.aminoAcid;

import java.util.Arrays;

/**
 * ProteinFactory to get the instance of a Protein enum.
 */
public class AminoAcidFactory {

	/**
	 * Searches for an amino acid by its name or abbreviation passed as the
	 * argument.
	 *
	 * @param aminoAcid amino acid name to search by.
	 * @return a {@link AminoAcid} value.
	 * @throws IllegalArgumentException if no acid is found by given name.
	 */
	public static AminoAcid getAminoAcid(final String aminoAcid) {
		return Arrays.stream(AminoAcid.values())
				.filter(acid -> acid.getNames().contains(aminoAcid.toLowerCase()))
				.findFirst()
				.orElseThrow(() -> new IllegalArgumentException("Unknown amino acid."));
	}
}
