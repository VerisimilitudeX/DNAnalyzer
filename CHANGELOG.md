# Changelog

All notable changes to DNAnalyzer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2025-06-08

### ✨ Added - Major User Experience Improvements

#### 📁 Organized Output Management
- **NEW OutputManager class**: Automatically creates organized directory structure for all output files
- **Structured output directories**: `output/dnanalyzer_output_{filename}_{timestamp}/` with subdirectories:
  - `charts/` - Quality control and analysis charts (PNG files)
  - `sequences/` - Generated mutations and processed sequences (FASTA files)  
  - `reports/` - Analysis reports and summaries (HTML files)
- **Comprehensive file summary**: Detailed list of all generated files with paths, descriptions, and sizes
- **Enhanced file notifications**: Real-time progress updates showing exactly where files are created

#### 🚀 Easy Launch Script
- **NEW easy_dna.sh script**: User-friendly wrapper with preset modes
- **Simple preset modes**: `basic`, `detailed`, `quick`, `mutations`, `reverse`, `all`, `custom`
- **Interactive custom mode**: Yes/no prompts instead of complex command-line flags
- **Built-in help and examples**: Shows usage, available files, and command examples

#### 🎯 Analysis Profiles  
- **NEW AnalysisProfile enum**: Predefined configurations for common workflows
- **Available profiles**: `basic`, `detailed`, `quick`, `research`, `mutation`, `clinical`
- **Profile command-line option**: `--profile {name}` replaces multiple flags
- **Smart defaults**: Profiles automatically apply appropriate settings

#### 📊 Enhanced User Experience
- **Clear file path notifications**: Shows absolute paths for all generated files
- **File size information**: Human-readable file sizes in summary
- **Better error messages**: Clear guidance and suggestions for common issues
- **Improved progress indicators**: Emojis and formatting for better readability

### 🔧 Technical Improvements

#### Enhanced DNAMutation Class
- **Overloaded methods**: Support for custom file paths while maintaining backward compatibility
- **Organized mutation output**: Mutations now saved to structured `sequences/` directory

#### Updated CmdArgs Class
- **OutputManager integration**: Seamless file tracking and organization
- **Profile support**: `--profile` command-line option with validation
- **Enhanced file notifications**: Clear user feedback throughout analysis process

### 📚 Documentation Updates
- **Updated README.md**: Comprehensive documentation of all new features
- **NEW Enhanced Features Guide**: Complete documentation at `docs/usage/enhanced-features.md`
- **Migration guide**: Help for users upgrading from previous versions
- **Troubleshooting section**: Common issues and solutions

### 🔄 Backward Compatibility
- **100% backward compatible**: All existing command-line options continue to work
- **Legacy support**: Existing scripts and automation unaffected
- **Optional features**: New functionality doesn't interfere with existing workflows

### 📈 User Experience Impact
- **Eliminated scattered files**: No more hunting for output files in different directories
- **Reduced complexity**: Simple preset modes replace memorizing dozens of command-line flags
- **Better discoverability**: Clear notifications tell users exactly what files were created and where
- **Improved accessibility**: Interactive modes make the tool usable by non-command-line experts

---

## Previous Versions

### [1.2.0] - 2025-05-XX
- AI-powered analysis with OpenAI integration
- 23andMe genotype file support
- Polygenic risk scoring
- Quality control statistics and charts

### [1.1.0] - 2025-04-XX  
- Web dashboard interface
- REST API endpoints
- GPU-accelerated Smith-Waterman alignment
- Enhanced protein detection

### [1.0.0] - 2025-03-XX
- Initial release
- Basic DNA sequence analysis
- Codon and protein detection
- GC content analysis
- Reading frame analysis 