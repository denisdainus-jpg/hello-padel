"use client";

import { useEffect, useRef } from "react";
import { BOT } from "@/lib/content";

/** Липкая кнопка покупки на телефоне: прячется, когда виден финальный призыв. */
export function MobileBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    const fin = document.querySelector(".final");
    if (!bar || !fin) return;
    const onScroll = () => {
      const r = fin.getBoundingClientRect();
      bar.style.transform = r.top < window.innerHeight - 80 ? "translateY(140%)" : "none";
      bar.style.transition = "transform .3s cubic-bezier(.16,1,.3,1)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="mobar" ref={ref}>
      <a className="btn" href={BOT}>
        Купить доступ — от 2 990 ₽
      </a>
    </div>
  );
}
