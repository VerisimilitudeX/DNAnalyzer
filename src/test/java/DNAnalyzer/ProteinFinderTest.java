package DNAnalyzer;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.junit.jupiter.api.Test;

import DNAnalyzer.utils.protein.ProteinFinder;

public class ProteinFinderTest {
    Path testFile = Path.of("C:\\Users\\garyg\\Documents\\projects\\DNAnalyzer\\assets\\dna\\random\\dnalong.fa");
    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");
    

    @Test
    public void testGetProtein() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            List<String> expected = new ArrayList<String>();
            expected.add("AATTCCCTACAACGGATGCGCCGCTGATAGACTCGGGTTCTGGCGTCCGAGTGAAGATGATAA");
            expected.add("AACCAATCTCATGATCACCAGTTCTGACGTTACAGTATTTTCGGTTGAGCAGGCCCCATGGGGCCCCCGCATGCCGAATTACGATATGATGCCCACTATCCTGTGTCTTCCAACCTTATGACTGACTTGTATGCGCTGCGAGGTCCCTCGATAGATTTGCTCCCACCCGTCCCGGAAACCATATCGACGACTTGTAGGTCTCTAA");

            List<String> actual = ProteinFinder.getProtein(inputLines.get(0), "n");
            assertArrayEquals(expected.toArray(), actual.toArray());
        } catch (IOException ex) {
            Logger.getLogger(ProteinFinderTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
