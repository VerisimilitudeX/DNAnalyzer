package DNAnalyzer.core;

/**
 * Exception thrown when the API key is missing.
 */
public class ApiKeyMissingException extends RuntimeException {

    /**
     * Constructor of ApiKeyMissingException.
     * @param message the message of the exception.
     */
    public ApiKeyMissingException(String message) {
        super(message);
    }
}
