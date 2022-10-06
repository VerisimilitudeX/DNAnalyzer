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

/**
 * Mappings for Amino Acid Strings
 *
 * @author Shubham Jain (@shubhwip)
 * @version 1.2.1
 */
public class AminoAcidMapping {

	/**
	 * @param aminoAcid name of amino acid
	 * @return AminoAcidName Enum mapping for given aminoAcid name
	 */
	public static AminoAcidNames getAminoAcidMapping(String aminoAcid) {
		// Maps the amino acid that the user entered to the start codon list.
		switch (aminoAcid) {
			case "isoleucine", "i", "ile" -> {
				return AminoAcidNames.ISOLEUCINE;
			}
			case "leucine", "l", "leu" -> {
				return AminoAcidNames.LEUCINE;
			}
			case "valine", "v", "val" -> {
				return AminoAcidNames.VALINE;
			}
			case "phenylalanine", "f", "phe" -> {
				return AminoAcidNames.PHENYLALANINE;
			}
			case "methionine", "m", "met" -> {
				return AminoAcidNames.METHIONINE;
			}
			case "cysteine", "c", "cys" -> {
				return AminoAcidNames.CYSTEINE;
			}
			case "alanine", "a", "ala" -> {
				return AminoAcidNames.ALANINE;
			}
			case "glycine", "g", "gly" -> {
				return AminoAcidNames.GLYCINE;
			}
			case "proline", "p", "pro" -> {
				return AminoAcidNames.PROLINE;
			}
			case "threonine", "t", "thr" -> {
				return AminoAcidNames.THREONINE;
			}
			case "serine", "s", "ser" -> {
				return AminoAcidNames.SERINE;
			}
			case "tyrosine", "y", "tyr" -> {
				return AminoAcidNames.TYROSINE;
			}
			case "tryptophan", "w", "trp" -> {
				return AminoAcidNames.TRYPTOPHAN;
			}
			case "glutamine", "q", "gln" -> {
				return AminoAcidNames.GLUTAMINE;
			}
			case "asparagine", "n", "asn" -> {
				return AminoAcidNames.ASPARAGINE;
			}
			case "histidine", "h", "his" -> {
				return AminoAcidNames.HISTIDINE;
			}
			case "glutamic acid", "e", "glu" -> {
				return AminoAcidNames.GLUTAMIC_ACID;
			}
			case "aspartic acid", "d", "asp" -> {
				return AminoAcidNames.ASPARTIC_ACID;
			}
			case "lysine", "k", "lys" -> {
				return AminoAcidNames.LYSINE;
			}
			case "arginine", "r", "arg" -> {
				return AminoAcidNames.ARGININE;
			}
			default -> throw new IllegalStateException("Invalid Amino Acid: " + aminoAcid);
		}
	}
}
