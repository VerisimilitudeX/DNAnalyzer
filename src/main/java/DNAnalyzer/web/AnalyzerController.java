package DNAnalyzer.web;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> analyzeDNA(
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

                // Format output
                if ("json".equals(format)) {
                    output = formatAsJson(output);
                } else if ("csv".equals(format)) {
                    output = formatAsCsv(output);
                }

                return ResponseEntity.ok(output);

            } finally {
                // Restore console output and cleanup
                System.setOut(old);
                Files.deleteIfExists(tempFile);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error analyzing DNA: " + e.getMessage());
        }
    }

    private String formatAsJson(String output) {
        // Convert output to JSON format
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
        // Convert output to CSV format
        StringBuilder csv = new StringBuilder();
        
        String[] lines = output.split("\n");
        for (String line : lines) {
            // Replace any commas in the data with semicolons
            line = line.replace(",", ";");
            csv.append(line).append(",\n");
        }
        
        return csv.toString();
    }
}