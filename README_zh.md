![DNAnalyzer-modified](https://user-images.githubusercontent.com/96280466/221687615-698969a1-8d39-4278-aa92-8f713625f165.png)

<div align="center">
<h3>下一代设备端DNA洞察</h3>
<p><i>私密。精确。AI驱动。</i></p>

[![版权](https://img.shields.io/badge/copyright-2025-blue?style=for-the-badge)](https://github.com/VERISIMILITUDEX/DNAnalyzer)
[![发布](https://img.shields.io/github/v/release/VERISIMILITUDEX/DNAnalyzer?style=for-the-badge&color=green)](https://github.com/VERISIMILITUDEX/DNAnalyzer/releases)
[![构建状态](https://img.shields.io/github/actions/workflow/status/VerisimilitudeX/DNAnalyzer/gradle.yml?style=for-the-badge)](https://github.com/VerisimilitudeX/DNAnalyzer/actions/workflows/gradle.yml)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.14556578-blue?style=for-the-badge)](https://zenodo.org/records/14556578)

<br>

<a href="https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=519909104&machine=largePremiumLinux&location=WestUs&skip_quickstart=true&geo=UsWest">
    <img src="https://github.com/codespaces/badge.svg" alt="在GitHub Codespaces中打开" style="height: 35px" />
</a>&nbsp;&nbsp;
<a href="https://huggingface.co/DNAnalyzer">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg" alt="Hugging Face中的模型" style="height: 35px" />
</a>&nbsp;&nbsp;
<a href="https://www.producthunt.com/posts/dnanalyzer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dnanalyzer">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401710&theme=dark" alt="DNAnalyzer on Product Hunt" style="height: 35px" />
</a>

</div>

## 关于 DNAnalyzer

DNAnalyzer 是一家生物技术研究和部署公司。在 [Anthropic](http://anthropic.com/) 的支持下，我们的使命是通过设备端计算，让每个人都能获得由人工智能驱动的基因组洞察，从而彻底改变DNA分析。

由 [Piyush Acharya](https://github.com/VerisimilitudeX) 创立，DNAnalyzer 的团队包括来自微软研究院、马其顿大学和东北大学的 **46 位顶尖计算生物学家和计算机科学家**。

我们的影响力已获得 [Y Combinator](https://www.ycombinator.com/)、[AI世界博览会](https://www.ai.engineer/worldsfair)组织者以及[DEV](https://dev.to/)首席执行官的认可。

<br>

## DNAnalyzer 的重要性

<div align="center">

| 当今的局限性 | DNAnalyzer 的创新 |
|---|---|
| DNA测序平均成本 **100美元** | 完全 **免费** |
| 基本健康洞察高达 **600美元** | 惠及**服务欠缺社区** |
| **78%** 的公司与第三方共享基因数据 | 100% **私密**，本地计算 |
| 数据泄露影响数百万人 (23andMe：2023年690万用户) | **无敏感基因信息**的中央数据库 |

</div>

> *“与密码不同，泄露的基因数据将永久暴露。”*

<br>

## 核心功能

<table> <tr> <td width="33%" align="center"> <strong>密码子和蛋白质检测</strong><br> 快速识别蛋白质编码区、氨基酸链和关键基因组指标。 </td> <td width="33%" align="center"> <strong>富含GC区域分析</strong><br> 精确定位具有重要生物学意义的基因组启动子区域 (GC含量45-60%)。 </td> <td width="33%" align="center"> <strong>神经基因组学</strong><br> 检测与神经系统疾病相关的遗传标记 (自闭症、多动症、精神分裂症)。 </td> </tr> <tr> <td width="33%" align="center"> <strong>启动子元件识别</strong><br> 精确找到关键的转录起始序列 (BRE、TATA、INR、DPE)。 </td> <td width="33%" align="center"> <strong>多格式FASTA整合</strong><br> 支持从上传或外部来源进行全面的DNA数据库分析。 </td> <td width="33%" align="center"> <strong>Met CLI 自动化</strong><br> 利用强大的CLI界面进行脚本编写、自动化和大规模分析任务。 </td> </tr> <tr> <td width="33%" align="center"> <strong>祖源快照 (隐私安全)</strong><br> 使用设备端参考面板估算大陆起源。 </td> <td></td> <td></td> </tr> </table> <br>
有关使用说明，请参阅[祖源快照指南](docs/usage/ancestry-snapshot_zh.md) (英文版：[docs/usage/ancestry-snapshot.md](docs/usage/ancestry-snapshot.md))。

> **新功能：** 用于浏览器内可视化的交互式Web仪表板现已在 `web/dashboard` 下提供，并通过 `/api` 与本地REST API通信。

<br>
<br>

## 快速入门指南

准备好探索您的DNA了吗？在几秒钟内开始精确的基因组分析：

```bash
# 克隆仓库
git clone https://github.com/VerisimilitudeX/DNAnalyzer.git

# 导航到项目目录
cd DNAnalyzer

# 安装依赖项
./gradlew build
```

有关高级配置，请参阅我们全面的[入门指南](docs/getting-started_zh.md) (英文版：[docs/getting-started.md](docs/getting-started.md))。

<br>
## 多基因健康风险评分

DNAnalyzer 现在包含一个轻量级的多基因风险评分计算器。提供SNP权重的CSV文件和您的基因分型数据，即可在设备上直接估算复杂疾病的风险。
<br>


### REST API

对于自动化工作流程，DNAnalyzer 公开了一个最小化的REST端点。启动 Spring Boot 应用程序并将FASTA文件发送到 `/server/analyze`：

```bash
curl -F file=@sample.fa http://localhost:8080/server/analyze
```

响应包含序列化为JSON的核心管道输出，使您可以使用Python或R等语言编写DNAnalyzer脚本，而无需GUI。

此外，还提供 `/api/file/parse` 端点，用于简单上传FASTA或FASTQ文件并接收解析后的序列。

## 多基因健康风险评分 (重复章节，已在上方翻译)

DNAnalyzer 现在包含一个轻量级的多基因风险评分计算器。提供SNP权重的CSV文件和您的基因分型数据，即可在设备上直接估算复杂疾病的风险。

<br>

## 开发路线图

<div align="center">

| 即将进行的开发 | 描述 |
|---|---|
| **优化的SQL数据库** | 可扩展的数据库，用于跨不同物种的基因组数据集 |
| **增强的神经网络** | 与第三方基因型数据集 (23andMe, AncestryDNA) 集成 |
| **DIAMOND 实现** | 将DIAMOND的速度与BLAST的准确性相结合，进行前沿分析 |
| **AI性状预测器套件** | 有趣、可分享的预测——对香菜的口味、作息类型、耳垢类型——由同行评审的SNP研究支持 |
| **安全共享与比较** | 离线生成的、二维码编码的摘要，让用户可以与医生或朋友分享有限的见解——绝不暴露原始基因组。 |

</div>

<br>

## 为 DNAnalyzer 做贡献

我们欢迎各种经验水平的贡献者：

- [贡献指南](./docs/contributing/Contribution_Guidelines_zh.md) (英文版：[./docs/contributing/Contribution_Guidelines.md](./docs/contributing/Contribution_Guidelines.md))
- [Git 使用说明](./docs/contributing/CONTRIBUTING_zh.md) (英文版：[./docs/contributing/CONTRIBUTING.md](./docs/contributing/CONTRIBUTING.md))

<div align="center">
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/stargazers">
    <img src="https://img.shields.io/github/stars/VerisimilitudeX/DNAnalyzer?style=for-the-badge&color=yellow" alt="Star数量">
  </a>
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/issues">
    <img src="https://img.shields.io/github/issues/VerisimilitudeX/DNAnalyzer?style=for-the-badge" alt="问题">
  </a>
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/pulls">
    <img src="https://img.shields.io/github/issues-pr/VerisimilitudeX/DNAnalyzer?style=for-the-badge" alt="拉取请求">
  </a>
  <a href="https://discord.gg/X3YCvGf2Ug">
    <img src="https://img.shields.io/discord/1033196198816915516?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
</div>

<br>

## 学术引用

请按如下方式引用 DNAnalyzer：

```bibtex
@software{Acharya_DNAnalyzer_ML-Powered_DNA_2022,
  author = {Acharya, Piyush},
  doi = {10.5281/zenodo.14556577},
  month = oct,
  title = {{DNAnalyzer: ML-Powered DNA Analysis Platform}},
  url = {https://github.com/VerisimilitudeX/DNAnalyzer},
  version = {3.5.0-beta.0},
  year = {2022}
}
```

<br>

## ⚖使用条款

DNAnalyzer 按“原样”提供。使用本软件即表示接受风险和责任。DNAnalyzer 对因使用本软件而产生的任何损失或损害不承担任何责任。

如需帮助或咨询，请联系：help@dnanalyzer.org。

DNAnalyzer，© Piyush Acharya 2025。一个财政赞助的501(c)(3)非营利组织 (EIN: 81-2908499)，根据MIT许可证授权。

<br>

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 🚀  媒体与奖项  -->
<!--
## 媒体与奖项

<div align="center">
  <img src="https://github.com/user-attachments/assets/8aa43624-920a-4ce3-a577-9a5785c33d93" height="100" alt="Y Combinator Logo">
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/068c18e2-5076-458d-8e2e-faf166ea63c6" height="100" alt="Anthropic Logo">
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/ee09ae49-94cf-4a8c-97d4-c0937aecb9be" height="100" alt="AI Engineer World’s Fair Logo">
  &nbsp;&nbsp;
  <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-black.png" height="100" alt="DEV Logo">
</div>

| 年份 | 认可 | 详情 |
|------|-------------|---------|
| 2025 | **Anthropic学生构建者补助金** | 获得用于DNAnalyzer研发的资金 :contentReference[oaicite:0]{index=0} |
| 2024 | **AI工程师世界博览会** | 最大型技术AI博览会的首席执行官为项目点赞 |
| 2025 | **Y Combinator** | 被YC著名的AI创业学校录取 |
| 2024 | **DEV.to** | 由DEV创始人展示 |

**观看现场演示**
[▶ a16z 演讲(2分钟)](https://youtu.be/zd698cf5dX4) | [▶ 安装说明(7分钟)](https://youtu.be/dOwkInn6eDw)
-->
---

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 📊  影响指标  -->
## 影响指标

| 指标 | 当前值 |
|--------|---------------|
| GitHub 星标 | **147** :contentReference[oaicite:4]{index=4} |
| Fork数量 | **62** :contentReference[oaicite:5]{index=5} |
| 贡献者 | **46** :contentReference[oaicite:6]{index=6} |
| 每月分析的FASTA文件数* | **5000 +** *(自报)* |
| 总下载量 (Gradle/CLI) | **4042** |
| 通过GitHub Pages的部署 | **485** :contentReference[oaicite:7]{index=7} |

---

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 💬  推荐语
## 推荐语

> “DNAnalyzer 将我们的变异检出周转时间从几小时缩短到几分钟。”
> — *某某教授，某某大学*

> “一个在计算生物学领域展示真实世界影响的模范学生项目。”
> — *招生官，某某学院*

_在收到更多经过验证的引言后添加。_
-->

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 👥  领导与团队  -->
<!--
## 领导与团队

| 角色 | 姓名 | 亮点 |
|------|------|------------|
| 创始人 / 首席工程师 | **Piyush Acharya** | IEEE发表作者；97%模型准确率；国家科学碗冠军 |
| 核心维护者 | Martin Gallauner · Ravina Deogadkar · Hrithik Raj | 处理功能PR、安全审查和文档 |
| 咨询支持 | 45名志愿者研究员 (微软研究院、东北大学等) | 提供领域专家代码审查和数据集审查 |
-->
---

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 🎨  架构图  -->
<!--
## 架构图

<p align="center">
  <img src="https://raw.githubusercontent.com/VerisimilitudeX/DNAnalyzer/main/assets/architecture_overview.svg" width="650" alt="DNAnalyzer 流程图">
</p>

_该图概述了设备端预处理、Transformer推理和隐私保护结果缓存。_

-->

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 🌐  社区参与  -->
## 社区参与

- **Discord** · `#genomics-ai` 频道 (80+ 成员)
- **黑客马拉松** · 主办年度Interlake生物黑客松 (50名参与者)
- **为新手开放的问题** · 标记为 `good-first-issue` 以指导新手。
- **每月发布说明** · 透明的更新日志，并提及贡献者。
---

\*每月FASTA吞吐量是根据匿名的CLI遥测数据和公共工作流日志计算的。

<!-- ────────────────────────────────────────────────────────────────── -->

<div align="center">
  <h3>项目增长</h3>
  <a href="https://star-history.com/#VerisimilitudeX/DNAnalyzer&Date">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date&theme=dark" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
      <img alt="Star历史图表" src="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
    </picture>
  </a>
</div>

<br>

<div align="center">
  <h3>支持 DNAnalyzer</h3>
  <p>每一次推荐都有助于资助我们的非营利使命</p>

  <table>
    <tr>
      <td align="center">
        <h4>23andMe</h4>
        <p>您的订单可享受<strong>10%折扣</strong><br>DNAnalyzer每次推荐可获得<strong>20美元</strong></p>
        <a href="https://refer.23andme.com/s/ruxd4" target="_blank">
          <img src="https://img.shields.io/badge/获取10%25折扣-23andMe-4285F4?style=for-the-badge" alt="23andMe推荐">
        </a>
      </td>
      <td align="center">
        <h4>Ancestry® 会员</h4>
        <p>会员资格可享受高达<strong>24%折扣</strong><br>DNAnalyzer每次推荐可获得<strong>10美元</strong></p>
        <a href="https://refer.ancestry.com/verisimilitude11!6699046cdf!a" target="_blank">
          <img src="https://img.shields.io/badge/获取24%25折扣-Ancestry-83C36D?style=for-the-badge" alt="Ancestry推荐">
        </a>
      </td>
    </tr>
  </table>
</div>
