package DNAnalyzer.core;

import DNAnalyzer.utils.protein.ProteinFinder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.*;

class PropertiesTest {

    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    String dnaString="";
    @BeforeEach
    void setUp() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            dnaString = inputLines.get(0);
        } catch (IOException ex) {
            Logger.getLogger(PropertiesTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    void shouldGetGCContent() {
            double expected = 0.5000109;
            float actual = Properties.getGCContent(dnaString);
            assertEquals(expected, actual,0.01);

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
            int expected = 50001033;
            int actual = Properties.calculateLengthOfCG(dnaString);
            assertEquals(expected, actual);
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
            boolean actual = Properties.isRandomDNA(dnaString);
            assertTrue(actual);
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

    @Test
    void printProteinList() {
        PrintStream originalOut = System.out;
        var aminoAcid = "GLYCINE";

        var expected = """
                Proteins coded for Glycine: \r
                ----------------------------------------------------\r
                1. GGTCCCTCGATAGATTTGCTCCCACCCGTCCCGGAAACCATATCGACGACTTGTAGGTCTCTAA\r
                2. GGCTCAAAACCAATCTCATGATCACCAGTTCTGACGTTACAGTATTTTCGGTTGAGCAGGCCCCATGGGGCCCCCGCATGCCGAATTACGATATGATGCCCACTATCCTGTGTCTTCCAACCTTATGACTGACTTGTATGCGCTGCGAGGTCCCTCGATAGATTTGCTCCCACCCGTCCCGGAAACCATATCGACGACTTGTAGGTCTCTAA\r
                3. GGAAACCATATCGACGACTTGTAGGTCTCTAA\r
                4. GGGTTCTGGCGTCCGAGTGAAGATGATAA\r
                """;

        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream(100);
            PrintStream capture = new PrintStream(os);
            // From this point on, everything printed to System.out will get captured
            System.setOut(capture);
            var proteinList = ProteinFinder.getProtein(dnaString, aminoAcid);

            Properties.printProteinList(proteinList, aminoAcid, capture);
            capture.flush();
            var actual = os.toString();
            assertEquals(expected, actual);
        } finally {
            System.setOut(originalOut);
        }
    }

    @Test
    void printNucleotideCount() {
        PrintStream originalOut = System.out;
        var expected = """
                Nucleotide count:\r
                A: 25000381 (25.000381%)\r
                T: 24998528 (24.998528%)\r
                G: 25000967 (25.000969%)\r
                C: 25000124 (25.000126%)\r
                """;

        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream(100);
            PrintStream capture = new PrintStream(os);
            // From this point on, everything printed to System.out will get captured
            System.setOut(capture);

            Properties.printNucleotideCount(dnaString,capture);
            capture.flush();
            var actual = os.toString();
            assertEquals(expected, actual);
        } finally {
            System.setOut(originalOut);
        }

    }
}