package DNAnalyzer.adapter;

import DNAnalyzer.core.port.in.GetApiKeyUseCase;
import DNAnalyzer.core.port.in.SetApiKeyUseCase;
import org.springframework.web.bind.annotation.*;

/**
 * Controller to get and set the API key.
 */
@RestController
@RequestMapping("/api-key")
public class ApiKeyController {

    /**
     * Contructor of the controller.
     *
     * @param getApiKeyUseCase the use case to get the API key
     * @param setApiKeyUseCase the use case to set the API key
     */
    public ApiKeyController(GetApiKeyUseCase getApiKeyUseCase, SetApiKeyUseCase setApiKeyUseCase) {
        this.getApiKeyUseCase = getApiKeyUseCase;
        this.setApiKeyUseCase = setApiKeyUseCase;
    }

    private GetApiKeyUseCase getApiKeyUseCase;
    private SetApiKeyUseCase setApiKeyUseCase;

    /**
     * Get the API key.
     *
     * @return the API key
     */
    @GetMapping
    public ApiKeyResponse getApiKey() {
        String apiKey = getApiKeyUseCase.getApiKey();
        return new ApiKeyResponse(apiKey);
    }

    /**
     * Set the API key.
     *
     * @param request the request containing the new API key
     * @return the new API key
     */
    @PutMapping
    public ApiKeyResponse setApiKey(@RequestBody SetApiKeyRequest request) {
        String apiKey = setApiKeyUseCase.setApiKey(request.apiKey());
        return new ApiKeyResponse(apiKey);
    }
}
