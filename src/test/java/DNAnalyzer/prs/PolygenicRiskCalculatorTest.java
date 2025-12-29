package DNAnalyzer.prs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class PolygenicRiskCalculatorTest {

  @TempDir Path tempDir;

  @Test
  void calculatesPolygenicRiskScore() throws IOException {
    Path genotypeFile = tempDir.resolve("genotype.txt");
    Files.write(
        genotypeFile,
        List.of(
            "# Example 23andMe file",
            "rsid\tchromosome\tposition\tgenotype",
            "rs6025\t1\t1000\tAA",
            "rs1799983\t7\t2000\tGT",
            "rs7412\t19\t3000\tCC"),
        StandardCharsets.UTF_8);

    Path weightFile = tempDir.resolve("weights.csv");
    Files.write(
        weightFile,
        List.of("#SNP,RiskAllele,Weight", "rs6025,A,1.5", "rs1799983,T,1.2", "rs7412,C,0.8"),
        StandardCharsets.UTF_8);

    GenotypeData genotypeData = GenotypeData.from23AndMe(genotypeFile);
    RiskWeightTable table = RiskWeightTable.fromCsv(weightFile);
    PolygenicRiskCalculator calculator = new PolygenicRiskCalculator();

    PolygenicRiskResult result = calculator.calculate(genotypeData, table);

    assertEquals(3, result.matchedVariants());
    assertEquals(0, result.missingVariants());
    assertEquals(3, result.contributions().size());
    assertEquals(5.8d, result.rawScore(), 1e-9);
    assertEquals(1.0d, result.coverage(), 1e-9);
    assertEquals(5.8d / (2 * (1.5d + 1.2d + 0.8d)), result.normalisedScore(), 1e-9);

    PolygenicRiskCalculator.VariantContribution contribution = result.contributions().get(0);
    assertTrue(contribution.matched());
    assertEquals(2, contribution.dosage());
  }

  @Test
  void flagsMissingVariantsWhenGenotypeAbsent() throws IOException {
    Path genotypeFile = tempDir.resolve("partial_genotype.txt");
    Files.write(
        genotypeFile,
        List.of(
            "# Example 23andMe file",
            "rsid\tchromosome\tposition\tgenotype",
            "rs6025\t1\t1000\tAA"),
        StandardCharsets.UTF_8);

    Path weightFile = tempDir.resolve("weights_missing.csv");
    Files.write(
        weightFile,
        List.of("SNP,RiskAllele,Weight", "rs6025,A,1.5", "rs123456,G,0.4"),
        StandardCharsets.UTF_8);

    GenotypeData genotypeData = GenotypeData.from23AndMe(genotypeFile);
    RiskWeightTable table = RiskWeightTable.fromCsv(weightFile);
    PolygenicRiskCalculator calculator = new PolygenicRiskCalculator();

    PolygenicRiskResult result = calculator.calculate(genotypeData, table);

    assertEquals(2, result.totalVariants());
    assertEquals(1, result.matchedVariants());
    assertEquals(1, result.missingVariants());
    assertEquals(1.5d * 2, result.rawScore(), 1e-9);

    PolygenicRiskCalculator.VariantContribution missingContribution =
        result.contributions().stream().filter(c -> !c.matched()).findFirst().orElseThrow();

    assertEquals("rs123456", missingContribution.rsid());
    assertFalse(missingContribution.matched());
    assertEquals("--", missingContribution.genotype());
  }
}
