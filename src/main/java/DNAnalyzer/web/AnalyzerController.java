package DNAnalyzer.web;

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

import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.utils.core.DNATools;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AnalyzerController {

    /**
     * API status endpoint that returns version and status information
     * Used by the web interface to check if the server is running
     */
    @GetMapping("/status")
    public ResponseEntity<?> getApiStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "ok");
        status.put("version", "1.0.0");
        status.put("timestamp", System.currentTimeMillis());
        status.put("message", "DNAnalyzer API is running");
        
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(status);
    }

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
            @RequestParam(value = "format", defaultValue = "text") String format) {

        try {
            // Validate file
            if (dnaFile.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "File is empty",
                    "message", "Please provide a valid DNA sequence file"
                ));
            }

            // Validate file size
            long maxSize = 50 * 1024 * 1024; // 50MB
            if (dnaFile.getSize() > maxSize) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "File too large",
                    "message", "File size must be less than 50MB"
                ));
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
                    return ResponseEntity.badRequest().body(Map.of(
                        "error", "Invalid sequence",
                        "message", "File contains invalid DNA sequence characters"
                    ));
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
                    .contentType("json".equals(format) ? MediaType.APPLICATION_JSON : 
                               "csv".equals(format) ? MediaType.TEXT_PLAIN : 
                               MediaType.TEXT_PLAIN)
                    .body(output);

            } finally {
                // Restore console output and cleanup
                System.setOut(old);
                Files.deleteIfExists(tempFile);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Analysis failed",
                "message", e.getMessage()
            ));
        }
    }

    private boolean isValidDNASequence(String sequence) {
        // Remove whitespace and newlines
        sequence = sequence.replaceAll("\\s+", "").toUpperCase();
        // Check if sequence contains only valid DNA characters
        return sequence.matches("^[ATCG]+$");
    }

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

    @PostMapping(value = "/analyze-genetic", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> analyzeGeneticData(
            @RequestParam("geneticFile") MultipartFile geneticFile,
            @RequestParam(value = "snpAnalysis", defaultValue = "false") boolean snpAnalysis) {
        
        try {
            // Validate file
            if (geneticFile.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "File is empty",
                    "message", "Please provide a valid genetic testing data file"
                ));
            }

            // Validate file size
            long maxSize = 50 * 1024 * 1024; // 50MB
            if (geneticFile.getSize() > maxSize) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "File too large",
                    "message", "File size must be less than 50MB"
                ));
            }

            // Create temporary file
            Path tempFile = Files.createTempFile("genetic-", ".txt");
            geneticFile.transferTo(tempFile.toFile());

            try {
                // Process genetic data
                Map<String, Object> results = processGeneticData(tempFile, snpAnalysis);
                return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new JSONObject(results).toString());

            } finally {
                Files.deleteIfExists(tempFile);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Analysis failed",
                "message", e.getMessage()
            ));
        }
    }

    private Map<String, Object> processGeneticData(Path filePath, boolean includeSnpAnalysis) throws IOException {
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
}
