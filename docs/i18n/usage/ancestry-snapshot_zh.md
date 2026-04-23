# 祖源快照 (隐私安全)

`AncestrySnapshot` 工具将您的基因型与小型的设备端参考面板进行比较，以估算大陆级别的祖源。所有计算均在本地进行，原始数据不会发送给第三方服务。

## 工作原理
- 参考标记打包在 `assets/ancestry/continental_reference.json` 文件中。
- `AncestrySnapshot` 在运行时加载这些标记并对您的基因型进行评分。
- 报告匹配百分比最高的大陆。

## 用法示例
```java
Path export = Paths.get("my_23andme_data.txt");
Map<String, String> snps = DNADataUploader.uploadFrom23AndMe(export);
AncestrySnapshot snapshot = AncestrySnapshot.usingBundledReference();
System.out.println(snapshot.formatResults(snps));
```

`formatResults` 会返回一个简洁的文本摘要（例如 `Top match: Europe (100.0%)`）。
如需更详细的信息，可以通过 `analyze` 返回的 `Result` 对象查看每个大陆缺失或不匹配的标记。
