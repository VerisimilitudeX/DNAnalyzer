package DNAnalyzer.utils.core;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.*;

class DNAToolsTest {

    DNATools dnaTools;
    String dnaString;
    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @BeforeEach
    void setUp() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            dnaString = inputLines.get(0);

        } catch (IOException ex) {
            Logger.getLogger(DNAToolsTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    void shouldIsValidThrowException() {
        dnaTools = new DNATools("");
        var expected = "Invalid characters present in DNA sequence.";
        Exception exception = assertThrows(IllegalArgumentException.class, () -> dnaTools.isValid());
        assertEquals(expected, exception.getMessage());
    }

    @Test
    void shouldIsValidNotThrowException() {
        dnaTools = new DNATools("atgc");
        assertDoesNotThrow(() -> dnaTools.isValid());
    }

    @Test
    void shouldReplaceDNAString() {
        var expected = "AAAacggctcaaaacca";
        dnaTools = new DNATools("gagacggctcaaaacca");
        var newDnaTools = dnaTools.replace("gag", "AAA");
        var actual = newDnaTools.getDna();
        assertEquals(expected, actual);
    }

    @Test
    void shouldReverseDNAString() {
        var expected = "cagag";
        dnaTools = new DNATools("gagac");
        var newDnaTools = dnaTools.reverse();
        var actual = newDnaTools.getDna();
        assertEquals(expected, actual);
    }
}