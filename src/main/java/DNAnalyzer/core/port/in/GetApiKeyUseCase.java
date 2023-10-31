package DNAnalyzer.core.port.in;

/** Use case interface to get the API key. */
public interface GetApiKeyUseCase {

  /**
   * Use case to get the set API key.
   *
   * @return the api key
   */
  String getApiKey();
}
