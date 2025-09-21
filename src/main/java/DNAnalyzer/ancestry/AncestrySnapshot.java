package DNAnalyzer.ancestry;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import org.json.JSONObject;

/**
 * Scores a user's genotype against the bundled on-device continental reference panel described in
 * the documentation. No data leaves the local machine.
 */
public final class AncestrySnapshot {

  private static final String CLASSPATH_REFERENCE = "ancestry/continental_reference.json";
  private static final Path FALLBACK_REFERENCE_PATH =
      Paths.get("assets", "ancestry", "continental_reference.json");

  private final Map<String, Map<String, String>> referencePanel;

  private AncestrySnapshot(Map<String, Map<String, String>> referencePanel) {
    this.referencePanel = Collections.unmodifiableMap(new LinkedHashMap<>(referencePanel));
  }

  /**
   * Loads the bundled reference panel either from the classpath or from the {@code
   * assets/ancestry/continental_reference.json} file in the repository.
   */
  public static AncestrySnapshot usingBundledReference() throws IOException {
    try (InputStream input = openBundledReference()) {
      if (input == null) {
        throw new IOException(
            "Bundled ancestry reference not found. Expected "
                + CLASSPATH_REFERENCE
                + " on the classpath or "
                + FALLBACK_REFERENCE_PATH
                + " on disk.");
      }
      return new AncestrySnapshot(parseReferencePanel(input));
    }
  }

  /**
   * Builds an instance from an externally supplied reference panel. The map should be structured as
   * {population -> {rsid -> expectedAllele}}.
   */
  public static AncestrySnapshot fromReferencePanel(Map<String, Map<String, String>> panel) {
    Objects.requireNonNull(panel, "panel");
    return new AncestrySnapshot(panel);
  }

  /**
   * Computes match statistics for each population in the reference panel. Results are sorted by
   * descending match rate and then by total matches.
   */
  public List<Result> analyze(Map<String, String> genotype) {
    Objects.requireNonNull(genotype, "genotype");
    List<Result> results = new ArrayList<>();
    for (Map.Entry<String, Map<String, String>> population : referencePanel.entrySet()) {
      String name = population.getKey();
      Map<String, String> markers = population.getValue();
      int matched = 0;
      int compared = 0;
      List<String> missing = new ArrayList<>();
      Map<String, String> mismatched = new LinkedHashMap<>();
      for (Map.Entry<String, String> marker : markers.entrySet()) {
        String rsid = marker.getKey();
        String expected = marker.getValue();
        String observed = genotype.get(rsid);
        if (observed == null || observed.isBlank() || "--".equals(observed)) {
          missing.add(rsid);
          continue;
        }
        compared++;
        if (matchesAllele(observed, expected)) {
          matched++;
        } else {
          mismatched.put(rsid, observed);
        }
      }
      results.add(new Result(name, matched, compared, markers.size(), missing, mismatched));
    }
    results.sort(
        Comparator.comparing(Result::getMatchRate)
            .reversed()
            .thenComparing(Result::getMatchedMarkers, Comparator.reverseOrder())
            .thenComparing(Result::getPopulation));
    return Collections.unmodifiableList(results);
  }

  /** Returns the top scoring population if at least one marker was comparable. */
  public Optional<Result> bestMatch(Map<String, String> genotype) {
    return analyze(genotype).stream().filter(r -> r.getComparedMarkers() > 0).findFirst();
  }

  /**
   * Renders an easy-to-read text summary highlighting the best match and reporting per-population
   * breakdowns.
   */
  public String formatResults(Map<String, String> genotype) {
    List<Result> results = analyze(genotype);
    if (results.isEmpty()) {
      return "No reference data available.";
    }
    DecimalFormatSymbols symbols = DecimalFormatSymbols.getInstance(Locale.US);
    DecimalFormat pctFormatter = new DecimalFormat("0.0%", symbols);
    StringBuilder builder = new StringBuilder();
    Optional<Result> best = results.stream().filter(r -> r.getComparedMarkers() > 0).findFirst();
    if (best.isPresent()) {
      Result winner = best.get();
      builder
          .append("Top match: ")
          .append(winner.getPopulation())
          .append(" (")
          .append(pctFormatter.format(winner.getMatchRate()))
          .append(")\n");
    } else {
      builder.append("No comparable markers were found in the supplied genotype.\n");
    }
    for (Result result : results) {
      builder
          .append("- ")
          .append(result.getPopulation())
          .append(':')
          .append(' ')
          .append(pctFormatter.format(result.getMatchRate()))
          .append(" match (")
          .append(result.getMatchedMarkers())
          .append('/')
          .append(result.getComparedMarkers())
          .append(" markers; ")
          .append(result.getMissingMarkers().size())
          .append(" missing");
      if (!result.getMismatchedMarkers().isEmpty()) {
        builder.append(", mismatches ").append(result.getMismatchedMarkers().keySet());
      }
      builder.append(')').append('\n');
    }
    return builder.toString().trim();
  }

  public Set<String> populations() {
    return referencePanel.keySet();
  }

  private static InputStream openBundledReference() throws IOException {
    ClassLoader loader = Thread.currentThread().getContextClassLoader();
    if (loader == null) {
      loader = AncestrySnapshot.class.getClassLoader();
    }
    InputStream classpathStream = loader.getResourceAsStream(CLASSPATH_REFERENCE);
    if (classpathStream != null) {
      return classpathStream;
    }
    if (Files.exists(FALLBACK_REFERENCE_PATH)) {
      return Files.newInputStream(FALLBACK_REFERENCE_PATH);
    }
    return null;
  }

  private static Map<String, Map<String, String>> parseReferencePanel(InputStream input)
      throws IOException {
    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
    input.transferTo(buffer);
    String json = new String(buffer.toByteArray(), StandardCharsets.UTF_8);
    JSONObject root = new JSONObject(json);
    Map<String, Map<String, String>> panel = new LinkedHashMap<>();
    for (String population : root.keySet()) {
      JSONObject markers = root.getJSONObject(population);
      Map<String, String> markerMap = new LinkedHashMap<>();
      for (String rsid : markers.keySet()) {
        markerMap.put(rsid, markers.getString(rsid));
      }
      panel.put(population, Collections.unmodifiableMap(markerMap));
    }
    return panel;
  }

  private static boolean matchesAllele(String observed, String expected) {
    if (expected == null || expected.isBlank()) {
      return false;
    }
    String normalizedObserved = observed.trim().toUpperCase(Locale.ROOT);
    String normalizedExpected = expected.trim().toUpperCase(Locale.ROOT);
    if (normalizedObserved.equals(normalizedExpected)) {
      return true;
    }
    if (normalizedExpected.length() == 1) {
      return normalizedObserved.indexOf(normalizedExpected.charAt(0)) >= 0;
    }
    if (normalizedObserved.length() == 2 && normalizedExpected.length() == 2) {
      char[] observedChars = normalizedObserved.toCharArray();
      char[] expectedChars = normalizedExpected.toCharArray();
      Arrays.sort(observedChars);
      Arrays.sort(expectedChars);
      return Arrays.equals(observedChars, expectedChars);
    }
    return false;
  }

  /** Immutable ancestry scoring result for a single population. */
  public static final class Result {
    private final String population;
    private final int matchedMarkers;
    private final int comparedMarkers;
    private final int totalPanelMarkers;
    private final List<String> missingMarkers;
    private final Map<String, String> mismatchedMarkers;

    private Result(
        String population,
        int matchedMarkers,
        int comparedMarkers,
        int totalPanelMarkers,
        List<String> missingMarkers,
        Map<String, String> mismatchedMarkers) {
      this.population = population;
      this.matchedMarkers = matchedMarkers;
      this.comparedMarkers = comparedMarkers;
      this.totalPanelMarkers = totalPanelMarkers;
      this.missingMarkers = Collections.unmodifiableList(new ArrayList<>(missingMarkers));
      this.mismatchedMarkers = Collections.unmodifiableMap(new LinkedHashMap<>(mismatchedMarkers));
    }

    public String getPopulation() {
      return population;
    }

    public int getMatchedMarkers() {
      return matchedMarkers;
    }

    public int getComparedMarkers() {
      return comparedMarkers;
    }

    public int getTotalPanelMarkers() {
      return totalPanelMarkers;
    }

    public double getMatchRate() {
      return comparedMarkers == 0 ? 0.0 : matchedMarkers / (double) comparedMarkers;
    }

    public List<String> getMissingMarkers() {
      return missingMarkers;
    }

    public Map<String, String> getMismatchedMarkers() {
      return mismatchedMarkers;
    }
  }
}
