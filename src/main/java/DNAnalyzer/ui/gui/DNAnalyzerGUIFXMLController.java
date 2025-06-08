/*
 * Copyright © 2025 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.ui.gui;

import static DNAnalyzer.utils.core.Utils.readFile;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.core.Properties;
import DNAnalyzer.utils.core.DNATools;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Slider;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

/** The GUI for DNAnalyzer */
public class DNAnalyzerGUIFXMLController {
  /**
   * Returns analysis results from DNAAnalysis class
   *
   * @param dna the DNA string
   * @param protein the protein string
   * @param aminoAcid the amino acid string
   * @return
   */
  private DNAAnalysis dnaAnalyzer(String dna, String protein, final String aminoAcid) {
    return new DNAAnalysis(new DNATools(dna), protein, aminoAcid);
  }

  @FXML private final Slider minSlider = null;

  @FXML private final Slider maxSlider = null;

  @FXML private final TextField txtAmino = null;

  @FXML private final TextField txtDNAFile = null;

  @FXML private final TextField txtProteinFile = null;

  @FXML private final TextArea txtOutput = null;

  /**
   * Handles the menuQuitClicked event
   *
   * @param event the event
   */
  @FXML
  private void menuQuitClicked(ActionEvent event) {
    Platform.exit();
  }

  /**
   * Handles the menuOpenClicked event
   *
   * @param event the event
   */
  @FXML
  private void menuOpenClicked(ActionEvent event) {
    FileChooser chooser = new FileChooser();
    File selected = chooser.showOpenDialog(minSlider.getScene().getWindow());
    if (selected != null) {
      txtDNAFile.setText(selected.getAbsolutePath());
    }
  }

  /**
   * Handles the menuSaveClicked event
   *
   * @param event the event
   */
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

    DNAAnalysis dnaAnalyzer =
        dnaAnalyzer(dna, protein, aminoAcid).isValidDna().replaceDNA("u", "t");

    if (reverse) {
      dnaAnalyzer = dnaAnalyzer.reverseDna();
    }

    dnaAnalyzer.printProteins(out).outPutCodons(minCount, maxCount, out).printLongestProtein(out);

    if (Properties.isRandomDNA(dnaAnalyzer.dna().getDna())) {
      out.println("\n" + dnaFilename + " has been detected to be random.");
    }
    String output = baos.toString();
    txtOutput.setText(output);
  }

  /**
   * Handles the menuAboutClicked event
   *
   * @param event the event
   */
  @FXML
  private void rateUsClicked(ActionEvent event) {
    try {
      Parent root =
          FXMLLoader.load(
              DNAnalyzerGUIFXMLController.class.getResource(
                  "/DNAnalyzer/gui/fxml/DNAnalyzerRating.fxml"));
      Scene scene = new Scene(root);
      Stage stage = new Stage();
      stage.setTitle("DNAnalyzer Rating");
      stage.setScene(scene);
      Platform.runLater(() -> stage.show());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  /** Handles the menuAboutClicked event */
  public void initialize() {}
}
