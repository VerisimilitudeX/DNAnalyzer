package DNAnalyzer.utils.core;

import DNAnalyzer.data.codon.CodonFrame;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReadingFramesTest {

    ReadingFrames readingFrames;
    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @BeforeEach
    void setUp() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            readingFrames= new ReadingFrames(new CodonFrame(inputLines.get(0), (short) 1, 2, 100));

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void shouldPrintCodonCounts() {
        PrintStream originalOut = System.out;

        var expected = """
                Codons in reading frame 1 (2-100 occurrences):\r
                ----------------------------------------------------\r
                GTT: 2\r
                CCA: 2\r
                ACC: 2\r
                CCC: 2\r
                ATC: 2\r
                ATG: 4\r
                """;
        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream(100);
            PrintStream capture = new PrintStream(os);
            // From this point on, everything printed to System.out will get captured
            System.setOut(capture);
            readingFrames.printCodonCounts(capture);
            capture.flush();
            var actual = os.toString();
            assertEquals(expected, actual);
        } finally {
            System.setOut(originalOut);
        }
    }
}