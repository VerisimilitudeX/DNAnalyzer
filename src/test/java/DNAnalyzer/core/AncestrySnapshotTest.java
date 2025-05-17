package DNAnalyzer.core;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Test;

class AncestrySnapshotTest {

  @Test
  void shouldInferEuropeanAncestry() throws IOException {
    AncestrySnapshot snapshot = new AncestrySnapshot();
    Map<String, String> user = new HashMap<>();
    user.put("rs1426654", "GG");
    user.put("rs16891982", "GG");
    user.put("rs2814778", "CC");

    Map<String, Double> results = snapshot.inferAncestry(user);
    String best =
        results.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .get()
            .getKey();
    assertEquals("Europe", best);
  }
}
