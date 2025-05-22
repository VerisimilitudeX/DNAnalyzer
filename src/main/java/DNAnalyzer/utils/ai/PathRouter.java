package DNAnalyzer.utils.ai;

import DNAnalyzer.ui.cli.CmdArgs;
import DNAnalyzer.utils.core.Utils;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import picocli.CommandLine;

/** PathRouter class for the DNAnalyzer program. */
public class PathRouter {

  private static String parseMessageContent(String response) {
    try {
      JSONObject jsonObject = new JSONObject(response);
      JSONArray choicesArray = jsonObject.getJSONArray("choices");
      JSONObject choiceObject = choicesArray.getJSONObject(0);
      JSONObject messageObject = choiceObject.getJSONObject("message");
      return messageObject.getString("content");
    } catch (JSONException e) {
      return null;
    }
  }

  /** Runs the regular analysis without any AI integration. */
  public static void regular(String[] args) throws InterruptedException, IOException {
    Utils.clearTerminal();
    System.out.println(
        """
                       Welcome to DNAnalyzer! Please allow up to 10 seconds for the analysis to complete (note: the time may vary based on your hardware).
                       """);
    new CommandLine(new CmdArgs()).execute(args);
    System.out.println("\n**Please configure an AI provider for enhanced analysis**");
    System.exit(1);
  }

  /** Runs the analysis with AI summary. */
  public static void runAiAnalysis(String[] args, AIProvider provider, String apiKey)
      throws InterruptedException, IOException {
    Utils.clearTerminal();
    System.out.println(
        """
                       Welcome to DNAnalyzer! Please allow up to 15 seconds for the analysis to complete (note: the time may vary based on your hardware).
                       """);
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    PrintStream ps = new PrintStream(baos);
    PrintStream old = System.out;
    System.setOut(ps);

    new CommandLine(new CmdArgs()).execute(args);

    System.out.flush();
    System.setOut(old);

    String output = baos.toString();
    System.out.println(output + "\n-----------------------\n\nAI Analysis:\n");
    String response = AIService.call(output, provider, apiKey);
    String parsed = parseMessageContent(response);
    System.out.println(parsed != null ? parsed : response);
    System.exit(0);
  }
}
