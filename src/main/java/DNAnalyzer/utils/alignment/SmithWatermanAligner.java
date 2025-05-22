package DNAnalyzer.utils.alignment;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.json.JSONObject;

/** Bridge to the optional Python GPU Smith-Waterman implementation. */
public class SmithWatermanAligner {

    /** Invoke the Python module to compute a local alignment. */
    public static SequenceAligner.AlignmentResult align(String seq1, String seq2) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(
            "python3", "-m", "src.python.gpu_smith_waterman", seq1, seq2, "--json");
        pb.redirectErrorStream(true);
        Process proc = pb.start();
        BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));
        StringBuilder out = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            out.append(line);
        }
        int code = proc.waitFor();
        if (code != 0) {
            throw new RuntimeException("Python Smith-Waterman failed: " + out);
        }
        JSONObject obj = new JSONObject(out.toString());
        return new SequenceAligner.AlignmentResult(
            obj.getString("aligned1"), obj.getString("aligned2"), obj.getInt("score"));
    }
}
