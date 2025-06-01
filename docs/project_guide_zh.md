# DNAnalyzer 项目学习与修改指南

## 1. 项目简介 (Project Introduction)

DNAnalyzer 是一家生物技术研究和部署公司。在 [Anthropic](http://anthropic.com/) 的支持下，我们的使命是通过设备端计算，让每个人都能获得由人工智能驱动的基因组洞察，从而彻底改变DNA分析。

DNAnalyzer 由 [Piyush Acharya](https://github.com/VerisimilitudeX) 创立，其团队包括来自微软研究院、马其顿大学和东北大学的46位顶尖计算生物学家和计算机科学家。

我们的影响力已获得 [Y Combinator](https://www.ycombinator.com/)、[AI世界博览会](https://www.ai.engineer/worldsfair)组织者以及[DEV](https://dev.to/)首席执行官的认可。DNAnalyzer旨在提供私密、精确且由AI驱动的下一代设备端DNA洞察。

## 2. 项目结构概览 (Project Structure Overview)

了解项目的文件和目录结构对于学习和修改项目至关重要：

*   `src/main/java/DNAnalyzer`: 包含项目核心分析逻辑的Java代码。
*   `web`: 存放与Web用户界面和API相关的文件，例如HTML、CSS、JavaScript以及后端API实现。
*   `assets`: 包含所有静态资源，如DNA示例文件（FASTA格式）、项目相关的图片、图标等。
*   `docs`: 存放所有项目文档，包括用户指南、开发者文档以及本指南。
*   `build.gradle`: Gradle项目的构建配置文件，定义了项目依赖、构建任务等。
*   `sample-plugins`: 提供示例插件代码，展示了如何扩展DNAnalyzer的功能。

## 3. 构建和运行项目 (Building and Running the Project)

### 构建项目
DNAnalyzer 使用 Gradle 进行构建。详细的构建步骤和环境配置请参考 [入门指南](getting-started.md) (中文版 `getting-started_zh.md` 即将推出)。
通常，构建过程涉及在项目根目录下运行以下命令：
```bash
./gradlew build
```
这将编译代码、运行测试并打包应用程序。

### 运行项目
DNAnalyzer 的核心功能通过Spring Boot应用程序提供。在成功构建项目后，您可以按照 [入门指南](getting-started.md) 中的说明启动应用程序。
启动后，相关的Web界面和REST API将可用。

## 4. 修改项目不同部分指南 (Guide to Modifying Different Parts of the Project)

### 修改核心分析逻辑
如果您希望修改DNA分析的核心算法、数据处理流程或添加新的分析功能，您需要关注以下目录：
*   `src/main/java/DNAnalyzer`: 此处是主要的Java代码所在地。您可以在相应的类和方法中进行修改。

### 修改Web用户界面
Web界面的更改，例如布局调整、样式修改或交互逻辑增强，通常涉及以下文件：
*   `web` 目录下的HTML, CSS, 和 JavaScript 文件。具体路径可能根据您要修改的页面或组件而有所不同。例如，仪表板相关文件位于 `web/dashboard`。

### 添加新插件
DNAnalyzer 支持通过插件扩展其功能。如果您想开发新插件：
*   请参考 `sample-plugins` 目录中的示例代码，了解插件的基本结构和实现方式。
*   详细的插件开发指南请查阅 [插件开发文档](developer/Plugin_Development.md) (中文版插件开发文档即将推出)。

## 5. 详细文档链接 (Links to Detailed Documentation)

为了更深入地了解项目，请参考以下文档资源：

*   [项目总览 (README_zh.md)](../README_zh.md) (即将推出，当前可参考 [README.md](../README.md))
*   [入门指南 (getting-started_zh.md)](getting-started_zh.md) (即将推出，当前可参考 [getting-started.md](getting-started.md))
*   [贡献指南 (Contribution_Guidelines.md)](contributing/Contribution_Guidelines.md)
*   [Git 使用说明 (CONTRIBUTING.md)](contributing/CONTRIBUTING.md)

随着更多中文文档的创建，我们将在此处更新链接。

我们鼓励您在修改和学习过程中积极参考这些文档，并欢迎您通过Issue或Pull Request为项目贡献代码或文档。
