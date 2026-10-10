import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

import CodeBlock from "./CodeBlock";

interface Variant {
  id: string;
  label: string;
  latin: string;
  body: string;
  tradeoff: string;
  code: string;
  href: string;
}

const VARIANTS: readonly Variant[] = [
  {
    id: "static",
    label: "静态",
    latin: "AG-UI 协议",
    body: "前端先注册好一组界面组件，智能体只返回组件名与参数。组件集合可控，渲染结果可预测。",
    tradeoff: "自由度最低，治理成本最低。适合表单、列表这类结构稳定的界面。",
    code: `{
  "type": "component",
  "name": "FlightBoard",
  "props": {
    "origin": "PVG",
    "destination": "NRT"
  }
}`,
    href: "https://docs.copilotkit.ai/agentic-protocols/ag-ui",
  },
  {
    id: "declarative",
    label: "声明式",
    latin: "A2UI",
    body: "智能体返回一棵界面描述，前端按描述组装出组件树。结构由模型决定，组件由你实现。",
    tradeoff: "结构可变，组件受限。适合需要模型根据上下文调整布局的场景。",
    code: `{
  "surface": "flight_board",
  "children": [
    { "id": "title", "component": "Text" },
    { "id": "rows", "component": "DataTable", "data": "$tool.flights" }
  ]
}`,
    href: "https://docs.copilotkit.ai/generative-ui/a2ui",
  },
  {
    id: "open",
    label: "开放式",
    latin: "MCP Apps 与 Open JSON",
    body: "智能体直接返回可渲染的资源，由宿主决定如何呈现。界面能跑多远，取决于返回的内容。",
    tradeoff: "自由度最高，治理要求也最高。适合外部团队产出的界面。",
    code: `{
  "type": "resource",
  "resource": {
    "uri": "ui://booking/confirm",
    "mimeType": "text/html",
    "text": "<form>...</form>"
  }
}`,
    href: "https://docs.copilotkit.ai/generative-ui/mcp-apps",
  },
];

export default function GenUiTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const current = VARIANTS[active] ?? VARIANTS[0];
  // One panel element is reused for every tab, so every tab must point at the
  // same id; per-variant ids would leave inactive tabs referencing nothing.
  const panelId = `${baseId}-panel`;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0) return;
    e.preventDefault();
    const next = (active + delta + VARIANTS.length) % VARIANTS.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="生成式 UI 的三种类型"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {VARIANTS.map((v, i) => (
          <button
            key={v.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${baseId}-tab-${v.id}`}
            aria-selected={i === active}
            aria-controls={panelId}
            tabIndex={i === active ? 0 : -1}
            type="button"
            onClick={() => setActive(i)}
            className={`relative flex items-baseline gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors duration-200 ${
              i === active
                ? "border-transparent text-mist-50"
                : "border-white/10 text-mist-400 hover:border-white/20 hover:text-mist-100"
            }`}
          >
            {i === active && !reduce && (
              <motion.span
                layoutId="genui-tab"
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-brand-500/45 bg-brand-500/10"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            {i === active && reduce && (
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-brand-500/45 bg-brand-500/10"
              />
            )}
            <span className="relative">{v.label}</span>
            <span className="relative font-mono text-[10.5px] tracking-wider text-mist-600 uppercase">
              {v.latin}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10"
      >
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-mist-200">
                {current.body}
              </p>
              <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-mist-600">
                {current.tradeoff}
              </p>
              <a
                href={current.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand-300 transition-colors hover:text-brand-200"
              >
                阅读 {current.latin} 文档
                <ArrowUpRightIcon size={14} weight="bold" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        <CodeBlock code={current.code} filename="示意" lang="json" />
      </div>
    </div>
  );
}