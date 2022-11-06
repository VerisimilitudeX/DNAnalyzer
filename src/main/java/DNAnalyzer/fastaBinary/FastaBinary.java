/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.fastaBinary;

public class FastaBinary {
    private static final int FAB_VERSION = 1;


    private final int version;
    private final String metadata;
    private final char[] nucleotides;

    public FastaBinary(int version, String metadata, char[] nucleotides) {
        this.version = version;
        this.metadata = metadata;
        this.nucleotides = nucleotides;
    }

    /* private static byte[] encodeNucleotides(String[] nucleotides) {
        byte[] data = new byte[nucleotides.length / 2];

        int nucleotideIndex = 0;
        for (int i = 0; i < nucleotides.length; i += 2) {
            // Each nucleotide is represented by 4 bits
            // We shift the left nucleotide 4 bits to the left, and then
            // bitwise OR it with the right nucleotide
            // EX for nucleotides:                  00000101 and 00001101
            // 1st shifted to the left 4:           01010000
            // Bitwise OR with 2nd:                 01011101 = data

            if (i + 1 >= nucleotides.length) {
                // If there is only one nucleotide left, we shift it 4 bits to the left
                // and then bitwise OR it with 0000
                // EX for nucleotides:                  00000101
                // 1st shifted to the left 4:           01010000
                // Bitwise OR with 0000:                01010000 = data
                data[nucleotideIndex] = (byte) (Nucleotide.fromFastaVal(nucleotides[i]).getValue() << 4);
            } else {
                data[nucleotideIndex] = (byte) ((Nucleotide.fromFastaVal(nucleotides[i]).getValue() << 4) | Nucleotide.fromFastaVal(nucleotides[i + 1]).getValue());
            }

            byte first = (byte) Nucleotide.fromFastaVal(nucleotides[i]).getValue();
            byte second = (byte) Nucleotide.fromFastaVal(nucleotides[i + 1]).getValue();
            data[nucleotideIndex] = (byte) ((first << 4) | second);
            nucleotideIndex++;
        }

        return data;
    } */

    public static FastaBinary fromFasta(String header, String dna) {
        return new FastaBinary(FAB_VERSION, header, dna.toCharArray());
    }

    public String toFasta() {
        StringBuilder sb = new StringBuilder();
        if (this.metadata.length() > 0) {
            sb.append(">").append(this.metadata).append("\n");
        }
        for (char nucleotide : nucleotides) {
            sb.append(nucleotide);
        }
        return sb.toString();
    }

    /**
     * Creates a FastaBinary object from binary data encoded in FASTA Compressed.
     * @param fab The binary data.
     * @return The FastaBinary object.
     */
    public static FastaBinary fromFAB(byte[] fab) {
        // check for "fab" header
        if (fab[0] != 'f' || fab[1] != 'a' || fab[2] != 'b') {
            throw new IllegalArgumentException("Invalid FAB file");
        }

        int version = fab[3];

        if (version != FAB_VERSION) {
            throw new IllegalArgumentException("Invalid FAB version");
        }

        int metadataLength = fab[4] << 8 | (fab[5] & 0x00ff);
        String metadata = new String(fab, 6, metadataLength);

        // Header is 6 bytes + metadata length + 1 byte postfix
        int nucleotideCount = (fab.length - 7 - metadataLength) * 2;

        if (fab[fab.length - 1] != 0x00) {
            nucleotideCount--;
        }

        char[] nucleotides = new char[nucleotideCount];

        int fabIndex = 6 + metadataLength;
        int nucleotideIndex = 0;
        for (int i = 0; i < nucleotideCount; i += 2) {
            // Each nucleotide is represented by 4 bits
            // We read each byte individually, and then shift the bits
            // to the right to get the nucleotide value
            // EX for data:                  01011101
            // Shifted to the right 4:       00000101 = left nucleotide
            // Bitwise AND with 0b00001111:  00001101 = right nucleotide


            byte b = fab[fabIndex++];
            nucleotides[nucleotideIndex++] = Nucleotide.fromInteger(b >> 4).getFastaVal();
            if (i + 1 < nucleotideCount) {
                nucleotides[nucleotideIndex++] = Nucleotide.fromInteger(b & 0x0f).getFastaVal();
            }
        }

        return new FastaBinary(version, metadata, nucleotides);
    }

    /**
     * Creates binary data from a FastaBinary object.
     * @return The binary data.
     */
    public byte[] toFAB() {
        byte[] metadata = this.metadata.getBytes();
        int metadataLength = metadata.length;
        int nucleotideCount = this.nucleotides.length;

        // 6 bytes + metadata length + nucleotides + 1 byte postfix
        int fabLength = 7 + metadataLength + (nucleotideCount / 2);
        byte[] fabData = new byte[fabLength];

        // Write header
        fabData[0] = 'f';
        fabData[1] = 'a';
        fabData[2] = 'b';
        fabData[3] = (byte) this.version;

        // Two-byte metadata length
        fabData[4] = (byte) (metadataLength >>> 8);
        fabData[5] = (byte) metadataLength;

        // Copy metadata string to binary data
        System.arraycopy(metadata, 0, fabData, 6, metadataLength);

        boolean aligned = nucleotideCount % 2 == 0;

        // Write nucleotides
        int fabIndex = 6 + metadataLength;
        int nucleotideIndex = 0;
        for (int i = 0; i < nucleotideCount; i += 2) {
            // Each nucleotide is represented by 4 bits
            // We shift the left nucleotide 4 bits to the left, and then
            // bitwise OR it with the right nucleotide
            // EX for nucleotides:                  00000101 and 00001101
            // 1st shifted to the left 4:           01010000
            // Bitwise OR with 2nd:                 01011101 = data

            byte b = (byte) (Nucleotide.fromFastaVal(this.nucleotides[nucleotideIndex++]).getValue() << 4);
            if (i + 1 < nucleotideCount) {
                b |= Nucleotide.fromFastaVal(this.nucleotides[nucleotideIndex++]).getValue();
            }
            fabData[fabIndex++] = b;
        }

        fabData[fabLength - 1] = (byte) (aligned ? 0x00 : 0x01);


        return fabData;
    }
}
