package DNAnalyzer.core.port.in;

/** Use case interface to set the API key. */
public interface SetApiKeyUseCase {

  /**
   * Set the API key for the OpenAI API.
   *
   * @param apiKey the new API key.
   * @return the api key
   */
  String setApiKey(String apiKey);
}
