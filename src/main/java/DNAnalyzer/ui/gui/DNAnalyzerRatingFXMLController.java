package dnanalyzer.ui.gui;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import org.controlsfx.control.Rating;

import javafx.scene.control.TextArea;

public class DNAnalyzerRatingFXMLController {

    @FXML
    private Rating dnaRating=null;

    @FXML
    private TextArea dnaRatingTxt= null;

    @FXML
    private void btnSubmitClicked(ActionEvent event) {
        double rating = dnaRating.getRating();
        String ratingTxt = dnaRatingTxt.getText();
        System.out.print("Rating:"+rating + " " + ratingTxt);
    }
}
