"use client";

import { useEffect, useRef, useState } from "react";
import { ACADEMY_COUNTERS } from "@/lib/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLBaseElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    setShown(0);
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          obs.unobserve(en.target);
          let start: number | null = null;
          const dur = 1200;
          const step = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min(1, (ts - start) / dur);
            setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <b className="eco-count" ref={ref}>
      {shown.toLocaleString("ru-RU")}
      {suffix}
    </b>
  );
}

export function AcademyCounters() {
  return (
    <div className="eco-block eco-counters">
      {ACADEMY_COUNTERS.map((c) => (
        <div key={c.label} className={c.hero ? "hero" : undefined}>
          <Counter value={c.value} suffix={c.suffix} />
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  );
}
