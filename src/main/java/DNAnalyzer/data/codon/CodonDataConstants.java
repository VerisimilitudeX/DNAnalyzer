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

import java.util.*;

import DNAnalyzer.data.aminoAcid.*;

/**
 * Declares the codon data for the 20 amino acids
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 * @see "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables"
 */
public class CodonDataConstants {
	/**
	 * Private CodonDataConstants class constructor to avoid initialization
	 */
	private CodonDataConstants() {
	}

	// Declares the stop codon data for the 20 amino acids. Note that the stop
	// codons are the same for all amino acids.
	public static final List<String> STOP = List.of("TAA", "TAG", "TGA");

	// Block to put all AminoAcidNames and their respective codon data into an enum
	// map for faster
	// retrieval
	protected static EnumMap<AminoAcid, List<String>> codonDataAcidMap = new EnumMap<>(AminoAcid.class);

	static {
		for (AminoAcid aminoAcid : AminoAcid.values()) {
			codonDataAcidMap.put(aminoAcid, aminoAcid.getCodonData());
		}
	}
}
