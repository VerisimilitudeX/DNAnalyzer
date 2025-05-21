# DNAnalyzer 示例插件

此目录包含一个示例插件，展示了如何扩展 DNAnalyzer。

要构建插件的 JAR 文件，请运行：

```bash
cd sample-plugins
../gradlew jar
```

将生成的 JAR 文件从 `build/libs` 复制到顶层的 `plugins/` 目录，
然后使用 `--enable-plugins` 标志运行 DNAnalyzer。
