export interface Feature {
  /** Chinese display name. */
  title: string;
  /** Latin / protocol name shown as the small lead-in. */
  kicker: string;
  /** One sentence, plain language, no marketing fluff. */
  body: string;
  /** Visual treatment so the cards keep their identity in a uniform grid. */
  treatment: "grid" | "glow" | "dots" | "flat" | "rail" | "corner" | "stripes";
}

export const features: readonly Feature[] = [
  {
    kicker: "Chat UI",
    title: "聊天界面",
    body: "完全可定制的聊天界面，支持消息流式输出、工具调用与智能体响应。",
    treatment: "grid",
  },
  {
    kicker: "Generative UI",
    title: "生成式 UI",
    body: "智能体根据用户意图与自身状态，在运行时动态生成并更新界面组件。",
    treatment: "glow",
  },
  {
    kicker: "Backend Tool Rendering",
    title: "后端工具渲染",
    body: "智能体调用后端工具，把返回的组件直接渲染到客户端。",
    treatment: "dots",
  },
  {
    kicker: "Shared State",
    title: "共享状态",
    body: "一个同步的状态层，智能体与界面组件都能实时读取与写入。",
    treatment: "flat",
  },
  {
    kicker: "Human-in-the-Loop",
    title: "人机协同",
    body: "智能体在执行途中暂停，请求确认或编辑后再继续下一步。",
    treatment: "corner",
  },
  {
    kicker: "Rich Threads",
    title: "富线程",
    body: "对话跨越刷新、设备与会话留存，其中生成式界面完好无损。",
    treatment: "stripes",
  },
  {
    kicker: "Automatic Learning",
    title: "自动学习",
    body: "已完成的线程转化为经过评审的技能，不需要微调管线。",
    treatment: "rail",
  },
];