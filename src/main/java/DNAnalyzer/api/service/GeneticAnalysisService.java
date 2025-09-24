package DNAnalyzer.api.service;

import DNAnalyzer.ancestry.AncestrySnapshot;
import DNAnalyzer.ancestry.AncestrySnapshot.Result;
import DNAnalyzer.api.dto.response.GeneticAnalysisResponse;
import DNAnalyzer.api.dto.response.GeneticAnalysisResponse.AncestrySummary;
import DNAnalyzer.api.dto.response.GeneticAnalysisResponse.PopulationMatch;
import DNAnalyzer.api.dto.response.GeneticAnalysisResponse.RiskScore;
import DNAnalyzer.api.dto.response.GeneticAnalysisResponse.RiskVariant;
import DNAnalyzer.prs.GenotypeData;
import DNAnalyzer.prs.GenotypeData.GenotypeRecord;
import DNAnalyzer.prs.PolygenicRiskCalculator;
import DNAnalyzer.prs.PolygenicRiskCalculator.VariantContribution;
import DNAnalyzer.prs.PolygenicRiskResult;
import DNAnalyzer.prs.RiskWeightTable;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GeneticAnalysisService {

  private final PolygenicRiskCalculator riskCalculator;
  private final AncestrySnapshot ancestrySnapshot;
  private final List<RiskWeightTable> riskTables;

  public GeneticAnalysisService() {
    this(loadBundledAncestry(), loadBundledRiskTables(), new PolygenicRiskCalculator());
  }

  GeneticAnalysisService(
      AncestrySnapshot ancestrySnapshot,
      List<RiskWeightTable> riskTables,
      PolygenicRiskCalculator riskCalculator) {
    this.ancestrySnapshot = ancestrySnapshot;
    this.riskTables = riskTables == null ? List.of() : List.copyOf(riskTables);
    this.riskCalculator =
        Objects.requireNonNullElseGet(riskCalculator, PolygenicRiskCalculator::new);
  }

  public GeneticAnalysisResponse analyze(MultipartFile geneticFile, boolean includeVariantDetails)
      throws IOException {
    if (geneticFile == null || geneticFile.isEmpty()) {
      throw new IllegalArgumentException("geneticFile must not be empty");
    }

    Path tempFile = Files.createTempFile("dnanalyzer-genetic", ".txt");
    try (InputStream input = geneticFile.getInputStream()) {
      Files.copy(input, tempFile, StandardCopyOption.REPLACE_EXISTING);
    }

    List<String> warnings = new ArrayList<>();
    try {
      GenotypeData genotypeData = GenotypeData.from23AndMe(tempFile);
      Map<String, String> genotypeMap =
          genotypeData.records().values().stream()
              .collect(
                  Collectors.toMap(
                      GenotypeRecord::rsid,
                      GenotypeRecord::genotype,
                      (existing, replacement) -> existing,
                      LinkedHashMap::new));

      int variantCount = genotypeMap.size();
      long calledVariants =
          genotypeMap.values().stream().filter(genotype -> !"--".equals(genotype)).count();
      double callRate = variantCount == 0 ? 0.0 : calledVariants / (double) variantCount;

      AncestrySummary ancestry = buildAncestrySummary(genotypeMap, warnings);
      List<RiskScore> riskScores = buildRiskScores(genotypeData, includeVariantDetails, warnings);

      return new GeneticAnalysisResponse(
          Optional.ofNullable(geneticFile.getOriginalFilename()).orElse("genetic-data"),
          variantCount,
          callRate,
          ancestry,
          riskScores,
          List.copyOf(warnings));
    } finally {
      Files.deleteIfExists(tempFile);
    }
  }

  private AncestrySummary buildAncestrySummary(
      Map<String, String> genotypeMap, List<String> warnings) {
    if (ancestrySnapshot == null) {
      warnings.add("Ancestry reference data unavailable; ancestry scoring skipped.");
      return null;
    }
    List<Result> results = ancestrySnapshot.analyze(genotypeMap);
    if (results.isEmpty()) {
      warnings.add("Ancestry analysis produced no comparable markers.");
      return null;
    }
    Optional<Result> best =
        results.stream().filter(result -> result.getComparedMarkers() > 0).findFirst();
    String bestPopulation = best.map(Result::getPopulation).orElse(null);
    double bestMatch = best.map(Result::getMatchRate).orElse(0.0);
    List<PopulationMatch> populations =
        results.stream()
            .map(
                result ->
                    new PopulationMatch(
                        result.getPopulation(),
                        result.getMatchRate(),
                        result.getMatchedMarkers(),
                        result.getComparedMarkers(),
                        result.getTotalPanelMarkers(),
                        result.getMissingMarkers().size()))
            .collect(Collectors.toList());
    String summary = ancestrySnapshot.formatResults(genotypeMap);
    return new AncestrySummary(bestPopulation, bestMatch, populations, summary);
  }

  private List<RiskScore> buildRiskScores(
      GenotypeData genotypeData, boolean includeVariantDetails, List<String> warnings) {
    if (riskTables.isEmpty()) {
      warnings.add("No polygenic risk weight tables were found; risk scoring skipped.");
      return List.of();
    }
    List<RiskScore> scores = new ArrayList<>();
    for (RiskWeightTable table : riskTables) {
      try {
        PolygenicRiskResult result = riskCalculator.calculate(genotypeData, table);
        List<RiskVariant> variants =
            includeVariantDetails
                ? result.contributions().stream()
                    .map(this::toVariantResponse)
                    .collect(Collectors.toList())
                : List.of();
        scores.add(
            new RiskScore(
                table.name(),
                result.rawScore(),
                result.normalisedScore(),
                result.coverage(),
                result.matchedVariants(),
                result.missingVariants(),
                variants));
      } catch (Exception ex) {
        warnings.add("Failed to compute PRS for table '" + table.name() + "': " + ex.getMessage());
      }
    }
    return scores;
  }

  private RiskVariant toVariantResponse(VariantContribution contribution) {
    return new RiskVariant(
        contribution.rsid(),
        contribution.genotype(),
        contribution.riskAllele(),
        contribution.dosage(),
        contribution.weight(),
        contribution.contribution(),
        contribution.matched(),
        contribution.note());
  }

  private static AncestrySnapshot loadBundledAncestry() {
    try {
      return AncestrySnapshot.usingBundledReference();
    } catch (IOException ex) {
      return null;
    }
  }

  private static List<RiskWeightTable> loadBundledRiskTables() {
    Path riskDir = Path.of("assets", "risk");
    if (!Files.isDirectory(riskDir)) {
      return List.of();
    }
    try (Stream<Path> stream = Files.list(riskDir)) {
      return stream
          .filter(path -> path.getFileName().toString().toLowerCase(Locale.ROOT).endsWith(".csv"))
          .sorted()
          .map(
              path -> {
                try {
                  return RiskWeightTable.fromCsv(path);
                } catch (IOException ex) {
                  return null;
                }
              })
          .filter(Objects::nonNull)
          .collect(
              Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
    } catch (IOException ex) {
      return List.of();
    }
  }
}
