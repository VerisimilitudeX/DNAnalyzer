package DNAnalyzer.gui;

import DNAnalyzer.DNAAnalysis;
import DNAnalyzer.DNATools;
import DNAnalyzer.Main;
import DNAnalyzer.Properties;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.control.TextField;

import java.io.File;
import java.io.IOException;

import static DNAnalyzer.Utils.readFile;

public class DNAnalyzerGUIFXMLController {
    private DNAAnalysis dnaAnalyzer(String dna, String protein, final String aminoAcid) {
        return new DNAAnalysis(new DNATools(dna), protein, aminoAcid);
    }

    @FXML
    private Slider minSlider;

    @FXML
    private Slider maxSlider;

    @FXML
    private TextField txtAmino;

    @FXML
    private TextField txtDNAFile;

    @FXML
    private TextField txtProteinFile;

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
        System.out.println("analyze clicked");
        int minCount = (int)minSlider.getValue();
        int maxCount = (int)maxSlider.getValue();
        String aminoAcid = txtAmino.getText();
        boolean reverse = false;
        String dnaFilename = txtDNAFile.getText();
        String dna = readFile(new File(dnaFilename));
        String proteinFilename = txtProteinFile.getText();
        String protein = readFile(new File(proteinFilename));
        System.out.println("min: " + minCount + ", max: " + maxCount + ", amino: " + aminoAcid);

        DNAAnalysis dnaAnalyzer = dnaAnalyzer(dna, protein, aminoAcid)
                .isValidDna()
                .replaceDNA("u", "t");

        if (reverse) {
            dnaAnalyzer = dnaAnalyzer.reverseDna();
        }

        dnaAnalyzer
                .printProteins()
                .outPutCodons(minCount, maxCount)
                .printLongestProtein();

        if (Properties.isRandomDNA(dnaAnalyzer.dna().getDna())) {
            System.out.println("\n" + dnaFilename + " has been detected to be random.");
        }

    }

    public void initialize() {
        // TODO
    }
}
