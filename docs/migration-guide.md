# Migration Guide: Upgrading to DNAnalyzer v1.2.1+

This guide helps existing DNAnalyzer users understand and adopt the new user experience improvements introduced in v1.2.1.

## 🔄 What's Changed

### Output File Locations

**Before v1.2.1:**
```
DNAnalyzer/
├── assets/reports/test.fa_qc.png        # QC charts (hidden from user)
├── mutated_dna_20250608_183850.fa       # Mutations in root directory
└── your_analysis_files_scattered.fa    # Various locations
```

**After v1.2.1:**
```
DNAnalyzer/
└── output/dnanalyzer_output_test_20250608_184523/
    ├── charts/
    │   └── test.fa_qc_chart.png         # Clearly named and located
    ├── sequences/ 
    │   └── mutations_20250608_184523.fa # Organized by type
    └── reports/
        └── (future HTML reports)
```

### Command Usage

**Before (complex):**
```bash
java -jar DNAnalyzer.jar --detailed --verbose --mutate=5 test.fa
```

**After (simple options):**
```bash
# Easy script with presets
./easy_dna.sh test.fa detailed

# Or use analysis profiles
java -jar build/libs/DNAnalyzer-1.2.1.jar --profile research test.fa

# Traditional method still works
java -jar build/libs/DNAnalyzer-1.2.1.jar --detailed --verbose --mutate 5 test.fa
```

> Tip: `easy_dna.sh` uses `scripts/launcher-common.sh` to detect the rebuilt jar in `build/libs/` and will
> fall back to `./gradlew run` if necessary. Set `DNANALYZER_JAR` to override the jar path when scripting.

## 📋 Migration Checklist

### For Individual Users

- [ ] **Update your file location expectations**: Look for outputs in `output/` directory
- [ ] **Try the new easy script**: Run `./easy_dna.sh` to see new options
- [ ] **Explore analysis profiles**: Use `--profile research` instead of multiple flags
- [ ] **Check the enhanced output**: Notice the detailed file summary at the end

### For Automation Scripts

- [ ] **Review file paths**: Update scripts that expect files in `assets/reports/`
- [ ] **Test backward compatibility**: Verify existing command-line options still work
- [ ] **Consider using profiles**: Simplify complex command lines with predefined profiles
- [ ] **Update documentation**: Reflect new file locations and options in your scripts

### For System Administrators

- [ ] **Check disk space**: New organized structure may use slightly more space
- [ ] **Update backup scripts**: Include the new `output/` directory structure
- [ ] **Review file permissions**: Ensure write access to create organized directories

## 🛠️ Specific Migration Tasks

### Update Existing Scripts

**Old automation script:**
```bash
#!/bin/bash
java -jar DNAnalyzer.jar --detailed --verbose $1
# Look for QC chart in assets/reports/
ls assets/reports/$1_qc.png
```

**Updated script:**
```bash
#!/bin/bash
./easy_dna.sh $1 detailed
# Or use profile: java -jar build/libs/DNAnalyzer-1.2.1.jar --profile detailed $1
# Files now organized in output/ directory with clear summary
```

### Update File Processing

**Old file processing:**
```bash
# Find scattered output files
find . -name "*_qc.png" -o -name "mutated_dna_*.fa"
```

**New file processing:**
```bash
# Process organized output structure
find output/ -name "*.png" -o -name "*.fa"
# Or target specific types
ls output/*/charts/*.png      # All charts
ls output/*/sequences/*.fa    # All sequences
```

### Update Documentation

If you have internal documentation, update it to reflect:
- New `output/` directory structure
- Available preset modes in `easy_dna.sh`
- Analysis profiles (`--profile` option)
- Enhanced file notifications and summaries

## 🔍 Testing Your Migration

### Verification Steps

1. **Run a simple analysis:**
   ```bash
   ./easy_dna.sh assets/dna/example/test.fa basic
   ```

2. **Check output organization:**
   ```bash
   ls -la output/dnanalyzer_output_*/
   ```

3. **Verify backward compatibility:**
   ```bash
   java -jar build/libs/DNAnalyzer-1.2.1.jar --help
   ```

4. **Test your existing scripts:**
   ```bash
   # Run your old automation scripts to ensure they still work
   ```

### Common Issues and Solutions

**Issue: "Output directory not created"**
- **Solution**: Check write permissions, ensure sufficient disk space

**Issue: "Easy script not found"**
- **Solution**: Ensure you're in the DNAnalyzer root directory, make script executable

**Issue: "Profile not recognized"**  
- **Solution**: Use lowercase profile names, check spelling, ensure v1.2.1+

**Issue: "Can't find output files"**
- **Solution**: Look in the new `output/` directory structure, check the file summary

## 📈 Benefits of Upgrading

### Immediate Benefits
- **No more scattered files**: Everything organized in logical directories
- **Clear file notifications**: Know exactly what was created and where
- **Simplified usage**: Preset modes replace complex command lines
- **Better error messages**: Clear guidance when things go wrong

### Long-term Benefits
- **Easier automation**: Consistent output structure for scripting
- **Better maintainability**: Organized files easier to manage
- **Enhanced workflows**: Profiles make common tasks one-command simple
- **Future compatibility**: Foundation for additional features

## 🆘 Getting Help

If you encounter issues during migration:

1. **Check the documentation**:
   - [Enhanced Features Guide](usage/enhanced-features.md)
   - [README.md](../README.md)
   - [Changelog](../CHANGELOG.md)

2. **Common resources**:
   - Browse [existing issues](https://github.com/VerisimilitudeX/DNAnalyzer/issues)
   - Join our [Discord community](https://discord.gg/X3YCvGf2Ug)
   - Email: help@dnanalyzer.org

3. **Rollback if needed**:
   - All old functionality still works
   - You can ignore new features and use traditional commands
   - Previous versions available in GitHub releases

## 🚀 What's Next

After migrating, consider exploring:
- **Interactive custom mode**: `./easy_dna.sh file.fa custom`
- **Different analysis profiles**: Try `research`, `clinical`, `mutation` profiles
- **Automation with profiles**: Simplify your scripts with predefined settings
- **Output processing**: Take advantage of the organized directory structure

---

*This migration guide covers the transition from pre-v1.2.1 to v1.2.1+. For future migrations, refer to the [Changelog](../CHANGELOG.md) for version-specific changes.* 
