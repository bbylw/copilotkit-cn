/**
 * Clipboard write with a non-secure-context fallback.
 * navigator.clipboard is unavailable on plain http origins, which still shows
 * up in local development, so keep the legacy path behind one helper instead of
 * spreading it (and its deprecation) across every component.
 */
export async function copyText(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    /* fall through to the legacy path */
  }

  const ta = document.createElement("textarea");
  ta.value = value;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    ta.remove();
  }
}