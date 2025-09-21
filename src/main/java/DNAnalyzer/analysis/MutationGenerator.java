package DNAnalyzer.analysis;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

/** Generates point mutations for simulation purposes. */
public final class MutationGenerator {
    private static final char[] BASES = {'A', 'T', 'G', 'C'};
    private final Random random = new SecureRandom();

    public List<Mutation> generate(String sequence, int mutationsPerSequence, int sequenceCount) {
        List<Mutation> results = new ArrayList<>();
        for (int i = 0; i < sequenceCount; i++) {
            char[] chars = sequence.toUpperCase(Locale.ROOT).toCharArray();
            List<Mutation.Event> events = new ArrayList<>();
            for (int j = 0; j < mutationsPerSequence; j++) {
                int position = random.nextInt(chars.length);
                char original = chars[position];
                char mutated = randomBaseExcept(original);
                chars[position] = mutated;
                events.add(new Mutation.Event(position, original, mutated));
            }
            results.add(new Mutation(i + 1, new String(chars), events));
        }
        return results;
    }

    public List<String> generateMutations(String sequence, int mutationsPerSequence, int sequenceCount) {
        List<Mutation> mutations = generate(sequence, mutationsPerSequence, sequenceCount);
        List<String> sequences = new ArrayList<>(mutations.size());
        for (Mutation mutation : mutations) {
            sequences.add(mutation.mutatedSequence());
        }
        return sequences;
    }

    private char randomBaseExcept(char exclude) {
        char upper = Character.toUpperCase(exclude);
        char candidate;
        do {
            candidate = BASES[random.nextInt(BASES.length)];
        } while (candidate == upper);
        return candidate;
    }

    public record Mutation(int index, String mutatedSequence, List<Event> events) {
        public record Event(int position, char original, char mutated) {
        }
    }
}
