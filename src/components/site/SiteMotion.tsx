"use client";

/* Все GSAP-эффекты лендинга в одном месте, в порядке секций на странице.
   Разметка остаётся серверной, компонент только находит элементы по классам.
   Класс .motion ставит скрипт в layout, если в системе не включено «уменьшение движения»:
   без него страница остаётся статичной и полностью читаемой. */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, TextPlugin, Physics2DPlugin);
}

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
/* закреплённые блоки встают под шапкой */
const pinTop = () => `top ${($("header")?.offsetHeight ?? 0) + 12}px`;
/* пока блок не на экране, бесконечные анимации стоят на паузе */
const whileVisible = (trigger: Element): ScrollTrigger.Vars => ({
  trigger,
  start: "top bottom",
  end: "bottom top",
  toggleActions: "play pause resume pause",
});

/* T9 — число набегает от нуля, суффикс вроде «+» сохраняется */
function countUp(el: HTMLElement, vars: gsap.TweenVars = {}) {
  /* исходное число запоминаем один раз: при повторном запуске эффекта в тексте уже «0» */
  el.dataset.count ??= el.textContent ?? "";
  const m = el.dataset.count.match(/^([\d\s\u00a0]+)(.*)$/);
  if (!m) return gsap.timeline();
  const target = Number(m[1].replace(/\D/g, ""));
  const suffix = m[2];
  const o = { v: 0 };
  el.textContent = `0${suffix}`;
  return gsap.to(o, {
    v: target,
    duration: 2,
    ease: "power3.out",
    ...vars,
    onUpdate: () => {
      el.textContent = `${Math.round(o.v).toLocaleString("ru-RU")}${suffix}`;
    },
  });
}

export function SiteMotion() {
  useGSAP((_ctx, contextSafe) => {
    if (!contextSafe || !document.documentElement.classList.contains("motion")) return;
    const safe = contextSafe;
    const offs: Array<() => void> = [];
    const listen = (el: EventTarget, type: string, fn: (e: PointerEvent) => void) => {
      el.addEventListener(type, fn as EventListener);
      offs.push(() => el.removeEventListener(type, fn as EventListener));
    };
    const fine = matchMedia("(pointer: fine)").matches;
    ScrollTrigger.config({ ignoreMobileResize: true });

    /* Плавная прокрутка Lenis, синхронно с ScrollTrigger */
    const lenis = new Lenis({ anchors: { offset: -80 } });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    offs.push(() => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    });

    /* ── 1. Первый экран: M1 сцена появления, T1 буквы, T10 блик, T9 цифры, M2 3D-карточка ── */
    const hero = $(".hero");
    const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });
    if (hero) {
      intro.from($(".badge", hero), { autoAlpha: 0, y: 24, duration: 0.6 });
      const h1 = $("h1", hero);
      if (h1) {
        gsap.set(h1, { autoAlpha: 1 });
        const split = SplitText.create(h1, { type: "words,chars", wordsClass: "fx-w" });
        intro.from(
          split.chars,
          {
            yPercent: -160,
            opacity: 0,
            rotation: () => gsap.utils.random(-35, 35),
            duration: 1,
            ease: "back.out(2.2)",
            stagger: 0.022,
          },
          "-=0.25",
        );
      }
      const shot = $(".hero-shot", hero);
      if (shot) {
        gsap.set(shot, { transformPerspective: 1100 });
        intro
          .from(
            shot,
            { autoAlpha: 0, xPercent: 30, rotationY: -40, rotationZ: 8, duration: 1.4, ease: "expo.out" },
            "<0.35",
          )
          .from($("img", shot), { yPercent: 25, duration: 1.2 }, "<0.15")
          .from($(".cap", shot), { autoAlpha: 0, y: 30, duration: 0.6 }, "-=0.5");
      }
      intro
        .from($$(".lead, .cta-row .btn, .fineprint, .note", hero), { autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.08 }, "-=1.1")
        .from($(".stats", hero), { autoAlpha: 0, y: 22, duration: 0.6 }, "-=0.5");
      $$(".stats b", hero).forEach((b, i) => intro.add(countUp(b, { duration: 1.8 }), i ? "<0.08" : "<"));

      const shine = $(".fx-shine", hero);
      if (shine) {
        gsap.fromTo(
          shine,
          { backgroundPosition: "120% 0%" },
          { backgroundPosition: "-20% 0%", duration: 2.4, ease: "power2.inOut", repeat: -1, repeatDelay: 1.4, delay: 1 },
        );
      }

      /* M2 — карточка наклоняется за курсором, по фото скользит блик */
      const glare = shot && $(".fx-glare", shot);
      /* на телефоне мыши нет: после появления карточка сама плавно покачивается в 3D */
      if (shot && glare && !fine) {
        const sway = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "sine.inOut" } });
        sway
          .to(shot, { rotationY: -9, rotationX: 5, duration: 1.6 })
          .to(glare, { x: -shot.offsetWidth * 0.3, duration: 1.6 }, "<")
          .to(shot, { rotationY: 9, rotationX: -5, duration: 3.2 })
          .to(glare, { x: shot.offsetWidth * 0.3, duration: 3.2 }, "<")
          .to(shot, { rotationY: 0, rotationX: 0, duration: 1.6 })
          .to(glare, { x: 0, duration: 1.6 }, "<");
        intro.call(() => void sway.play());
      }
      if (shot && glare && fine) {
        const opt = { duration: 0.6, ease: "power3.out" };
        const rx = gsap.quickTo(shot, "rotationX", opt);
        const ry = gsap.quickTo(shot, "rotationY", opt);
        const gx = gsap.quickTo(glare, "x", opt);
        const gy = gsap.quickTo(glare, "y", opt);
        listen(
          hero,
          "pointermove",
          safe((e: PointerEvent) => {
            if (intro.isActive()) return;
            const r = hero.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * 16);
            rx(-py * 12);
            gx(px * shot.offsetWidth);
            gy(py * shot.offsetHeight);
          }),
        );
        listen(
          hero,
          "pointerleave",
          safe(() => {
            rx(0);
            ry(0);
            gx(0);
            gy(0);
          }),
        );
      }
    }

    /* M3 — магнитные кнопки покупки (только мышь) */
    if (fine) {
      $$(".hero .cta-row .btn, .plan .btn, .final .btn").forEach((b) => {
        const opt = { duration: 0.7, ease: "elastic.out(1, 0.35)" };
        const xTo = gsap.quickTo(b, "x", opt);
        const yTo = gsap.quickTo(b, "y", opt);
        listen(
          b,
          "pointermove",
          safe((e: PointerEvent) => {
            if (intro.isActive()) return;
            const r = b.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
          }),
        );
        listen(
          b,
          "pointerleave",
          safe(() => {
            xTo(0);
            yTo(0);
          }),
        );
      });
    }

    /* T2 — заголовки секций выезжают строками из-под маски */
    $$(".sect .h2:not([data-fx]), .final h2").forEach((el) => {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
      });
    });

    /* T3 — абзац проявляется из размытия */
    $$("[data-fx='blur']").forEach((el) => {
      SplitText.create(el, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            opacity: 0,
            y: 22,
            filter: "blur(12px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }),
      });
    });

    /* ── 3. Боли: S3 карточки ложатся стопкой ── */
    const stack = $(".fx-stack");
    const pains = $$(".fx-pain");
    if (stack && pains.length > 1) {
      gsap.set(pains.slice(1), { yPercent: 110 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: pinTop,
          end: () => `+=${window.innerHeight * (pains.length - 1) * 0.7}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      pains.slice(1).forEach((card, i) => {
        tl.to(card, { yPercent: 0, ease: "none" }, i).to(pains[i], { scale: 0.92, opacity: 0.35, ease: "none" }, i);
      });
    }

    /* T11 — маркер под ключевыми словами */
    $$(".fx-mark i").forEach((m) => {
      gsap.to(m, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: { trigger: m, start: "top 85%", once: true },
      });
    });

    /* ── 4. Решение и результат: T8, S7, T5, T6 ── */
    $$("[data-fx='chars-scrub']").forEach((el) => {
      SplitText.create(el, {
        type: "words,chars",
        wordsClass: "fx-w",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.chars,
            { opacity: 0.12 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.03,
              scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 50%", scrub: true },
            },
          ),
      });
    });

    $$("[data-fx='words-ink']").forEach((el) => {
      SplitText.create(el, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { color: "rgba(10,10,10,.22)" },
            {
              color: "#0A0A0A",
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
            },
          ),
      });
    });

    const scramble = $(".fx-scramble-word");
    if (scramble) {
      const words = (scramble.dataset.words ?? "").split(",");
      const tl = gsap.timeline({ repeat: -1, delay: 0.4, scrollTrigger: whileVisible(scramble) });
      words.forEach((w) => {
        tl.to(scramble, {
          duration: 1.2,
          scrambleText: { text: w, chars: "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ", revealDelay: 0.3, speed: 0.45 },
        }).to({}, { duration: 1.3 });
      });
    }

    const typed = $(".fx-type-text");
    const cursor = $(".fx-type-cursor");
    if (typed && cursor) {
      const phrases = (typed.dataset.phrases ?? "").split("|");
      typed.textContent = "";
      const tl = gsap.timeline({ repeat: -1, scrollTrigger: whileVisible(typed) });
      phrases.forEach((p) => {
        tl.to(typed, { duration: p.length * 0.04, text: { value: p }, ease: "none" })
          .to({}, { duration: 1.6 })
          .to(typed, { duration: 0.5, text: { value: "" }, ease: "none" });
      });
      gsap.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
    }

    /* ── 5. Бесплатная глава: S4 фото раскрывается, T7 буквы прыгают ── */
    const reveal = $(".fx-reveal");
    if (reveal) {
      gsap
        .timeline({ scrollTrigger: { trigger: reveal, start: pinTop, end: "+=120%", pin: true, scrub: 0.6 } })
        .fromTo(
          $(".fx-reveal-clip", reveal),
          { clipPath: "inset(22% 28% 22% 28% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", duration: 1 },
          0,
        )
        .fromTo($(".fx-reveal-clip img", reveal), { scale: 1.4 }, { scale: 1, ease: "none", duration: 1 }, 0)
        .fromTo($(".fx-reveal-title", reveal), { opacity: 1, y: 0 }, { opacity: 0, y: -80, ease: "none", duration: 0.45 }, 0)
        .fromTo($(".fx-reveal-cap", reveal), { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: "none", duration: 0.4 }, 0.6);
    }

    $$(".fx-wave").forEach((el) => {
      SplitText.create(el, {
        type: "chars",
        autoSplit: true,
        onSplit: (self) =>
          gsap.to(self.chars, {
            y: -14,
            color: "#FFFFFF",
            duration: 0.5,
            ease: "sine.inOut",
            stagger: { each: 0.06, repeat: -1, yoyo: true },
            scrollTrigger: whileVisible(el),
          }),
      });
    });

    /* ── 6. Программа: S2 лента модулей едет вбок ── */
    const lane = $(".fx-lane");
    const track = $(".fx-track");
    if (lane && track) {
      const dist = () => Math.max(0, track.scrollWidth - lane.clientWidth);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: lane,
            start: pinTop,
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        .to(track, { x: () => -dist(), ease: "none" }, 0)
        .fromTo($(".fx-prog i", lane), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    }

    /* ── 7. Сегменты: S6 уровень растёт от 1.0 до 5.0 ── */
    const level = $(".fx-level");
    const levelNum = $(".fx-level-n");
    if (level && levelNum) {
      const stages = $$(".fx-level-st span", level);
      const light = (idx: number) =>
        stages.forEach((s, i) => {
          s.dataset.on = i <= idx ? "1" : "0";
        });
      const o = { v: 1 };
      levelNum.textContent = "1.0";
      light(0);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: level,
            start: pinTop,
            end: "+=150%",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => light(Math.min(stages.length - 1, Math.floor(self.progress * stages.length))),
          },
        })
        .to(o, { v: 5, ease: "none", onUpdate: () => void (levelNum.textContent = o.v.toFixed(1)) }, 0)
        .fromTo($(".fx-level-bar i", level), { scaleX: 0.02 }, { scaleX: 1, ease: "none" }, 0);
    }

    /* ── 8. Тренер: T4 буквы имени разлетаются и собираются ── */
    $$("[data-fx='scatter']").forEach((el) => {
      SplitText.create(el, {
        type: "words,chars",
        wordsClass: "fx-w",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            x: () => gsap.utils.random(-260, 260),
            y: () => gsap.utils.random(-180, 180),
            rotation: () => gsap.utils.random(-200, 200),
            scale: 0,
            opacity: 0,
            duration: 1.4,
            ease: "expo.out",
            stagger: { amount: 0.5, from: "random" },
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }),
      });
    });

    /* ── 9. Доверие: T9 цифры набегают ── */
    $$(".trust .n")
      .filter((n) => n.textContent?.trim().endsWith("+"))
      .forEach((n, i) => countUp(n, { delay: i * 0.12, scrollTrigger: { trigger: n, start: "top 88%", once: true } }));

    /* ── 10. Тарифы: V5 линия по контуру «Навсегда», S9 шаги ── */
    const top = $(".plan.top");
    const runSvg = $<SVGSVGElement>(".fx-run");
    const runRects = $$<SVGRectElement>(".fx-run rect");
    if (top && runSvg && runRects.length) {
      let len = 0;
      const fit = () => {
        const w = top.offsetWidth + 18;
        const h = top.offsetHeight + 18;
        runSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        runRects.forEach((r) => {
          r.setAttribute("width", String(w - 4));
          r.setAttribute("height", String(h - 4));
        });
        len = runRects[0].getTotalLength();
        runRects.forEach((r) => {
          r.style.strokeDasharray = `${len * 0.16} ${len * 0.84}`;
        });
      };
      fit();
      const tweens = runRects.map((r, i) =>
        gsap.fromTo(
          r,
          { strokeDashoffset: () => -(len / 2) * i },
          { strokeDashoffset: () => -(len / 2) * i - len, duration: 3.6, ease: "none", repeat: -1 },
        ),
      );
      const ro = new ResizeObserver(() => {
        fit();
        tweens.forEach((t) => t.invalidate().restart());
      });
      ro.observe(top);
      offs.push(() => ro.disconnect());
    }

    const steps = $(".fx-steps");
    const stepItems = $$(".fx-step");
    if (steps && stepItems.length > 1) {
      gsap.set(stepItems.slice(1), { opacity: 0, y: 70 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: steps,
          start: pinTop,
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      stepItems.slice(1).forEach((s, i) => {
        tl.to(stepItems[i], { opacity: 0, y: -70, duration: 0.4, ease: "power1.in" }, i + 0.4).to(
          s,
          { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
          i + 0.6,
        );
      });
      tl.fromTo($(".fx-steps-rail i", steps), { scaleY: 0 }, { scaleY: 1, ease: "none", duration: tl.duration() }, 0);
    }

    /* ── 12. Финал: M7 конфетти ── */
    const fin = $(".final");
    const layer = $(".fx-confetti");
    const finBtn = $(".final .btn");
    if (fin && layer && finBtn) {
      const colors = ["#0A0A0A", "#FFFFFF", "#0A0A0A", "#FFF6CC"];
      const burst = safe(() => {
        const b = finBtn.getBoundingClientRect();
        const l = layer.getBoundingClientRect();
        const cx = b.left + b.width / 2 - l.left;
        const cy = b.top + b.height / 2 - l.top;
        for (let i = 0; i < 46; i++) {
          const bit = document.createElement("i");
          const size = gsap.utils.random(6, 14, 1);
          Object.assign(bit.style, {
            width: `${size}px`,
            height: `${Math.round(size * gsap.utils.random(0.35, 1))}px`,
            left: `${cx}px`,
            top: `${cy}px`,
            background: colors[i % colors.length],
          });
          layer.appendChild(bit);
          gsap.to(bit, {
            duration: gsap.utils.random(1.3, 2.3),
            physics2D: { velocity: gsap.utils.random(420, 950), angle: gsap.utils.random(215, 325), gravity: 1150 },
            rotation: gsap.utils.random(-720, 720),
            opacity: 0,
            ease: "power2.in",
            onComplete: () => bit.remove(),
          });
        }
      });
      ScrollTrigger.create({ trigger: fin, start: "top 55%", onEnter: burst });
      listen(finBtn, "click", burst);
      offs.push(() => layer.replaceChildren());
    }

    /* Порядок триггеров по странице и пересчёт, когда меняется высота
       (раскрыли главы или FAQ, переключили вкладку, догрузились шрифты) */
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    const refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh()).pause();
    const ro = new ResizeObserver(() => refresh.restart(true));
    ro.observe(document.body);
    offs.push(() => ro.disconnect());
    document.fonts?.ready.then(() => refresh.restart(true));

    return () => offs.forEach((off) => off());
  });

  return null;
}
