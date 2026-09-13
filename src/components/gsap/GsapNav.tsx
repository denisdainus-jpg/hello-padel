"use client";

import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/gsap/", label: "Обзор" },
  { href: "/gsap/text/", label: "Текст" },
  { href: "/gsap/scroll/", label: "Прокрутка" },
  { href: "/gsap/motion/", label: "Движение" },
  { href: "/gsap/svg/", label: "SVG и линии" },
];

/* Обычные ссылки, а не <Link>: полная перезагрузка сбрасывает закреплённые блоки прошлой страницы. */
export function GsapNav() {
  const path = (usePathname() || "/").replace(/\/?$/, "/");

  return (
    <header data-gsap-nav className="sticky top-0 z-50 border-b border-black/10 bg-[#FFFDF5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-5">
        <b className="font-title text-base font-extrabold text-[#0A0A0A]">
          GSAP <span className="font-body font-semibold text-neutral-400">· эффекты</span>
        </b>
        <nav className="flex flex-wrap gap-1.5 text-sm font-semibold">
          {LINKS.map((l) => {
            const on = path === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 ring-1 ring-black/10 ${
                  on ? "bg-[#0A0A0A] text-[#FFD200]" : "bg-white text-[#0A0A0A] hover:bg-[#FFD200]"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex gap-3 text-xs font-semibold text-neutral-500">
          <a href="/effects/" className="hover:text-[#0A0A0A]">Эффекты</a>
          <a href="/components-demo-2/" className="hover:text-[#0A0A0A]">Витрина 2</a>
          <a href="/" className="hover:text-[#0A0A0A]">Сайт</a>
        </div>
      </div>
    </header>
  );
}
