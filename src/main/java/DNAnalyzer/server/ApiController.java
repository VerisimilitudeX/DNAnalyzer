package DNAnalyzer.server;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.utils.core.DNATools;
import DNAnalyzer.data.Parser;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Minimal REST controller exposing the core analysis pipeline.
 *
 * <p>This endpoint accepts a FASTA file via multipart POST and returns the
 * printed analysis output as JSON lines. It allows scripting the analyzer from
 * languages like Python or R without interacting with the GUI.
 */
@RestController
@RequestMapping("/server")
@CrossOrigin(origins = "*")
public class ApiController {

  @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> analyze(@RequestParam("file") MultipartFile file) {
    try {
      if (file.isEmpty()) {
        return ResponseEntity.badRequest()
            .body(Map.of("error", "File is empty", "message", "Provide FASTA data"));
      }

      Path tempFile = Files.createTempFile("dna-", ".fa");
      file.transferTo(tempFile.toFile());

      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      PrintStream ps = new PrintStream(baos);

      try {
        String dnaSequence = Parser.parseFile(tempFile.toFile());
        if (dnaSequence == null) {
          return ResponseEntity.badRequest()
              .body(Map.of("error", "Parse error", "message", "Unsupported file format"));
        }

        DNAAnalysis analysis = new DNAAnalysis(new DNATools(dnaSequence), null, "M");

        analysis.isValidDna();
        analysis.printProteins(ps);
        analysis.printHighCoverageRegions(ps);
        analysis.printLongestProtein(ps);

        String[] lines = baos.toString().split("\n");
        Map<String, Object> result = new HashMap<>();
        result.put("results", Arrays.asList(lines));
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(result);
      } finally {
        Files.deleteIfExists(tempFile);
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "Analysis failed", "message", e.getMessage()));
    }
  }
}
