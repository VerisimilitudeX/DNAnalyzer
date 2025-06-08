package DNAnalyzer.utils.protein;

import DNAnalyzer.data.aminoAcid.AminoAcid;
import DNAnalyzer.data.codon.CodonDataConstants;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** Utility to translate DNA codons to amino acid single-letter codes. */
public class CodonTranslator {
  private static final Map<String, Character> CODON_MAP = new HashMap<>();
  private static final Map<AminoAcid, Character> LETTER_MAP =
      Map.ofEntries(
          Map.entry(AminoAcid.ALANINE, 'A'),
          Map.entry(AminoAcid.CYSTEINE, 'C'),
          Map.entry(AminoAcid.ASPARTIC_ACID, 'D'),
          Map.entry(AminoAcid.GLUTAMIC_ACID, 'E'),
          Map.entry(AminoAcid.PHENYLALANINE, 'F'),
          Map.entry(AminoAcid.GLYCINE, 'G'),
          Map.entry(AminoAcid.HISTIDINE, 'H'),
          Map.entry(AminoAcid.ISOLEUCINE, 'I'),
          Map.entry(AminoAcid.LYSINE, 'K'),
          Map.entry(AminoAcid.LEUCINE, 'L'),
          Map.entry(AminoAcid.METHIONINE, 'M'),
          Map.entry(AminoAcid.ASPARAGINE, 'N'),
          Map.entry(AminoAcid.PROLINE, 'P'),
          Map.entry(AminoAcid.GLUTAMINE, 'Q'),
          Map.entry(AminoAcid.ARGININE, 'R'),
          Map.entry(AminoAcid.SERINE, 'S'),
          Map.entry(AminoAcid.THREONINE, 'T'),
          Map.entry(AminoAcid.VALINE, 'V'),
          Map.entry(AminoAcid.TRYPTOPHAN, 'W'),
          Map.entry(AminoAcid.TYROSINE, 'Y'));

  static {
    for (Map.Entry<AminoAcid, Character> entry : LETTER_MAP.entrySet()) {
      List<String> codons = entry.getKey().getCodonData();
      for (String codon : codons) {
        CODON_MAP.put(codon, entry.getValue());
      }
    }
    for (String stop : CodonDataConstants.STOP) {
      CODON_MAP.put(stop, '*');
    }
  }

  private CodonTranslator() {}

  /** Translate a DNA sequence into amino acid single-letter codes. */
  public static String translate(String dna) {
    StringBuilder aa = new StringBuilder();
    String upper = dna.toUpperCase();
    for (int i = 0; i <= upper.length() - 3; i += 3) {
      String codon = upper.substring(i, i + 3);
      aa.append(CODON_MAP.getOrDefault(codon, '?'));
    }
    return aa.toString();
  }
}
