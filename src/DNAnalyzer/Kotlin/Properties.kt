package DNAnalyzer

class Properties {
    @kotlin.Throws(InterruptedException::class, IOException::class)
    fun printGeneList(geneList: java.util.ArrayList<String?>, aminoAcid: String?) {
        // Changes the 1 letter or 3 letter abbreviation of the amino acids into the
        // full name
        var aminoAcidFull = ""
        when (aminoAcid) {
            "a", "alanine", "ala" -> aminoAcidFull = "Alanine"
            "c", "cysteine", "cys" -> aminoAcidFull = "Cysteine"
            "d", "aspartic acid", "asp" -> aminoAcidFull = "Aspartic acid"
            "e", "glutamic acid", "glu" -> aminoAcidFull = "Glutamic acid"
            "f", "phenylalanine", "phe" -> aminoAcidFull = "Phenylalanine"
            "g", "glycine", "gly" -> aminoAcidFull = "Glycine"
            "h", "histidine", "his" -> aminoAcidFull = "Histidine"
            "i", "isoleucine", "ile" -> aminoAcidFull = "Isoleucine"
            "k", "lysine", "lys" -> aminoAcidFull = "Lysine"
            "l", "leucine", "leu" -> aminoAcidFull = "Leucine"
            "m", "methionine", "met" -> aminoAcidFull = "Methionine"
            "n", "asparagine", "asn" -> aminoAcidFull = "Asparagine"
            "p", "proline", "pro" -> aminoAcidFull = "Proline"
            "q", "glutamine", "gln" -> aminoAcidFull = "Glutamine"
            "r", "arginine", "arg" -> aminoAcidFull = "Arginine"
            "s", "serine", "ser" -> aminoAcidFull = "Serine"
            "t", "threonine", "thr" -> aminoAcidFull = "Threonine"
            "v", "valine", "val" -> aminoAcidFull = "Valine"
            "w", "tryptophan", "trp" -> aminoAcidFull = "Tryptophan"
            else -> println("Invalid amino acid")
        }

        // "Clears" the console screen
        if (java.lang.System.getProperty("os.name").contains("Windows")) {
            ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor()
        } else {
            print("\u001b[H\u001b[2J")
            java.lang.System.out.flush()
        }
        for (i in 0..49) {
            println()
            try {
                java.lang.Thread.sleep(5)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }
        }
        println("Genes coded for $aminoAcidFull: ")
        println("----------------------------------------------------")
        var count = 1
        for (gene in geneList) {
            if (geneList.contains("No gene found")) {
                println("No gene found")
                break
            }
            println("$count. $gene")
            count++
        }
    }

    fun getGCContent(dna: String): Double {
        var dna = dna
        dna = dna.lowercase(Locale.getDefault())
        var gcLen = 0.0
        for (letter in dna.toCharArray()) {
            if (letter == 'c' || letter == 'g') {
                gcLen++
            }
        }
        return gcLen / dna.length
    }

    private fun printNucleotideChar(dna: String, count: Int, nucleotide: String) {
        println(nucleotide + ": " + count + " (" + count.toDouble() / dna.length * 100 + "%)")
    }

    fun printNucleotideCount(dna: String) {
        val nucleotideCount = IntArray(4)
        for (letter in dna.toCharArray()) {
            when (letter) {
                'a' -> nucleotideCount[0]++
                't' -> nucleotideCount[1]++
                'g' -> nucleotideCount[2]++
                'c' -> nucleotideCount[3]++
                else -> {}
            }
        }
        println("Nucleotide count:")
        printNucleotideChar(dna, nucleotideCount[0], "A")
        printNucleotideChar(dna, nucleotideCount[1], "T")
        printNucleotideChar(dna, nucleotideCount[2], "G")
        printNucleotideChar(dna, nucleotideCount[3], "C")
    }

    // Check if the DNA is random or not
    fun isRandomDNA(dna: String): Boolean {
        val nucleotideCount = IntArray(4)
        for (letter in dna.toCharArray()) {
            when (letter) {
                'a' -> nucleotideCount[0]++
                't' -> nucleotideCount[1]++
                'g' -> nucleotideCount[2]++
                'c' -> nucleotideCount[3]++
                else -> {}
            }
        }
        val a = nucleotideCount[0] / dna.length * 100
        val t = nucleotideCount[1] / dna.length * 100
        val g = nucleotideCount[2] / dna.length * 100
        val c = nucleotideCount[3] / dna.length * 100
        return if (a == t && t == g && g == c) {
            true
        } else {
            false
        }
    }
}