# Getting Started

A [video tutorial](https://youtu.be/dOwkInn6eDw) covering the instructions below is also available.

### <a name="system-requirements"></a>System Requirements

* JDK [17](https://www.oracle.com/java/technologies/downloads/#jdk17-windows)+
   * A `JAVA_HOME` environment variable pointing to your JDK, or the Java executable in your PATH
* [Gradle](https://gradle.org/install/) (included)

### <a name="build-run"></a>Build & Run

The easiest way to run the program on Windows is by using the executable file located in the [releases](https://github.com/VerisimilitudeX/DNAnalyzer/releases/latest) section to install the program, build gradle and run the GUI.

* We use [Gradle](https://gradle.org) for building. The Gradle wrapper takes care of downloading dependencies, testing, compiling, linking, and packaging the code.
<details>

<summary>Windows</summary>

The easiest way to run the program on Windows is by using the executable file located in the [releases](https://github.com/VerisimilitudeX/DNAnalyzer/releases/latest) section to install the program, build gradle and run the GUI.

```pwsh
.\gradlew build
```

### <a name="usage"></a>Usage

```pwsh
<executable> <arguments>
```

#### <a name="executable"></a>Executable

```pwsh
java -jar build/libs/DNAnalyzer.jar
```

#### <a name="arguments"></a>Arguments

DNAnalyzer uses CLI arguments instead of `stdin`. For example, you can do:

```pwsh
assets/dna/random/dnalong.fa --amino=arg --min=16450 --max=520218 -r
```

### <a name="example"></a>Example

```pwsh
java -jar build/libs/DNAnalyzer.jar assets/dna/random/dnalong.fa --amino=ser --min=16450 --max=520218 -r
```

#### <a name="gradle-run"></a>Gradle Run

If you prefer, you can also run it directly from Gradle:

```pwsh
.\gradlew run --args="assets/dna/random/dnalong.fa --amino=ser --min=10 --max=100"
```

#### <a name="gui"></a>GUI

DNAnalyzer also comes with a (very basic) GUI; to start DNAnalyzer with the GUI, run:

```pwsh
.\gradlew run --args="--gui assets/dna/random/dnalong.fa"
```

Then:

* Enter the file name of the DNA file in the text field
* Set min and max
* Click analyze

* Note: Ensure you have Java [17](https://www.oracle.com/java/technologies/downloads/#java17) or higher installed and a `JAVA_HOME` path variable set for the program to function correctly!


The results of your analysis will be shown in the right pane.

</details>

<details>
      <summary>Linux & macOS</summary>


### <a name="features"></a>DNAnalyzer & Java Download

To run DNAnaylzer on Linux, you'll need to download the DNAnalyzer source code and download and install Java 17.

First, download the zip or tar.gz file from [DNAnalyzer releases](https://github.com/VerisimilitudeX/DNAnalyzer/releases/latest) and unzip it using the native utility. 

Then, download [Java 17](https://www.oracle.com/ca-en/java/technologies/downloads/#java17), find the download at https://www.oracle.com/ca-en/java/technologies/downloads/#java17, ensure you choose the Linux option and get the one for your correct processor architecture.

### Java installation

```bash
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz
```
Next, unzip it.

```bash
tar -xvzf jdk-17_linux-x64_bin.tar.gz
```
Then map the `JAVA_HOME` path. Fill it in with your JAVA directory where JAVA is unzipped.
```bash
export JAVA_HOME="{YOUR JAVA DIRECTORY HERE}/jdk-17.0.7" && export PATH=$JAVA_HOME/bin:$PATH
```
<details>
<summary>Example of a full path command.</summary>

```bash
export JAVA_HOME="/workspaces/DNAnalyzer/jdk-17.0.7"
```

</details>

```bash
./gradlew build
```
If you see `Task :compileJava FAILED`, the program cannot find your Java installation. You may need to export your JAVA_HOME path again.

## OpenAI API Key
We use GPT-4 API to display the results of the analysis. To use the API, you'll need to get an API key from OpenAI. You can get one [here](https://platform.openai.com/). **Note, this is an optional step.** If you don't want to use the API, you can still use the program, but you won't be able to see the results of the analysis.

To set the API key on Linux or macOS, run `export OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx` where `sk-xxxxxxxxxxxxxxxxxxxxxxxx` is your API key.

For Windows, use `setx OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx` instead.

When configured, DNAnalyzer will generate two natural language reports after each run: one aimed at researchers and another simplified for the layperson.


### Usage

```bash
<executable> <arguments>
```

#### Executable

```pwsh
java -jar build/libs/DNAnalyzer.jar
```

#### Arguments

DNAnalyzer uses CLI arguments instead of `stdin`. For example, you can do:

```bash
assets/dna/random/dnalong.fa --amino=arg --min=16450 --max=520218 -r
```

### Example

```pwsh
java -jar build/libs/DNAnalyzer.jar assets/dna/random/dnalong.fa --amino=ser --min=16450 --max=520218 -r
```

#### Gradle Run

If you prefer, you can also run it directly from Gradle:

```pwsh
./gradlew run --args="assets/dna/random/dnalong.fa --amino=ser --min=10 --max=100"
```

#### GUI

DNAnalyzer also comes with a (very basic) GUI; to start DNAnalyzer with the GUI, run:

```pwsh
./gradlew run --args="--gui assets/dna/random/dnalong.fa"
```

Then:

* Enter the file name of the DNA file in the text field
* Set min and max
* Click analyze


The results of your analysis will be shown in the right pane.
</details>



#### Available Commands

```py


Usage: DNAnalyzer [-hrV] --amino=<aminoAcid> [--find=<proteinFile>]
                  [--max=<maxCount>] [--min=<minCount>] DNA
A program to analyze DNA sequences.
      DNA                    The FASTA file to be analyzed.
      --amino=<aminoAcid>    The amino acid representing the start of a gene.
      --find=<proteinFile>   The DNA sequence to be found within the FASTA file.
  -h, --help                 Show this help message and exit.
      --max=<maxCount>       The maximum count of the reading frame.
      --min=<minCount>       The minimum count of the reading frame.
  -r, --reverse              Reverse the DNA sequence before processing.
  -V, --version              Print version information and exit.
```