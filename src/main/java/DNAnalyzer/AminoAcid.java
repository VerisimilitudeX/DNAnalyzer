/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */
package DNAnalyzer;

import java.util.List;

/**
 * AminoAcid enum that represent the amino acid values.
 * Each value can be searched by several abbreviations.
 */
public enum AminoAcid {

    ALANINE("Alanine","a", "alanine", "ala"),
    CYSTEINE("Cysteine", "c", "cysteine", "cys"),
    ASPARTIC_ACID("Aspartic acid", "d", "aspartic acid", "asp"),
    GLUTAMIC_ACID("Glutamic acid", "e", "glutamic acid", "glu"),
    PHENYLALANINE("Phenylalanine", "f", "phenylalanine", "phe"),
    GLYCINE("Glycine", "g", "glycine", "gly"),
    HISTIDINE("Histidine","h", "histidine", "his"),
    ISOLEUCINE("Isoleucine", "i", "isoleucine", "ile"),
    LYSINE("Lysine", "k", "lysine", "lys"),
    LEUCINE("Leucine","l", "leucine", "leu"),
    METHIONINE("Methionine", "m", "methionine", "met"),
    ASPARAGINE("Asparagine", "n", "asparagine", "asn"),
    PROLINE("Proline", "p", "proline", "pro"),
    GLUTAMINE("Glutamine","q", "glutamine", "gln"),
    ARGININE("Arginine","r", "arginine", "arg"),
    SERINE("Serine","s", "serine", "ser"),
    THREONINE("Theornine","t", "threonine", "thr"),
    VALINE("Valine","v", "valine", "val"),
    THRYPTOPHAN("Thryptophan","w", "tryptophan", "trp");

    private final String fullName;
    private final List<String> names;

    /**
     * Constructs an instance of an AminoAcid enum, setting its name and list of abbreviations.
     * @param fullName full name of the amino acid.
     * @param abbreviations a list of abbreviations that an acid can be searched by.
     */
    AminoAcid(final String fullName, final String...abbreviations) {
        this.fullName = fullName;
        this.names = List.of(abbreviations);
    }

    public List<String> getNames() {
        return names;
    }

    public String getFullName() {
        return fullName;
    }
}
