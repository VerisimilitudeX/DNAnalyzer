package DNAnalyzer

// This class is used to find genes in a DNA sequence.
class GeneFromProtein {
    private val aminoAcidList: java.util.ArrayList<String> = java.util.ArrayList<String>()
    private val geneList: java.util.ArrayList<String> = java.util.ArrayList<String>()
    fun getAminoAcid(dna: String, aminoAcid: String?, isoleucine: java.util.ArrayList<String?>?,
                     leucine: java.util.ArrayList<String?>?,
                     valine: java.util.ArrayList<String?>?, phenylalanine: java.util.ArrayList<String?>?, methionine: java.util.ArrayList<String?>?,
                     cysteine: java.util.ArrayList<String?>?, alanine: java.util.ArrayList<String?>?, glycine: java.util.ArrayList<String?>?,
                     proline: java.util.ArrayList<String?>?,
                     threonine: java.util.ArrayList<String?>?, serine: java.util.ArrayList<String?>?, tyrosine: java.util.ArrayList<String?>?,
                     tryptophan: java.util.ArrayList<String?>?, glutamine: java.util.ArrayList<String?>?, asparagine: java.util.ArrayList<String?>?,
                     histidine: java.util.ArrayList<String?>?, glutamicAcid: java.util.ArrayList<String?>?,
                     asparticAcid: java.util.ArrayList<String?>?,
                     lysine: java.util.ArrayList<String?>?, arginine: java.util.ArrayList<String?>?, stop: java.util.ArrayList<String?>): java.util.ArrayList<String> {

        // Maps the amino acid that the user entered to the start codon list.
        when (aminoAcid) {
            "isoleucine", "i", "ile" -> aminoAcidList.addAll(isoleucine)
            "leucine", "l", "leu" -> aminoAcidList.addAll(leucine)
            "valine", "v", "val" -> aminoAcidList.addAll(valine)
            "phenylalanine", "f", "phe" -> aminoAcidList.addAll(phenylalanine)
            "methionine", "m", "met" -> aminoAcidList.addAll(methionine)
            "cysteine", "c", "cys" -> aminoAcidList.addAll(cysteine)
            "alanine", "a", "ala" -> aminoAcidList.addAll(alanine)
            "glycine", "g", "gly" -> aminoAcidList.addAll(glycine)
            "proline", "p", "pro" -> aminoAcidList.addAll(proline)
            "threonine", "t", "thr" -> aminoAcidList.addAll(threonine)
            "serine", "s", "ser" -> aminoAcidList.addAll(serine)
            "tyrosine", "y", "tyr" -> aminoAcidList.addAll(tyrosine)
            "tryptophan", "w", "trp" -> aminoAcidList.addAll(tryptophan)
            "glutamine", "q", "gln" -> aminoAcidList.addAll(glutamine)
            "asparagine", "n", "asn" -> aminoAcidList.addAll(asparagine)
            "histidine", "h", "his" -> aminoAcidList.addAll(histidine)
            "glutamic acid", "e", "glu" -> aminoAcidList.addAll(glutamicAcid)
            "aspartic acid", "d", "asp" -> aminoAcidList.addAll(asparticAcid)
            "lysine", "k", "lys" -> aminoAcidList.addAll(lysine)
            "arginine", "r", "arg" -> aminoAcidList.addAll(arginine)
            else -> println("Invalid amino acid")
        }
        for (start_codon in aminoAcidList) {
            val start_index: Int = dna.indexOf(start_codon.lowercase(Locale.getDefault()))
            for (stop_codon in stop) {
                val stop_index: Int = dna.indexOf(stop_codon.lowercase(Locale.getDefault()), start_index + 3)
                if (start_index != -1 && stop_index != -1) {
                    geneList.add(dna.substring(start_index, stop_index + 3).uppercase(Locale.getDefault()))
                    break
                }
            }
        }
        if (geneList.size == 0) {
            for (i in 0..99) {
                println()
            }
            geneList.add("No gene found")
        }
        return geneList
    }
}