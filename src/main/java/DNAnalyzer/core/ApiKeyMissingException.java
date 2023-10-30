package DNAnalyzer.core;

/**
 * Exception thrown when the API key is missing.
 */
public class ApiKeyMissingException extends RuntimeException {

    public ApiKeyMissingException(String message) {
        super(message);
    }
}
