<div align=center>

<img width="120" height="120" alt="FavIcon" src="https://github.com/user-attachments/assets/779de607-2b8d-4751-872b-1243e97c7d18" />

# CopilotKit

<div align=center>

[Docs](https://docs.copilotkit.ai/?ref=github_readme) ·
[Examples](https://www.copilotkit.ai/examples?ref=github_readme) ·
[CopilotKit Intelligence](https://go.copilotkit.ai/enterprise-intelligence-platform) ·
[Discord](https://discord.gg/6dffbvGU3D?ref=github_readme)

</div>

构建**智能体原生（agent-native）应用** —— 不限框架，不限载体。

为 React、Angular、Vue、React Native，以及 Slack 与 Microsoft Teams 提供生成式 UI、共享状态与人机协同（human-in-the-loop）工作流。

上线生产环境时，再接入 **CopilotKit Intelligence**：富线程（rich threads）持久留存，结合生成式 UI、用户记忆，以及能从真实使用中自动学习的智能体。

</div>

[![自带智能体，任意渠道 —— CopilotKit 与 AG-UI 将任意智能体框架接入 Slack、Microsoft Teams、Discord、WhatsApp 和 Telegram，更多渠道正在规划中。](https://raw.githubusercontent.com/CopilotKit/CopilotKit/main/assets/bring-your-own-agent-any-channel.png)](https://go.copilotkit.ai/copilotkit-docs)

<div align="center" style="display:flex;justify-content:start;gap:16px;height:20px;margin: 0;">
  <a href="https://www.npmjs.com/package/@copilotkit/react-core" target="_blank">
    <img src="https://img.shields.io/npm/v/%40copilotkit%2Freact-core?logo=npm&logoColor=%23FFFFFF&label=Version&color=%236963ff" alt="NPM">
  </a>

  <a href="https://github.com/copilotkit/copilotkit/blob/main/LICENSE" target="_blank">
    <img src="https://raw.githubusercontent.com/CopilotKit/CopilotKit/main/assets/license-badge.svg" alt="License: MIT" height="20">
  </a>

  <a href="https://discord.gg/6dffbvGU3D" target="_blank">
    <img src="https://img.shields.io/discord/1122926057641742418?logo=discord&logoColor=%23FFFFFF&label=Discord&color=%236963ff" alt="Discord">
  </a>
  </div>
  <br/>
  <div align="center">
      <a href="https://trendshift.io/repositories/5730" target="_blank"><img src="https://trendshift.io/api/badge/repositories/5730" alt="CopilotKit%2FCopilotKit | Trendshift"                         style="width: 250px; height: 55px;" width="250" height="55"/>
    </a>
    <a href="https://www.producthunt.com/posts/copilotkit" target="_blank">
      <img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=428778&theme=light&period=daily">
    </a>

  </div>

---

## CopilotKit 是什么？

CopilotKit 是一个一流的 SDK，用于构建全栈智能体（agentic）应用、生成式 UI 与聊天应用。

它最初是一个 React 库，如今已成为**你的智能体与用户之间的横向连接层**：同一个智能体，既能驱动你的 Web 应用，也能驱动移动应用，以及团队的 Slack 或 Microsoft Teams 工作区。

我们正是 **[AG-UI 协议](https://github.com/ag-ui-protocol/ag-ui)** 背后的团队 —— 该协议已被 Google、LangChain、AWS、Microsoft、Mastra、PydanticAI 等采用！

## 快速开始

### 通过你的编程智能体接入

让你的编程智能体来把 CopilotKit 接入你的应用。它会检查你的项目并引导完成集成。

**把下面这段提示词交给你的编程智能体：**

```text
Help me get started with CopilotKit. From the root of my project, run this
command and follow the instructions:

npx --yes copilotkit@latest onboard start
```

### 想使用我们的智能体技能？

已经在使用 CopilotKit 或刚完成接入？添加我们的 [agent skills](https://docs.copilotkit.ai/build-with-agents?ref=github_readme)，帮助你的编程智能体构建功能、排查问题。

```bash
npx copilotkit@latest skills install
```

### 新建一个项目

在独立的目录中搭建项目，不会修改你现有的应用。

```bash
npx copilotkit@latest create
```

https://github.com/user-attachments/assets/7372b27b-8def-40fb-a11d-1f6585f556ad

## 你能构建什么

https://github.com/user-attachments/assets/72b7b4f3-b6e7-460c-a932-5746fe3c8db3

**功能特性：**

- **Chat UI（聊天界面）** – 完全可定制的聊天界面，支持消息流式输出、工具调用与智能体响应。
- **Backend Tool Rendering（后端工具渲染）** – 让智能体调用后端工具，直接在客户端渲染返回的 UI 组件。
- **Generative UI（生成式 UI）** – 让智能体能根据用户意图与智能体状态，在运行时动态生成并更新 UI 组件。
- **Shared State（共享状态）** – 一个同步的状态层，智能体与 UI 组件均可实时读取与写入。
- **Human-in-the-Loop（人机协同）** – 让智能体在执行过程中暂停，请求用户输入、确认或编辑后再继续。
- **Rich Threads（富线程）** – 对话可跨越刷新、设备与会话而留存，其中的生成式 UI 完好无损。
- **Automatic Learning（自动学习）** – 智能体从真实使用中持续改进：已完成的线程会转化为经过评审的技能（Skills），无需微调管线。

## 🪁 CopilotKit Intelligence（智能增强）

**CopilotKit Intelligence** 为你的智能体增添富线程、生成式 UI、用户记忆、产品分析、检视与自动学习能力。它兼容你现有的 CopilotKit 应用与智能体框架，既可使用我们的托管平台，也可以部署到你自己的基础设施中。

- **[Rich Threads（富线程）](https://docs.copilotkit.ai/threads?ref=github_readme)** – 对话可跨越刷新、设备与会话而留存，消息、生成式 UI 与实时运行记录都原样恢复。
- **[User Memories（用户记忆）](https://docs.copilotkit.ai/intelligence/memories?ref=github_readme)** – 跨对话持久保存的事实与偏好，按语义召回而非关键词匹配。
- **[Automatic Learning（自动学习）](https://docs.copilotkit.ai/learning?ref=github_readme)** – 已完成的线程会转化为有据可循的洞察（Insights）以及经评审、可复用的技能（Skills），由你自己发布。无需微调管线。
- **[Product Analytics（产品分析）](https://www.copilotkit.ai/copilotkit-intelligence?ref=github_readme#analytics-insights)** – 从同一份交互数据中，看清你的智能体在做什么、用户在何处获得价值。
- **[Self-hosting（私有化部署）](https://docs.copilotkit.ai/intelligence/self-hosting?ref=github_readme)** – 同一套平台，运行在你自己的 Kubernetes 集群、VPC 或数据边界之内。

各套餐包含的内容，请参阅 [Intelligence 概览](https://docs.copilotkit.ai/intelligence/overview?ref=github_readme)。

👉 **[5 分钟接入 Intelligence →](https://docs.copilotkit.ai/intelligence/quickstart?ref=github_readme)**

## 工作原理

CopilotKit 将你的 UI、智能体与工具连接进一个统一的交互闭环。

![CopilotKit 如何在一个闭环中连接你的 UI、智能体与工具](https://github.com/user-attachments/assets/6f175d86-bd22-4c26-a13a-6013654ed542)

这意味着：

- 智能体可以向用户请求输入
- 工具可以渲染 UI
- 跨步骤、跨会话的有状态工作流
- 一个智能体，部署到 Web、移动端与聊天平台

## 🧩 适配你的技术栈

一个智能体后端，覆盖所有前端。

| 平台                             | 状态                                                     | 快速上手                                                                                                                              |
| -------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ⚛️ React / Next.js               | ✅ 正式可用（GA）                                         | [快速开始](https://docs.copilotkit.ai/quickstart?ref=github_readme)                                                                  |
| 🅰️ Angular                       | ✅ 已支持                                                 | [源码与快速开始](https://github.com/CopilotKit/CopilotKit/tree/main/packages/angular)                                               |
| 💚 Vue                           | ✅ 已支持                                                 | [源码 - 快速开始即将推出](https://github.com/CopilotKit/CopilotKit/tree/main/packages/vue)                                          |
| 📱 React Native                  | ✅ 已支持                                                 | [快速开始](https://docs.copilotkit.ai/react-native?ref=github_readme)                                                               |
| 💬 Slack / Microsoft Teams       | ✅ 已支持                                                 | [渠道](https://www.copilotkit.ai/channels?ref=github_readme) · [快速开始](https://docs.copilotkit.ai/slack?ref=github_readme)      |
| 💬 Discord / WhatsApp / Telegram | ✅ 渠道 SDK 适配器（托管连接即将推出）                    | [渠道](https://www.copilotkit.ai/channels?ref=github_readme)                                                                         |
| 🔜 Google Chat / iMessage / SMS  | 🟡 已在路线图中                                           | [渠道](https://www.copilotkit.ai/channels?ref=github_readme)                                                                         |

你的智能体逻辑保持不变 —— AG-UI 负责线缆协议（wire protocol），CopilotKit 负责各框架与各渠道的 UI 层。

## 💬 渠道：一个智能体，覆盖所有聊天应用

<img width="1920" height="1080" alt="一次编写，处处运行" src="https://github.com/user-attachments/assets/883e5ede-0387-4ae8-a361-48da3adf8f22" />

**Channels SDK** 把你已经构建好的智能体直接投放到用户常驻的聊天应用中 —— 同样的工具、同样的共享状态、同样的人机协同，无需重写（**[了解更多](https://www.copilotkit.ai/channels?ref=github_readme)**）。

- **Slack** – 智能体作为一等公民的 Slack 应用：线程、工具调用与人机协同审批都在频道内完成。
- **Microsoft Teams** – 把智能体工作流带入企业级场景，也就是你所在组织本就活跃的地方。

👉 **[探索渠道 →](https://www.copilotkit.ai/channels?ref=github_readme)**

## ⭐️ useAgent 钩子

`useAgent` 钩子直接构建在 AG-UI 之上，让你对智能体连接拥有完整的编程控制能力。

```ts
// 以编程方式访问并控制你的智能体
const { agent } = useAgent({ agentId: "my_agent" });

// 渲染并更新智能体的状态
return <div>
  <h1>{agent.state.city}</h1>
  <button onClick={() => agent.setState({ city: "NYC" })}>
    Set City
  </button>
</div>
```

了解更多，请参阅 [useAgent 文档](https://docs.copilotkit.ai/programmatic-control?ref=github_readme)。

https://github.com/user-attachments/assets/67928406-8abc-49a1-a851-98018b52174f

## 生成式 UI

生成式 UI 是 CopilotKit 的核心模式之一，它允许智能体在工作流中动态渲染 UI。

https://github.com/user-attachments/assets/3cfacac0-4ffd-457a-96f9-d7951e4ab7b6

### 三种类型对比

<img width="708" height="311" alt="三种生成式 UI 类型对比" src="https://github.com/user-attachments/assets/962f49c2-31ea-43c5-b2a3-7cdde114705a" />

#### 进一步探索：

- [静态（AG-UI 协议）](https://docs.copilotkit.ai/agentic-protocols/ag-ui?ref=github_readme)
- [声明式（A2UI）](https://docs.copilotkit.ai/generative-ui/a2ui?ref=github_readme#using-a2ui-with-copilotkit)
- [开放式（MCP Apps 与 Open JSON）](https://docs.copilotkit.ai/generative-ui/mcp-apps?ref=github_readme)

[生成式 UI 教学仓库 →](https://github.com/CopilotKit/CopilotKit/tree/main/examples/showcases/generative-ui)

## 🖥️ AG-UI：智能体—用户交互协议

将智能体工作流连接到面向用户的应用，并与智能体技术栈深度合作、提供原生（1st-party）集成 —— 包括 LangChain、CrewAI、Mastra、PydanticAI 等。

[![AG-UI](https://github.com/user-attachments/assets/a625237a-cfc1-45fc-8d0c-637316b81291)](https://go.copilotkit.ai/ag-ui)

新建一个 AG-UI 智能体应用：

```bash
npx create-ag-ui-app my-agent-app
```

[在 AG-UI README 中了解更多 →](https://github.com/ag-ui-protocol/ag-ui)

## 🤝 社区

- [最新动态](https://docs.copilotkit.ai/whats-new?ref=github_readme)
<h3>有疑问或需要帮助？</h3>
  <a href="https://discord.gg/6dffbvGU3D?ref=github_readme" target="_blank">
   加入我们的 Discord →
  </a> <br />
    <a href="https://docs.copilotkit.ai/?ref=github_readme" target="_blank">
  阅读文档 →
  </a> <br />
    <a href="https://dashboard.operations.copilotkit.ai?ref=github_readme" target="_blank">
   试用 CopilotKit Intelligence →
  </a>
<h3>及时了解我们的最新发布！</h3>
  <a href="https://www.linkedin.com/company/copilotkit/" target="_blank">
   在 LinkedIn 关注我们 →
  </a> <br />
    <a href="https://x.com/copilotkit" target="_blank">
   在 X 上关注我们 →
  </a>

## 🙋🏽‍♂️ 贡献

感谢你有兴趣为 CopilotKit 做出贡献！💜

我们珍视一切贡献，无论是代码、文档、创建演示应用，还是仅仅帮忙传播。

以下是一些能帮你上手的实用资源：

- 代码贡献，请参阅 [CONTRIBUTING.md](https://github.com/CopilotKit/CopilotKit/blob/main/CONTRIBUTING.md)。
- 文档相关的贡献，请参阅 [文档贡献指南](https://docs.copilotkit.ai/contributing/docs-contributions?ref=github_readme)。
- 想贡献却不知从何入手？[加入我们的 Discord](https://discord.gg/6dffbvGU3D)，我们会帮到你！

## 📄 许可证

本仓库的源代码以 [MIT 许可证](https://github.com/CopilotKit/CopilotKit/blob/main/LICENSE) 提供。
