"use client";

import { useEffect, useRef } from "react";
import { SHORTS, BOT } from "@/lib/content";

/** Лента коротких видео: перетаскивание, стрелки, точки, ленивое создание <video>.
 *  Логика перенесена из статической версии без изменений поведения. */
export function VideoLane() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sc = scrollRef.current;
    const wrap = wrapRef.current;
    const dotsBox = dotsRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!sc || !wrap || !dotsBox || !prev || !next) return;

    const dots = dotsBox.children;
    const cards = Array.from(sc.querySelectorAll<HTMLElement>(".vcard"));
    const GAP = 16;
    let cur: HTMLElement | null = null;
    let drag = false;
    let moved = 0;
    let sx = 0;
    let sl = 0;
    let tmr: ReturnType<typeof setTimeout> | null = null;

    if (cards[0]) cards[0].dataset.pre = "metadata";
    if (cards[1]) cards[1].dataset.pre = "metadata";

    const stepW = () => (cards[0]?.offsetWidth ?? 280) + GAP;

    const stop = () => {
      if (!cur) return;
      cur.querySelector("video")?.pause();
      cur.dataset.playing = "0";
      cur.dataset.load = "0";
    };

    const sync = () => {
      const max = sc.scrollWidth - sc.clientWidth - 2;
      prev.disabled = sc.scrollLeft <= 2;
      next.disabled = sc.scrollLeft >= max;
      wrap.dataset.end = sc.scrollLeft >= max ? "1" : "0";
      const i = Math.max(0, Math.min(dots.length - 1, Math.round(sc.scrollLeft / stepW())));
      for (let k = 0; k < dots.length; k++) {
        (dots[k] as HTMLElement).dataset.on = k === i ? "1" : "0";
      }
    };

    const play = (card: HTMLElement) => {
      let v = card.querySelector("video");
      if (!v) {
        v = document.createElement("video");
        v.src = card.dataset.src!;
        v.loop = true;
        v.muted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("preload", card.dataset.pre || "none");
        v.addEventListener("canplay", () => {
          card.dataset.load = "0";
          if (tmr) clearTimeout(tmr);
        });
        v.addEventListener("error", () => {
          card.dataset.load = "0";
          card.dataset.playing = "0";
          card.dataset.fail = "1";
          if (tmr) clearTimeout(tmr);
        });
        card.insertBefore(v, card.querySelector(".shade"));
      }
      if (!v.paused) {
        v.pause();
        card.dataset.playing = "0";
        return;
      }
      if (cur && cur !== card) stop();
      cur = card;
      card.dataset.fail = "0";
      if (v.readyState < 3) {
        card.dataset.load = "1";
        if (tmr) clearTimeout(tmr);
        tmr = setTimeout(() => {
          if (card.dataset.load === "1") {
            v!.pause();
            card.dataset.load = "0";
            card.dataset.playing = "0";
            card.dataset.fail = "1";
          }
        }, 15000);
      }
      card.dataset.playing = "1";
      v.play().catch(() => {
        card.dataset.load = "0";
        card.dataset.playing = "0";
        card.dataset.fail = "1";
      });
    };

    const onClick = (e: MouseEvent) => {
      if (moved > 8) return;
      const target = e.target as HTMLElement;
      const card = target.closest<HTMLElement>(".vcard");
      if (!card) return;
      const snd = target.closest<HTMLElement>(".snd");
      if (snd) {
        const vv = card.querySelector("video");
        if (vv) {
          vv.muted = !vv.muted;
          snd.textContent = vv.muted ? "🔇" : "🔊";
        }
        return;
      }
      if (target.closest(".retry")) {
        card.querySelector("video")?.remove();
        card.dataset.fail = "0";
        play(card);
        return;
      }
      play(card);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      drag = true;
      moved = 0;
      sx = e.clientX;
      sl = sc.scrollLeft;
      sc.dataset.drag = "1";
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const d = e.clientX - sx;
      if (Math.abs(d) > moved) moved = Math.abs(d);
      if (moved > 4) {
        sc.scrollLeft = sl - d;
        if (e.cancelable) e.preventDefault();
      }
    };
    const onUp = () => {
      if (!drag) return;
      drag = false;
      sc.dataset.drag = "0";
      sync();
      setTimeout(() => (moved = 0), 0);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        sc.scrollBy({ left: stepW(), behavior: "smooth" });
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        sc.scrollBy({ left: -stepW(), behavior: "smooth" });
      }
    };
    const goPrev = () => sc.scrollBy({ left: -stepW(), behavior: "smooth" });
    const goNext = () => sc.scrollBy({ left: stepW(), behavior: "smooth" });

    sc.addEventListener("click", onClick);
    sc.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    prev.addEventListener("click", goPrev);
    next.addEventListener("click", goNext);
    sc.addEventListener("keydown", onKey);
    sc.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (en.isIntersecting) return;
          const el = en.target as HTMLElement;
          const v = el.querySelector("video");
          if (!v) return;
          v.pause();
          el.dataset.playing = "0";
          el.dataset.load = "0";
        }),
      { root: sc, threshold: 0.5 },
    );
    cards.forEach((c) => io.observe(c));
    sync();

    return () => {
      sc.removeEventListener("click", onClick);
      sc.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      prev.removeEventListener("click", goPrev);
      next.removeEventListener("click", goNext);
      sc.removeEventListener("keydown", onKey);
      sc.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      io.disconnect();
      if (tmr) clearTimeout(tmr);
    };
  }, []);

  return (
    <div className="vwrap" ref={wrapRef}>
      <button className="varrow prev" type="button" aria-label="Назад" ref={prevRef}>
        ‹
      </button>
      <span className="glow" aria-hidden="true" style={{ top: "46%" }} />
      <div
        className="vscroll"
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="Лента коротких видео с советами"
      >
        {SHORTS.map((s, i) => (
          <article className="vcard" key={s.src} data-src={`/video/${s.src}.mp4`} data-playing="0">
            <div className="fall" aria-hidden="true">
              <i style={{ left: "8%", right: "8%", top: "8%", height: 2 }} />
              <i style={{ left: "8%", right: "8%", bottom: "8%", height: 2 }} />
              <i style={{ left: "8%", top: "8%", bottom: "8%", width: 2 }} />
              <i style={{ right: "8%", top: "8%", bottom: "8%", width: 2 }} />
              <i style={{ left: "8%", right: "8%", top: "50%", height: 2 }} />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/video/${s.src}.webp`}
              alt={s.cap}
              width={720}
              height={1280}
              loading={i < 2 ? "eager" : "lazy"}
              fetchPriority={i < 2 ? "high" : undefined}
            />
            <div className="shade" />
            <div className="load" aria-hidden="true" />
            <button className="retry" type="button">
              Повторить
            </button>
            <button className="snd" type="button" aria-label="Включить звук">
              🔇
            </button>
            <button className="play" type="button" aria-label={`Смотреть: ${s.cap}`}>
              ▶
            </button>
            <span className="badge-dur">{s.dur}</span>
            <div className="cap">
              {s.cap}
              {s.link ? <a href={BOT}>{s.link}</a> : null}
            </div>
          </article>
        ))}
      </div>
      <button className="varrow next" type="button" aria-label="Вперёд" ref={nextRef}>
        ›
      </button>
      <div className="vdots" ref={dotsRef} aria-hidden="true">
        {SHORTS.map((s, i) => (
          <span key={s.src} data-on={i === 0 ? "1" : undefined} />
        ))}
      </div>
    </div>
  );
}
