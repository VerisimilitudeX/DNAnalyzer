# 欢迎来到 DNAnalyzer Wiki！

![](https://user-images.githubusercontent.com/96280466/186224441-46dd2029-b9dc-4b3d-aad8-bfd1e1e62f2e.png)

> DNAnalyzer 能够识别蛋白质、氨基酸、起始和终止密码子、高覆盖区域以及调控元件。
> 研究人员正致力于提取有价值的信息，以更好地理解人类健康与疾病。
> 目前，我们正在开发命令行界面 (CLI) 和图形用户界面 (GUI)，以使医生能够快速识别基因突变。

## 文档
[查看文档](https://github.com/VerisimilitudeX/DNAnalyzer/tree/main/docs)

## 贡献

### 遵循步骤

1.  **Fork 项目 **
    通过点击此页面右上角的 `Fork` 按钮，获取您自己的 [DNAnalyzer](https://github.com/VerisimilitudeX/DNAnalyzer) 分支。
    ![](https://github-images.s3.amazonaws.com/help/bootcamp/Bootcamp-Fork.png)

2.  **Clone 项目 **
    将您的分支克隆到本地计算机：
    ```bash
    git clone https://github.com/您的用户名/DNAnalyzer.git
    cd DNAnalyzer
    ```
    然后，添加对原始仓库的引用：
    ```bash
    git remote add upstream https://github.com/VerisimilitudeX/DNAnalyzer.git
    # 注意：原始文档中此处为 theabhishek07/DNAnalyzer.git，通常应为项目主仓库 VerisimilitudeX/DNAnalyzer.git
    git remote -v
    ```

3.  **与远程仓库同步 **
    保持您的本地仓库更新：
    ```bash
    git fetch --all --prune
    git checkout main
    git reset --hard upstream/main
    git push origin main
    ```

4.  **创建新分支**
    为您的贡献创建一个新分支：
    ```bash
    git checkout -b <分支名称>
    ```
    之后切换分支：
    ```bash
    git checkout <分支名称>
    ```
    添加更改并提交：
    ```bash
    git add .
    git commit -m "您的提交信息"
    ```
    推送您的分支：
    ```bash
    git push -u origin <分支名称>
    ```
    最后，在您的浏览器中，导航到您的仓库，点击 **Contribute**，然后点击 **Open Pull Request**。提供一个简洁的标题和描述来说明您的贡献。

### 贡献指南

-  给 GitHub 仓库点个星标（可选）。
- 在贡献之前，请阅读 [`贡献指南 (Contribution_Guidelines_zh.md)`](contributing/Contribution_Guidelines_zh.md) 和 [`行为准则 (CODE_OF_CONDUCT_zh.md)`](contributing/CODE_OF_CONDUCT_zh.md)。
- 创建一个 issue 或提出一个功能/错误修复建议。
- Fork 仓库，克隆它，创建分支，添加您的更改，提交并推送。
- 创建一个 Pull Request，将您的分支与仓库的 main 分支进行比较。

## 用法

### 命令行界面 (CLI) 用法

DNAnalyzer 使用 CLI 参数而不是标准输入。例如：
```bash
<可执行文件> assets/dna/random/dnalong.fa --amino=ser
```
或者
```bash
<可执行文件> assets/dna/random/dnalong.fa --amino=ser --min=0 --max=100
```
查看帮助信息：
```bash
<可执行文件> --help

# 输出:
用法: DNAnalyzer [-hrV] --amino=<氨基酸> [--find=<蛋白质文件>] [--max=<最大计数值>] [--min=<最小计数值>] DNA文件
  DNA文件                要分析的FASTA文件。
  --amino=<氨基酸>       代表基因起点的氨基酸。
  --find=<蛋白质文件>    要查找的DNA序列。
  -h, --help             显示此帮助信息并退出。
  --max=<最大计数值>     阅读框的最大计数值。
  --min=<最小计数值>     阅读框的最小计数值。
  -r, --reverse          在处理前反转DNA序列。
  -V, --version          打印版本信息并退出。
```

## 报告

- [关键人员和知识分布](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/key-personnel-and-and-knowledge-distribution.pdf)
- [技术健康概览](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/technical-health-overview.pdf)
- [趋势报告](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/trend-report.pdf)

## 示例

- [Serine DNAlong (丝氨酸DNA长序列示例)](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/samples/serine-dnalong.md)
（注意：链接指向的是一个 .md 文件，如果该文件也有中文版 `serine-dnalong_zh.md`，则链接应更新。）
