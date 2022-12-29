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

package DNAnalyzer.ui.gui;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.core.Properties;
import DNAnalyzer.utils.core.DNATools;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Slider;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

import static DNAnalyzer.utils.core.Utils.readFile;

import java.io.*;
import java.io.PrintStream;

public class DNAnalyzerGUIFXMLController {
	/**
	 * Returns analysis results from DNAAnalysis class
	 *
	 * @param dna
	 * @param protein
	 * @param aminoAcid
	 * @return
	 */
	private DNAAnalysis dnaAnalyzer(String dna, String protein, final String aminoAcid) {
		return new DNAAnalysis(new DNATools(dna), protein, aminoAcid);
	}

	@FXML
	private Slider minSlider = null;

	@FXML
	private Slider maxSlider = null;

	@FXML
	private TextField txtAmino = null;

	@FXML
	private TextField txtDNAFile = null;

	@FXML
	private TextField txtProteinFile = null;

	@FXML
	private TextArea txtOutput = null;

	@FXML
	private void menuQuitClicked(ActionEvent event) {
		Platform.exit();
	}

	@FXML
	private void menuOpenClicked(ActionEvent event) {
		System.out.println("open clicked");
	}

	@FXML
	private void btnAnalyzeClicked(ActionEvent event) {
		int minCount = (int) minSlider.getValue();
		int maxCount = (int) maxSlider.getValue();
		String aminoAcid = txtAmino.getText();
		boolean reverse = false;
		String dnaFilename = txtDNAFile.getText();
		String dna = readFile(new File(dnaFilename));
		String proteinFilename = txtProteinFile.getText();
		String protein = readFile(new File(proteinFilename));

		final ByteArrayOutputStream baos = new ByteArrayOutputStream();
		PrintStream out = new PrintStream(baos, true);

		out.println("min: " + minCount + ", max: " + maxCount + ", amino: " + aminoAcid);

		DNAAnalysis dnaAnalyzer = dnaAnalyzer(dna, protein, aminoAcid)
				.isValidDna()
				.replaceDNA("u", "t");

		if (reverse) {
			dnaAnalyzer = dnaAnalyzer.reverseDna();
		}

		dnaAnalyzer
				.printProteins(out)
				.outPutCodons(minCount, maxCount, out)
				.printLongestProtein(out);

		if (Properties.isRandomDNA(dnaAnalyzer.dna().getDna())) {
			out.println("\n" + dnaFilename + " has been detected to be random.");
		}
		String output = baos.toString();
		txtOutput.setText(output);
	}

	public void initialize() {
	}
}
