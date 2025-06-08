# Sample DNAnalyzer Plugin

This directory contains an example plugin showing how to extend DNAnalyzer.

To build the plugin jar run:

```bash
cd sample-plugins
../gradlew jar
```

Copy the resulting JAR from `build/libs` to the top level `plugins/` directory
and run DNAnalyzer with the `--enable-plugins` flag.
