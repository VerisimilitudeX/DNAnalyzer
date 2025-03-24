package DNAnalyzer.core;

import DNAnalyzer.utils.core.DNATools;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

/** This class provides provides functionality for generating mutated DNA sequences. */
public class DNAMutation {

  private static final char[] BASES = {'A', 'T', 'C', 'G', 'N'};
  private static Random random = new Random();

  /**
   * Generates a list of 10 mutated DNA sequences based on the specified number of base mutations
   * and prints them to the console.
   *
   * @param dnaString Original DNA sequence to mutate
   * @param numMutations The number of base mutations to apply to each mutated sequence
   */
  public static void generateAndWriteMutatedSequences(
      String dnaString, int numMutations, PrintStream out) {
    List<String> mutatedSequences = new ArrayList<>();
    
    // Create an index of available positions to mutate (remove indexes of unknown bases)
    List<Integer> availablePositions = getKnownBaseIndexes(dnaString);

    if (availablePositions.size() == 0) {
      out.println("No valid bases to mutate, skipping mutation.");
      return;
    }

    if (numMutations > availablePositions.size()) {
      out.println("Warning: Number of mutations exceeds valid mutable bases. Limiting to: " + availablePositions.size());
      numMutations = availablePositions.size();
    }

    out.println("\nMutating DNA sequence...");

    // Generate 10 mutated sequences
    for (int i = 0; i < 10; i++) {
      DNATools mutatedDna = new DNATools(mutate(dnaString, numMutations, availablePositions));
      mutatedSequences.add(mutatedDna.dna()); // Store the mutated DNA sequence to the list
    }

    // Dynamically generate the file name based on the current timestamp
    String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
    String fileName = "mutated_dna_" + timestamp + ".fa";

    // Write the mutated sequences to a file
    try (FileWriter writer = new FileWriter(fileName)) {
      for (int i = 0; i < mutatedSequences.size(); i++) {
        writer.write(">mutation_" + (i + 1) + "\n"); // Write a header for each mutated sequence
        String mutatedSequence = mutatedSequences.get(i);

        // Write the sequence over multiple lines (e.g., 80 characters per line)
        for (int j = 0; j < mutatedSequence.length(); j += 80) {
          writer.write(
              mutatedSequence.substring(j, Math.min(j + 80, mutatedSequence.length())) + "\n");
        }
      }
      out.println("Mutated DNA sequences have been written to: " + fileName + "\n");
    } catch (IOException e) {
      out.println("Error writing to file: " + e.getMessage() + "\n");
    }
  }

  /**
   * Mutates a DNA sequence with a specified number of random base mutations.
   *
   * @param dnaString Original DNA sequence to mutate
   * @param numMutations The number of mutations (substitutions) to apply to the sequence
   * @param availablePositions A list of indices representing available positions for mutation 
   * @return A new mutated DNA sequence
   */
  private static String mutate(String dnaString, int numMutations, List<Integer> availablePositions) {
    StringBuilder mutatedDna = new StringBuilder(dnaString);

    // Perform mutations
    for (int i = 0; i < numMutations; i++) {
      // Select a random position from the available positions
      int randomPosition = random.nextInt(availablePositions.size());
      int position = availablePositions.remove(randomPosition);

      char originalBase = dnaString.charAt(position);
      char mutatedBase = getDifferentBase(originalBase);

      mutatedDna.setCharAt(position, mutatedBase);
    }

    return mutatedDna.toString();
  }

  /**
   * Returns a list of indexes representing positions in the DNA string that contain known (valid) bases.
   * A known base is any base that is not 'n' or 'N', which are considered unknown.
   *
   * @param dnaString The DNA sequence to check for valid base positions.
   * @return A list of integers representing the indexes of known bases in the provided DNA sequence.
   */
  private static List<Integer> getKnownBaseIndexes(String dnaString) {
    List<Integer> availablePositions = new ArrayList<>();
    for (int i = 0; i < dnaString.length(); i++) {
        if (isValidBase(dnaString.charAt(i))) {
            availablePositions.add(i);
        }
    }
    return availablePositions;
  }

  // Helper method to check if a provided base is valid (not unknown)
  private static boolean isValidBase(char base) {
    return base != 'n' && base != 'N';
  }

  /**
   * Returns a random base different from the original base.
   *
   * @param originalBase Original base to mutate from
   * @return A mutated base (different from the original)
   */
  private static char getDifferentBase(char originalBase) {
    int index = new String(BASES).indexOf(originalBase);

    // Pick a random index that isn’t the same as the original
    int newIndex = (index + 1 + random.nextInt(BASES.length - 1)) % BASES.length;

    return BASES[newIndex];
  }
}
