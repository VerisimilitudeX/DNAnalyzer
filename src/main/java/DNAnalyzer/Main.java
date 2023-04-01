/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

import DNAnalyzer.ui.cli.CmdArgs;
import picocli.CommandLine;

/**
 * Main Class for the DNAnalyzer program.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 * @see <a href=
 *      "https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science">Genomic
 *      Datasheet</a>
 */
public class Main {

    /**
     * Clears the console screen based on the operating system.
     *
     * @throws InterruptedException Necessary for clearing the screen
     * @throws IOException          Necessary for clearing the screen
     *                              {@code @category} User Experience
     */
    public static void clearTerminal() throws InterruptedException, IOException {
        if (System.getProperty("os.name").contains("Windows")) { // if the os is Windows
            new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        } else {
            System.out.print("\u001b[H\u001b[2J"); // unicode string to clear everything logged above this
            System.out.flush();
        }
    }

    /**
     * Main method for the DNAnalyzer program (run this).
     *
     * @param args Command line arguments
     *             {@code @category} Main
     * @throws IOException
     * @throws InterruptedException
     */
    public static void main(final String[] args) throws InterruptedException, IOException {
        // Clear the console screen
        clearTerminal();

        String apiKey = System.getenv("OPENAI_API_KEY");
        if (apiKey == null) {
            clearTerminal();
            System.out.println(
                    "Welcome to DNAnalyzer! Please allow up to 15 seconds for the analysis to complete (note: the time may vary based on your hardware).\n");
            new CommandLine(new CmdArgs()).execute(args);
            System.out
                    .println("\n**Please set your OPENAI_API_KEY environment variable for an AI analysis of the DNA**");
            System.exit(1);
        } else {

            // Create a ByteArrayOutputStream to hold the console output
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintStream ps = new PrintStream(baos);

            // Save the old System.out
            PrintStream old = System.out;

            // Set the new System.out to the PrintStream
            System.setOut(ps);

            new CommandLine(new CmdArgs()).execute(args);

            // Restore the old System.out
            System.out.flush();
            System.setOut(old);

            // Get the captured console output as a string
            String output = baos.toString();

            System.out.println(output + "\n-----------------------\n\nAI Analysis:\n");
            String res = askGPT(output);

            System.out.println(res);
            System.exit(0);
        }

    }

    /** Parses the message content from a given response string in JSON format.
     * @param response the response string in JSON format from the OpenAI API
     * @return the message content as a String
*/
    private static String parseMessageContent(String response) {
        String jsonString = response;
        try {
            JSONObject jsonObject = new JSONObject(jsonString);
            JSONArray choicesArray = jsonObject.getJSONArray("choices");
            JSONObject choiceObject = choicesArray.getJSONObject(0);
            JSONObject messageObject = choiceObject.getJSONObject("message");
            String messageContent = messageObject.getString("content");
            return messageContent;
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String askGPT(String output) {
        output = output.replaceAll("\\r?\\n", "");
        String API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
        String AUTHORIZATION_HEADER = "Bearer " + System.getenv("OPENAI_API_KEY");
        try {
            URL url = new URL(API_ENDPOINT);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Authorization", AUTHORIZATION_HEADER);
            conn.setDoOutput(true);

            String requestBody = "{\n" +
                    "    \"model\": \"gpt-3.5-turbo\",\n" +
                    "    \"messages\": [\n" +
                    "        {\n" +
                    "            \"role\": \"user\",\n" +
                    "            \"content\": \"In 5 paragraphs, Provide comprehensive DNA analysis with actionable insights using technical terms, beyond surface-level information, **DON'T SUMMARIZE THE OUTPUT PROVIDED, let's think step by step**, for experienced biotechnology researchers, avoiding statements that DNA cannot be analyzed, as a chatbot of DNAnalyzer. Also, even if you think you can't analyze it, analyze it anyway - I won't judge if it's wrong so don't worry. DONT SUMMARIZE THE OUTPUT PROVIDED AND DONT JUST INCLUDE THE NUMBERS. YOU HAVE TO EXPLAIN THE SIGNIFICANCE OF EVERYTHING and also give actionable tasks to the user that they can do to get better. Then, answer those questions."
                    + output + "\"\n"
                    +
                    "        }\n" +
                    "    ],\n" +
                    "    \"temperature\": 0.9\n" +
                    "}";
            conn.getOutputStream().write(requestBody.getBytes());

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String response = reader.lines().collect(Collectors.joining());
            reader.close();

            return parseMessageContent(response);
        } catch (Exception e) {
            if (e.getMessage().contains("401")) {
                return "Error: Invalid API key. Please check your API key and try again.";
            } else {
                return "Error: " + e.getMessage();
            }
        }
    }
}
