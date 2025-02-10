package DNAnalyzer.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Service for managing OpenAI API key. Supports both environment variable and runtime
 * configuration.
 */
@Service
public class ApiKeyService {

  @Value("${openai.api.key:}")
  private String apiKey;

  /**
   * Gets the current API key.
   *
   * @return The API key if set, or null if not configured
   */
  public String getApiKey() {
    if (apiKey == null || apiKey.trim().isEmpty()) {
      // Try getting from environment variable as fallback
      apiKey = System.getenv("OPENAI_API_KEY");
    }
    return apiKey;
  }

  /**
   * Sets a new API key.
   *
   * @param newApiKey The new API key to set
   */
  public void setApiKey(String newApiKey) {
    if (newApiKey == null || newApiKey.trim().isEmpty()) {
      throw new IllegalArgumentException("API key cannot be null or empty");
    }
    this.apiKey = newApiKey.trim();
  }

  /**
   * Checks if an API key is configured.
   *
   * @return true if an API key is set, false otherwise
   */
  public boolean hasApiKey() {
    String key = getApiKey();
    return key != null && !key.trim().isEmpty();
  }
}
