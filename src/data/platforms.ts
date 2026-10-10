import { externalLinks } from "./site";

export type PlatformStatus = "ga" | "supported" | "adapter" | "roadmap";

export interface Platform {
  platform: string;
  status: PlatformStatus;
  statusLabel: string;
  /** Short form used on narrow screens. */
  statusLabelCompact: string;
  action: string;
  href: string;
  external: boolean;
}

export const statusMeta: Record<PlatformStatus, { dot: string; ring: string; text: string }> = {
  ga: {
    dot: "bg-brand-400",
    ring: "ring-brand-500/30",
    text: "text-brand-300",
  },
  supported: {
    dot: "bg-mist-200",
    ring: "ring-mist-50/25",
    text: "text-mist-200",
  },
  adapter: {
    dot: "bg-mist-400",
    ring: "ring-mist-50/15",
    text: "text-mist-400",
  },
  roadmap: {
    dot: "border border-dashed border-mist-600 bg-transparent",
    ring: "ring-mist-50/10",
    text: "text-mist-400",
  },
};

export const platforms: readonly Platform[] = [
  {
    platform: "React / Next.js",
    status: "ga",
    statusLabel: "正式可用",
    statusLabelCompact: "GA",
    action: "快速开始",
    href: "https://docs.copilotkit.ai/quickstart",
    external: true,
  },
  {
    platform: "Angular",
    status: "supported",
    statusLabel: "已支持",
    statusLabelCompact: "已支持",
    action: "查看源码",
    href: "https://github.com/CopilotKit/CopilotKit/tree/main/packages/angular",
    external: true,
  },
  {
    platform: "Vue",
    status: "supported",
    statusLabel: "已支持",
    statusLabelCompact: "已支持",
    action: "查看源码",
    href: "https://github.com/CopilotKit/CopilotKit/tree/main/packages/vue",
    external: true,
  },
  {
    platform: "React Native",
    status: "supported",
    statusLabel: "已支持",
    statusLabelCompact: "已支持",
    action: "快速开始",
    href: "https://docs.copilotkit.ai/react-native",
    external: true,
  },
  {
    platform: "Slack / Microsoft Teams",
    status: "supported",
    statusLabel: "已支持",
    statusLabelCompact: "已支持",
    action: "渠道文档",
    href: "https://docs.copilotkit.ai/slack",
    external: true,
  },
  {
    platform: "Discord / WhatsApp / Telegram",
    status: "adapter",
    statusLabel: "渠道 SDK 适配器，托管连接即将推出",
    statusLabelCompact: "适配器",
    action: "渠道文档",
    href: "https://www.copilotkit.ai/channels",
    external: true,
  },
  {
    platform: "Google Chat / iMessage / SMS",
    status: "roadmap",
    statusLabel: "已在路线图中",
    statusLabelCompact: "路线图",
    action: "渠道路线图",
    href: "https://www.copilotkit.ai/channels",
    external: true,
  },
];

export const frameworkNote = {
  text: "你的智能体逻辑保持不变。AG-UI 负责线缆协议，CopilotKit 负责各框架与各渠道的界面层。",
  href: externalLinks.agui,
  linkLabel: "了解 AG-UI 协议",
};