"use client";

import { useEffect, useRef, useState } from "react";
import { MODULES } from "@/lib/content";

type Conf = { dist: number; vel: number; sens: number; x: number; y: number; rot: number; scale: number };

const conf = (w: number): Conf =>
  w < 640
    ? { dist: 120, vel: 500, sens: 180, x: 132, y: 18, rot: 7, scale: 0.07 }
    : w < 1024
      ? { dist: 160, vel: 650, sens: 220, x: 196, y: 26, rot: 8, scale: 0.09 }
      : { dist: 200, vel: 800, sens: 250, x: 268, y: 34, rot: 9, scale: 0.11 };

/** Стопка карточек модулей с перетаскиванием и пружинной доводкой.
 *  Математика перенесена из статической версии один в один. */
export function ModuleCarousel() {
  const carRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const car = carRef.current;
    const stage = stageRef.current;
    const surface = surfaceRef.current;
    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;
    if (!car || !stage || !surface || !prevBtn || !nextBtn) return;

    const cards = Array.from(stage.querySelectorAll<HTMLElement>(".mcard"));
    const total = cards.length;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let cfg = conf(window.innerWidth);
    let progress = 0;
    let raf: number | null = null;
    let shownIdx = -1;

    const caption = () => {
      const i = ((Math.round(progress) % total) + total) % total;
      if (i === shownIdx) return;
      shownIdx = i;
      setIdx(i);
    };

    const render = () => {
      for (let i = 0; i < total; i++) {
        let d = (i - progress) % total;
        if (d > total / 2) d -= total;
        if (d < -total / 2) d += total;
        const a = Math.abs(d);
        const x = d * cfg.x;
        const y = a < 0.05 ? 0 : a * cfg.y;
        const rot = a < 0.05 ? 0 : d * cfg.rot;
        const sc = 1 - a * cfg.scale;
        const half = total / 2;
        const op = a >= half ? 0 : a > half - 0.5 ? (half - a) / 0.5 : 1;
        const el = cards[i];
        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg) scale(${sc})`;
        el.style.opacity = String(op);
        el.style.zIndex = String(Math.round(100 - a * 10));
        const veil = el.querySelector<HTMLElement>(".mcard-veil");
        if (veil) veil.style.opacity = String(Math.min(0.5, a * 0.25));
      }
      caption();
    };

    const springTo = (target: number) => {
      if (raf) cancelAnimationFrame(raf);
      if (reduce) {
        progress = target;
        render();
        return;
      }
      let v = 0;
      const k = 200;
      const damp = 30;
      let last = performance.now();
      const step = (now: number) => {
        const dt = Math.min(0.032, (now - last) / 1000);
        last = now;
        const f = -k * (progress - target) - damp * v;
        v += f * dt;
        progress += v * dt;
        render();
        if (Math.abs(progress - target) > 0.001 || Math.abs(v) > 0.001) {
          raf = requestAnimationFrame(step);
        } else {
          progress = target;
          render();
          raf = null;
        }
      };
      raf = requestAnimationFrame(step);
    };

    const goPrev = () => springTo(Math.round(progress) - 1);
    const goNext = () => springTo(Math.round(progress) + 1);

    let drag = false;
    let startX = 0;
    let lastX = 0;
    let lastT = 0;
    let vel = 0;
    let startProgress = 0;

    const onDown = (e: PointerEvent) => {
      drag = true;
      startX = lastX = e.clientX;
      lastT = performance.now();
      vel = 0;
      startProgress = progress;
      surface.dataset.drag = "1";
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      surface.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - lastX;
      const now = performance.now();
      const dt = (now - lastT) / 1000;
      if (dt > 0) vel = dx / dt;
      lastX = e.clientX;
      lastT = now;
      progress -= dx / cfg.sens;
      render();
    };
    const release = () => {
      if (!drag) return;
      drag = false;
      surface.dataset.drag = "0";
      let shift = Math.round(-(lastX - startX) / cfg.dist + -vel / cfg.vel);
      shift = Math.max(-3, Math.min(3, shift));
      springTo(Math.round(startProgress) + shift);
    };
    const onResize = () => {
      cfg = conf(window.innerWidth);
      render();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        springTo(Math.round(progress) - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        springTo(Math.round(progress) + 1);
      }
    };

    surface.addEventListener("pointerdown", onDown);
    surface.addEventListener("pointermove", onMove);
    surface.addEventListener("pointerup", release);
    surface.addEventListener("pointercancel", release);
    window.addEventListener("pointerup", release);
    window.addEventListener("resize", onResize);
    car.addEventListener("keydown", onKey);
    prevBtn.addEventListener("click", goPrev);
    nextBtn.addEventListener("click", goNext);

    car.dataset.ready = "1";
    render();

    return () => {
      surface.removeEventListener("pointerdown", onDown);
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerup", release);
      surface.removeEventListener("pointercancel", release);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("resize", onResize);
      car.removeEventListener("keydown", onKey);
      prevBtn.removeEventListener("click", goPrev);
      nextBtn.removeEventListener("click", goNext);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const m = MODULES[idx];

  return (
    <div
      className="mcar"
      id="mcar"
      ref={carRef}
      tabIndex={0}
      role="region"
      aria-label="Девять модулей курса, листается перетаскиванием и стрелками"
    >
      <div className="mcar-stage" ref={stageRef}>
        <div className="mcar-surface" ref={surfaceRef} aria-hidden="true" />
        {MODULES.map((mod) => (
          <article className="mcard" key={mod.n}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mcard-photo"
              src={`/photos/modules/0${mod.n}.webp`}
              width={1456}
              height={1080}
              loading="lazy"
              alt={`Модуль ${mod.n} — ${mod.title}`}
            />
            <div className="mcard-veil" />
          </article>
        ))}
      </div>
      <div className="mcar-cap" aria-live="polite">
        <h3>{m.title}</h3>
        <p>{m.desc}</p>
        <span className="mcar-les">{m.les}</span>
      </div>
      <div className="mcar-foot">
        <button className="mcar-arrow" type="button" aria-label="Предыдущий модуль" ref={prevRef}>
          ‹
        </button>
        <span className="mcar-hint">Перетаскивай карточки</span>
        <button className="mcar-arrow" type="button" aria-label="Следующий модуль" ref={nextRef}>
          ›
        </button>
      </div>
    </div>
  );
}
