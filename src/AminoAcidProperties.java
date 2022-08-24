import java.util.HashMap;

public class AminoAcidProperties {
    private HashMap<String, Integer> codonCounts;
    private String DNA;

    public AminoAcidProperties(String DNA) {
        codonCounts = new HashMap<String, Integer>();
        this.DNA = DNA;
    }

    private void buildCodonMap(int startReadingFrame, int start, int stop) {
        codonCounts.clear();
        for (int i = start; i < DNA.length(); i += 3) {
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

    public void printCodonCounts(int START_READING_FRAME, int start, int end) {
        buildCodonMap(START_READING_FRAME, start, end);
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
