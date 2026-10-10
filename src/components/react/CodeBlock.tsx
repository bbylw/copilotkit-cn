import { useCallback, useMemo, useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

import { copyText } from "../../lib/clipboard";

/* ------------------------------------------------------------- tokenizer */
/* One-hue highlighter: structure in cool greys, everything semantic in the
   single brand hue. Keeps the accent lock intact inside code blocks. */

type TokenKind = "plain" | "comment" | "string" | "number" | "keyword" | "fn" | "tag" | "prop";

const KEYWORDS = new Set([
  "import", "from", "export", "default", "const", "let", "var", "function", "return",
  "await", "async", "new", "class", "extends", "interface", "type", "as", "if", "else",
  "for", "of", "in", "while", "try", "catch", "finally", "throw", "null", "undefined",
  "true", "false", "this", "void", "yield", "static", "readonly", "public", "private",
]);

const BUILTINS = new Set(["useAgent", "CopilotKitProvider", "useCopilotAction", "useState", "useEffect", "console"]);

const TOKEN_RE =
  /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;

const CLASS: Record<TokenKind, string> = {
  plain: "",
  comment: "text-mist-600 italic",
  string: "text-brand-300",
  number: "text-mist-200",
  keyword: "text-brand-400",
  fn: "text-mist-50",
  tag: "text-mist-200",
  prop: "text-mist-400",
};

function tokenize(code: string): { kind: TokenKind; value: string }[] {
  const out: { kind: TokenKind; value: string }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) out.push({ kind: "plain", value: code.slice(last, m.index) });
    const [full, comment, str, num, word] = m;

    if (comment) out.push({ kind: "comment", value: comment });
    else if (str) out.push({ kind: "string", value: str });
    else if (num) out.push({ kind: "number", value: num });
    else if (word) {
      const next = code.slice(m.index + full.length).match(/^\s*\(/);
      if (KEYWORDS.has(word)) out.push({ kind: "keyword", value: word });
      else if (next || BUILTINS.has(word)) out.push({ kind: "fn", value: word });
      else if (/^[A-Z]/.test(word)) out.push({ kind: "tag", value: word });
      else out.push({ kind: "prop", value: word });
    }
    last = m.index + full.length;
  }
  if (last < code.length) out.push({ kind: "plain", value: code.slice(last) });
  return out;
}

/* -------------------------------------------------------------- component */

export interface Snippet {
  label: string;
  code: string;
  lang?: string;
}

interface Props {
  code: string;
  lang?: string;
  filename?: string;
  snippets?: readonly Snippet[];
}

export default function CodeBlock({ code, lang, filename, snippets }: Props) {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);

  const source = snippets ? (snippets[Math.min(active, snippets.length - 1)]?.code ?? code) : code;
  const language = snippets ? snippets[Math.min(active, snippets.length - 1)]?.lang : lang;
  const tokens = useMemo(() => tokenize(source), [source]);

  const copy = useCallback(async () => {
    await copyText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [source]);

  const lineCount = source.split("\n").length;

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
      <figcaption className="flex items-center gap-2 border-b border-white/8 bg-ink-850/60 px-3.5 py-2">
        {snippets ? (
          <div className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {snippets.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider transition-colors duration-200 ${
                  i === active
                    ? "bg-brand-500/15 text-brand-300"
                    : "text-mist-600 hover:text-mist-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : (
          <span
            className={
              /[一-鿿]/.test(filename ?? language ?? "code")
                ? "cjk-safe text-[11px] tracking-[0.06em] text-mist-600"
                : "font-mono text-[11px] tracking-widest text-mist-600 uppercase"
            }
          >
            {filename ?? language ?? "code"}
          </span>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "已复制" : "复制代码"}
          className="ml-auto inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[11px] text-mist-400 transition-colors duration-200 hover:bg-white/6 hover:text-mist-100"
        >
          {copied ? <CheckIcon size={13} weight="bold" /> : <CopyIcon size={13} />}
          {copied ? "已复制" : "复制"}
        </button>
      </figcaption>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-11 border-r border-white/6 bg-ink-850/40 py-4 text-right font-mono text-[11px] leading-[20px] text-mist-600 tabular-nums select-none"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="overflow-x-auto py-4 pl-14 pr-4 font-mono text-[12.5px] leading-[1.6]">
          <code>
            {tokens.map((t, i) => (
              <span key={i} className={CLASS[t.kind]}>
                {t.value}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </figure>
  );
}