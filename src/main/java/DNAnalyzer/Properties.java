/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur. 
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging, 
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances. 
 * 
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */

package DNAnalyzer;

import java.io.IOException;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

/**
 * Prints the list of proteins and their respective properties found in the DNA.
 * 
 * @author Piyush Acharya (@Verisimilitude11)
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 1.2.1
 */
public class Properties {

	/**
	 * Prints the list of proteins found in the DNA.
	 * 
	 * @category Output
	 * @param proteinList The list of proteins to be printed
	 * @param aminoAcid   The amino acid to be searched for
	 * @throws InterruptedException
	 * @throws IOException
	 */
	public static void printProteinList(List<String> proteinList, final String aminoAcid) {

		// Changes the 1 letter or 3 letter abbreviation of the amino acids into the
		// full name
		AminoAcid acid = AminoAcidFactory.getProtein(aminoAcid);

		System.out.println("Proteins coded for " + acid.getFullName() + ": ");
		System.out.println("----------------------------------------------------");
		short count = 1;
		for (final String gene : proteinList) {
			System.out.println(count + ". " + gene);
			count++;
		}
	}

	/**
	 * Gets the GC content of a gene.
	 * 
	 * @see "https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/gc-content"
	 * @category Properties
	 * @param dna The DNA sequence to be analyzed
	 * @return The GC content of the DNA sequence
	 */
	public static float getGCContent(String dna) {
		dna = dna.toLowerCase();
		float gcLen = 0;
		// increment gcLen for each 'g' or 'c' encountered in a dna
		for (final char letter : dna.toCharArray()) {
			if ((letter == 'c') || (letter == 'g')) {
				gcLen++;
			}
		}
		return (gcLen / dna.length());
	}

	/**
	 * Formats the nucleotide sequence into a readable format.
	 * 
	 * @category Output
	 * @param dna        The DNA sequence that was analyzed
	 * @param count      The count of the nucleotide in the DNA sequence
	 * @param nucleotide The nucleotide that was searched for
	 */
	private static void formatNucleotideCount(final String dna, final int count, final String nucleotide) {
		System.out.println(nucleotide + ": " + count + " (" + (float) count / dna.length() * 100 + "%)");
	}

	/**
	 * Counts the number of nucleotides in the DNA sequence.
	 * 
	 * @category Properties
	 * @param dna sequence
	 * @return The mapping between the nucleotides and their count in given DNA
	 *         sequence.
	 */
	private static Map<Character, Integer> countNucleotides(final String dna) {
		final Map<Character, Integer> nucleotidesCount = new HashMap<>(Map.of('a', 0, 't', 0, 'g', 0, 'c', 0));
		dna.chars().mapToObj(c -> (char) c).forEach(letter -> {
			final int newValue = nucleotidesCount.get(letter) + 1;
			nucleotidesCount.replace(letter, newValue);
		});
		return nucleotidesCount;
	}

	/**
	 * Prints the nucleotide count of the DNA sequence.
	 * 
	 * @category Output
	 * @param dna The DNA sequence that was analyzed
	 */
	public static void printNucleotideCount(final String dna) {
		final Map<Character, Integer> nucleotideCountMapping = countNucleotides(dna);
		System.out.println("Nucleotide count:");
		formatNucleotideCount(dna, nucleotideCountMapping.get('a'), "A");
		formatNucleotideCount(dna, nucleotideCountMapping.get('t'), "T");
		formatNucleotideCount(dna, nucleotideCountMapping.get('g'), "G");
		formatNucleotideCount(dna, nucleotideCountMapping.get('c'), "C");
	}

	/**
	 * Checks if the DNA sequence is random or not.
	 * 
	 * @category Properties
	 * @param dna The DNA sequence that was analyzed
	 * @return Whether the DNA sequence is random or not
	 */
	public static boolean isRandomDNA(final String dna) {
		final Map<Character, Integer> nucleotideCount = countNucleotides(dna);

		final int a = nucleotidePercentage(nucleotideCount.get('a'), dna);
		final int t = nucleotidePercentage(nucleotideCount.get('t'), dna);
		;
		final int g = nucleotidePercentage(nucleotideCount.get('g'), dna);
		;
		final int c = nucleotidePercentage(nucleotideCount.get('c'), dna);
		;

		// If the percentage of each nucleotide is between 2% of one another, then it is
		// random
		return (Math.abs(a - t) <= 2) && (Math.abs(a - g) <= 2) && (Math.abs(a - c) <= 2) && (Math.abs(t - g) <= 2)
				&& (Math.abs(t - c) <= 2) && (Math.abs(g - c) <= 2);
	}

	/**
	 * Calculates the percentage of given amount of nucleotide in the dna sequence/
	 * 
	 * @param nucleotideCount
	 * @param dna
	 * @return
	 */
	private static int nucleotidePercentage(final int nucleotideCount, final String dna) {
		return (int) (((float) nucleotideCount) / dna.length() * 100);
	}
}
