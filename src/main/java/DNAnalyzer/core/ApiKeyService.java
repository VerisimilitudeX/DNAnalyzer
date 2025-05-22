package DNAnalyzer.core;

import DNAnalyzer.utils.ai.AIProvider;
import java.io.IOException;
import java.io.InputStream;
import java.util.EnumMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/** Service for managing API keys and provider selection. */
public class ApiKeyService {
    private static final Logger LOGGER = Logger.getLogger(ApiKeyService.class.getName());

    private final Map<AIProvider, String> apiKeys = new EnumMap<>(AIProvider.class);
    private AIProvider provider = AIProvider.OPENAI;

    public ApiKeyService() {
        loadFromProperties();
        loadFromEnv();
    }

    private void loadFromProperties() {
        try (InputStream in = getClass().getClassLoader().getResourceAsStream("ai-keys.properties")) {
            if (in == null) {
                return;
            }
            Properties props = new Properties();
            props.load(in);
            for (AIProvider p : AIProvider.values()) {
                String key = props.getProperty(p.name().toLowerCase());
                if (key != null && !key.isBlank()) {
                    apiKeys.put(p, key.trim());
                }
            }
            String prov = props.getProperty("provider");
            if (prov != null) {
                provider = AIProvider.fromString(prov);
            }
        } catch (IOException e) {
            LOGGER.log(Level.WARNING, "Failed to load ai-keys.properties", e);
        }
    }

    private void loadFromEnv() {
        for (AIProvider p : AIProvider.values()) {
            if (!apiKeys.containsKey(p)) {
                String env = System.getenv(p.envName());
                if (env != null && !env.isBlank()) {
                    apiKeys.put(p, env.trim());
                }
            }
        }
        String envProv = System.getenv("AI_PROVIDER");
        if (envProv != null && !envProv.isBlank()) {
            provider = AIProvider.fromString(envProv);
        }
    }

    public String getApiKey(AIProvider p) {
        return apiKeys.get(p);
    }

    public void setApiKey(AIProvider p, String key) {
        if (key == null || key.trim().isEmpty()) {
            throw new IllegalArgumentException("API key cannot be null or empty");
        }
        apiKeys.put(p, key.trim());
    }

    public boolean hasApiKey(AIProvider p) {
        String k = getApiKey(p);
        return k != null && !k.isBlank();
    }

    public AIProvider getProvider() {
        return provider;
    }

    public void setProvider(AIProvider provider) {
        this.provider = provider;
    }
}
