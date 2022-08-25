import java.util.HashMap;

public class AminoAcidProperties {
    private final HashMap<String, Integer> codonCounts;
    private final String DNA;

    public AminoAcidProperties(String DNA) {
        codonCounts = new HashMap<>();
        this.DNA = DNA;
    }

    private void buildCodonMap(int startReadingFrame) {
        codonCounts.clear();
        for (int i = startReadingFrame; i < DNA.length(); i += 3) {
            try {
                if (codonCounts.containsKey(DNA.substring(i, i + 3))) {
                    codonCounts.put(DNA.substring(i, i + 3), codonCounts.get(DNA.substring(i, i + 3)) + 1);
                } else {
                    codonCounts.put(DNA.substring(i, i + 3), 1);
                }
            } catch (Exception e) {
                // do nothing
            }
        }
    }

    public void printCodonCounts(int startReadingFrame, int start, int end) {
        buildCodonMap(startReadingFrame);
        int count = 0;
        for (String codon : codonCounts.keySet()) {
            if (codonCounts.get(codon) >= start && codonCounts.get(codon) <= end) {
                count++;
                System.out.println(codon + "\t" + codonCounts.get(codon));
            }
        }
        System.out.println(count);
    }
}
