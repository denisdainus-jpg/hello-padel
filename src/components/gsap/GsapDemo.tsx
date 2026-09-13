"use client";

import { useRef, useState, type ReactNode } from "react";
import { useGSAP, ScrollTrigger } from "./register";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type ContextSafe = <T extends Function>(fn: T) => T;
export type Setup = (root: HTMLDivElement, contextSafe: ContextSafe) => void | (() => void);

export const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => root.querySelector<T>(sel);
export const qa = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Высота шапки раздела: закреплённые блоки встают сразу под ней. */
export const navHeight = () => document.querySelector<HTMLElement>("[data-gsap-nav]")?.offsetHeight ?? 0;
export const pinStart = (extra = 12) => () => `top ${navHeight() + extra}px`;

const TONES = {
  dark: "bg-[#0A0A0A] text-white",
  light: "bg-[#FFFDF5] text-[#0A0A0A]",
  brand: "bg-[#FFD200] text-[#0A0A0A]",
} as const;

/**
 * Рамка одного эффекта. setup запускается внутри gsap.context:
 * при нажатии «Повторить» всё откатывается и запускается заново.
 */
export function GsapDemo({
  code,
  title,
  plugins,
  note,
  tone = "dark",
  scroll = false,
  bodyClassName = "",
  children,
  setup,
}: {
  code: string;
  title: string;
  plugins: string;
  note?: string;
  tone?: keyof typeof TONES;
  scroll?: boolean;
  bodyClassName?: string;
  children: ReactNode;
  setup: Setup;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);

  useGSAP(
    (_context, contextSafe) => {
      const root = bodyRef.current;
      if (!root || !contextSafe) return;
      return setup(root, contextSafe);
    },
    { scope: bodyRef, dependencies: [run], revertOnUpdate: true },
  );

  const replay = () => {
    if (scroll && sectionRef.current) {
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - navHeight() - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
    }
    setRun((r) => r + 1);
    // после перезапуска пересобираем порядок и позиции всех триггеров страницы
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }),
    );
  };

  return (
    <section ref={sectionRef} id={code} className="min-w-0 border-t-2 border-[#0A0A0A] pt-10" style={{ scrollMarginTop: 96 }}>
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full bg-[#0A0A0A] px-3 py-1.5 font-title text-xs font-extrabold text-[#FFD200]">{code}</span>
        <h2 className="font-title text-xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-2xl">{title}</h2>
        <span className="rounded-full bg-[#FFF6CC] px-2.5 py-1 text-xs font-semibold text-[#0A0A0A]">{plugins}</span>
      </div>
      {note ? <p className="mb-5 max-w-[80ch] text-sm leading-relaxed text-neutral-600">{note}</p> : null}

      <div ref={bodyRef} className={`relative min-w-0 rounded-3xl ring-1 ring-black/10 ${TONES[tone]} ${bodyClassName}`}>
        {children}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={replay}
          className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 font-title text-sm font-extrabold text-[#FFD200] transition-transform hover:scale-[1.03] active:scale-95"
        >
          <span aria-hidden="true">↻</span> Повторить
        </button>
        {scroll ? (
          <span className="text-xs font-semibold text-neutral-500">Эффект идёт от прокрутки: нажмите и листайте вниз</span>
        ) : null}
      </div>
    </section>
  );
}

export function GsapIntro({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="mb-12 mt-10 max-w-[78ch]">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">{kicker}</p>
      <h1 className="mt-2 font-title text-3xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-600">{text}</p>
    </div>
  );
}
