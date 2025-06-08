package DNAnalyzer.core;

import static org.junit.jupiter.api.Assertions.*;

import DNAnalyzer.utils.ai.AIProvider;
import org.junit.jupiter.api.Test;

class ApiKeyServiceTest {

  private ApiKeyService apiKeyService = new ApiKeyService();

  @Test
  void shouldSetAndGetApiKey() {
    String newKey = "test-api-key";
    apiKeyService.setApiKey(AIProvider.OPENAI, newKey);
    assertEquals(newKey, apiKeyService.getApiKey(AIProvider.OPENAI));
  }

  @Test
  void shouldReturnFalseWhenNoKeySet() {
    assertFalse(apiKeyService.hasApiKey(AIProvider.OPENAI));
  }

  @Test
  void shouldReturnTrueWhenKeySet() {
    apiKeyService.setApiKey(AIProvider.OPENAI, "test-key");
    assertTrue(apiKeyService.hasApiKey(AIProvider.OPENAI));
  }
}
