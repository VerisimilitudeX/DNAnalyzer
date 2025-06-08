package DNAnalyzer.utils.ai;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;

/** Utility for calling various AI chat providers. */
public class AIService {
  private static final Logger LOGGER = Logger.getLogger(AIService.class.getName());

  /**
   * Send the given prompt to the selected provider and return the text response.
   *
   * @param prompt Message to send
   * @param provider Provider to use
   * @param apiKey API key for the provider (may be null for local providers)
   * @return Provider response or error message
   */
  public static String call(String prompt, AIProvider provider, String apiKey) {
    try {
      switch (provider) {
        case ANTHROPIC:
          return callAnthropic(prompt, apiKey);
        case GROK:
          return callGrok(prompt, apiKey);
        case GEMINI:
          return callGemini(prompt, apiKey);
        case OLLAMA:
          return callOllama(prompt, apiKey);
        case LM_STUDIO:
          return callLmStudio(prompt, apiKey);
        case OPENAI:
        default:
          return callOpenAI(prompt, apiKey);
      }
    } catch (IOException e) {
      LOGGER.log(Level.SEVERE, "Failed to call AI provider " + provider, e);
      return "Error: " + e.getMessage();
    }
  }

  private static String callOpenAI(String prompt, String apiKey) throws IOException {
    String endpoint = "https://api.openai.com/v1/chat/completions";
    HttpURLConnection conn = (HttpURLConnection) new URL(endpoint).openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Authorization", "Bearer " + apiKey);
    conn.setDoOutput(true);
    String body =
        "{"
            + "\"model\":\"gpt-4o-2025-05-13\","
            + "\"messages\":[{\"role\":\"user\",\"content\":\""
            + escape(prompt)
            + "\"}],"
            + "\"temperature\":0.1"
            + "}";
    try (OutputStream os = conn.getOutputStream()) {
      os.write(body.getBytes());
    }
    return readResponse(conn);
  }

  private static String callAnthropic(String prompt, String apiKey) throws IOException {
    String endpoint = "https://api.anthropic.com/v1/messages";
    HttpURLConnection conn = (HttpURLConnection) new URL(endpoint).openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("x-api-key", apiKey);
    conn.setRequestProperty("anthropic-version", "2023-06-01");
    conn.setDoOutput(true);
    String body =
        "{"
            + "\"model\":\"claude-3-opus-20240229\","
            + "\"max_tokens\":800,"
            + "\"messages\":[{\"role\":\"user\",\"content\":\""
            + escape(prompt)
            + "\"}]"
            + "}";
    try (OutputStream os = conn.getOutputStream()) {
      os.write(body.getBytes());
    }
    return readResponse(conn);
  }

  private static String callGrok(String prompt, String apiKey) throws IOException {
    String endpoint = "https://api.groq.com/openai/v1/chat/completions";
    HttpURLConnection conn = (HttpURLConnection) new URL(endpoint).openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Authorization", "Bearer " + apiKey);
    conn.setDoOutput(true);
    String body =
        "{"
            + "\"model\":\"llama3-70b-8192\","
            + "\"messages\":[{\"role\":\"user\",\"content\":\""
            + escape(prompt)
            + "\"}]"
            + "}";
    try (OutputStream os = conn.getOutputStream()) {
      os.write(body.getBytes());
    }
    return readResponse(conn);
  }

  private static String callGemini(String prompt, String apiKey) throws IOException {
    String endpoint =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="
            + apiKey;
    HttpURLConnection conn = (HttpURLConnection) new URL(endpoint).openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setDoOutput(true);
    String body = "{\"contents\":[{\"parts\":[{\"text\":\"" + escape(prompt) + "\"}]}]}";
    try (OutputStream os = conn.getOutputStream()) {
      os.write(body.getBytes());
    }
    return readResponse(conn);
  }

  private static String callOllama(String prompt, String apiKey) throws IOException {
    String endpoint = "http://localhost:11434/api/chat";
    HttpURLConnection conn = (HttpURLConnection) new URL(endpoint).openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    if (apiKey != null && !apiKey.isBlank()) {
      conn.setRequestProperty("Authorization", "Bearer " + apiKey);
    }
    conn.setDoOutput(true);
    String body =
        "{"
            + "\"model\":\"llama2\","
            + "\"messages\":[{\"role\":\"user\",\"content\":\""
            + escape(prompt)
            + "\"}]"
            + "}";
    try (OutputStream os = conn.getOutputStream()) {
      os.write(body.getBytes());
    }
    return readResponse(conn);
  }

  private static String callLmStudio(String prompt, String apiKey) throws IOException {
    String endpoint = "http://localhost:1234/v1/chat/completions";
    HttpURLConnection conn = (HttpURLConnection) new URL(endpoint).openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    if (apiKey != null && !apiKey.isBlank()) {
      conn.setRequestProperty("Authorization", "Bearer " + apiKey);
    }
    conn.setDoOutput(true);
    String body =
        "{"
            + "\"model\":\"local-model\","
            + "\"messages\":[{\"role\":\"user\",\"content\":\""
            + escape(prompt)
            + "\"}]"
            + "}";
    try (OutputStream os = conn.getOutputStream()) {
      os.write(body.getBytes());
    }
    return readResponse(conn);
  }

  private static String readResponse(HttpURLConnection conn) throws IOException {
    try (BufferedReader reader =
        new BufferedReader(
            new InputStreamReader(
                conn.getResponseCode() >= 400 ? conn.getErrorStream() : conn.getInputStream()))) {
      StringBuilder sb = new StringBuilder();
      String line;
      while ((line = reader.readLine()) != null) {
        sb.append(line);
      }
      return sb.toString();
    }
  }

  private static String escape(String text) {
    return text.replace("\"", "\\\"").replace("\n", " ");
  }
}
