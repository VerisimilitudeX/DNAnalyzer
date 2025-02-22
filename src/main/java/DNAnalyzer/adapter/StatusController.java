package DNAnalyzer.adapter;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StatusController {

  @GetMapping("/status")
  public ResponseEntity<?> getStatus() {
    return ResponseEntity.ok(
        Map.of(
            "status", "online",
            "version", "1.0.0"));
  }
}
