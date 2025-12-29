package DNAnalyzer.align;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import org.json.JSONObject;

/**
 * Invokes the Python Smith-Waterman implementation (GPU accelerated when available) and returns the
 * parsed alignment result.
 */
public final class SmithWatermanAligner {

  private static final String DEFAULT_SCRIPT_LOCATION = "src/python/gpu_smith_waterman.py";

  private final String pythonExecutable;
  private final Path scriptPath;

  private SmithWatermanAligner(String pythonExecutable, Path scriptPath) {
    this.pythonExecutable = pythonExecutable;
    this.scriptPath = scriptPath;
  }

  public static SmithWatermanAligner create(String overrideExecutable) throws IOException {
    String executable = resolvePythonExecutable(overrideExecutable);
    Path script = resolveScriptPath();
    return new SmithWatermanAligner(executable, script);
  }

  public AlignmentResult align(
      String queryName, String querySequence, String referenceName, String referenceSequence)
      throws IOException, InterruptedException {
    Objects.requireNonNull(querySequence, "querySequence");
    Objects.requireNonNull(referenceSequence, "referenceSequence");

    Path queryFile = writeSequenceToTempFile("dnanalyzer_query", querySequence);
    Path referenceFile = writeSequenceToTempFile("dnanalyzer_reference", referenceSequence);

    List<String> command = new ArrayList<>();
    command.add(pythonExecutable);
    command.add(scriptPath.toString());
    command.add("--seq1-file");
    command.add(queryFile.toString());
    command.add("--seq2-file");
    command.add(referenceFile.toString());
    command.add("--json");

    ProcessBuilder builder = new ProcessBuilder(command);
    builder.redirectErrorStream(true);
    Process process = builder.start();
    String output = readProcessOutput(process);

    if (!process.waitFor(5, TimeUnit.MINUTES)) {
      process.destroyForcibly();
      throw new IOException("Smith-Waterman process timed out");
    }

    int exitCode = process.exitValue();
    if (exitCode != 0) {
      throw new IOException(
          String.format(
              Locale.ROOT,
              "Smith-Waterman process exited with code %d. Output:%n%s",
              exitCode,
              output));
    }

    JSONObject json = parseJson(output);
    int score = json.getInt("score");
    String alignedQuery = json.getString("aligned1");
    String alignedReference = json.getString("aligned2");

    return new AlignmentResult(
        score,
        queryName,
        referenceName,
        alignedQuery,
        alignedReference,
        pythonExecutable,
        scriptPath);
  }

  public String pythonExecutable() {
    return pythonExecutable;
  }

  public Path scriptPath() {
    return scriptPath;
  }

  private static Path writeSequenceToTempFile(String prefix, String sequence) throws IOException {
    Path temp = Files.createTempFile(prefix, ".txt");
    temp.toFile().deleteOnExit();
    Files.writeString(temp, sequence, StandardCharsets.UTF_8);
    return temp;
  }

  private static JSONObject parseJson(String output) {
    String trimmed = output.trim();
    int start = trimmed.indexOf('{');
    int end = trimmed.lastIndexOf('}');
    if (start == -1 || end == -1 || end < start) {
      throw new IllegalArgumentException("Smith-Waterman output was not valid JSON: " + output);
    }
    String jsonSubstring = trimmed.substring(start, end + 1);
    return new JSONObject(jsonSubstring);
  }

  private static String readProcessOutput(Process process) throws IOException {
    StringBuilder builder = new StringBuilder();
    try (BufferedReader reader =
        new BufferedReader(
            new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
      String line;
      while ((line = reader.readLine()) != null) {
        builder.append(line).append(System.lineSeparator());
      }
    }
    return builder.toString();
  }

  private static String resolvePythonExecutable(String overrideExecutable) throws IOException {
    List<String> candidates = new ArrayList<>();
    if (overrideExecutable != null && !overrideExecutable.isBlank()) {
      candidates.add(overrideExecutable);
    }
    String envExecutable = System.getenv("DNANALYZER_PYTHON");
    if (envExecutable != null && !envExecutable.isBlank()) {
      candidates.add(envExecutable);
    }
    candidates.add("python3");
    candidates.add("python");

    for (String candidate : candidates) {
      if (candidate == null || candidate.isBlank()) {
        continue;
      }
      if (isPythonAvailable(candidate)) {
        return candidate;
      }
    }
    throw new IOException("No Python interpreter found. Set --python or DNANALYZER_PYTHON.");
  }

  private static boolean isPythonAvailable(String executable) {
    Process process = null;
    try {
      process = new ProcessBuilder(executable, "--version").redirectErrorStream(true).start();
      if (!process.waitFor(5, TimeUnit.SECONDS)) {
        process.destroyForcibly();
        return false;
      }
      return process.exitValue() == 0;
    } catch (IOException | InterruptedException ex) {
      if (ex instanceof InterruptedException) {
        Thread.currentThread().interrupt();
      }
      return false;
    }
  }

  private static Path resolveScriptPath() throws IOException {
    String override = System.getenv("DNANALYZER_SW_SCRIPT");
    if (override != null && !override.isBlank()) {
      Path overridePath = Paths.get(override);
      if (Files.exists(overridePath)) {
        return overridePath.toAbsolutePath();
      }
      throw new IOException("Smith-Waterman script override not found: " + overridePath);
    }

    Path repoScript = Paths.get(DEFAULT_SCRIPT_LOCATION);
    if (Files.exists(repoScript)) {
      return repoScript.toAbsolutePath();
    }

    try (InputStream resource =
        SmithWatermanAligner.class.getResourceAsStream("/gpu_smith_waterman.py")) {
      if (resource == null) {
        throw new IOException("Smith-Waterman script not found in resources.");
      }
      Path temp = Files.createTempFile("dnanalyzer_sw_script", ".py");
      temp.toFile().deleteOnExit();
      Files.copy(resource, temp, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
      return temp.toAbsolutePath();
    }
  }

  public record AlignmentResult(
      int score,
      String queryName,
      String referenceName,
      String alignedQuery,
      String alignedReference,
      String executable,
      Path scriptPath) {}
}
