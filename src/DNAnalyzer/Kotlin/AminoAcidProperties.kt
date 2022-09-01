package DNAnalyzer

class AminoAcidProperties(dna: String, startRefFrame: Int, min: Int, max: Int) {
    private val codonCounts: HashMap<String, Int>
    private val readingFrame: Int
    private val min: Int
    private val max: Int
    private val dna: String

    init {
        codonCounts = HashMap<String, Int>()
        readingFrame = startRefFrame
        this.min = min
        this.max = max
        this.dna = dna
    }

    private fun buildCodonMap(readingFrame2: Int, dna: String) {
        codonCounts.clear()
        var i = readingFrame2
        while (i < dna.length) {
            try {
                if (codonCounts.containsKey(dna.substring(i, i + 3))) {
                    codonCounts.put(dna.substring(i, i + 3), codonCounts.get(dna.substring(i, i + 3)) + 1)
                } else {
                    codonCounts.put(dna.substring(i, i + 3), 1)
                }
            } catch (e: java.lang.Exception) {
                // do nothing
            }
            i += 3
        }
    }

    fun printCodonCounts() {
        buildCodonMap(readingFrame, dna)
        println("Codons in reading frame $readingFrame ($min-$max occurrences):")
        println("----------------------------------------------------")
        for (codon in codonCounts.keys) {
            if (codonCounts.get(codon) >= min && codonCounts.get(codon) <= max) {
                println(codon.uppercase(Locale.getDefault()) + ": " + codonCounts.get(codon))
            }
        }
    }
}