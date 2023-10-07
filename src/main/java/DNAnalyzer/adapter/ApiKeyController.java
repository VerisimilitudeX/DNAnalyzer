package DNAnalyzer.adapter;

import DNAnalyzer.core.port.in.GetApiKeyUseCase;
import DNAnalyzer.core.port.in.SetApiKeyUseCase;

public class ApiKeyController implements GetApiKeyUseCase, SetApiKeyUseCase {

    @Override
    public String getApiKey() {
        return null;
    }

    @Override
    public String setApiKey(String apiKey) {
        return null;
    }
}
