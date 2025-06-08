package DNAnalyzer.adapter;

/** Request object for setting API key. */
public class SetApiKeyRequest {
  private String apiKey;
  private String provider;

  public String getApiKey() {
    return apiKey;
  }

  public void setApiKey(String apiKey) {
    this.apiKey = apiKey;
  }

  public String getProvider() {
    return provider;
  }

  public void setProvider(String provider) {
    this.provider = provider;
  }
}
