import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowClockwiseIcon,
  CheckCircleIcon,
  PaperPlaneTiltIcon,
  SpinnerGapIcon,
  WrenchIcon,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ types */

interface Flight {
  code: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  price: number;
  recommended?: boolean;
}

type Entry =
  | { id: number; kind: "user"; text: string }
  | { id: number; kind: "assistant"; text: string; streaming?: boolean }
  | { id: number; kind: "thinking" }
  | { id: number; kind: "tool"; label: string; args: string }
  | { id: number; kind: "flights"; flights: readonly Flight[] }
  | { id: number; kind: "state"; city: string }
  | { id: number; kind: "approval"; title: string; detail: string }
  | { id: number; kind: "notice"; text: string }
  | { id: number; kind: "error"; text: string };

type Status = "idle" | "running" | "awaiting" | "done";

/** Distributes over the union so each variant keeps its own fields. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type StepEntry = DistributiveOmit<Entry, "id">;

interface Step {
  wait: number;
  entry: StepEntry;
}

/* ------------------------------------------------------------------ data */

const PROMPTS = [
  "找上海飞东京的航班，顺便给个建议",
  "把共享状态里的城市改成杭州",
  "用一句话说明共享状态能解决什么",
] as const;

const FLIGHTS: readonly Flight[] = [
  {
    code: "MU523",
    from: "浦东 T1",
    to: "成田 T1",
    depart: "09:15",
    arrive: "13:05",
    duration: "3 小时 50 分",
    price: 1980,
    recommended: true,
  },
  {
    code: "CA929",
    from: "浦东 T2",
    to: "羽田 T3",
    depart: "14:40",
    arrive: "18:20",
    duration: "3 小时 40 分",
    price: 1640,
  },
  {
    code: "JL876",
    from: "浦东 T2",
    to: "成田 T1",
    depart: "21:30",
    arrive: "00:55",
    duration: "3 小时 25 分",
    price: 1420,
  },
];

const SCRIPTS: Record<string, Step[]> = {
  [PROMPTS[0]]: [
    { wait: 260, entry: { kind: "assistant", text: "我先查一下上海浦东到东京成田的直飞航班。" } },
    {
      wait: 900,
      entry: { kind: "tool", label: "searchFlights", args: '{ from: "PVG", to: "NRT", cabin: "economy" }' },
    },
    { wait: 780, entry: { kind: "flights", flights: FLIGHTS } },
    {
      wait: 700,
      entry: {
        kind: "assistant",
        text: "MU523 上午出发，落地时间适合接续下午的会议，我把它标为推荐项。",
      },
    },
    {
      wait: 620,
      entry: {
        kind: "approval",
        title: "确认使用推荐舱位下单？",
        detail: "MU523 · 经济舱 · 2 位乘客 · ¥3,960",
      },
    },
  ],
  [PROMPTS[1]]: [
    { wait: 260, entry: { kind: "assistant", text: "好的，我把状态里的城市改写一下。" } },
    {
      wait: 820,
      entry: { kind: "tool", label: "setState", args: '{ city: "杭州" }' },
    },
    { wait: 720, entry: { kind: "state", city: "杭州" } },
    {
      wait: 640,
      entry: { kind: "assistant", text: "状态已更新，所有订阅这个字段的组件都会立刻拿到新值。" },
    },
  ],
  [PROMPTS[2]]: [
    {
      wait: 300,
      entry: {
        kind: "assistant",
        text: "共享状态让智能体和界面读到同一份数据：智能体写入，界面同步渲染，不需要额外的事件通道。",
      },
    },
  ],
};

/* ------------------------------------------------------------------ logic */

let seq = 0;
const nextId = () => ++seq;

export default function AgentPlayground() {
  const reduce = useReducedMotion();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setEntries([]);
    setStatus("idle");
    setDraft("");
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(
    (prompt: string, script: Step[]) => {
      clearTimers();
      setEntries([
        { id: nextId(), kind: "user", text: prompt },
        { id: nextId(), kind: "thinking" },
      ]);
      setStatus("running");

      const dropThinking = (prev: Entry[]) => prev.filter((e) => e.kind !== "thinking");

      let delay = 0;
      script.forEach((step, i) => {
        delay += reduce ? 90 : step.wait;
        timers.current.push(
          setTimeout(() => {
            const isLast = i === script.length - 1;
            if (step.entry.kind === "approval") setStatus("awaiting");
            if (isLast && step.entry.kind !== "approval") setStatus("done");

            if (step.entry.kind === "assistant") {
              const full = step.entry.text;
              if (reduce) {
                setEntries((prev) => [...dropThinking(prev), { id: nextId(), kind: "assistant", text: full }]);
                return;
              }
              const bubbleId = nextId();
              setEntries((prev) => [
                ...dropThinking(prev),
                { id: bubbleId, kind: "assistant", text: "", streaming: true },
              ]);
              let i = 0;
              const type = () => {
                i += 1;
                setEntries((prev) =>
                  prev.map((e) =>
                    e.id === bubbleId
                      ? {
                          ...e,
                          text: full.slice(0, i),
                          streaming: i < full.length,
                        }
                      : e,
                  ),
                );
                if (i < full.length) timers.current.push(setTimeout(type, 22));
              };
              timers.current.push(setTimeout(type, 120));
              return;
            }

            setEntries((prev) => [...dropThinking(prev), { id: nextId(), ...step.entry } as Entry]);
          }, delay),
        );
      });
    },
    [clearTimers, reduce],
  );

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value) return;
      const script = SCRIPTS[value];
      if (!script) {
        setEntries((prev) => [
          ...prev,
          { id: nextId(), kind: "error", text: "这个页面是离线演示，只覆盖三个预设场景，请从上面的示例里选一个。" },
        ]);
        setStatus("idle");
        return;
      }
      run(value, script);
    },
    [run],
  );

  const decide = useCallback(
    (choice: "approve" | "edit") => {
      clearTimers();
      setStatus("done");
      setEntries((prev) => [
        ...prev,
        ...(choice === "approve"
          ? [
              {
                id: nextId(),
                kind: "notice" as const,
                text: "已确认。订单草稿已生成，真实应用里这一步会写入后端。",
              },
              {
                id: nextId(),
                kind: "assistant" as const,
                text: "草稿建好了，确认前我随时可以改。",
              },
            ]
          : [
              {
                id: nextId(),
                kind: "notice" as const,
                text: "已打开编辑表单，智能体在这里暂停等待你的输入。",
              },
            ]),
      ]);
    },
    [clearTimers],
  );

  useEffect(() => {
    const el = scrollRef.current;
    const live = liveRef.current;
    if (!el || !live) return;
    // The region is aria-atomic, so rewriting it mid-stream would make screen
    // readers re-announce the whole transcript on every typed character.
    const streaming = entries.some((e) => e.kind === "assistant" && e.streaming);
    if (!streaming) live.textContent = entries.map(describe).join(" ");
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [entries, reduce]);

  const busy = status === "running";
  const active = status === "running" || status === "awaiting";

  return (
    <div
      className={`surface overflow-hidden rounded-2xl transition-shadow duration-500 ${
        active ? "shadow-[0_0_0_1px_rgba(105,99,255,0.35),0_0_44px_-12px_rgba(105,99,255,0.45)]" : ""
      }`}
    >
      <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3 md:px-5">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
        <span className="text-sm text-mist-200">研究助手</span>
        <span className="pill hidden sm:inline-flex">agentId: research_agent</span>
        <span className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-mist-400 transition-colors hover:bg-white/6 hover:text-mist-100"
          >
            <ArrowClockwiseIcon size={14} weight="bold" />
            重置
          </button>
        </span>
      </div>

      <div ref={scrollRef} className="h-[22rem] overflow-y-auto px-4 py-4 md:h-[24rem] md:px-5">
        <div ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" />

        {entries.length === 0 ? (
          <EmptyState onPick={(p) => submit(p)} />
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {entries.map((e) => (
                <motion.li
                  key={e.id}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Row entry={e} onDecide={decide} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <div className="border-t border-white/8 px-4 py-3 md:px-5">
        <div className="flex flex-wrap gap-2">
          {entries.length > 0 &&
            PROMPTS.map((p, i) => (
              <button
                key={p}
                type="button"
                disabled={busy}
                onClick={() => submit(p)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist-400 transition-colors duration-200 hover:border-brand-500/50 hover:text-mist-100 disabled:pointer-events-none disabled:opacity-40"
              >
                {`示例 ${i + 1}`}
              </button>
            ))}
        </div>

        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(ev) => {
            ev.preventDefault();
            submit(draft);
          }}
        >
          <label htmlFor="agent-draft" className="sr-only">
            向研究助手发送消息
          </label>
          <input
            id="agent-draft"
            value={draft}
            onChange={(ev) => setDraft(ev.target.value)}
            placeholder="输入消息，或从上方示例中选一个"
            autoComplete="off"
            className="h-10 min-w-0 flex-1 rounded-full border border-white/10 bg-ink-850 px-4 text-sm text-mist-50 placeholder:text-mist-600 focus:border-brand-500/60 focus:outline-none focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={busy || draft.trim().length === 0}
            aria-label="发送"
            className="cta cta-primary h-10 w-10 shrink-0 disabled:pointer-events-none disabled:opacity-40"
          >
            {busy ? (
              <SpinnerGapIcon size={16} className="animate-spin" />
            ) : (
              <PaperPlaneTiltIcon size={16} weight="fill" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ views */

function EmptyState({ onPick }: { onPick: (p: string) => void }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5 py-2">
      <div>
        <p className="text-sm text-mist-200">还没有对话。选一个场景跑一遍。</p>
        <p className="mt-1 max-w-[46ch] text-xs leading-relaxed text-mist-600">
          这是一个真实运行的最小回路：工具调用、生成式界面、共享状态与人机协同审批。
        </p>
      </div>
      <ul className="space-y-1.5">
        {PROMPTS.map((p, i) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => onPick(p)}
              className="group flex w-full items-center gap-3 rounded-xl border border-white/8 bg-ink-850/60 px-3.5 py-3 text-left text-sm text-mist-200 transition-colors duration-200 hover:border-brand-500/40 hover:bg-ink-800"
            >
              <span className="mono-label w-6 shrink-0 text-mist-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{p}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({
  entry,
  onDecide,
}: {
  entry: Entry;
  onDecide: (c: "approve" | "edit") => void;
}) {
  switch (entry.kind) {
    case "user":
      return (
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-500/15 px-3.5 py-2.5 text-sm leading-relaxed text-mist-50">
            {entry.text}
          </p>
        </div>
      );

    case "assistant":
      return (
        <div className="flex items-start gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
          <p className="max-w-[42ch] text-sm leading-relaxed text-mist-200">
            {entry.text}
            {entry.streaming && (
              <span className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-brand-400" />
            )}
          </p>
        </div>
      );

    case "thinking":
      return (
        <div className="flex items-center gap-2.5" aria-hidden="true">
          <span className="mt-0 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/70" />
          <span className="flex items-center gap-1.5 py-1" role="presentation">
            {[0, 1, 2].map((d) => (
              <span key={d} className="thinking-dot h-1.5 w-1.5 rounded-full bg-mist-400" />
            ))}
          </span>
        </div>
      );

    case "tool":
      return (
        <div className="flex items-center gap-2 overflow-hidden rounded-xl border border-white/8 bg-ink-850/70 px-3 py-2">
          <WrenchIcon size={14} className="shrink-0 text-mist-600" aria-hidden="true" />
          <code className="truncate text-xs text-mist-400">
            <span className="text-mist-200">{entry.label}</span>
            <span className="text-mist-600">{entry.args}</span>
          </code>
          <CheckCircleIcon size={14} weight="fill" className="ml-auto shrink-0 text-brand-400" aria-label="调用完成" />
        </div>
      );

    case "flights":
      return <FlightBoard flights={entry.flights} />;

    case "state":
      return (
        <div className="rounded-xl border border-brand-500/25 bg-brand-500/8 p-3.5">
          <p className="label">共享状态已刷新</p>
          <dl className="mt-2.5 flex flex-wrap gap-x-6 gap-y-1.5 text-xs">
            {[
              ["city", entry.city],
              ["passengers", "2"],
              ["cabin", "economy"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-1.5">
                <dt className="text-mist-600">{k}</dt>
                <dd className="text-mist-100">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case "approval":
      return (
        <div className="rounded-xl border border-white/12 bg-ink-800 p-3.5">
          <p className="text-sm text-mist-50">{entry.title}</p>
          <p className="mt-1 text-xs text-mist-400">{entry.detail}</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => onDecide("approve")} className="cta cta-primary btn-sm">
              确认
            </button>
            <button type="button" onClick={() => onDecide("edit")} className="cta cta-ghost btn-sm">
              修改
            </button>
          </div>
        </div>
      );

    case "notice":
      return (
        <p className="rounded-xl border border-white/8 bg-ink-850/60 px-3.5 py-2.5 text-xs leading-relaxed text-mist-400">
          {entry.text}
        </p>
      );

    case "error":
      return (
        <p
          role="alert"
          className="rounded-xl border border-dashed border-white/20 bg-ink-850/60 px-3.5 py-2.5 text-xs leading-relaxed text-mist-300"
        >
          {entry.text}
        </p>
      );
  }
}

function FlightBoard({ flights }: { flights: readonly Flight[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-850/70">
      <div className="flex items-center gap-2 border-b border-white/8 px-3.5 py-2">
        <span className="label-muted">航班比价面板</span>
        <span className="pill cjk-safe ml-auto">示例数据</span>
      </div>
      <ul className="divide-y divide-white/6">
        {flights.map((f) => (
          <li
            key={f.code}
            className={`grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-3.5 py-3 sm:grid-cols-[auto_1fr_auto] ${
              f.recommended ? "bg-brand-500/8" : ""
            }`}
          >
            <span className="mono-label text-mist-200">{f.code}</span>
            <span className="col-span-2 text-xs text-mist-400 sm:col-span-1">
              {f.depart}
              <span className="mx-1.5 text-mist-600">{f.from}</span>
              <span className="mx-1.5 text-mist-600">→</span>
              {f.arrive}
              <span className="ml-1.5 text-mist-600">{f.to}</span>
              <span className="ml-2 text-mist-600">{f.duration}</span>
            </span>
            <span className="text-right text-sm text-mist-50 tabular-nums">
              ¥{f.price.toLocaleString("zh-CN")}
              {f.recommended && (
                <span className="ml-2 align-middle text-[10px] text-brand-300">推荐</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function describe(e: Entry): string {
  switch (e.kind) {
    case "user":
      return `你说：${e.text}`;
    case "assistant":
      return `助手：${e.text}`;
    case "thinking":
      return "助手正在思考。";
    case "tool":
      return `调用工具 ${e.label}`;
    case "flights":
      return "渲染了航班比价面板，共 3 个结果，数据为示例。";
    case "state":
      return `共享状态已更新，city 变成 ${e.city}。`;
    case "approval":
      return `等待确认：${e.title}`;
    case "notice":
      return e.text;
    case "error":
      return e.text;
  }
}