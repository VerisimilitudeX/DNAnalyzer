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

package DNAnalyzer.utils.traits;

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
