# DNAnalyzer 插件开发

DNAnalyzer 支持可选插件，这些插件可以扩展分析流程。
当使用 `--enable-plugins` 标志或 API `plugins` 参数设置为 `true` 时，程序会在运行时从 `plugins/` 目录中发现插件。

## 编写插件

1. 实现 `DNAnalyzer.plugin.DNAnalyzerPlugin` 接口。
2. 在您的 JAR 文件中提供一个 `META-INF/services/DNAnalyzer.plugin.DNAnalyzerPlugin` 文件，列出实现该接口的类。
3. 将插件打包为 JAR 文件，并将其放置在 `plugins/` 文件夹中。

有关计算二核苷酸频率的示例，请参阅 [`sample-plugins`](../../sample-plugins) 目录。
