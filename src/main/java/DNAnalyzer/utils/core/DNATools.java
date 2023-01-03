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

package DNAnalyzer.utils.core;

/**
 * Functionality for dna
 *
 * @param dna the dna sequence
 */
public record DNATools(String dna) {
	public void isValid() {
		if (!dna.matches("[atgc]+")) {
			throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
		}
	}

	public DNATools replace(final String input, final String replacement) {
		return new DNATools(this.dna.replace(input, replacement));
	}

	public DNATools reverse() {
		return new DNATools(new StringBuilder(dna).reverse().toString());
	}

	public String getDna() {
		return dna;
	}
}
