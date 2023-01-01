package DNAnalyzer.utils.protein;

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

class ProteinAnalysisTest {

    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    String dnaString="";

    @BeforeEach
    void setUp() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            dnaString = inputLines.get(0);
        } catch (IOException ex) {
            Logger.getLogger(ProteinAnalysisTest.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
    @Test
    void shouldPrintHighCoverageRegions() {
        PrintStream originalOut = System.out;
        var aminoAcid = "GLYCINE";

        var expected = """
                
                High coverage regions: \r
                ----------------------------------------------------\r
                1. GGTCCCTCGATAGATTTGCTCCCACCCGTCCCGGAAACCATATCGACGACTTGTAGGTCTCTAA\r
                2. GGCTCAAAACCAATCTCATGATCACCAGTTCTGACGTTACAGTATTTTCGGTTGAGCAGGCCCCATGGGGCCCCCGCATGCCGAATTACGATATGATGCCCACTATCCTGTGTCTTCCAACCTTATGACTGACTTGTATGCGCTGCGAGGTCCCTCGATAGATTTGCTCCCACCCGTCCCGGAAACCATATCGACGACTTGTAGGTCTCTAA\r
                3. GGAAACCATATCGACGACTTGTAGGTCTCTAA\r
                4. GGGTTCTGGCGTCCGAGTGAAGATGATAA\r
                """ ;

        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream(100);
            PrintStream capture = new PrintStream(os);
            // From this point on, everything printed to System.out will get captured
            System.setOut(capture);

            var proteinList = ProteinFinder.getProtein(dnaString, aminoAcid);

            ProteinAnalysis.printHighCoverageRegions(proteinList, capture);
            capture.flush();
            var actual = os.toString();
            assertEquals(expected, actual);
        }  finally {
            System.setOut(originalOut);
        }
    }

    @Test
    void shouldPrintLongestProtein() {
        PrintStream originalOut = System.out;
        var aminoAcid = "GLYCINE";

        var expected = """
                
                Longest gene (212 nucleotides): GGCTCAAAACCAATCTCATGATCACCAGTTCTGACGTTACAGTATTTTCGGTTGAGCAGGCCCCATGGGGCCCCCGCATGCCGAATTACGATATGATGCCCACTATCCTGTGTCTTCCAACCTTATGACTGACTTGTATGCGCTGCGAGGTCCCTCGATAGATTTGCTCCCACCCGTCCCGGAAACCATATCGACGACTTGTAGGTCTCTAA\r
                """;
        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream(100);
            PrintStream capture = new PrintStream(os);
            // From this point on, everything printed to System.out will get captured
            System.setOut(capture);
            var proteinList = ProteinFinder.getProtein(dnaString, aminoAcid);

            ProteinAnalysis.printLongestProtein(proteinList, capture);
            capture.flush();
            var actual = os.toString();
            assertEquals(expected, actual);
        } finally {
            System.setOut(originalOut);
        }

    }
}