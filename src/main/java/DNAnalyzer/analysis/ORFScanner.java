package DNAnalyzer.analysis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/** Finds open reading frames in a DNA sequence on both strands. */
public final class ORFScanner {
  private static final Map<String, Character> CODON_TABLE = buildCodonTable();
  private static final Set<String> STOP_CODONS = Set.of("TAA", "TAG", "TGA");
  private static final Set<String> START_CODONS = Set.of("ATG");

  public List<ORF> scan(String sequence) {
    List<ORF> orfs = new ArrayList<>();
    String forward = sequence.toUpperCase(Locale.ROOT);
    String reverse = SequenceUtils.reverseComplement(forward);
    for (int frame = 0; frame < 3; frame++) {
      orfs.addAll(findOrfs(forward, frame, "+"));
      orfs.addAll(findOrfs(reverse, frame, "-"));
    }
    return orfs;
  }

  private List<ORF> findOrfs(String sequence, int frame, String strand) {
    List<ORF> results = new ArrayList<>();
    for (int i = frame; i + 2 < sequence.length(); i += 3) {
      String codon = sequence.substring(i, i + 3);
      if (!START_CODONS.contains(codon)) {
        continue;
      }
      for (int j = i; j + 2 < sequence.length(); j += 3) {
        String stop = sequence.substring(j, j + 3);
        if (STOP_CODONS.contains(stop)) {
          String orf = sequence.substring(i, j + 3);
          results.add(new ORF(strand, frame, i, j + 3, orf, translate(orf)));
          break;
        }
      }
    }
    return results;
  }

  private String translate(String dna) {
    StringBuilder protein = new StringBuilder(dna.length() / 3);
    for (int i = 0; i + 2 < dna.length(); i += 3) {
      String codon = dna.substring(i, i + 3);
      protein.append(CODON_TABLE.getOrDefault(codon, 'X'));
    }
    return protein.toString();
  }

  private static Map<String, Character> buildCodonTable() {
    Map<String, Character> table = new HashMap<>();
    table.put("TTT", 'F');
    table.put("TTC", 'F');
    table.put("TTA", 'L');
    table.put("TTG", 'L');
    table.put("CTT", 'L');
    table.put("CTC", 'L');
    table.put("CTA", 'L');
    table.put("CTG", 'L');
    table.put("ATT", 'I');
    table.put("ATC", 'I');
    table.put("ATA", 'I');
    table.put("ATG", 'M');
    table.put("GTT", 'V');
    table.put("GTC", 'V');
    table.put("GTA", 'V');
    table.put("GTG", 'V');
    table.put("TCT", 'S');
    table.put("TCC", 'S');
    table.put("TCA", 'S');
    table.put("TCG", 'S');
    table.put("AGT", 'S');
    table.put("AGC", 'S');
    table.put("CCT", 'P');
    table.put("CCC", 'P');
    table.put("CCA", 'P');
    table.put("CCG", 'P');
    table.put("ACT", 'T');
    table.put("ACC", 'T');
    table.put("ACA", 'T');
    table.put("ACG", 'T');
    table.put("GCT", 'A');
    table.put("GCC", 'A');
    table.put("GCA", 'A');
    table.put("GCG", 'A');
    table.put("TAT", 'Y');
    table.put("TAC", 'Y');
    table.put("CAT", 'H');
    table.put("CAC", 'H');
    table.put("CAA", 'Q');
    table.put("CAG", 'Q');
    table.put("AAT", 'N');
    table.put("AAC", 'N');
    table.put("AAA", 'K');
    table.put("AAG", 'K');
    table.put("GAT", 'D');
    table.put("GAC", 'D');
    table.put("GAA", 'E');
    table.put("GAG", 'E');
    table.put("TGT", 'C');
    table.put("TGC", 'C');
    table.put("TGG", 'W');
    table.put("CGT", 'R');
    table.put("CGC", 'R');
    table.put("CGA", 'R');
    table.put("CGG", 'R');
    table.put("AGA", 'R');
    table.put("AGG", 'R');
    table.put("GGT", 'G');
    table.put("GGC", 'G');
    table.put("GGA", 'G');
    table.put("GGG", 'G');
    table.put("TAA", '*');
    table.put("TAG", '*');
    table.put("TGA", '*');
    return table;
  }

  public record ORF(
      String strand,
      int frame,
      int start,
      int end,
      String nucleotideSequence,
      String aminoAcidSequence) {
    public int length() {
      return nucleotideSequence.length();
    }
  }
}
