import java.io.IOException;

// Main Class
public class Main {
    public static void main(String[] args) throws IOException, InterruptedException {

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        GenomeSequencer ds = new GenomeSequencer();
        StructCodonData scd = new StructCodonData();
        ds.getSequenceAndAminoAcid(scd.getCodonType(AminoAcid.ISOLEUCINE), scd.getCodonType(AminoAcid.LEUCINE),
                scd.getCodonType(AminoAcid.VALINE), scd.getCodonType(AminoAcid.PHENYLALANINE),
                scd.getCodonType(AminoAcid.METHIONINE), scd.getCodonType(AminoAcid.CYSTEINE),
                scd.getCodonType(AminoAcid.ALANINE), scd.getCodonType(AminoAcid.GLYCINE),
                scd.getCodonType(AminoAcid.PROLINE), scd.getCodonType(AminoAcid.THREONINE),
                scd.getCodonType(AminoAcid.SERINE), scd.getCodonType(AminoAcid.TYROSINE),
                scd.getCodonType(AminoAcid.TRYPTOPHAN), scd.getCodonType(AminoAcid.GLUTAMINE),
                scd.getCodonType(AminoAcid.ASPARAGINE), scd.getCodonType(AminoAcid.HISTIDINE),
                scd.getCodonType(AminoAcid.GLUTAMIC_ACID), scd.getCodonType(AminoAcid.ASPARTIC_ACID),
                scd.getCodonType(AminoAcid.LYSINE), scd.getCodonType(AminoAcid.ARGININE),
                scd.getCodonType(AminoAcid.STOP));
    }
}
