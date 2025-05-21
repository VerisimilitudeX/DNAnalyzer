# 祖源快照 (隐私安全)

`AncestrySnapshot` 工具将您的基因型与小型的设备端参考面板进行比较，以估算大陆级别的祖源。所有计算均在本地进行，原始数据不会发送给第三方服务。

## 工作原理
- 参考标记打包在 `assets/ancestry/continental_reference.json` 文件中。
- `AncestrySnapshot` 在运行时加载这些面板并对您的基因型进行评分。
- 报告匹配百分比最高的大陆。

## 用法示例
```java
// 从 AncestryDNA 格式的文件上传 SNP 数据
Map<String, String> snps = DNADataUploader.uploadFromAncestryDNA("my_data.txt");

// 初始化 DNAAnalysis 对象 (假设 DNATools 和其他参数已适当设置)
DNAAnalysis analysis = new DNAAnalysis(new DNATools(""), null, "M");

// 执行祖源快照分析
analysis.ancestrySnapshot(snps);
```

此代码片段会打印出大陆匹配的简单分类，整个过程不会离开您的计算机。

**注意：**
虽然原始英文文档的顶部提到了一个命令行用法 (`java -jar DNAnalyzer.jar --ancestry path/to/genome.txt`) 和对 "23andMe 文本导出" 文件的引用，但下面更详细的部分侧重于通过 `DNADataUploader` 和 `DNAAnalysis` 类的 Java API 调用。上述 Java 示例中使用了 `DNADataUploader.uploadFromAncestryDNA("my_data.txt")`，这表明它可能适用于 AncestryDNA 格式的文件。用户应根据自己的数据文件格式（例如 VCF、23andMe 格式、AncestryDNA 格式）调整数据加载方法。实际的命令行用法或支持的文件格式可能需要参考最新的 `MetCLI.md` 或其他相关文档。
