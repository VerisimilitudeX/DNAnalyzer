package DNAnalyzer.core.port.in;

/**
 * Use case interface to set the API key.
 */
public interface SetApiKeyUseCase {

    /**
     * Set the API key for the OpenAI API.
     * @param apiKey
     * @return
     */
    String setApiKey(String apiKey);
}
