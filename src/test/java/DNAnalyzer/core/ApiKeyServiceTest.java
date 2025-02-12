package DNAnalyzer.core;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class ApiKeyServiceTest {

  private ApiKeyService apiKeyService = new ApiKeyService();

  @Test
  void shouldSetAndGetApiKey() {
    String newKey = "test-api-key";
    apiKeyService.setApiKey(newKey);
    assertEquals(newKey, apiKeyService.getApiKey());
  }

  @Test
  void shouldReturnFalseWhenNoKeySet() {
    assertFalse(apiKeyService.hasApiKey());
  }

  @Test
  void shouldReturnTrueWhenKeySet() {
    apiKeyService.setApiKey("test-key");
    assertTrue(apiKeyService.hasApiKey());
  }
}
