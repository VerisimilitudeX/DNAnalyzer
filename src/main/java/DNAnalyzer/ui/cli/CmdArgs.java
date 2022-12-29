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
 
package DNAnalyzer.ui.cli;

import DNAnalyzer.Main;
import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.core.Properties;
import DNAnalyzer.ui.gui.DNAnalyzerGUI;
import DNAnalyzer.utils.core.DNATools;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

import static DNAnalyzer.utils.core.Utils.readFile;

import java.io.File;
import java.io.IOException;

/**
 * Class for handling command-line arguments.
 *
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 1.2.1
 */
@Command(name = "DNAnalyzer", mixinStandardHelpOptions = true, description = "A program to analyze DNA sequences.")
public class CmdArgs implements Runnable {
	@Option(names = { "--gui" }, description = "Start in GUI mode")
	Boolean startGUI = false;

	@Option(names = { "--amino" }, description = "The amino acid representing the start of a gene.")
	String aminoAcid;

	@Option(names = { "--min" }, description = "The minimum count of the reading frame.")
	int minCount = 0;

	@Option(names = { "--max" }, description = "The maximum count of the reading frame.")
	int maxCount = 0;

	@Parameters(paramLabel = "DNA", description = "The FASTA file to be analyzed.")
	File dnaFile;

	@Option(names = { "--find" }, description = "The DNA sequence to be found within the FASTA file.")
	File proteinFile;

	@Option(names = { "--reverse", "-r" }, description = "Reverse the DNA sequence before processing.")
	boolean reverse;

	/**
	 * Output a list of proteins, GC content, Nucleotide content, and other
	 * information found in a DNA
	 * sequence.
	 *
	 * @throws IllegalArgumentException when the DNA FASTA file contains an invalid
	 *                                  DNA sequence
	 */
	@Override
	public void run() {
		if (startGUI == true) {
			String[] args = new String[0];
			DNAnalyzerGUI.launchIt(args);
		} else {
			DNAAnalysis dnaAnalyzer = dnaAnalyzer(aminoAcid)
					.isValidDna()
					.replaceDNA("u", "t");

			if (reverse == true) {
				dnaAnalyzer = dnaAnalyzer.reverseDna();
			}

			dnaAnalyzer
					.printProteins(System.out)
					.printHighCoverageRegions(System.out)
					.outPutCodons(minCount, maxCount, System.out)
					.printLongestProtein(System.out);

			if (Properties.isRandomDNA(dnaAnalyzer.dna().getDna())) {
				System.out.println("\n" + dnaFile.getName() + " has been detected to be random.");
			}
		}
	}

	/**
	 * @param aminoAcid representing the start of the gene
	 * @return DnaAnalyzer which provides functions to analyze the dnaFile, protein
	 *         file and supplied aminoAcid
	 */
	private DNAAnalysis dnaAnalyzer(final String aminoAcid) {
		try {
			String protein = null;
			Main.clearTerminal();
			final String dna = readFile(dnaFile);
			if (proteinFile != null) {
				protein = readFile(proteinFile);
			}
			return new DNAAnalysis(new DNATools(dna), protein, aminoAcid);
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			return new DNAAnalysis(null, null, aminoAcid);
		}
	}
}
