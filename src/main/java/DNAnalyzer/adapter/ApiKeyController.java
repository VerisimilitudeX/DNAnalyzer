package DNAnalyzer.adapter;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DNAnalyzer.core.ApiKeyService;

/**
 * REST controller for managing OpenAI API key.
 */
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
     * Get the current API key status.
     *
     * @return Response indicating if API key is configured
     */
    @GetMapping
    public ResponseEntity<ApiKeyResponse> getApiKeyStatus() {
        boolean hasKey = apiKeyService.hasApiKey();
        return ResponseEntity.ok(new ApiKeyResponse(hasKey));
    }

    /**
     * Set a new API key.
     *
     * @param request Request containing the new API key
     * @return Response indicating success
     */
    @PostMapping
    public ResponseEntity<?> setApiKey(@RequestBody SetApiKeyRequest request) {
        try {
            apiKeyService.setApiKey(request.getApiKey());
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "API key updated successfully"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }
}
