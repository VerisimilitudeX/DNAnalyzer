package DNAnalyzer;

import java.io.IOException;

// Main Class
public class Main {
    public static void main(final String[] args) throws IOException, InterruptedException {

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        final GenomeSequencer gs = new GenomeSequencer();
        final CodonData cd = new CodonData();
        gs.getSequenceAndAminoAcid(cd.getAminoAcid(AminoAcidNames.ISOLEUCINE),
                cd.getAminoAcid(AminoAcidNames.LEUCINE),
                cd.getAminoAcid(AminoAcidNames.VALINE), cd.getAminoAcid(AminoAcidNames.PHENYLALANINE),
                cd.getAminoAcid(AminoAcidNames.METHIONINE), cd.getAminoAcid(AminoAcidNames.CYSTEINE),
                cd.getAminoAcid(AminoAcidNames.ALANINE), cd.getAminoAcid(AminoAcidNames.GLYCINE),
                cd.getAminoAcid(AminoAcidNames.PROLINE), cd.getAminoAcid(AminoAcidNames.THREONINE),
                cd.getAminoAcid(AminoAcidNames.SERINE), cd.getAminoAcid(AminoAcidNames.TYROSINE),
                cd.getAminoAcid(AminoAcidNames.TRYPTOPHAN), cd.getAminoAcid(AminoAcidNames.GLUTAMINE),
                cd.getAminoAcid(AminoAcidNames.ASPARAGINE), cd.getAminoAcid(AminoAcidNames.HISTIDINE),
                cd.getAminoAcid(AminoAcidNames.GLUTAMIC_ACID), cd.getAminoAcid(AminoAcidNames.ASPARTIC_ACID),
                cd.getAminoAcid(AminoAcidNames.LYSINE), cd.getAminoAcid(AminoAcidNames.ARGININE),
                cd.getAminoAcid(AminoAcidNames.STOP));
    }
}
