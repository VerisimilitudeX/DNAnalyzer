package DNAnalyzer.core;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ApiKeyServiceTest {

    @DisplayName("Get the api key, given it was set before.")
    @Test
    void testGetApiKey_key_is_set() {
        ApiKeyService apiKeyService = new ApiKeyService();
        ReflectionTestUtils.setField(apiKeyService, "apiKey", "2134432-mock-key");
        String result = apiKeyService.getApiKey();
        Assertions.assertThat(result).isEqualTo("2134432-mock-key");
    }

    @DisplayName("Get api key, verify that an exception is thrown when not set.")
    @Test
    void testGetApiKey_no_key_is_set() {
        ApiKeyService apiKeyService = new ApiKeyService();

        Exception exception = assertThrows(ApiKeyMissingException.class, apiKeyService::getApiKey);

        assertEquals("No API-Key defined.", exception.getMessage());
    }

    @DisplayName("Set a new API key.")
    @Test
    void setApiKey() {
        String newKey = "9999999-new-key";

        ApiKeyService apiKeyService = new ApiKeyService();
        String result = apiKeyService.setApiKey(newKey);

        Assertions.assertThat(result).isEqualTo("9999999-new-key");
    }
}
