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

package DNAnalyzer.data.codon;

import java.util.Objects;

/**
 * Declares the codon frame
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 * @see "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables"
 */
public record CodonFrame(String dna, short readingFrame, int min, int max) {

	/**
	 * gets dna
	 *
	 * @return dna
	 */
	public String getDna() {
		return dna;
	}

	/**
	 * gets reading frame
	 *
	 * @return reading frame
	 */
	public short getReadingFrame() {
		return readingFrame;
	}

	/**
	 * gets min
	 *
	 * @return min
	 */
	public int getMin() {
		return min;
	}

	/**
	 * gets max
	 *
	 * @return max
	 */
	public int getMax() {
		return max;
	}

	@Override
	/**
	 * {@inheritDoc}
	 */
	public boolean equals(final Object o) {
		boolean result = false;
		if (this == o) {
			result = true;
		} else if (o instanceof final CodonFrame inputFrame) {
			result = getReadingFrame() == inputFrame.getReadingFrame() && getMin() == inputFrame.getMin()
					&& getMax() == inputFrame.getMax()
					&& getDna().equals(inputFrame.getDna());
		}
		return result;
	}

	@Override
	/**
	 * {@inheritDoc}
	 */
	public int hashCode() {
		return Objects.hash(getDna(), getReadingFrame(), getMin(), getMax());
	}
}
