package DNAnalyzer.adapter;

import DNAnalyzer.data.Parser;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/** Simple controller for parsing uploaded DNA files. */
@RestController
@RequestMapping("/api/file")
@CrossOrigin(origins = "*")
public class FileController {

  @PostMapping(value = "/parse", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> parse(@RequestParam("file") MultipartFile file) {
    try {
      if (file.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
      }
      Path temp = Files.createTempFile("dna-upload-", ".tmp");
      file.transferTo(temp.toFile());
      String seq = Parser.parseFile(temp.toFile());
      Files.deleteIfExists(temp);
      if (seq == null || seq.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "Unsupported file format"));
      }
      return ResponseEntity.ok(Map.of("sequence", seq));
    } catch (Exception e) {
      return ResponseEntity.badRequest()
          .body(Map.of("error", "Could not parse file", "message", e.getMessage()));
    }
  }
}
