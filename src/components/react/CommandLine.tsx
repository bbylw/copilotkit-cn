import { useCallback, useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

import { copyText } from "../../lib/clipboard";

interface Props {
  code: string;
  hint?: string;
}

export default function CommandLine({ code, hint }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await copyText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-850/70">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="select-none font-mono text-xs text-mist-600" aria-hidden="true">
          $
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[0.8125rem] whitespace-nowrap text-mist-100">
          {code}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "已复制命令" : "复制命令"}
          className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[11px] text-mist-400 transition-colors duration-200 hover:bg-white/6 hover:text-mist-100"
        >
          {copied ? <CheckIcon size={13} weight="bold" /> : <CopyIcon size={13} />}
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      {hint && (
        <p className="border-t border-white/6 px-3 py-2 text-[11px] text-mist-600">{hint}</p>
      )}
    </div>
  );
}