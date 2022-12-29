package DNAnalyzer.core;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.*;

class PropertiesTest {

    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @BeforeEach
    void setUp() {
    }

    @Test
    void shouldGetGCContent() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            double expected = 0.5000109;
            float actual = Properties.getGCContent(inputLines.get(0));
            assertEquals(expected, actual,0.01);
        } catch (IOException ex) {
            Logger.getLogger(PropertiesTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    void shouldGetGCContentAsZero() {
           // List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            String testEmptyString = "";
            double expected = 0;
            float actual = Properties.getGCContent(testEmptyString);
            assertEquals(expected, actual);
    }

    @Test
    void sholudCalculateLengthOfCG() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            int expected = 50001033;
            int actual = Properties.calculateLengthOfCG(inputLines.get(0));
            assertEquals(expected, actual);
        } catch (IOException ex) {
            Logger.getLogger(PropertiesTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    void sholudCalculateLengthOfCGAsZero() {
            String testEmptyString = "";
            int expected = 0;
            int actual = Properties.calculateLengthOfCG(testEmptyString);
            assertEquals(expected, actual);
    }
    @Test
    void shouldLetterIsCorGReturnTrue() {
        boolean actual = Properties.letterIsCorG('c');
        assertTrue(actual);
    }

    @Test
    void shouldLetterIsCorGReturnFalse() {
        boolean actual = Properties.letterIsCorG('b');
        assertFalse(actual);
    }

    @Test
    void shouldIsRandomDNAReturnTrue() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            boolean actual = Properties.isRandomDNA(inputLines.get(0));
            assertTrue(actual);
        } catch (IOException ex) {
            Logger.getLogger(PropertiesTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

//    @Test
//    void shouldIsRandomDNAReturnFalse() {
//            String testEmptyString = "";
//            boolean actual = Properties.isRandomDNA(testEmptyString);
//            assertFalse(actual);
//    }

    @Test
    void shouldIsDifferenceLessOrEqualTo2ReturnTrue() {
        boolean actual = Properties.isDifferenceLessOrEqualTo2(10,9);
        assertTrue(actual);
    }

    @Test
    void shouldIsDifferenceLessOrEqualTo2ReturnFalse() {
        boolean actual = Properties.isDifferenceLessOrEqualTo2(10,1);
        assertFalse(actual);
    }
}