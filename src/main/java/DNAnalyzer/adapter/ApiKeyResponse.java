package DNAnalyzer.adapter;

/**
 * Response object for API key status.
 */
public class ApiKeyResponse {
    private final boolean configured;

    public ApiKeyResponse(boolean configured) {
        this.configured = configured;
    }

    public boolean isConfigured() {
        return configured;
    }
}
