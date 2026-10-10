import type { PlatformStatus } from "./platforms";

export interface Channel {
  /** Short mono badge, doubles as the row key. */
  badge: string;
  name: string;
  body: string;
  status: PlatformStatus;
  statusLabel: string;
  live: boolean;
  /** Official docs page for this channel, when one exists. */
  docs?: string;
}

export const channels: readonly Channel[] = [
  {
    badge: "SLACK",
    name: "Slack",
    body: "智能体作为一等公民的 Slack 应用，线程、工具调用与审批都在频道内完成。",
    status: "supported",
    statusLabel: "已支持",
    live: true,
    docs: "https://docs.copilotkit.ai/slack",
  },
  {
    badge: "TEAMS",
    name: "Microsoft Teams",
    body: "把智能体工作流带进企业级场景，也就是组织本就活跃的地方。",
    status: "supported",
    statusLabel: "已支持",
    live: true,
    docs: "https://docs.copilotkit.ai/teams",
  },
  {
    badge: "DISCORD",
    name: "Discord",
    body: "同样的工具、同样的共享状态、同样的审批流，不需要重写智能体。",
    status: "adapter",
    statusLabel: "SDK 适配器可用，托管连接即将推出",
    live: false,
  },
  {
    badge: "WHATSAPP",
    name: "WhatsApp",
    body: "直接接入已有会话，面向终端用户的场景不需要再做一个应用壳。",
    status: "adapter",
    statusLabel: "SDK 适配器可用，托管连接即将推出",
    live: false,
  },
  {
    badge: "TELEGRAM",
    name: "Telegram",
    body: "轻量渠道，适合通知、审批与一对一的任务确认。",
    status: "adapter",
    statusLabel: "SDK 适配器可用，托管连接即将推出",
    live: false,
  },
];

export const channelRoadmap = [
  { name: "Google Chat", body: "面向 Google Workspace 的企业渠道。" },
  { name: "iMessage", body: "接入 iOS 设备上的原生消息入口。" },
  { name: "SMS", body: "为已经离开应用的用户保留一条最短路径。" },
] as const;

export const channelPremise = {
  headline: "一次编写，处处运行",
  body: "Channels SDK 把你已经构建好的智能体直接投放到用户常驻的聊天应用。同样的工具、同样的共享状态、同样的人机协同，不需要重写。",
} as const;