package DNAnalyzer.api.controller;

import DNAnalyzer.api.dto.response.ApiStatusResponse;
import java.time.Instant;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class StatusController {

  private static final List<String> ENDPOINTS =
      List.of(
          "/api/v1/status",
          "/api/v1/analyze",
          "/api/v1/base-pairs",
          "/api/v1/find-proteins",
          "/api/v1/reading-frames",
          "/api/v1/manipulate",
          "/api/v1/parse",
          "/api/v1/analyze-genetic");

  private final String version;

  public StatusController() {
    Package pkg = StatusController.class.getPackage();
    this.version =
        pkg != null && pkg.getImplementationVersion() != null
            ? pkg.getImplementationVersion()
            : "dev";
  }

  @GetMapping("/status")
  public ApiStatusResponse status() {
    return new ApiStatusResponse("ok", version, Instant.now(), ENDPOINTS);
  }
}
