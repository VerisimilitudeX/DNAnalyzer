package DNAnalyzer.core;

import DNAnalyzer.core.port.in.GetApiKeyUseCase;
import DNAnalyzer.core.port.in.SetApiKeyUseCase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/** The purpose of this service is to handle all operations concerning the OpenAI API key. */
@Service
public class ApiKeyService implements GetApiKeyUseCase, SetApiKeyUseCase {

  @Value("${openai.api.key}")
  private String apiKey;

  @Override
  public String getApiKey() {
    if (apiKey == null) {
      throw new ApiKeyMissingException("No API-Key defined.");
    }
    return apiKey;
  }

  @Override
  public String setApiKey(String apiKey) {
    this.apiKey = apiKey;
    return this.apiKey;
  }
}
