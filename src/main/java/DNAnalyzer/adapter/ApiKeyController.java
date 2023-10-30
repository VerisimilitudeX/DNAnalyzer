package DNAnalyzer.adapter;

import DNAnalyzer.core.port.in.GetApiKeyUseCase;
import DNAnalyzer.core.port.in.SetApiKeyUseCase;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Controller to get and set the API key.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api-key")
@Controller
public class ApiKeyController {

    public ApiKeyController(GetApiKeyUseCase getApiKeyUseCase, SetApiKeyUseCase setApiKeyUseCase) {
        this.getApiKeyUseCase = getApiKeyUseCase;
        this.setApiKeyUseCase = setApiKeyUseCase;
    }

    private final GetApiKeyUseCase getApiKeyUseCase;
    private final SetApiKeyUseCase setApiKeyUseCase;

    @GetMapping
    public ApiKeyResponse getApiKey() {
        String apiKey = getApiKeyUseCase.getApiKey();
        return new ApiKeyResponse(apiKey);
    }

    @PutMapping
    public ApiKeyResponse setApiKey(@RequestBody SetApiKeyRequest request) {
        String apiKey = setApiKeyUseCase.setApiKey(request.apiKey());
        return new ApiKeyResponse(apiKey);
    }
}
