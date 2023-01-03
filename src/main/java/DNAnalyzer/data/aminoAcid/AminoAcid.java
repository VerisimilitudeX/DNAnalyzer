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

import java.util.List;

/**
 * AminoAcid enum that represent the amino acid values. Each value can be
 * searched by several
 * abbreviations.
 */
public enum AminoAcid {
	ALANINE("Alanine", List.of("a", "alanine", "ala"), List.of("GCT", "GCC", "GCA", "GCG")),
	CYSTEINE("Cysteine", List.of("c", "cysteine", "cys"), List.of("TGT", "TGC")),
	ASPARTIC_ACID("Aspartic acid", List.of("d", "aspartic acid", "asp"), List.of("GAT", "GAC")),
	GLUTAMIC_ACID("Glutamic acid", List.of("e", "glutamic acid", "glu"), List.of("GAA", "GAG")),
	PHENYLALANINE("Phenylalanine", List.of("f", "phenylalanine", "phe"), List.of("TTT", "TTC")),
	GLYCINE("Glycine", List.of("g", "glycine", "gly"), List.of("GGT", "GGC", "GGA", "GGG")),
	HISTIDINE("Histidine", List.of("h", "histidine", "his"), List.of("CAT", "CAC")),
	ISOLEUCINE("Isoleucine", List.of("i", "isoleucine", "ile"), List.of("ATT", "ATC", "ATA")),
	LYSINE("Lysine", List.of("k", "lysine", "lys"), List.of("AAA", "AAG")),
	LEUCINE("Leucine", List.of("l", "leucine", "leu"), List.of("CTT", "CTC", "CTA", "CTG", "TTA", "TTG")),
	METHIONINE("Methionine", List.of("m", "methionine", "met"), List.of("ATG")),
	ASPARAGINE("Asparagine", List.of("n", "asparagine", "asn"), List.of("AAT", "AAC")),
	PROLINE("Proline", List.of("p", "proline", "pro"), List.of("CCT", "CCC", "CCA", "CCG")),
	GLUTAMINE("Glutamine", List.of("q", "glutamine", "gln"), List.of("CAA", "CAG")),
	ARGININE("Arginine", List.of("r", "arginine", "arg"), List.of("CGT", "CGC", "CGA", "CGG", "AGA", "AGG")),
	SERINE("Serine", List.of("s", "serine", "ser"), List.of("TCT", "TCC", "TCA", "TCG", "AGT", "AGC")),
	THREONINE("Theornine", List.of("t", "threonine", "thr"), List.of("ACT", "ACC", "ACA", "ACG")),
	VALINE("Valine", List.of("v", "valine", "val"), List.of("GTT", "GTC", "GTA", "GTG")),
	TRYPTOPHAN("Tryptophan", List.of("w", "tryptophan", "trp"), List.of("TGG")),
	TYROSINE("Tyrosine", List.of("tyrosine", "y", "tyr"), List.of("TAT", "TAC"));

	private final String fullName;
	private final List<String> names;

	// Declares the start codon data for the 20 amino acids. Start and stop codons
	// indicate the start and stop of an amino acid. There are 20 different amino
	// acids. A protein consists of one or more chains of amino acids (called
	// polypeptides) whose sequence is encoded in a gene.
	private final List<String> codonData;

	/**
	 * Constructs an instance of an AminoAcid enum, setting its name and list of
	 * abbreviations.
	 *
	 * @param fullName      full name of the amino acid.
	 * @param abbreviations a list of abbreviations that an acid can be searched by.
	 */
	AminoAcid(final String fullName, final List<String> abbreviations, final List<String> codonData) {
		this.fullName = fullName;
		this.names = abbreviations;
		this.codonData = codonData;
	}

	public List<String> getNames() {
		return names;
	}

	public String getFullName() {
		return fullName;
	}

	public List<String> getCodonData() {
		return codonData;
	}
}
