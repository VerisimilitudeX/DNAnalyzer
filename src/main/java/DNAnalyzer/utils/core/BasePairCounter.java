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

import java.util.Optional;
import java.util.function.IntPredicate;

import DNAnalyzer.core.DNAAnalysis;

/**
 * BasePairCounter is Fluent Interface implementation used to count the
 * nucleotides in given dna sequence.
 */
public class BasePairCounter {

	private static final String EMPTY_STRING = "";

	private long adenine = 0;
	private long thymine = 0;
	private long guanine = 0;
	private long cytosine = 0;

	private final String dnaString;

	/**
	 * Creates a single instance for given dna sequence.
	 *
	 * @param dnaString string representation of a dna sequence
	 */
	public BasePairCounter(final String dnaString) {
		this.dnaString = dnaString;
	}

	/**
	 * Count adenine in given dna string;
	 *
	 * @return self
	 */
	public BasePairCounter countAdenine() {
		adenine = countBasePair(dnaString,
				intPredicate(DNAAnalysis.AsciiInt.LOWERCASE_A, DNAAnalysis.AsciiInt.UPPERCASE_A));
		return this;
	}

	/**
	 * Count thymine in given dna string;
	 *
	 * @return self
	 */
	public BasePairCounter countThymine() {
		thymine = countBasePair(dnaString,
				intPredicate(DNAAnalysis.AsciiInt.LOWERCASE_T, DNAAnalysis.AsciiInt.UPPERCASE_T));
		return this;
	}

	/**
	 * Count guanine in given dna string;
	 *
	 * @return self
	 */
	public BasePairCounter countGuanine() {
		guanine = countBasePair(dnaString,
				intPredicate(DNAAnalysis.AsciiInt.LOWERCASE_G, DNAAnalysis.AsciiInt.UPPERCASE_G));
		return this;
	}

	/**
	 * Count cytosine in given dna string;
	 *
	 * @return self
	 */
	public BasePairCounter countCytosine() {
		cytosine = countBasePair(dnaString,
				intPredicate(DNAAnalysis.AsciiInt.LOWERCASE_C, DNAAnalysis.AsciiInt.UPPERCASE_C));
		return this;
	}

	/**
	 * Count adenine in given dna string;
	 *
	 * @return long[] count of all four nucleotides for given dna string
	 */
	public long[] getCounts() {
		return new long[] { adenine, thymine, guanine, cytosine };
	}

	/**
	 * Filters out characters that do not meet the predicate condition and returns
	 * the count.
	 *
	 * @param dnaString the dna sequence
	 * @param predicate a condition to filter desired characters from dna string
	 * @return count of a nucleotide in given dna sequence.
	 */
	private static long countBasePair(final String dnaString, final IntPredicate predicate) {
		return Optional.ofNullable(dnaString).orElse(EMPTY_STRING).chars().filter(predicate).count();
	}

	/**
	 * A predicate for a single character of the dna sequence.
	 *
	 * @param lowerCase - int value representing the lower case character
	 * @param upperCase - int value representing the upper case character
	 * @return an {@link IntPredicate}
	 */
	private static IntPredicate intPredicate(final int lowerCase, final int upperCase) {
		return c -> c == upperCase || c == lowerCase;
	}
}
