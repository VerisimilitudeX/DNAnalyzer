package DNAnalyzer.plugin;

import DNAnalyzer.utils.core.DNATools;
import java.io.IOException;
import java.io.PrintStream;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.ServiceLoader;

/**
 * Loads and manages DNAnalyzer plugins from the {@code plugins} directory.
 */
public class PluginManager {

    private final List<DNAnalyzerPlugin> plugins = new ArrayList<>();

    /** Create a manager and load all plugins. */
    public PluginManager() {
        loadPlugins();
    }

    private void loadPlugins() {
        Path pluginDir = Paths.get("plugins");
        if (!Files.isDirectory(pluginDir)) {
            return;
        }

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(pluginDir, "*.jar")) {
            for (Path jar : stream) {
                URLClassLoader loader = new URLClassLoader(new URL[] { jar.toUri().toURL() }, getClass().getClassLoader());
                ServiceLoader<DNAnalyzerPlugin> serviceLoader = ServiceLoader.load(DNAnalyzerPlugin.class, loader);
                for (DNAnalyzerPlugin plugin : serviceLoader) {
                    try {
                        plugin.init();
                        plugins.add(plugin);
                        System.out.println("Loaded plugin: " + plugin.getClass().getName());
                    } catch (Exception e) {
                        System.err.println("Failed to init plugin from " + jar.getFileName() + ": " + e.getMessage());
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Plugin loading failed: " + e.getMessage());
        }
    }

    /**
     * Run all loaded plugins on the given DNA sequence.
     *
     * @param dna DNA utilities
     * @param out Stream to write plugin output to
     */
    public void runPlugins(DNATools dna, PrintStream out) {
        for (DNAnalyzerPlugin plugin : plugins) {
            try {
                plugin.analyze(dna, out);
            } catch (Exception e) {
                System.err.println(
                        "Plugin " + plugin.getClass().getName() + " failed: " + e.getMessage());
            }
        }
    }
}
