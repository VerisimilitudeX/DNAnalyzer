<h2 id="usage">命令行界面 (CLI) 用法
</h2>

DNAnalyzer 使用命令行参数而不是 `stdin`（标准输入）。例如，您可以这样做：

```
<可执行文件> assets/dna/random/dnalong.fa --amino=ser
```

或者

```
<可执行文件> assets/dna/random/dnalong.fa --amino=ser --min=0 --max=100
```

帮助信息 (`--help`):

```
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
