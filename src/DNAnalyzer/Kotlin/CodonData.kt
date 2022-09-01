package DNAnalyzer

// This method returns the codon data for the given amino acid.
class CodonData {
    fun getAminoAcid(name: AminoAcidNames?): java.util.ArrayList<String> {
        return when (name) {
            ISOLEUCINE -> Isoleucine
            LEUCINE -> Leucine
            VALINE -> Valine
            PHENYLALANINE -> Phenylalanine
            METHIONINE -> Methionine
            CYSTEINE -> Cysteine
            ALANINE -> Alanine
            GLYCINE -> Glycine
            PROLINE -> Proline
            THREONINE -> Threonine
            SERINE -> Serine
            TYROSINE -> Tyrosine
            TRYPTOPHAN -> Tryptophan
            GLUTAMINE -> Glutamine
            ASPARAGINE -> Asparagine
            HISTIDINE -> Histidine
            GLUTAMIC_ACID -> GlutamicAcid
            ASPARTIC_ACID -> AsparticAcid
            LYSINE -> Lysine
            ARGININE -> Arginine
            STOP -> Stop
        }
    }

    companion object {
        // Declares the start codon data for the 20 amino acids. Adding 'final' after
        // 'private' makes the variable immutable.
        private val Isoleucine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("ATT", "ATC", "ATA"))
        private val Leucine: java.util.ArrayList<String> = java.util.ArrayList<String>(
                Arrays.asList<String>("CTT", "CTC", "CTA", "CTG", "TTA", "TTG"))
        private val Valine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("GTT", "GTC", "GTA", "GTG"))
        private val Phenylalanine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("TTT", "TTC"))
        private val Methionine: java.util.ArrayList<String> = java.util.ArrayList<String>(java.util.List.of<String>("ATG"))
        private val Cysteine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("TGT", "TGC"))
        private val Alanine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("GCT", "GCC", "GCA", "GCG"))
        private val Glycine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("GGT", "GGC", "GGA", "GGG"))
        private val Proline: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("CCT", "CCC", "CCA", "CCG"))
        private val Threonine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("ACT", "ACC", "ACA", "ACG"))
        private val Serine: java.util.ArrayList<String> = java.util.ArrayList<String>(
                Arrays.asList<String>("TCT", "TCC", "TCA", "TCG", "AGT", "AGC"))
        private val Tyrosine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("TAT", "TAC"))
        private val Tryptophan: java.util.ArrayList<String> = java.util.ArrayList<String>(java.util.List.of<String>("TGG"))
        private val Glutamine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("CAA", "CAG"))
        private val Asparagine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("AAT", "AAC"))
        private val Histidine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("CAT", "CAC"))
        private val GlutamicAcid: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("GAA", "GAG"))
        private val AsparticAcid: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("GAT", "GAC"))
        private val Lysine: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("AAA", "AAG"))
        private val Arginine: java.util.ArrayList<String> = java.util.ArrayList<String>(
                Arrays.asList<String>("CGT", "CGC", "CGA", "CGG", "AGA", "AGG"))

        // Declares the stop codon data for the 20 amino acids. Note: the stop codons
        // are the same for all amino acids.
        private val Stop: java.util.ArrayList<String> = java.util.ArrayList<String>(Arrays.asList<String>("TAA", "TAG", "TGA"))
    }
}