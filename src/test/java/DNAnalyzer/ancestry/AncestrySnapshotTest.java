package DNAnalyzer.ancestry;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

import org.junit.jupiter.api.Test;

import DNAnalyzer.util.DNADataUploader;

class AncestrySnapshotTest {

    @Test
    void bundledReferenceLoads() throws IOException {
        AncestrySnapshot snapshot = AncestrySnapshot.usingBundledReference();
        assertFalse(snapshot.populations().isEmpty(), "Reference panel should expose at least one population");
    }

    @Test
    void bestMatchPrefersEuropeProfile() throws IOException {
        AncestrySnapshot snapshot = AncestrySnapshot.usingBundledReference();
        Map<String, String> genotype = Map.of(
                "rs1426654", "GG",
                "rs16891982", "GG",
                "rs2814778", "CC");
        AncestrySnapshot.Result result = snapshot.bestMatch(genotype).orElseThrow();
        assertEquals("Europe", result.getPopulation());
        assertEquals(1.0, result.getMatchRate(), 1e-9);
    }

    @Test
    void formatterHighlightsTopMatch() throws IOException {
        AncestrySnapshot snapshot = AncestrySnapshot.usingBundledReference();
        Map<String, String> genotype = Map.of(
                "rs1426654", "GG",
                "rs16891982", "GA",
                "rs2814778", "CC");
        String summary = snapshot.formatResults(genotype);
        assertNotNull(summary);
        assertTrue(summary.contains("Top match:"));
        assertTrue(summary.contains("Europe"));
    }

    @Test
    void uploaderParses23AndMeExport() throws IOException {
        Path tempFile = Files.createTempFile("genotype", ".txt");
        try {
            String body = String.join("\n",
                    "# This is a header",
                    "rs1426654\t1\t1234\tGG",
                    "rs16891982\t1\t5678\tGA",
                    "rs2814778\t1\t9101\tCC");
            Files.writeString(tempFile, body, StandardCharsets.UTF_8);
            Map<String, String> parsed = DNADataUploader.uploadFrom23AndMe(tempFile);
            assertEquals(3, parsed.size());
            assertEquals("GG", parsed.get("rs1426654"));
            assertEquals("GA", parsed.get("rs16891982"));
        } finally {
            Files.deleteIfExists(tempFile);
        }
    }
}
