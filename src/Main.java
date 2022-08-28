import java.io.IOException;
import io.cryptolens.*;
import io.cryptolens.*;vhtr,gu

// Main Class
public class Main {
    public static void main(final String[] args) throws IOException, InterruptedException {

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        final GenomeSequencer ds = new GenomeSequencer();
        final StructCodonData scd = new StructCodonData();
        ds.getSequenceAndAminoAcid(scd.getAminoAcid(AminoAcid.ISOLEUCINE), scd.getAminoAcid(AminoAcid.LEUCINE),
                scd.getAminoAcid(AminoAcid.VALINE), scd.getAminoAcid(AminoAcid.PHENYLALANINE),
                scd.getAminoAcid(AminoAcid.METHIONINE), scd.getAminoAcid(AminoAcid.CYSTEINE),
                scd.getAminoAcid(AminoAcid.ALANINE), scd.getAminoAcid(AminoAcid.GLYCINE),
                scd.getAminoAcid(AminoAcid.PROLINE), scd.getAminoAcid(AminoAcid.THREONINE),
                scd.getAminoAcid(AminoAcid.SERINE), scd.getAminoAcid(AminoAcid.TYROSINE),
                scd.getAminoAcid(AminoAcid.TRYPTOPHAN), scd.getAminoAcid(AminoAcid.GLUTAMINE),
                scd.getAminoAcid(AminoAcid.ASPARAGINE), scd.getAminoAcid(AminoAcid.HISTIDINE),
                scd.getAminoAcid(AminoAcid.GLUTAMIC_ACID), scd.getAminoAcid(AminoAcid.ASPARTIC_ACID),
                scd.getAminoAcid(AminoAcid.LYSINE), scd.getAminoAcid(AminoAcid.ARGININE),
                scd.getAminoAcid(AminoAcid.STOP));
    }
}
