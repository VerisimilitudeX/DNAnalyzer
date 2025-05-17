package DNAnalyzer.api;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.core.readingframe.ReadingFrame;
import DNAnalyzer.core.readingframe.ReadingFrameAnalyzer;
import DNAnalyzer.data.Parser;
import DNAnalyzer.utils.core.DNATools;
import DNAnalyzer.utils.protein.ProteinFinder;
import DNAnalyzer.fitness.FitnessBlueprintService;
import DNAnalyzer.fitness.FitnessGenes;
import DNAnalyzer.fitness.WorkoutPlan;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * REST API Controller for accessing all core DNAnalyzer features. This provides a comprehensive API
 * that can be called from the website.
 *
 * @version 1.0
 * @author DNAnalyzer Team
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class DNAnalyzerApiController {

  @Autowired private ReadingFrameAnalyzer readingFrameAnalyzer;

  /**
   * API health check endpoint
   *
   * @return Status information about the API
   */
  @GetMapping("/status")
  public ResponseEntity<Map<String, Object>> getStatus() {
    Map<String, Object> status = new HashMap<>();
    status.put("status", "online");
    status.put("version", "1.0");
    status.put("apiName", "DNAnalyzer API");
    status.put("timestamp", System.currentTimeMillis());

    return ResponseEntity.ok(status);
  }

  /**
   * Analyze a DNA sequence with optional parameters
   *
   * @param dnaFile The DNA file to analyze
   * @param amino The amino acid to search for
   * @param minCount Minimum count for analysis
   * @param maxCount Maximum count for analysis
   * @param reverse Whether to reverse the DNA
   * @param rcomplement Whether to get the reverse complement
   * @param codons Whether to analyze codons
   * @param coverage Whether to analyze coverage
   * @param longest Whether to find the longest protein
   * @param format Output format (text, json, csv)
   * @return Analysis results
   */
  @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> analyzeDNA(
      @RequestParam("dnaFile") MultipartFile dnaFile,
      @RequestParam(value = "amino", defaultValue = "M") String amino,
      @RequestParam(value = "minCount", defaultValue = "1") int minCount,
      @RequestParam(value = "maxCount", defaultValue = "100") int maxCount,
      @RequestParam(value = "reverse", defaultValue = "false") boolean reverse,
      @RequestParam(value = "rcomplement", defaultValue = "false") boolean rcomplement,
      @RequestParam(value = "codons", defaultValue = "false") boolean codons,
      @RequestParam(value = "coverage", defaultValue = "false") boolean coverage,
      @RequestParam(value = "longest", defaultValue = "false") boolean longest,
      @RequestParam(value = "format", defaultValue = "json") String format) {

    try {
      // Validate file
      if (dnaFile.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "File is empty",
                    "message", "Please provide a valid DNA sequence file"));
      }

      // Validate file size
      long maxSize = 50 * 1024 * 1024; // 50MB
      if (dnaFile.getSize() > maxSize) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "File too large",
                    "message", "File size must be less than 50MB"));
      }

      // Create temporary file
      Path tempFile = Files.createTempFile("dna-", ".fa");
      dnaFile.transferTo(tempFile.toFile());

      // Capture console output
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      PrintStream ps = new PrintStream(baos);
      PrintStream old = System.out;
      System.setOut(ps);

      try {
        // Read DNA sequence
        String dnaSequence = new String(Files.readAllBytes(tempFile));

        // Validate DNA sequence
        if (!isValidDNASequence(dnaSequence)) {
          return ResponseEntity.badRequest()
              .body(
                  Map.of(
                      "error", "Invalid sequence",
                      "message", "File contains invalid DNA sequence characters"));
        }

        // Run analysis
        DNAAnalysis analysis = new DNAAnalysis(new DNATools(dnaSequence), null, amino);

        if (reverse) {
          analysis = analysis.reverseDna();
        }
        if (rcomplement) {
          analysis = analysis.reverseComplement();
        }

        if (codons) {
          analysis.outPutCodons(minCount, maxCount, System.out);
        }
        if (coverage) {
          analysis.printHighCoverageRegions(System.out);
        }
        if (longest) {
          analysis.printLongestProtein(System.out);
        }

        // Get output
        String output = baos.toString();

        // Format output based on request
        if ("json".equals(format)) {
          output = formatAsJson(output);
        } else if ("csv".equals(format)) {
          output = formatAsCsv(output);
        }

        return ResponseEntity.ok()
            .contentType(
                "json".equals(format)
                    ? MediaType.APPLICATION_JSON
                    : "csv".equals(format) ? MediaType.TEXT_PLAIN : MediaType.TEXT_PLAIN)
            .body(output);

      } finally {
        // Restore console output and cleanup
        System.setOut(old);
        Files.deleteIfExists(tempFile);
      }

    } catch (Exception e) {
      return ResponseEntity.badRequest()
          .body(Map.of("error", "Analysis failed", "message", e.getMessage()));
    }
  }

  /**
   * Analyze the base pair composition of a DNA sequence
   *
   * @param dnaSequence DNA sequence to analyze
   * @return Base pair counts and percentages
   */
  @PostMapping("/base-pairs")
  public ResponseEntity<?> analyzeBasePairs(@RequestBody Map<String, String> request) {
    try {
      String dnaSequence = request.get("sequence");

      if (dnaSequence == null || dnaSequence.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid request",
                    "message", "DNA sequence is required"));
      }

      if (!isValidDNASequence(dnaSequence)) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid sequence",
                    "message", "Sequence contains invalid DNA characters"));
      }

      long[] counts = DNAAnalysis.countBasePairs(dnaSequence);
      long total = counts[0] + counts[1] + counts[2] + counts[3] + counts[4];

      Map<String, Object> result = new HashMap<>();
      Map<String, Object> baseCounts = new HashMap<>();
      Map<String, Object> basePercentages = new HashMap<>();

      baseCounts.put("A", counts[0]);
      baseCounts.put("T", counts[1]);
      baseCounts.put("G", counts[2]);
      baseCounts.put("C", counts[3]);
      baseCounts.put("Unknown", counts[4]);

      if (total > 0) {
        basePercentages.put("A", String.format("%.2f", (counts[0] * 100.0 / total)));
        basePercentages.put("T", String.format("%.2f", (counts[1] * 100.0 / total)));
        basePercentages.put("G", String.format("%.2f", (counts[2] * 100.0 / total)));
        basePercentages.put("C", String.format("%.2f", (counts[3] * 100.0 / total)));
        basePercentages.put("Unknown", String.format("%.2f", (counts[4] * 100.0 / total)));
      }

      double gcContent = (counts[2] + counts[3]) * 100.0 / (total - counts[4]);

      result.put("counts", baseCounts);
      result.put("percentages", basePercentages);
      result.put("gcContent", String.format("%.2f", gcContent));
      result.put("totalBases", total);

      return ResponseEntity.ok(result);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "Analysis failed", "message", e.getMessage()));
    }
  }

  /**
   * Find proteins in a DNA sequence based on a specified amino acid
   *
   * @param request Request containing DNA sequence and amino acid
   * @return List of found proteins
   */
  @PostMapping("/find-proteins")
  public ResponseEntity<?> findProteins(@RequestBody Map<String, String> request) {
    try {
      String dnaSequence = request.get("sequence");
      String aminoAcid = request.get("aminoAcid");

      if (dnaSequence == null || dnaSequence.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid request",
                    "message", "DNA sequence is required"));
      }

      if (aminoAcid == null || aminoAcid.isEmpty()) {
        aminoAcid = "M"; // Default to Methionine
      }

      if (!isValidDNASequence(dnaSequence)) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid sequence",
                    "message", "Sequence contains invalid DNA characters"));
      }

      List<String> proteins = ProteinFinder.getProtein(dnaSequence.toLowerCase(), aminoAcid);

      Map<String, Object> result = new HashMap<>();
      result.put("aminoAcid", aminoAcid);
      result.put("proteinCount", proteins.size());
      result.put("proteins", proteins);

      return ResponseEntity.ok(result);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "Analysis failed", "message", e.getMessage()));
    }
  }

  /**
   * Analyze reading frames in a DNA sequence
   *
   * @param request Request containing DNA sequence and minimum length
   * @return Reading frame analysis results
   */
  @PostMapping("/reading-frames")
  public ResponseEntity<?> analyzeReadingFrames(@RequestBody Map<String, Object> request) {
    try {
      String dnaSequence = (String) request.get("sequence");
      Integer minLength =
          request.get("minLength") != null
              ? Integer.parseInt(request.get("minLength").toString())
              : 300;

      if (dnaSequence == null || dnaSequence.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid request",
                    "message", "DNA sequence is required"));
      }

      if (!isValidDNASequence(dnaSequence)) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid sequence",
                    "message", "Sequence contains invalid DNA characters"));
      }

      List<ReadingFrame> frames =
          readingFrameAnalyzer.analyzeSequence(dnaSequence.toUpperCase(), minLength);

      List<Map<String, Object>> formattedFrames =
          frames.stream()
              .map(
                  frame -> {
                    Map<String, Object> frameMap = new HashMap<>();
                    frameMap.put("direction", frame.isForward() ? "forward" : "reverse");
                    frameMap.put(
                        "frame",
                        frame.getOffset()); // Fixed: Changed from getFrameOffset() to getOffset()
                    frameMap.put(
                        "genes",
                        frame
                            .getGenes()
                            .stream() // Fixed: Changed from getPotentialGenes() to getGenes()
                            .map(
                                gene -> {
                                  Map<String, Object> geneMap = new HashMap<>();
                                  geneMap.put("start", gene.getStartPosition());
                                  geneMap.put("end", gene.getEndPosition());
                                  geneMap.put("length", gene.getLength());
                                  return geneMap;
                                })
                            .collect(Collectors.toList()));
                    return frameMap;
                  })
              .collect(Collectors.toList());

      Map<String, Object> result = new HashMap<>();
      result.put("frameCount", frames.size());
      result.put("frames", formattedFrames);
      result.put("sequenceLength", dnaSequence.length());

      return ResponseEntity.ok(result);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest()
          .body(Map.of("error", "Invalid parameters", "message", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "Analysis failed", "message", e.getMessage()));
    }
  }

  /**
   * Process genetic data from services like 23andMe or AncestryDNA
   *
   * @param geneticFile Genetic data file
   * @param snpAnalysis Whether to include detailed SNP analysis
   * @return Analysis results
   */
  @PostMapping(value = "/analyze-genetic", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> analyzeGeneticData(
      @RequestParam("geneticFile") MultipartFile geneticFile,
      @RequestParam(value = "snpAnalysis", defaultValue = "false") boolean snpAnalysis) {

    try {
      // Validate file
      if (geneticFile.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "File is empty",
                    "message", "Please provide a valid genetic testing data file"));
      }

      // Validate file size
      long maxSize = 50 * 1024 * 1024; // 50MB
      if (geneticFile.getSize() > maxSize) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "File too large",
                    "message", "File size must be less than 50MB"));
      }

      // Create temporary file
      Path tempFile = Files.createTempFile("genetic-", ".txt");
      geneticFile.transferTo(tempFile.toFile());

      try {
        // Process genetic data
        Map<String, Object> results = processGeneticData(tempFile, snpAnalysis);
        return ResponseEntity.ok(results);
      } finally {
        Files.deleteIfExists(tempFile);
      }

    } catch (Exception e) {
      return ResponseEntity.badRequest()
          .body(Map.of("error", "Analysis failed", "message", e.getMessage()));
    }
  }

  /**
   * Manipulate DNA sequence (reverse, complement, etc.)
   *
   * @param request Request with sequence and operations
   * @return Modified sequence
   */
  @PostMapping("/manipulate")
  public ResponseEntity<?> manipulateDNA(@RequestBody Map<String, Object> request) {
    try {
      String dnaSequence = (String) request.get("sequence");
      Boolean reverse = (Boolean) request.getOrDefault("reverse", false);
      Boolean complement = (Boolean) request.getOrDefault("complement", false);

      if (dnaSequence == null || dnaSequence.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid request",
                    "message", "DNA sequence is required"));
      }

      if (!isValidDNASequence(dnaSequence)) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "Invalid sequence",
                    "message", "Sequence contains invalid DNA characters"));
      }

      DNAAnalysis analysis = new DNAAnalysis(new DNATools(dnaSequence), null, "M");

      if (reverse) {
        analysis = analysis.reverseDna();
      }

      if (complement) {
        analysis = analysis.reverseComplement();
      }

      Map<String, Object> result = new HashMap<>();
      result.put("originalSequence", dnaSequence);
      // Fixed: Use the correct accessor method for the dna field in the DNAAnalysis record
      result.put("modifiedSequence", analysis.dna().getDna());
      result.put(
          "operations",
          Map.of(
              "reverse", reverse,
              "complement", complement));

      return ResponseEntity.ok(result);

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "Manipulation failed", "message", e.getMessage()));
    }
  }

  /**
   * Parse a FASTA or FASTQ file and return the DNA sequence
   *
   * @param file The file to parse
   * @return The parsed DNA sequence
   */
  @PostMapping(value = "/parse", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> parseFile(@RequestParam("file") MultipartFile file) {
    try {
      // Validate file
      if (file.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(
                Map.of(
                    "error", "File is empty",
                    "message", "Please provide a valid file"));
      }

      // Create temporary file
      Path tempFile =
          Files.createTempFile("dna-parse-", getFileExtension(file.getOriginalFilename()));
      file.transferTo(tempFile.toFile());

      try {
        String sequence = Parser.parseFile(tempFile.toFile());

        if (sequence == null) {
          return ResponseEntity.badRequest()
              .body(
                  Map.of(
                      "error", "Parse error",
                      "message", "Unsupported file format or parsing error"));
        }

        Map<String, Object> result = new HashMap<>();
        result.put("fileName", file.getOriginalFilename());
        result.put("fileSize", file.getSize());
        result.put("sequenceLength", sequence.length());

        // Truncate the sequence if it's very long for the response
        if (sequence.length() > 10000) {
          result.put(
              "sequence",
              sequence.substring(0, 5000)
                  + "... [truncated] ..."
                  + sequence.substring(sequence.length() - 5000));
          result.put("truncated", true);
        } else {
          result.put("sequence", sequence);
          result.put("truncated", false);
        }

        return ResponseEntity.ok(result);

      } finally {
        Files.deleteIfExists(tempFile);
      }

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "Parsing failed", "message", e.getMessage()));
    }
  }

  // Helper methods

  /** Check if a DNA sequence contains only valid characters (A, T, G, C) */
  private boolean isValidDNASequence(String sequence) {
    // Remove whitespace and newlines
    sequence = sequence.replaceAll("\\s+", "").toUpperCase();
    // Check if sequence contains only valid DNA characters
    return sequence.matches("^[ATCG]+$");
  }

  /** Format analysis output as JSON */
  private String formatAsJson(String output) {
    StringBuilder json = new StringBuilder();
    json.append("{\"results\": [");

    String[] lines = output.split("\n");
    for (int i = 0; i < lines.length; i++) {
      json.append("\"").append(lines[i].replace("\"", "\\\"")).append("\"");
      if (i < lines.length - 1) {
        json.append(",");
      }
    }

    json.append("]}");
    return json.toString();
  }

  /** Format analysis output as CSV */
  private String formatAsCsv(String output) {
    StringBuilder csv = new StringBuilder();
    String[] lines = output.split("\n");

    for (String line : lines) {
      // Replace any commas in the data with semicolons
      line = line.replace(",", ";");
      // Add quotes around fields containing semicolons
      if (line.contains(";")) {
        line = "\"" + line + "\"";
      }
      csv.append(line).append("\n");
    }

    return csv.toString();
  }

  /** Process genetic data from services like 23andMe or AncestryDNA */
  private Map<String, Object> processGeneticData(Path filePath, boolean includeSnpAnalysis)
      throws IOException {
    Map<String, Object> results = new HashMap<>();
    List<Map<String, String>> snps = new ArrayList<>();
    Map<String, Integer> chromosomeDistribution = new HashMap<>();

    try (BufferedReader reader = new BufferedReader(new FileReader(filePath.toFile()))) {
      String line;
      int totalSnps = 0;

      while ((line = reader.readLine()) != null) {
        // Skip comments and headers
        if (line.startsWith("#") || line.trim().isEmpty()) {
          continue;
        }

        String[] parts = line.split("\t");
        if (parts.length >= 4) {
          totalSnps++;

          // Count chromosome distribution
          String chromosome = parts[1];
          chromosomeDistribution.merge(chromosome, 1, Integer::sum);

          // Collect SNP data if requested
          if (includeSnpAnalysis) {
            Map<String, String> snp = new HashMap<>();
            snp.put("rsid", parts[0]);
            snp.put("chromosome", parts[1]);
            snp.put("position", parts[2]);
            snp.put("genotype", parts[3]);
            snps.add(snp);
          }
        }
      }

      // Build results
      results.put("totalSnps", totalSnps);
      results.put("chromosomeDistribution", chromosomeDistribution);
      if (includeSnpAnalysis) {
        results.put("snps", snps);
      }
    }

    return results;
  }

  /**
   * Generate a very basic fitness blueprint from genetic metrics.
   *
   * <p>This endpoint expects four numeric values (0.0 - 1.0) representing
   * muscle-fiber, VO2-max, injury-risk and recovery genes. The response
   * contains a simple list of workout recommendations. The logic is purely
   * illustrative and should not be considered medical advice.</p>
   *
   * @param request Map containing the gene metrics
   * @return Workout plan suggestions
   */
  @PostMapping("/fitness-blueprint")
  public ResponseEntity<?> generateFitnessBlueprint(@RequestBody Map<String, Object> request) {
    try {
      double muscleFiber =
          Double.parseDouble(request.getOrDefault("muscleFiberGene", "0").toString());
      double vo2Max =
          Double.parseDouble(request.getOrDefault("vo2MaxGene", "0").toString());
      double injuryRisk =
          Double.parseDouble(request.getOrDefault("injuryRiskGene", "0").toString());
      double recovery =
          Double.parseDouble(request.getOrDefault("recoveryGene", "0").toString());

      FitnessGenes genes = new FitnessGenes(muscleFiber, vo2Max, injuryRisk, recovery);
      WorkoutPlan plan = new FitnessBlueprintService().buildPlan(genes);

      Map<String, Object> resp = new HashMap<>();
      resp.put("workouts", plan.getWorkouts());
      return ResponseEntity.ok(resp);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "Failed to generate plan", "message", e.getMessage()));
    }
  }

  /** Get file extension with dot */
  private String getFileExtension(String filename) {
    if (filename == null) {
      return "";
    }
    int lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex == -1) {
      return "";
    }
    return filename.substring(lastDotIndex);
  }
}
