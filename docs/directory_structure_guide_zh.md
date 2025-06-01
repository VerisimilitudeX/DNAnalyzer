# 项目目录结构指南

本指南旨在帮助您了解 DNAnalyzer 项目的目录和文件结构，以便您能轻松找到项目的各个部分及其作用。

## 顶级目录

### `.devcontainer/`
**用途**: 存放与开发容器相关的配置。
**内容**: 通常包含 `devcontainer.json` 文件，用于定义在 Docker 容器中进行开发的环境，确保开发环境的一致性。

### `.github/`
**用途**: 存放与 GitHub 仓库特定功能相关的配置文件和模板。
**内容**:
*   `ISSUE_TEMPLATE/`: 包含用于报告问题（Issue）的模板。
*   `workflows/`: 包含 GitHub Actions 的工作流配置文件，用于自动化构建、测试和部署等任务。
*   可能还包含其他如 `PULL_REQUEST_TEMPLATE.md`（拉取请求模板）等文件。

### `.idx/`
**用途**: 存放与 IDX 项目（一个基于云的开发环境）相关的配置。
**内容**: 通常包含 `dev.nix` 或其他 IDX 特定的配置文件，用于配置云开发环境。

### `.vscode/`
**用途**: 存放 Visual Studio Code 编辑器特定的设置和建议。
**内容**: 例如 `settings.json`（工作区设置）、`extensions.json`（推荐插件）和 `launch.json`（调试配置）。

### `assets/`
**用途**: 存放项目使用的所有静态资源和示例数据。
**内容**:
*   `ancestry/`: 可能包含与祖源分析相关的参考数据或面板。
*   `dna/`: 包含示例 DNA 序列文件（例如 FASTA 格式），用于测试和演示。
*   `demo/`: 存放用于演示项目功能的资源。
*   `reports/`: 可能用于存放生成的分析报告模板或示例。
*   `risk/`: 可能包含与多基因风险评分相关的示例数据或权重文件。
*   其他图片、图标等资源。

### `docs/`
**用途**: 存放所有项目文档。
**内容**:
*   `contributing/`: 包含贡献指南、代码规范等。
*   `developer/`: 存放开发者特定文档，如插件开发指南。
*   `research/`: 可能包含与项目相关的研究论文、背景资料或发现。
*   `samples/`: 提供代码示例或用例。
*   `usage/`: 包含用户手册、API使用说明等。
*   以及本目录结构指南等其他文档。

### `gradle/`
**用途**: 存放 Gradle 构建工具本身的文件。
**内容**:
*   `wrapper/`: 包含 Gradle Wrapper 的 `gradle-wrapper.jar` 和 `gradle-wrapper.properties` 文件。Gradle Wrapper 允许开发者在没有预先安装 Gradle 的情况下构建项目。

### `installer/`
**用途**: 存放与创建项目安装程序相关的文件和脚本。
**内容**: 例如用于 Windows、macOS 或 Linux 的安装程序构建脚本或配置文件。

### `lib/`
**用途**: 存放项目依赖的本地库文件（通常不推荐，Gradle应管理依赖）。
**内容**: 可能包含一些无法通过 Gradle 依赖管理的 `.jar` 文件或其他库文件。

### `sample-plugins/`
**用途**: 提供示例插件代码，展示如何扩展 DNAnalyzer 的功能。
**内容**:
*   `src/`: 包含示例插件的源代码。

### `src/`
**用途**: 存放项目的主要源代码。
**内容**:
*   `main/java/`: 包含项目核心功能的 Java 源代码。通常会按照包结构组织，例如 `DNAnalyzer` 包。
*   `main/resources/`: 包含 Java 应用程序在运行时需要的资源文件，如配置文件、属性文件、本地化字符串等。
*   `test/java/`: 包含单元测试和集成测试的 Java 源代码。

### `web/`
**用途**: 存放与 Web 用户界面和后端 REST API 相关的所有文件。
**内容**:
*   `about/`: 可能包含关于页面或团队信息的静态文件。
*   `analyzer/`: 与DNA分析相关的Web界面组件。
*   `assets/`: Web界面专用的静态资源，如图片、CSS、JavaScript库。
*   `dashboard/`: 包含Web仪表板的HTML、CSS和JavaScript文件。
*   `docs/`: (web-docs) Web界面内部使用的文档或帮助页面。
*   `features/`: 展示项目特性的相关Web页面。
*   `hiring/`: 可能包含招聘信息的页面。
*   `server/`: 与后端服务器、REST API 实现相关的代码或配置。

## 根目录文件

以下是项目根目录下一些重要文件的说明：

*   **`.classpath`**: 通常由 Eclipse IDE 生成，用于定义项目的类路径。
*   **`.deepsource.toml`**: DeepSource（一个静态代码分析工具）的配置文件。
*   **`.gitattributes`**: 定义 Git 如何处理特定路径下的文件，例如行尾符转换。
*   **`.gitignore`**: 指定 Git 版本控制系统应忽略的文件和目录。
*   **`CITATION.cff`**: (Citation File Format) 提供项目的标准引用信息，方便学术引用。
*   **`CODE_OF_CONDUCT.md`**: 社区行为准则，定义了贡献者和维护者的行为期望。
*   **`LICENSE.md`**: 项目的开源许可证文件，规定了软件的使用、修改和分发条款。
*   **`README.md`**: 项目的主要介绍文件，通常包含项目概述、功能、安装步骤和基本用法。
*   **`SECURITY.md`**: 描述项目的安全策略，包括如何报告漏洞和支持的版本。
*   **`build.gradle`**: Gradle 项目的主要构建配置文件，定义了项目依赖、插件、任务等。
*   **`settings.gradle.kts`**: Gradle 的设置文件（Kotlin脚本），用于多项目构建配置。
*   **`gradlew`**: Gradle Wrapper 的 Unix/Linux/macOS 执行脚本。
*   **`gradlew.bat`**: Gradle Wrapper 的 Windows 执行脚本。
*   **`implementation_plan.md`**: 可能包含项目实施计划、里程碑或架构设计思路的文档。
*   **`web_structure.txt`**: 可能是一个自动生成的文本文件，用于概述 `web/` 目录的结构。

希望这份指南能帮助您更好地理解 DNAnalyzer 项目的组织方式！如果您有任何疑问，请查阅相关文档或联系项目维护者。
