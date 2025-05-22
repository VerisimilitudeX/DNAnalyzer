package DNAnalyzer.adapter;

import DNAnalyzer.core.ApiKeyService;
import DNAnalyzer.utils.ai.AIProvider;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** REST controller for managing AI API keys. */
@RestController
@RequestMapping("/api-key")
@CrossOrigin(origins = "*")
public class ApiKeyController {

  private final ApiKeyService apiKeyService;

  @Autowired
  public ApiKeyController(ApiKeyService apiKeyService) {
    this.apiKeyService = apiKeyService;
  }

  /**
   * Get the current API key status for the selected provider.
   */
  @GetMapping
  public ResponseEntity<ApiKeyResponse> getApiKeyStatus() {
    boolean hasKey = apiKeyService.hasApiKey(apiKeyService.getProvider());
    return ResponseEntity.ok(new ApiKeyResponse(hasKey));
  }

  /**
   * Set a new API key and optionally provider.
   */
  @PostMapping
  public ResponseEntity<?> setApiKey(@RequestBody SetApiKeyRequest request) {
    try {
      AIProvider provider = request.getProvider() != null ? AIProvider.fromString(request.getProvider()) : apiKeyService.getProvider();
      if (request.getApiKey() != null) {
        apiKeyService.setApiKey(provider, request.getApiKey());
      }
      apiKeyService.setProvider(provider);
      return ResponseEntity.ok(
          Map.of(
              "status", "success",
              "message", "API key updated successfully"));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
    }
  }
}

class ApiKeyResponse {
  private boolean configured;

  ApiKeyResponse(boolean configured) {
    this.configured = configured;
  }

  public boolean isConfigured() {
    return configured;
  }
}

class SetApiKeyRequest {
  private String apiKey;
  private String provider;

  public String getApiKey() {
    return apiKey;
  }

  public void setApiKey(String apiKey) {
    this.apiKey = apiKey;
  }

  public String getProvider() {
    return provider;
  }

  public void setProvider(String provider) {
    this.provider = provider;
  }
}
