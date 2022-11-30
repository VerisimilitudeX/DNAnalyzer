package DNAnalyzer.utils.traits;

import java.util.HashMap;

public class Traits {
    /**
     * Check if the DNA sequence has at least three distinct occurrences of the
     * sequence <code>GGG</code>. If so, the
     * person carrying the supplied DNA has increased risk to acquire Tiberius
     * syndrome.
     *
     * @return {@link Solution} to exercise 1.1.
     */
    /*
    public HashMap<Integer, Boolean> hasRiskOfTiberiusSyndrome() {
        return new HashMap<Integer, Boolean>() {
            public Integer getResultSet() {
                return sequence.count("GGG");
            }

            public Boolean getResult() {
                return getResultSet() >= 3;
            }

            public String getFormattedResult() {
                return (getResult() ? "Yes" : "No") +
                        " (" + getResultSet() + " occurrences, 3 occurrences indicate high risk)";
            }
        };
    }
    */
}
