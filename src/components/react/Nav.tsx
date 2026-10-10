import { useEffect, useState } from "react";
import { GithubLogoIcon, ListIcon, XIcon } from "@phosphor-icons/react";

import { navLinks, externalLinks } from "../../data/site";

interface Props {
  currentPath: string;
}

/**
 * Always-on nav island. Deliberately does not import an animation runtime:
 * the reading-progress bar is a native CSS scroll timeline in global.css,
 * and the scroll-shaded background uses a passive listener that only toggles
 * a class, never per-frame React state.
 */
export default function Nav({ currentPath }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => root.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("is-scrolled");
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => currentPath === href;

  return (
    <header className="fixed inset-x-0 top-0 z-(--z-nav)">
      <div className="nav-bar">
        <nav aria-label="主导航" className="shell flex h-16 items-center gap-6 md:h-[72px]">
          <a
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="CopilotKit 首页"
          >
            <Mark />
            <span className="latin text-[1.0625rem] font-medium tracking-tight text-mist-50">
              CopilotKit
            </span>
          </a>

          <ul className="ml-2 hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`inline-flex h-9 items-center rounded-full px-3.5 text-sm transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-white/6 text-mist-50"
                      : "text-mist-400 hover:bg-white/4 hover:text-mist-50"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={externalLinks.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="CopilotKit GitHub 仓库"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-mist-400 transition-colors duration-200 hover:bg-white/6 hover:text-mist-50 sm:flex"
            >
              <GithubLogoIcon size={19} weight="fill" />
            </a>
            <a href="/quickstart" className="cta cta-primary btn-sm hidden sm:inline-flex">
              快速开始
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "关闭菜单" : "打开菜单"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-mist-200 transition-colors duration-200 hover:bg-white/6 md:hidden"
            >
              {open ? <XIcon size={20} /> : <ListIcon size={20} />}
            </button>
          </div>
        </nav>
        <div className="relative h-px w-full">
          <span className="progress-bar absolute inset-y-0 left-0 block h-px w-full bg-brand-500" />
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="menu-enter border-b border-white/8 bg-ink-950/95 backdrop-blur-xl md:hidden"
        >
          <ul className="shell flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 border-b border-white/6 py-4 last:border-b-0"
                >
                  <span className="text-[0.9375rem] text-mist-50">{link.label}</span>
                  <span className="text-[0.8125rem] text-mist-600">{link.description}</span>
                </a>
              </li>
            ))}
            <li className="flex gap-2 pt-4 pb-2">
              <a href="/quickstart" className="cta cta-primary btn-md flex-1">
                快速开始
              </a>
              <a
                href={externalLinks.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub 仓库"
                className="cta cta-ghost btn-md w-12 px-0"
              >
                <GithubLogoIcon size={18} weight="fill" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/** Official kite mark (same file as the Astro BrandMark), so the island
    ships zero extra requests beyond the shared cached image. */
function Mark() {
  return (
    <img
      src="/images/copilotkit-kite.png"
      alt=""
      width={256}
      height={256}
      decoding="async"
      style={{ width: 28, height: 28 }}
      aria-hidden="true"
    />
  );
}