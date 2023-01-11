package DNAnalyzer.utils.protein;

import org.junit.jupiter.api.BeforeEach;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

class ProteinAnalysisTest {

    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    String dnaString = "";

    @BeforeEach
    void setUp() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            dnaString = inputLines.get(0);
        } catch (IOException ex) {
            Logger.getLogger(ProteinAnalysisTest.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

}