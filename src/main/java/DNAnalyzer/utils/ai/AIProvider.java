package DNAnalyzer.utils.ai;

/** Supported AI providers for DNAnalyzer. */
public enum AIProvider {
    OPENAI("OPENAI_API_KEY"),
    ANTHROPIC("ANTHROPIC_API_KEY"),
    GROK("GROK_API_KEY"),
    GEMINI("GEMINI_API_KEY"),
    OLLAMA("OLLAMA_API_KEY"),
    LM_STUDIO("LMSTUDIO_API_KEY");

    private final String envName;

    AIProvider(String envName) {
        this.envName = envName;
    }

    /** Environment variable name holding the API key for this provider. */
    public String envName() {
        return envName;
    }

    /** Parse from string value ignoring case. Defaults to OPENAI if unknown. */
    public static AIProvider fromString(String value) {
        if (value == null) {
            return OPENAI;
        }
        switch (value.toLowerCase()) {
            case "anthropic":
                return ANTHROPIC;
            case "grok":
                return GROK;
            case "gemini":
                return GEMINI;
            case "ollama":
                return OLLAMA;
            case "lmstudio":
            case "lm_studio":
                return LM_STUDIO;
            default:
                return OPENAI;
        }
    }
}
