package DNAnalyzer.reporting;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.Properties;

/**
 * Resolves configuration for AI-backed report generation.
 */
final class AiConfiguration {
    private static final String PROVIDER_OPENAI = "openai";
    private static final String PROPERTIES_RESOURCE = "ai-keys.properties";

    private final boolean enabled;
    private final String apiKey;
    private final String model;
    private final Duration timeout;
    private final double temperature;
    private final int maxTokens;
    private final String disableReason;

    private AiConfiguration(boolean enabled,
            String apiKey,
            String model,
            Duration timeout,
            double temperature,
            int maxTokens,
            String disableReason) {
        this.enabled = enabled;
        this.apiKey = apiKey;
        this.model = model;
        this.timeout = timeout;
        this.temperature = temperature;
        this.maxTokens = maxTokens;
        this.disableReason = disableReason;
    }

    static AiConfiguration resolve() {
        String provider = Optional.ofNullable(System.getenv("AI_PROVIDER"))
                .map(value -> value.trim().toLowerCase(Locale.ROOT))
                .filter(value -> !value.isEmpty())
                .orElse(PROVIDER_OPENAI);

        if (!PROVIDER_OPENAI.equals(provider)) {
            return disabled("Unsupported AI provider '" + provider
                    + "'. Set AI_PROVIDER=openai to enable OpenAI summaries.");
        }

        String apiKey = resolveApiKey();
        if (apiKey == null || apiKey.isBlank()) {
            return disabled("OpenAI summaries disabled. Set OPENAI_API_KEY to enable this feature.");
        }

        String model = firstNonBlank(
                System.getenv("OPENAI_MODEL"),
                System.getProperty("openai.model"),
                "gpt-3.5-turbo");

        double temperature = parseDouble(firstNonBlank(
                System.getenv("OPENAI_TEMPERATURE"),
                System.getProperty("openai.temperature")),
                0.2);

        int maxTokens = (int) parseDouble(firstNonBlank(
                System.getenv("OPENAI_MAX_TOKENS"),
                System.getProperty("openai.maxTokens")),
                700);

        Duration timeout = Duration.ofSeconds((long) parseDouble(firstNonBlank(
                System.getenv("OPENAI_TIMEOUT_SECONDS"),
                System.getProperty("openai.timeoutSeconds")),
                60));

        return new AiConfiguration(true, apiKey, model, timeout, temperature, maxTokens, null);
    }

    private static AiConfiguration disabled(String reason) {
        return new AiConfiguration(false, null, null, Duration.ZERO, 0.0, 0, reason);
    }

    private static String resolveApiKey() {
        String key = firstNonBlank(
                System.getenv("OPENAI_API_KEY"),
                System.getenv("DNANALYZER_OPENAI_KEY"),
                System.getProperty("openai.apiKey"),
                System.getProperty("dnanalyzer.openaiKey"),
                readPropertyFromResource("openai.apiKey"),
                readPropertyFromResource("openai.api-key"));
        return key != null ? key.trim() : null;
    }

    private static String firstNonBlank(String... candidates) {
        if (candidates == null) {
            return null;
        }
        for (String candidate : candidates) {
            if (candidate != null && !candidate.trim().isEmpty()) {
                return candidate.trim();
            }
        }
        return null;
    }

    private static double parseDouble(String value, double defaultValue) {
        if (value == null || value.isBlank()) {
            return defaultValue;
        }
        try {
            return Double.parseDouble(value.trim());
        } catch (NumberFormatException ex) {
            return defaultValue;
        }
    }

    private static String readPropertyFromResource(String key) {
        try (InputStream stream = AiConfiguration.class.getClassLoader().getResourceAsStream(PROPERTIES_RESOURCE)) {
            if (stream == null) {
                return null;
            }
            Properties properties = new Properties();
            properties.load(stream);
            return properties.getProperty(key);
        } catch (IOException ex) {
            return null;
        }
    }

    boolean enabled() {
        return enabled;
    }

    String apiKey() {
        return apiKey;
    }

    String model() {
        return model;
    }

    Duration timeout() {
        return timeout;
    }

    double temperature() {
        return temperature;
    }

    int maxTokens() {
        return maxTokens;
    }

    String disableReason() {
        return disableReason;
    }

    @Override
    public String toString() {
        if (!enabled) {
            return "AiConfiguration{disabled reason='" + disableReason + "'}";
        }
        return "AiConfiguration{"
                + "model='" + model + '\''
                + ", timeout=" + timeout
                + ", temperature=" + temperature
                + ", maxTokens=" + maxTokens
                + '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(enabled, model, timeout, temperature, maxTokens);
    }
}
