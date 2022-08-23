import java.util.HashMap;

public class AminoAcidProperties {
    private HashMap<String, Integer> codonCounts;
    private int startRefFrame;
    private int min;
    private int max;

    public AminoAcidProperties(int startRefFrame, int min, int max) {
        codonCounts = new HashMap<String, Integer>();
        this.startRefFrame = startRefFrame;
        this.min = min;
        this.max = max;
    }

    private void buildCodonMap(int startRefFrame, String dna) {
        codonCounts.clear();
        for (int i = startRefFrame; i < dna.length(); i += 3) {
            try {
                if (codonCounts.containsKey(dna.substring(i, i + 3))) {
                    codonCounts.put(dna.substring(i, i + 3), codonCounts.get(dna.substring(i, i + 3)) + 1);
                } else {
                    codonCounts.put(dna.substring(i, i + 3), 1);
                }
            } catch (Exception e) {
                // do nothing
            }
        }
    }

    public void printCodonCounts() {
        buildCodonMap(startRefFrame, "CGTTCAAGTTCAA");
        for (String codon : codonCounts.keySet()) {
            if (codonCounts.get(codon) >= min && codonCounts.get(codon) <= max) {
                System.out.println(codon + "\t" + codonCounts.get(codon));
            }
        }
    }
}
