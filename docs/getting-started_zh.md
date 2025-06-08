# 入门指南

我们还提供了一个[视频教程](https://youtu.be/dOwkInn6eDw)，其中涵盖了以下说明。

### <a name="system-requirements"></a>系统要求

* JDK [17](https://www.oracle.com/java/technologies/downloads/#jdk17-windows)+
   * 一个指向您的JDK的 `JAVA_HOME` 环境变量，或者Java可执行文件在您的PATH中
* [Gradle](https://gradle.org/install/) (已包含)

### <a name="build-run"></a>构建和运行

在Windows上运行该程序最简单的方法是使用[发布版本](https://github.com/VerisimilitudeX/DNAnalyzer/releases/latest)部分中的可执行文件来安装程序、构建Gradle并运行GUI。

* 我们使用 [Gradle](https://gradle.org) 进行构建。Gradle包装器负责下载依赖项、测试、编译、链接和打包代码。
<details>

<summary>Windows</summary>

在Windows上运行该程序最简单的方法是使用[发布版本](https://github.com/VerisimilitudeX/DNAnalyzer/releases/latest)部分中的可执行文件来安装程序、构建Gradle并运行GUI。

```pwsh
.\gradlew build
```

### <a name="usage"></a>用法

```pwsh
<可执行文件> <参数>
```

#### <a name="executable"></a>可执行文件

```pwsh
java -jar build/libs/DNAnalyzer.jar
```

#### <a name="arguments"></a>参数

DNAnalyzer 使用命令行参数而不是 `stdin`。例如，您可以这样做：

```pwsh
assets/dna/random/dnalong.fa --amino=arg --min=16450 --max=520218 -r
```

### <a name="example"></a>示例

```pwsh
java -jar build/libs/DNAnalyzer.jar assets/dna/random/dnalong.fa --amino=ser --min=16450 --max=520218 -r
```

#### <a name="gradle-run"></a>通过Gradle运行

如果您愿意，也可以直接从Gradle运行它：

```pwsh
.\gradlew run --args="assets/dna/random/dnalong.fa --amino=ser --min=10 --max=100"
```

#### <a name="gui"></a>图形用户界面 (GUI)

DNAnalyzer 还带有一个（非常基础的）GUI；要使用GUI启动DNAnalyzer，请运行：

```pwsh
.\gradlew run --args="--gui assets/dna/random/dnalong.fa"
```

然后：

* 在文本字段中输入DNA文件的文件名
* 设置最小值和最大值
* 点击分析

* 注意：确保您已安装Java [17](https://www.oracle.com/java/technologies/downloads/#java17) 或更高版本，并设置了 `JAVA_HOME` 路径变量，以便程序正常运行！

您的分析结果将显示在右侧窗格中。

</details>

<details>
      <summary>Linux 和 macOS</summary>

### <a name="features"></a>DNAnalyzer 和 Java 下载

要在Linux上运行DNAnalyzer，您需要下载DNAnalyzer源代码并下载安装Java 17。

首先，从[DNAnalyzer发布版本](https://github.com/VerisimilitudeX/DNAnalyzer/releases/latest)下载zip或tar.gz文件，并使用本机实用程序将其解压缩。

然后，下载[Java 17](https://www.oracle.com/ca-en/java/technologies/downloads/#java17)，在 https://www.oracle.com/ca-en/java/technologies/downloads/#java17 找到下载链接，确保选择Linux选项并获取适合您处理器架构的版本。

### Java 安装

```bash
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz
```
接下来，解压缩它。

```bash
tar -xvzf jdk-17_linux-x64_bin.tar.gz
```
然后映射 `JAVA_HOME` 路径。将其替换为Java解压缩的JAVA目录。
```bash
export JAVA_HOME="{您的JAVA目录路径}/jdk-17.0.7" && export PATH=$JAVA_HOME/bin:$PATH
```
<details>
<summary>完整路径命令示例。</summary>

```bash
export JAVA_HOME="/workspaces/DNAnalyzer/jdk-17.0.7"
```

</details>

```bash
./gradlew build
```
如果您看到 `Task :compileJava FAILED`，则表示程序找不到您的Java安装。您可能需要再次导出您的 `JAVA_HOME` 路径。

## OpenAI API 密钥
我们使用 GPT-4 API 来显示分析结果。要使用该API，您需要从OpenAI获取一个API密钥。您可以从[这里](https://platform.openai.com/)获取。**注意：这是一个可选步骤。** 如果您不想使用API，仍然可以使用该程序，但将无法看到分析结果。

要在Linux或macOS上设置API密钥，请运行 `export OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx`，其中 `sk-xxxxxxxxxxxxxxxxxxxxxxxx` 是您的API密钥。

对于Windows，请改用 `setx OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx`。

### 用法

```bash
<可执行文件> <参数>
```

#### 可执行文件

```pwsh
java -jar build/libs/DNAnalyzer.jar
```

#### 参数

DNAnalyzer 使用命令行参数而不是 `stdin`。例如，您可以这样做：

```bash
assets/dna/random/dnalong.fa --amino=arg --min=16450 --max=520218 -r
```

### 示例

```pwsh
java -jar build/libs/DNAnalyzer.jar assets/dna/random/dnalong.fa --amino=ser --min=16450 --max=520218 -r
```

#### 通过Gradle运行

如果您愿意，也可以直接从Gradle运行它：

```pwsh
./gradlew run --args="assets/dna/random/dnalong.fa --amino=ser --min=10 --max=100"
```

#### 图形用户界面 (GUI)

DNAnalyzer 还带有一个（非常基础的）GUI；要使用GUI启动DNAnalyzer，请运行：

```pwsh
./gradlew run --args="--gui assets/dna/random/dnalong.fa"
```

然后：

* 在文本字段中输入DNA文件的文件名
* 设置最小值和最大值
* 点击分析

您的分析结果将显示在右侧窗格中。
</details>

#### 可用命令

```py
用法: DNAnalyzer [-hrV] --amino=<氨基酸> [--find=<蛋白质文件>]
                  [--max=<最大计数值>] [--min=<最小计数值>] DNA文件
一个用于分析DNA序列的程序。
      DNA文件                要分析的FASTA文件。
      --amino=<氨基酸>       代表基因起点的氨基酸。
      --find=<蛋白质文件>    要在FASTA文件中查找的DNA序列。
  -h, --help                 显示此帮助信息并退出。
      --max=<最大计数值>     阅读框的最大计数值。
      --min=<最小计数值>     阅读框的最小计数值。
  -r, --reverse              在处理前反转DNA序列。
  -V, --version              打印版本信息并退出。
```
