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

package DNAnalyzer;

import DNAnalyzer.fastaBinary.FastaBinary;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class DnaData {
    private String header = "";
    private String fastaData;
    private FastaBinary binaryData;

    public static DnaData fromFile(File file) throws IOException {
        DnaData fd = new DnaData();
        if (file.getName().endsWith(".fab")) {
            fd.binaryData = FastaBinary.fromFAC(Files.readAllBytes(file.toPath()));
        } else {
            String data = Files.readString(file.toPath()).toLowerCase();

            // Header line begins with >
            // ; begins a line comment
            String[] lines = data.split("\n");
            StringBuilder sb = new StringBuilder();
            for (String line : lines) {
                if (line.startsWith(";")) {
                    continue;
                }
                if (line.startsWith(">")) {
                    fd.header = line.substring(1);
                    continue;
                }
                sb.append(line);
            }

            fd.fastaData = sb.toString().toLowerCase();

        }
        return fd;
    }

    public String toFastaData() {
        if (fastaData == null) {
            fastaData = binaryData.toFasta();
        }
        return fastaData;
    }

    public byte[] toBinaryData() {
        if (binaryData == null) {
            System.out.println("Reading...");
            binaryData = FastaBinary.fromFasta(header, fastaData);
            System.out.println("Compressing...");
        }
        return binaryData.toFAC();
    }
}
