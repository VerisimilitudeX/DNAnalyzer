// Generated JS from Java: DNAnalyzer.Main -----
function DNAnalyzer_Main() {
    jv_Object.call(this);
}

var DNAnalyzer_Main_c = sc_newClass("DNAnalyzer.Main", DNAnalyzer_Main, jv_Object, null);

DNAnalyzer_Main_c.main = function (args) {
    var ds = new DNAnalyzer_GenomeSequencer();
    var scd = new CodonData();
    ds.getSequenceAndAminoAcid(scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).ISOLEUCINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).LEUCINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).VALINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).PHENYLALANINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).METHIONINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).CYSTEINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).ALANINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).GLYCINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).PROLINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).THREONINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).SERINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).TYROSINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).TRYPTOPHAN),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).GLUTAMINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).ASPARAGINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).HISTIDINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).GLUTAMIC_ACID),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).ASPARTIC_ACID),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).LYSINE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).ARGININE),
        scd.getAminoAcid(sc_clInit(DNAnalyzer_AminoAcidNames_c).STOP));
};


// Generated JS from Java: DNAnalyzer.GenomeSequencer -----
function DNAnalyzer_GenomeSequencer() {
    jv_Object.call(this);
}

var DNAnalyzer_GenomeSequencer_c = sc_newClass("DNAnalyzer.GenomeSequencer", DNAnalyzer_GenomeSequencer, jv_Object, null);

DNAnalyzer_GenomeSequencer_c.getSequenceAndAminoAcid = function (Isoleucine, Leucine, Valine, Phenylalanine, Methionine, Cysteine, Alanine, Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine, Asparagine, Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop) {
    if (arguments.length == 0) return;
    var dna = java_nio_file_Files_c.readString(java_nio_file_Path_c.of("assets/dna/real/Axl2p.fa")).replace("\n", "").toLowerCase();
    if (dna._length() === 0) {
        jv_System_c.out.println("Error: Invalid characters are present in DNA sequence.");
        return;
    }
    for (var i = 0; i < dna._length(); i++) {
        switch (dna.charAt(i)) {
            case 'a':
            case 't':
            case 'g':
            case 'c':
                continue;
            default:
                jv_System_c.out.println("Error: Invalid characters are present in DNA sequence.");
                break;
        }
    }
    var userInput = new jv_Scanner(jv_System_c._in);
    jv_System_c.out.println("Enter the amino acid: ");
    var aminoAcid = userInput.nextLine().toLowerCase();
    userInput.close();
    dna = dna.replace("u", "t");
    var gfp = new GeneFromProtein();
    var geneList = gfp.getAminoAcid(dna, aminoAcid, Isoleucine, Leucine, Valine, Phenylalanine, Methionine, Cysteine, Alanine,
        Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine, Asparagine,
        Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop);
    var p = new Properties();
    p.printGeneList(geneList, aminoAcid);
    var gcContent = p.getGCContent(dna);
    jv_System_c.out.println("\nGC-content (genome): " + gcContent + "\n");
    p.printNucleotideCount(dna);
    var gi = new DNAnalyzer_GeneInfo();
    gi.highGCContent(geneList);
    gi.longestGene(geneList);
    jv_System_c.out.println();
    var READING_FRAME = 1;
    var MIN_COUNT = 5;
    var MAX_COUNT = 10;
    var aap = new DNAnalyzer_AminoAcidProperties(dna, READING_FRAME, MIN_COUNT, MAX_COUNT);
    aap.printCodonCounts();
    var randomtf = p.isRandomDNA(dna);
    if (randomtf) {
        jv_System_c.out.println("\nWARNING: DNA sequence has been detected to be random.\n");
    }
};


// Generated JS from Java: DNAnalyzer.AminoAcidNames -----
function DNAnalyzer_AminoAcidNames(_name, _ordinal) {

    DNAnalyzer_AminoAcidNames_c._clInit();

    jv_Enum.call(this, _name, _ordinal);
}

var DNAnalyzer_AminoAcidNames_c = sc_newClass("DNAnalyzer.AminoAcidNames", DNAnalyzer_AminoAcidNames, jv_Enum, null);


DNAnalyzer_AminoAcidNames_c._clInit = function () {
    if (DNAnalyzer_AminoAcidNames_c.hasOwnProperty("_clInited")) return;
    DNAnalyzer_AminoAcidNames_c._clInited = true;

    DNAnalyzer_AminoAcidNames_c.ISOLEUCINE = new DNAnalyzer_AminoAcidNames("ISOLEUCINE", 0);
    ;
    DNAnalyzer_AminoAcidNames_c.LEUCINE = new DNAnalyzer_AminoAcidNames("LEUCINE", 1);
    ;
    DNAnalyzer_AminoAcidNames_c.VALINE = new DNAnalyzer_AminoAcidNames("VALINE", 2);
    ;
    DNAnalyzer_AminoAcidNames_c.PHENYLALANINE = new DNAnalyzer_AminoAcidNames("PHENYLALANINE", 3);
    ;
    DNAnalyzer_AminoAcidNames_c.METHIONINE = new DNAnalyzer_AminoAcidNames("METHIONINE", 4);
    ;
    DNAnalyzer_AminoAcidNames_c.CYSTEINE = new DNAnalyzer_AminoAcidNames("CYSTEINE", 5);
    ;
    DNAnalyzer_AminoAcidNames_c.ALANINE = new DNAnalyzer_AminoAcidNames("ALANINE", 6);
    ;
    DNAnalyzer_AminoAcidNames_c.GLYCINE = new DNAnalyzer_AminoAcidNames("GLYCINE", 7);
    ;
    DNAnalyzer_AminoAcidNames_c.PROLINE = new DNAnalyzer_AminoAcidNames("PROLINE", 8);
    ;
    DNAnalyzer_AminoAcidNames_c.THREONINE = new DNAnalyzer_AminoAcidNames("THREONINE", 9);
    ;
    DNAnalyzer_AminoAcidNames_c.SERINE = new DNAnalyzer_AminoAcidNames("SERINE", 10);
    ;
    DNAnalyzer_AminoAcidNames_c.TYROSINE = new DNAnalyzer_AminoAcidNames("TYROSINE", 11);
    ;
    DNAnalyzer_AminoAcidNames_c.TRYPTOPHAN = new DNAnalyzer_AminoAcidNames("TRYPTOPHAN", 12);
    ;
    DNAnalyzer_AminoAcidNames_c.GLUTAMINE = new DNAnalyzer_AminoAcidNames("GLUTAMINE", 13);
    ;
    DNAnalyzer_AminoAcidNames_c.ASPARAGINE = new DNAnalyzer_AminoAcidNames("ASPARAGINE", 14);
    ;
    DNAnalyzer_AminoAcidNames_c.HISTIDINE = new DNAnalyzer_AminoAcidNames("HISTIDINE", 15);
    ;
    DNAnalyzer_AminoAcidNames_c.GLUTAMIC_ACID = new DNAnalyzer_AminoAcidNames("GLUTAMIC_ACID", 16);
    ;
    DNAnalyzer_AminoAcidNames_c.ASPARTIC_ACID = new DNAnalyzer_AminoAcidNames("ASPARTIC_ACID", 17);
    ;
    DNAnalyzer_AminoAcidNames_c.LYSINE = new DNAnalyzer_AminoAcidNames("LYSINE", 18);
    ;
    DNAnalyzer_AminoAcidNames_c.ARGININE = new DNAnalyzer_AminoAcidNames("ARGININE", 19);
    ;
    DNAnalyzer_AminoAcidNames_c.STOP = new DNAnalyzer_AminoAcidNames("STOP", 20);
    ;
    DNAnalyzer_AminoAcidNames_c._values = sc_initArray(jv_Object_c, 1,
        [DNAnalyzer_AminoAcidNames_c.ISOLEUCINE,
        DNAnalyzer_AminoAcidNames_c.LEUCINE, DNAnalyzer_AminoAcidNames_c.VALINE,
        DNAnalyzer_AminoAcidNames_c.PHENYLALANINE,
        DNAnalyzer_AminoAcidNames_c.METHIONINE,
        DNAnalyzer_AminoAcidNames_c.CYSTEINE, DNAnalyzer_AminoAcidNames_c.ALANINE,
        DNAnalyzer_AminoAcidNames_c.GLYCINE, DNAnalyzer_AminoAcidNames_c.PROLINE,
        DNAnalyzer_AminoAcidNames_c.THREONINE, DNAnalyzer_AminoAcidNames_c.SERINE,
        DNAnalyzer_AminoAcidNames_c.TYROSINE,
        DNAnalyzer_AminoAcidNames_c.TRYPTOPHAN,
        DNAnalyzer_AminoAcidNames_c.GLUTAMINE,
        DNAnalyzer_AminoAcidNames_c.ASPARAGINE,
        DNAnalyzer_AminoAcidNames_c.HISTIDINE,
        DNAnalyzer_AminoAcidNames_c.GLUTAMIC_ACID,
        DNAnalyzer_AminoAcidNames_c.ASPARTIC_ACID,
        DNAnalyzer_AminoAcidNames_c.LYSINE, DNAnalyzer_AminoAcidNames_c.ARGININE,
        DNAnalyzer_AminoAcidNames_c.STOP]);
    ;
};


// Generated JS from Java: DNAnalyzer.GeneInfo -----
function DNAnalyzer_GeneInfo() {
    jv_Object.call(this);
}

var DNAnalyzer_GeneInfo_c = sc_newClass("DNAnalyzer.GeneInfo", DNAnalyzer_GeneInfo, jv_Object, null);

DNAnalyzer_GeneInfo_c.highGCContent = function (geneList) {
    var count = 1;
    jv_System_c.out.println("\nHigh coverage regions: ");
    jv_System_c.out.println("----------------------------------------------------");
    var p = new Properties();
    for (var _i = geneList.iterator(); _i.hasNext();) {
        var gene = _i.next();
        var MIN_GC_CONTENT = 0.40;
        var MAX_GC_CONTENT = 0.60;
        if (geneList.contains("No gene found")) {
            jv_System_c.out.println("No gene found");
            break;
        }
        else
            if ((p.getGCContent(gene) > MIN_GC_CONTENT) && (p.getGCContent(gene) < MAX_GC_CONTENT)) {
                jv_System_c.out.println(count + ". " + gene);
                count++;
            }
    }
};
DNAnalyzer_GeneInfo_c.longestGene = function (geneList) {
    var longestGene = "";
    for (var _i = geneList.iterator(); _i.hasNext();) {
        var gene = _i.next();
        if (gene._length() > longestGene._length()) {
            longestGene = gene;
        }
    }
    jv_System_c.out.println("\nLongest gene (" + longestGene._length() + " nucleotides): " + longestGene);
};


// Generated JS from Java: DNAnalyzer.AminoAcidProperties -----
function DNAnalyzer_AminoAcidProperties(dna, startRefFrame, min, max) {
    this.codonCounts = null;
    this.readingFrame = 0;
    this.min = 0;
    this.max = 0;
    this.dna = null;

    jv_Object.call(this);
    this._DNAnalyzer_AminoAcidPropertiesInit();
    this.codonCounts = new jv_HashMap();
    this.readingFrame = startRefFrame;
    this.min = min;
    this.max = max;
    this.dna = dna;
}

var DNAnalyzer_AminoAcidProperties_c = sc_newClass("DNAnalyzer.AminoAcidProperties", DNAnalyzer_AminoAcidProperties, jv_Object, null);

DNAnalyzer_AminoAcidProperties_c.buildCodonMap = function (readingFrame2, dna) {
    this.codonCounts.clear();
    for (var i = Math.floor(readingFrame2); i < dna._length(); i += 3) {
        try {
            if (this.codonCounts.containsKey(dna.substring(i, i + 3))) {
                this.codonCounts.put(dna.substring(i, i + 3),
                    this.codonCounts.get(dna.substring(i, i + 3)) + 1);
            }
            else {
                this.codonCounts.put(dna.substring(i, i + 3), 1);
            }
        }
        catch (e) {
            if ((e instanceof jv_Exception)) { }
            else
                throw e;
        }
    }
};
DNAnalyzer_AminoAcidProperties_c.printCodonCounts = function () {
    this.buildCodonMap(this.readingFrame, this.dna);
    jv_System_c.out.println("Codons in reading frame " + this.readingFrame + " (" + this.min + "-" + this.max + " occurrences)" + ":");
    jv_System_c.out.println("----------------------------------------------------");
    for (var _i = this.codonCounts.keySet().iterator(); _i.hasNext();) {
        var codon = _i.next();
        if (this.codonCounts.get(codon) >= this.min && this.codonCounts.get(codon) <= this.max) {
            jv_System_c.out.println(codon.toUpperCase() + ": " + this.codonCounts.get(codon));
        }
    }
};

DNAnalyzer_AminoAcidProperties_c._DNAnalyzer_AminoAcidPropertiesInit = function () {
};

// Generated JS from Java: DNAnalyzer.GenomeSequencer -----
function DNAnalyzer_GenomeSequencer() {
    jv_Object.call(this);
}

var DNAnalyzer_GenomeSequencer_c = sc_newClass("DNAnalyzer.GenomeSequencer", DNAnalyzer_GenomeSequencer, jv_Object, null);

DNAnalyzer_GenomeSequencer_c.getSequenceAndAminoAcid = function (Isoleucine, Leucine, Valine, Phenylalanine, Methionine, Cysteine, Alanine, Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine, Asparagine, Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop) {
    if (arguments.length == 0) return;
    var dna = java_nio_file_Files_c.readString(java_nio_file_Path_c.of("assets/dna/real/Axl2p.fa")).replace("\n", "").toLowerCase();
    if (dna._length() === 0) {
        jv_System_c.out.println("Error: Invalid characters are present in DNA sequence.");
        return;
    }
    for (var i = 0; i < dna._length(); i++) {
        switch (dna.charAt(i)) {
            case 'a':
            case 't':
            case 'g':
            case 'c':
                continue;
            default:
                jv_System_c.out.println("Error: Invalid characters are present in DNA sequence.");
                break;
        }
    }
    var userInput = new jv_Scanner(jv_System_c._in);
    jv_System_c.out.println("Enter the amino acid: ");
    var aminoAcid = userInput.nextLine().toLowerCase();
    userInput.close();
    dna = dna.replace("u", "t");
    var gfp = new GeneFromProtein();
    var geneList = gfp.getAminoAcid(dna, aminoAcid, Isoleucine, Leucine, Valine, Phenylalanine, Methionine, Cysteine, Alanine,
        Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine, Asparagine,
        Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop);
    var p = new Properties();
    p.printGeneList(geneList, aminoAcid);
    var gcContent = p.getGCContent(dna);
    jv_System_c.out.println("\nGC-content (genome): " + gcContent + "\n");
    p.printNucleotideCount(dna);
    var gi = new DNAnalyzer_GeneInfo();
    gi.highGCContent(geneList);
    gi.longestGene(geneList);
    jv_System_c.out.println();
    var READING_FRAME = 1;
    var MIN_COUNT = 5;
    var MAX_COUNT = 10;
    var aap = new DNAnalyzer_AminoAcidProperties(dna, READING_FRAME, MIN_COUNT, MAX_COUNT);
    aap.printCodonCounts();
    var randomtf = p.isRandomDNA(dna);
    if (randomtf) {
        jv_System_c.out.println("\nWARNING: DNA sequence has been detected to be random.\n");
    }
};


// Generated JS from Java: DNAnalyzer.GeneInfo -----
function DNAnalyzer_GeneInfo() {
    jv_Object.call(this);
}

var DNAnalyzer_GeneInfo_c = sc_newClass("DNAnalyzer.GeneInfo", DNAnalyzer_GeneInfo, jv_Object, null);

DNAnalyzer_GeneInfo_c.highGCContent = function (geneList) {
    var count = 1;
    jv_System_c.out.println("\nHigh coverage regions: ");
    jv_System_c.out.println("----------------------------------------------------");
    var p = new Properties();
    for (var _i = geneList.iterator(); _i.hasNext();) {
        var gene = _i.next();
        var MIN_GC_CONTENT = 0.40;
        var MAX_GC_CONTENT = 0.60;
        if (geneList.contains("No gene found")) {
            jv_System_c.out.println("No gene found");
            break;
        }
        else
            if ((p.getGCContent(gene) > MIN_GC_CONTENT) && (p.getGCContent(gene) < MAX_GC_CONTENT)) {
                jv_System_c.out.println(count + ". " + gene);
                count++;
            }
    }
};
DNAnalyzer_GeneInfo_c.longestGene = function (geneList) {
    var longestGene = "";
    for (var _i = geneList.iterator(); _i.hasNext();) {
        var gene = _i.next();
        if (gene._length() > longestGene._length()) {
            longestGene = gene;
        }
    }
    jv_System_c.out.println("\nLongest gene (" + longestGene._length() + " nucleotides): " + longestGene);
};


// Generated JS from Java: DNAnalyzer.AminoAcidProperties -----
function DNAnalyzer_AminoAcidProperties(dna, startRefFrame, min, max) {
    this.codonCounts = null;
    this.readingFrame = 0;
    this.min = 0;
    this.max = 0;
    this.dna = null;

    jv_Object.call(this);
    this._DNAnalyzer_AminoAcidPropertiesInit();
    this.codonCounts = new jv_HashMap();
    this.readingFrame = startRefFrame;
    this.min = min;
    this.max = max;
    this.dna = dna;
}

var DNAnalyzer_AminoAcidProperties_c = sc_newClass("DNAnalyzer.AminoAcidProperties", DNAnalyzer_AminoAcidProperties, jv_Object, null);

DNAnalyzer_AminoAcidProperties_c.buildCodonMap = function (readingFrame2, dna) {
    this.codonCounts.clear();
    for (var i = Math.floor(readingFrame2); i < dna._length(); i += 3) {
        try {
            if (this.codonCounts.containsKey(dna.substring(i, i + 3))) {
                this.codonCounts.put(dna.substring(i, i + 3),
                    this.codonCounts.get(dna.substring(i, i + 3)) + 1);
            }
            else {
                this.codonCounts.put(dna.substring(i, i + 3), 1);
            }
        }
        catch (e) {
            if ((e instanceof jv_Exception)) { }
            else
                throw e;
        }
    }
};
DNAnalyzer_AminoAcidProperties_c.printCodonCounts = function () {
    this.buildCodonMap(this.readingFrame, this.dna);
    jv_System_c.out.println("Codons in reading frame " + this.readingFrame + " (" + this.min + "-" + this.max + " occurrences)" + ":");
    jv_System_c.out.println("----------------------------------------------------");
    for (var _i = this.codonCounts.keySet().iterator(); _i.hasNext();) {
        var codon = _i.next();
        if (this.codonCounts.get(codon) >= this.min && this.codonCounts.get(codon) <= this.max) {
            jv_System_c.out.println(codon.toUpperCase() + ": " + this.codonCounts.get(codon));
        }
    }
};

DNAnalyzer_AminoAcidProperties_c._DNAnalyzer_AminoAcidPropertiesInit = function () {
};

// Generated JS from Java: DNAnalyzer.GeneInfo -----
function DNAnalyzer_GeneInfo() {
    jv_Object.call(this);
}

var DNAnalyzer_GeneInfo_c = sc_newClass("DNAnalyzer.GeneInfo", DNAnalyzer_GeneInfo, jv_Object, null);

DNAnalyzer_GeneInfo_c.highGCContent = function (geneList) {
    var count = 1;
    jv_System_c.out.println("\nHigh coverage regions: ");
    jv_System_c.out.println("----------------------------------------------------");
    var p = new Properties();
    for (var _i = geneList.iterator(); _i.hasNext();) {
        var gene = _i.next();
        var MIN_GC_CONTENT = 0.40;
        var MAX_GC_CONTENT = 0.60;
        if (geneList.contains("No gene found")) {
            jv_System_c.out.println("No gene found");
            break;
        }
        else
            if ((p.getGCContent(gene) > MIN_GC_CONTENT) && (p.getGCContent(gene) < MAX_GC_CONTENT)) {
                jv_System_c.out.println(count + ". " + gene);
                count++;
            }
    }
};
DNAnalyzer_GeneInfo_c.longestGene = function (geneList) {
    var longestGene = "";
    for (var _i = geneList.iterator(); _i.hasNext();) {
        var gene = _i.next();
        if (gene._length() > longestGene._length()) {
            longestGene = gene;
        }
    }
    jv_System_c.out.println("\nLongest gene (" + longestGene._length() + " nucleotides): " + longestGene);
};


// Generated JS from Java: DNAnalyzer.AminoAcidProperties -----
function DNAnalyzer_AminoAcidProperties(dna, startRefFrame, min, max) {
    this.codonCounts = null;
    this.readingFrame = 0;
    this.min = 0;
    this.max = 0;
    this.dna = null;

    jv_Object.call(this);
    this._DNAnalyzer_AminoAcidPropertiesInit();
    this.codonCounts = new jv_HashMap();
    this.readingFrame = startRefFrame;
    this.min = min;
    this.max = max;
    this.dna = dna;
}

var DNAnalyzer_AminoAcidProperties_c = sc_newClass("DNAnalyzer.AminoAcidProperties", DNAnalyzer_AminoAcidProperties, jv_Object, null);

DNAnalyzer_AminoAcidProperties_c.buildCodonMap = function (readingFrame2, dna) {
    this.codonCounts.clear();
    for (var i = Math.floor(readingFrame2); i < dna._length(); i += 3) {
        try {
            if (this.codonCounts.containsKey(dna.substring(i, i + 3))) {
                this.codonCounts.put(dna.substring(i, i + 3),
                    this.codonCounts.get(dna.substring(i, i + 3)) + 1);
            }
            else {
                this.codonCounts.put(dna.substring(i, i + 3), 1);
            }
        }
        catch (e) {
            if ((e instanceof jv_Exception)) { }
            else
                throw e;
        }
    }
};
DNAnalyzer_AminoAcidProperties_c.printCodonCounts = function () {
    this.buildCodonMap(this.readingFrame, this.dna);
    jv_System_c.out.println("Codons in reading frame " + this.readingFrame + " (" + this.min + "-" + this.max + " occurrences)" + ":");
    jv_System_c.out.println("----------------------------------------------------");
    for (var _i = this.codonCounts.keySet().iterator(); _i.hasNext();) {
        var codon = _i.next();
        if (this.codonCounts.get(codon) >= this.min && this.codonCounts.get(codon) <= this.max) {
            jv_System_c.out.println(codon.toUpperCase() + ": " + this.codonCounts.get(codon));
        }
    }
};

DNAnalyzer_AminoAcidProperties_c._DNAnalyzer_AminoAcidPropertiesInit = function () {
};

// Generated JS from Java: DNAnalyzer.AminoAcidNames -----
function DNAnalyzer_AminoAcidNames(_name, _ordinal) {

    DNAnalyzer_AminoAcidNames_c._clInit();

    jv_Enum.call(this, _name, _ordinal);
}

var DNAnalyzer_AminoAcidNames_c = sc_newClass("DNAnalyzer.AminoAcidNames", DNAnalyzer_AminoAcidNames, jv_Enum, null);


DNAnalyzer_AminoAcidNames_c._clInit = function () {
    if (DNAnalyzer_AminoAcidNames_c.hasOwnProperty("_clInited")) return;
    DNAnalyzer_AminoAcidNames_c._clInited = true;

    DNAnalyzer_AminoAcidNames_c.ISOLEUCINE = new DNAnalyzer_AminoAcidNames("ISOLEUCINE", 0);
    ;
    DNAnalyzer_AminoAcidNames_c.LEUCINE = new DNAnalyzer_AminoAcidNames("LEUCINE", 1);
    ;
    DNAnalyzer_AminoAcidNames_c.VALINE = new DNAnalyzer_AminoAcidNames("VALINE", 2);
    ;
    DNAnalyzer_AminoAcidNames_c.PHENYLALANINE = new DNAnalyzer_AminoAcidNames("PHENYLALANINE", 3);
    ;
    DNAnalyzer_AminoAcidNames_c.METHIONINE = new DNAnalyzer_AminoAcidNames("METHIONINE", 4);
    ;
    DNAnalyzer_AminoAcidNames_c.CYSTEINE = new DNAnalyzer_AminoAcidNames("CYSTEINE", 5);
    ;
    DNAnalyzer_AminoAcidNames_c.ALANINE = new DNAnalyzer_AminoAcidNames("ALANINE", 6);
    ;
    DNAnalyzer_AminoAcidNames_c.GLYCINE = new DNAnalyzer_AminoAcidNames("GLYCINE", 7);
    ;
    DNAnalyzer_AminoAcidNames_c.PROLINE = new DNAnalyzer_AminoAcidNames("PROLINE", 8);
    ;
    DNAnalyzer_AminoAcidNames_c.THREONINE = new DNAnalyzer_AminoAcidNames("THREONINE", 9);
    ;
    DNAnalyzer_AminoAcidNames_c.SERINE = new DNAnalyzer_AminoAcidNames("SERINE", 10);
    ;
    DNAnalyzer_AminoAcidNames_c.TYROSINE = new DNAnalyzer_AminoAcidNames("TYROSINE", 11);
    ;
    DNAnalyzer_AminoAcidNames_c.TRYPTOPHAN = new DNAnalyzer_AminoAcidNames("TRYPTOPHAN", 12);
    ;
    DNAnalyzer_AminoAcidNames_c.GLUTAMINE = new DNAnalyzer_AminoAcidNames("GLUTAMINE", 13);
    ;
    DNAnalyzer_AminoAcidNames_c.ASPARAGINE = new DNAnalyzer_AminoAcidNames("ASPARAGINE", 14);
    ;
    DNAnalyzer_AminoAcidNames_c.HISTIDINE = new DNAnalyzer_AminoAcidNames("HISTIDINE", 15);
    ;
    DNAnalyzer_AminoAcidNames_c.GLUTAMIC_ACID = new DNAnalyzer_AminoAcidNames("GLUTAMIC_ACID", 16);
    ;
    DNAnalyzer_AminoAcidNames_c.ASPARTIC_ACID = new DNAnalyzer_AminoAcidNames("ASPARTIC_ACID", 17);
    ;
    DNAnalyzer_AminoAcidNames_c.LYSINE = new DNAnalyzer_AminoAcidNames("LYSINE", 18);
    ;
    DNAnalyzer_AminoAcidNames_c.ARGININE = new DNAnalyzer_AminoAcidNames("ARGININE", 19);
    ;
    DNAnalyzer_AminoAcidNames_c.STOP = new DNAnalyzer_AminoAcidNames("STOP", 20);
    ;
    DNAnalyzer_AminoAcidNames_c._values = sc_initArray(jv_Object_c, 1,
        [DNAnalyzer_AminoAcidNames_c.ISOLEUCINE,
        DNAnalyzer_AminoAcidNames_c.LEUCINE, DNAnalyzer_AminoAcidNames_c.VALINE,
        DNAnalyzer_AminoAcidNames_c.PHENYLALANINE,
        DNAnalyzer_AminoAcidNames_c.METHIONINE,
        DNAnalyzer_AminoAcidNames_c.CYSTEINE, DNAnalyzer_AminoAcidNames_c.ALANINE,
        DNAnalyzer_AminoAcidNames_c.GLYCINE, DNAnalyzer_AminoAcidNames_c.PROLINE,
        DNAnalyzer_AminoAcidNames_c.THREONINE, DNAnalyzer_AminoAcidNames_c.SERINE,
        DNAnalyzer_AminoAcidNames_c.TYROSINE,
        DNAnalyzer_AminoAcidNames_c.TRYPTOPHAN,
        DNAnalyzer_AminoAcidNames_c.GLUTAMINE,
        DNAnalyzer_AminoAcidNames_c.ASPARAGINE,
        DNAnalyzer_AminoAcidNames_c.HISTIDINE,
        DNAnalyzer_AminoAcidNames_c.GLUTAMIC_ACID,
        DNAnalyzer_AminoAcidNames_c.ASPARTIC_ACID,
        DNAnalyzer_AminoAcidNames_c.LYSINE, DNAnalyzer_AminoAcidNames_c.ARGININE,
        DNAnalyzer_AminoAcidNames_c.STOP]);
    ;
};

