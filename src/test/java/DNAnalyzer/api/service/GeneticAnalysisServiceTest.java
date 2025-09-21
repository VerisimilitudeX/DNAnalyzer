package DNAnalyzer.api.service;

import static org.assertj.core.api.Assertions.assertThat;

import DNAnalyzer.ancestry.AncestrySnapshot;
import DNAnalyzer.api.dto.response.GeneticAnalysisResponse;
import DNAnalyzer.prs.PolygenicRiskCalculator;
import DNAnalyzer.prs.RiskWeightTable;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

class GeneticAnalysisServiceTest {

    private GeneticAnalysisService service;

    @BeforeEach
    void setUp() throws IOException {
        AncestrySnapshot snapshot = AncestrySnapshot.fromReferencePanel(Map.of(
                "TestPop", Map.of("rs123", "AA", "rs456", "AG"),
                "AltPop", Map.of("rs123", "GG", "rs456", "GG")));

        Path weightsFile = Files.createTempFile("prs", ".csv");
        Files.writeString(weightsFile, "rs123,A,1.2\nrs456,G,0.8\n", StandardCharsets.UTF_8);
        RiskWeightTable table = RiskWeightTable.fromCsv(weightsFile);
        Files.deleteIfExists(weightsFile);

        service = new GeneticAnalysisService(snapshot, List.of(table), new PolygenicRiskCalculator());
    }

    @Test
    void analyzeReturnsAncestryAndRiskScores() throws IOException {
        String genotype = "rsid\tchromosome\tposition\tgenotype\n"
                + "rs123\t1\t111\tAA\n"
                + "rs456\t1\t222\tAG\n";
        MockMultipartFile file = new MockMultipartFile("geneticFile", "genotype.txt", "text/plain",
                genotype.getBytes(StandardCharsets.UTF_8));

        GeneticAnalysisResponse response = service.analyze(file, true);

        assertThat(response.variantCount()).isEqualTo(2);
        assertThat(response.callRate()).isEqualTo(1.0d);
        assertThat(response.ancestry()).isNotNull();
        assertThat(response.ancestry().bestPopulation()).isEqualTo("TestPop");
        assertThat(response.riskScores()).hasSize(1);
        assertThat(response.riskScores().get(0).variants()).isNotEmpty();
        assertThat(response.warnings()).isEmpty();
    }

    @Test
    void analyzeWithoutVariantDetailsOmitsContributions() throws IOException {
        String genotype = "rsid\tchromosome\tposition\tgenotype\n"
                + "rs123\t1\t111\tAA\n"
                + "rs456\t1\t222\tAG\n";
        MockMultipartFile file = new MockMultipartFile("geneticFile", "genotype.txt", "text/plain",
                genotype.getBytes(StandardCharsets.UTF_8));

        GeneticAnalysisResponse response = service.analyze(file, false);

        assertThat(response.riskScores()).hasSize(1);
        assertThat(response.riskScores().get(0).variants()).isEmpty();
    }
}
