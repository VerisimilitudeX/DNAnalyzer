package DNAnalyzer

// Main Class
object Main {
    @kotlin.Throws(IOException::class, InterruptedException::class)
    @kotlin.jvm.JvmStatic
    fun main(args: Array<String>) {

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        val ds = GenomeSequencer()
        val scd = CodonData()
        ds.getSequenceAndAminoAcid(scd.getAminoAcid(AminoAcidNames.ISOLEUCINE),
                scd.getAminoAcid(AminoAcidNames.LEUCINE),
                scd.getAminoAcid(AminoAcidNames.VALINE), scd.getAminoAcid(AminoAcidNames.PHENYLALANINE),
                scd.getAminoAcid(AminoAcidNames.METHIONINE), scd.getAminoAcid(AminoAcidNames.CYSTEINE),
                scd.getAminoAcid(AminoAcidNames.ALANINE), scd.getAminoAcid(AminoAcidNames.GLYCINE),
                scd.getAminoAcid(AminoAcidNames.PROLINE), scd.getAminoAcid(AminoAcidNames.THREONINE),
                scd.getAminoAcid(AminoAcidNames.SERINE), scd.getAminoAcid(AminoAcidNames.TYROSINE),
                scd.getAminoAcid(AminoAcidNames.TRYPTOPHAN), scd.getAminoAcid(AminoAcidNames.GLUTAMINE),
                scd.getAminoAcid(AminoAcidNames.ASPARAGINE), scd.getAminoAcid(AminoAcidNames.HISTIDINE),
                scd.getAminoAcid(AminoAcidNames.GLUTAMIC_ACID), scd.getAminoAcid(AminoAcidNames.ASPARTIC_ACID),
                scd.getAminoAcid(AminoAcidNames.LYSINE), scd.getAminoAcid(AminoAcidNames.ARGININE),
                scd.getAminoAcid(AminoAcidNames.STOP))
    }
}