package DNAnalyzer.gui;

import DNAnalyzer.DNAAnalysis;
import DNAnalyzer.DNATools;
import DNAnalyzer.Properties;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Slider;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

import java.io.*;
import java.io.PrintStream;

import static DNAnalyzer.Utils.readFile;

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
        // TODO
    }
}
