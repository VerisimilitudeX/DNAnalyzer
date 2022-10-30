package DNAnalyzer.gui;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class DNAnalyzerGUI extends Application {

    @Override
    public void start(Stage stage) throws Exception {
       //Parent root = FXMLLoader.load(getClass().getResource("DNAnalyzerGUI.fxml"));
        Parent root = FXMLLoader.load(getClass().getResource("fxml/DNAnalyzerGUI.fxml"));
        Scene scene = new Scene(root);
        //scene.getStylesheets().add(getClass().getResource("styles.css").toExternalForm());

        stage.setTitle("DNAnalyzer GUI");
        stage.setScene(scene);
        stage.show();
    }

    public static void launchIt(String[] args) {
        launch(args);
    }
}
