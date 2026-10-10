export const site = {
  name: "CopilotKit",
  nameZh: "CopilotKit",
  tagline: "智能体原生应用的横向连接层",
  description:
    "CopilotKit 是构建智能体原生应用的 SDK,为 React、Vue、Angular、React Native、Slack 与 Microsoft Teams 提供生成式 UI、共享状态与人机协同工作流。",
  locale: "zh_CN",
  url: "https://copilotkit.cn",
  license: "MIT",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  description: string;
}

export const navLinks: readonly NavLink[] = [
  { label: "快速开始", href: "/quickstart", description: "三条路径接入你的项目" },
  { label: "Intelligence", href: "/intelligence", description: "富线程、记忆与自动学习" },
  { label: "渠道", href: "/channels", description: "把智能体投放到聊天应用" },
];

export const externalLinks = {
  docs: "https://docs.copilotkit.ai",
  github: "https://github.com/CopilotKit/CopilotKit",
  discord: "https://discord.gg/6dffbvGU3D",
  npm: "https://www.npmjs.com/package/@copilotkit/react-core",
  agui: "https://github.com/ag-ui-protocol/ag-ui",
  examples: "https://www.copilotkit.ai/examples",
  license: "https://github.com/CopilotKit/CopilotKit/blob/main/LICENSE",
} as const;

export interface FooterColumn {
  title: string;
  links: readonly NavLink[];
}

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "产品",
    links: [
      { label: "快速开始", href: "/quickstart", description: "接入 CopilotKit" },
      { label: "Intelligence", href: "/intelligence", description: "智能增强平台" },
      { label: "渠道", href: "/channels", description: "Slack、Teams 等聊天应用" },
    ],
  },
  {
    title: "开发者",
    links: [
      { label: "官方文档", href: externalLinks.docs, external: true, description: "docs.copilotkit.ai" },
      { label: "示例仓库", href: externalLinks.examples, external: true, description: "可运行的完整案例" },
      { label: "AG-UI 协议", href: externalLinks.agui, external: true, description: "智能体与用户交互协议" },
    ],
  },
  {
    title: "社区",
    links: [
      { label: "GitHub", href: externalLinks.github, external: true, description: "源码与贡献" },
      { label: "Discord", href: externalLinks.discord, external: true, description: "提问与交流" },
      { label: "npm 包", href: externalLinks.npm, external: true, description: "@copilotkit/react-core" },
    ],
  },
];