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

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

/** The GUI for DNAnalyzer */
public class DNAnalyzerGUI extends Application {

  @Override
  /**
   * Starts and initializes the GUI
   *
   * @param stage the stage to be used
   * @throws Exception
   */
  public void start(Stage stage) throws Exception {
    // Parent root = FXMLLoader.load(getClass().getResource("DNAnalyzerGUI.fxml"));
    Parent root =
        FXMLLoader.load(DNAnalyzerGUI.class.getResource("/DNAnalyzer/gui/fxml/DNAnalyzerGUI.fxml"));
    Scene scene = new Scene(root);
    scene
        .getStylesheets()
        .add(DNAnalyzerGUI.class.getResource("/DNAnalyzer/gui/styles.css").toExternalForm());

    stage.setTitle("DNAnalyzer GUI");
    stage.setScene(scene);
    stage.show();
  }

  /**
   * Launches the GUI
   *
   * @param args the arguments to be passed
   */
  public static void launchIt(String[] args) {
    launch(args);
  }
}
