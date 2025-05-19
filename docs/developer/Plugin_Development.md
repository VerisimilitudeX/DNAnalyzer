# DNAnalyzer Plugin Development

DNAnalyzer supports optional plugins that can extend the analysis pipeline.
Plugins are discovered at runtime from the `plugins/` directory when the
`--enable-plugins` flag is used or the API `plugins` parameter is set to `true`.

## Writing a Plugin

1. Implement the `DNAnalyzer.plugin.DNAnalyzerPlugin` interface.
2. Provide a `META-INF/services/DNAnalyzer.plugin.DNAnalyzerPlugin` file in your
   JAR listing the implementing class.
3. Package the plugin as a JAR and place it in the `plugins/` folder.

See [`sample-plugins`](../../sample-plugins) for an example that counts
 dinucleotide frequencies.
