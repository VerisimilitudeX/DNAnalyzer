FileList = ["files\AminoAcidProperties.java", "files\GeneFromProtein.java", "files\GeneInfo.java", "files\GenomeSequencer.java", "files\Main.java", "files\Main.java", "files\StructCodonData.java"]

txt = ""
with open("DNAnalyzerCopyrightSubmission.txt", "w+") as file:
    file.write(txt)
    file.close()
    file = open("DNAnalyzerCopyrightSubmission.txt", "a")

    readme = open("README.md", "r")
    filecontents = "# DNAnalyzer\n \n" + readme.read() + "\n----------------------------------------------------"
    readme.close()
    file.write(filecontents)

    for javafile in FileList:
        fin = open(javafile, "r")
        filecontents = fin.read()
        fin.close()
        file.write("\n" + javafile[6:] + "\n----------------------------------------------------\n\n" + filecontents + "\n----------------------------------------------------")
    file.close()