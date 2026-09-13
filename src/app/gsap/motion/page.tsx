"use client";

import { GsapDemo, GsapIntro, q, qa } from "@/components/gsap/GsapDemo";
import { gsap, SplitText, Flip, Draggable, CustomEase } from "@/components/gsap/register";
import { BALL_BG, MODULES, TITLE } from "@/components/gsap/data";

export default function GsapMotionPage() {
  return (
    <>
      <GsapIntro
        kicker="GSAP · раздел 3 из 4"
        title="Движение и интерактив"
        text="9 эффектов: сцена появления первого экрана, 3D-карточка тренера, магнитные кнопки, перестроение сетки, мяч с инерцией и конфетти по законам физики. Часть эффектов отвечает на курсор — наводите и кликайте."
      />

      <div className="grid min-w-0 gap-16">
        <GsapDemo
          code="M1"
          title="Сцена появления первого экрана"
          plugins="Timeline · SplitText"
          note="Первый экран собирается по очереди: бейдж, строки заголовка из-под маски, карточка тренера влетает в 3D, затем текст, кнопки и цифры. Готовый кандидат на ваш первый экран."
          tone="light"
          bodyClassName="overflow-hidden"
          setup={(root) => {
            const split = SplitText.create(q(root, ".g-h-title"), { type: "lines", mask: "lines" });
            const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
            tl.from(".g-h-badge", { y: 24, opacity: 0, duration: 0.6 })
              .from(split.lines, { yPercent: 110, duration: 1.05, stagger: 0.1 }, "-=0.25")
              .from(
                ".g-h-card",
                { xPercent: 35, rotationY: -40, rotationZ: 8, opacity: 0, transformPerspective: 1200, duration: 1.4, ease: "expo.out" },
                "-=1",
              )
              .from(".g-h-img", { yPercent: 30, duration: 1.2 }, "<0.15")
              .from(".g-h-lead", { y: 26, opacity: 0, duration: 0.8 }, "-=1")
              .from(".g-h-btn", { y: 26, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
              .from(".g-h-stat", { y: 22, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
              .from(".g-h-cap", { y: 30, opacity: 0, duration: 0.6 }, "-=0.45");
          }}
        >
          <div className="grid items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.15fr_.85fr] lg:py-16">
            <div className="min-w-0">
              <span className="g-h-badge inline-block rounded-full bg-[#0A0A0A] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#FFD200]">
                Официальный курс Hello Padel Academy
              </span>
              <p className={`g-h-title ${TITLE} mt-5 text-[clamp(32px,5.2vw,62px)] uppercase leading-[1.02] text-[#0A0A0A]`}>
                Падел по методу Маури Андрини — теперь на русском
              </p>
              <p className="g-h-lead mt-5 max-w-[44ch] text-lg leading-relaxed text-neutral-600">
                166 видеоуроков от первого хвата до тактики в паре.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="g-h-btn inline-flex min-h-[52px] items-center rounded-full bg-[#FFD200] px-7 font-title text-sm font-extrabold text-[#0A0A0A] shadow-[0_8px_28px_rgba(255,210,0,.35)]">
                  Купить доступ — от 2 990 ₽
                </span>
                <span className="g-h-btn inline-flex min-h-[52px] items-center rounded-full px-7 font-title text-sm font-extrabold text-[#0A0A0A] ring-2 ring-[#0A0A0A]">
                  Забрать главу бесплатно
                </span>
              </div>
              <div className="mt-9 grid grid-cols-4 gap-3">
                {[
                  ["166", "уроков"],
                  ["9", "модулей"],
                  ["22", "главы"],
                  ["15+", "часов"],
                ].map(([n, l]) => (
                  <div key={l} className="g-h-stat">
                    <b className={`${TITLE} block text-3xl text-[#0A0A0A] sm:text-4xl`}>{n}</b>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="g-h-card relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-[28px] bg-[#FFD200]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-[7%] rounded-md border-[3px] border-white/85">
                <div className="absolute inset-x-0 top-1/2 h-[3px] bg-white/85" />
                <div className="absolute inset-y-0 left-1/2 w-[3px] bg-white/85" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/01.webp" alt="Маури Андрини" className="g-h-img absolute inset-x-0 bottom-0 h-[92%] w-full object-contain object-bottom" />
              <span className="g-h-cap absolute inset-x-3 bottom-3 rounded-2xl bg-black/60 px-4 py-2.5 text-center text-xs font-semibold text-white backdrop-blur">
                Маури Андрини · автор методики
              </span>
            </div>
          </div>
        </GsapDemo>

        <GsapDemo
          code="M2"
          title="Тренер в 3D: карточка влетает и следует за курсором"
          plugins="quickTo · 3D"
          note="Карточка влетает с разворотом, потом наклоняется за курсором, по фото скользит блик, а подпись висит над карточкой в объёме. На телефоне реагирует на касание."
          setup={(root, safe) => {
            const area = q(root, ".g-area");
            const card = q(root, ".g-tilt");
            const glare = q(root, ".g-glare");
            if (!area || !card || !glare) return;
            gsap.set(card, { transformPerspective: 1000, transformStyle: "preserve-3d" });
            gsap.set(qa(root, ".g-z"), { z: 70 });
            gsap.from(card, { rotationY: -80, rotationX: 20, y: 120, opacity: 0, scale: 0.7, duration: 1.6, ease: "expo.out" });
            const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
            const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
            const gx = gsap.quickTo(glare, "x", { duration: 0.6, ease: "power3.out" });
            const gy = gsap.quickTo(glare, "y", { duration: 0.6, ease: "power3.out" });
            const move = safe((e: PointerEvent) => {
              const r = area.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              ry(px * 26);
              rx(-py * 22);
              gx(px * card.offsetWidth);
              gy(py * card.offsetHeight);
            });
            const leave = safe(() => {
              rx(0);
              ry(0);
              gx(0);
              gy(0);
            });
            area.addEventListener("pointermove", move);
            area.addEventListener("pointerleave", leave);
            return () => {
              area.removeEventListener("pointermove", move);
              area.removeEventListener("pointerleave", leave);
            };
          }}
        >
          <div className="g-area flex touch-pan-y items-center justify-center px-5 py-14 sm:py-20" style={{ perspective: 1200 }}>
            <div className="g-tilt relative w-[min(86vw,380px)] rounded-[26px] bg-[#141414] p-3 shadow-[0_40px_80px_rgba(0,0,0,.55)] ring-1 ring-white/10">
              <div className="relative aspect-[900/653] overflow-hidden rounded-[18px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photos/04.webp" alt="Маури Андрини" className="h-full w-full object-cover" />
                <div
                  className="g-glare pointer-events-none absolute left-[-40%] top-[-40%] h-[180%] w-[180%] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,.28), transparent 55%)" }}
                />
              </div>
              <div className="g-z px-2 pb-2 pt-5">
                <p className={`${TITLE} text-xl text-white`}>Маури Андрини</p>
                <p className="mt-1 text-sm text-white/60">Двукратный чемпион мира среди юниоров</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["№1 British Padel Tour", "4000+ тренеров"].map((t) => (
                    <span key={t} className="rounded-full bg-[#FFD200] px-3 py-1 text-xs font-extrabold text-[#0A0A0A]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GsapDemo>

        <GsapDemo
          code="M3"
          title="Магнитные кнопки"
          plugins="quickTo"
          note="Кнопка тянется к курсору и пружинит обратно, надпись внутри сдвигается чуть меньше — получается объём. Для кнопок покупки."
          setup={(root, safe) => {
            const btns = qa(root, ".g-mag");
            gsap.from(btns, { scale: 0.6, opacity: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.12 });
            const offs = btns.map((b) => {
              const inner = q(b, ".g-mag-in");
              const ease = "elastic.out(1, 0.35)";
              const xTo = gsap.quickTo(b, "x", { duration: 0.7, ease });
              const yTo = gsap.quickTo(b, "y", { duration: 0.7, ease });
              const ixTo = inner ? gsap.quickTo(inner, "x", { duration: 0.7, ease }) : null;
              const iyTo = inner ? gsap.quickTo(inner, "y", { duration: 0.7, ease }) : null;
              const move = safe((e: PointerEvent) => {
                const r = b.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                xTo(dx * 0.35);
                yTo(dy * 0.35);
                ixTo?.(dx * 0.15);
                iyTo?.(dy * 0.15);
              });
              const leave = safe(() => {
                xTo(0);
                yTo(0);
                ixTo?.(0);
                iyTo?.(0);
              });
              b.addEventListener("pointermove", move);
              b.addEventListener("pointerleave", leave);
              return () => {
                b.removeEventListener("pointermove", move);
                b.removeEventListener("pointerleave", leave);
              };
            });
            return () => offs.forEach((off) => off());
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 px-6 py-24">
            <button type="button" className="g-mag relative rounded-full bg-[#FFD200] px-9 py-5 font-title text-base font-extrabold text-[#0A0A0A]">
              <span className="g-mag-in inline-block">Купить доступ — от 2 990 ₽</span>
            </button>
            <button type="button" className="g-mag relative rounded-full px-9 py-5 font-title text-base font-extrabold text-white ring-2 ring-white">
              <span className="g-mag-in inline-block">Забрать главу бесплатно</span>
            </button>
          </div>
        </GsapDemo>

        <GsapDemo
          code="M4"
          title="Сетка модулей появляется волной от центра"
          plugins="stagger grid"
          note="Карточки вырастают кругами от центральной к краям. Для девяти модулей или галереи."
          bodyClassName="p-4 sm:p-8"
          setup={(root) => {
            gsap.from(qa(root, ".g-tile"), {
              scale: 0.2,
              opacity: 0,
              y: 40,
              duration: 0.9,
              ease: "back.out(1.6)",
              stagger: { grid: "auto", from: "center", amount: 0.8 },
            });
          }}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {MODULES.map((m) => (
              <div key={m.n} className="g-tile relative overflow-hidden rounded-xl sm:rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/photos/modules/0${m.n}.webp`} alt={m.t} className="aspect-[1465/1072] w-full object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-[#FFD200] px-2 py-0.5 font-title text-[10px] font-extrabold text-[#0A0A0A] sm:text-xs">
                  {m.n}
                </span>
              </div>
            ))}
          </div>
        </GsapDemo>

        <GsapDemo
          code="M5"
          title="Сетка перестраивается в список с анимацией"
          plugins="Flip"
          note="Нажмите кнопку внутри блока: карточки плавно переезжают на новые места, а не прыгают. Для переключателя «сеткой / списком» в программе."
          tone="light"
          bodyClassName="px-5 py-8 sm:px-8"
          setup={(root, safe) => {
            const box = q(root, ".g-flip");
            const btn = q<HTMLButtonElement>(root, ".g-flip-btn");
            if (!box || !btn) return;
            box.dataset.layout = "grid";
            btn.textContent = "Показать списком";
            const toggle = safe(() => {
              const state = Flip.getState([...qa(root, ".g-fi"), ...qa(root, ".g-fimg")]);
              const toList = box.dataset.layout === "grid";
              box.dataset.layout = toList ? "list" : "grid";
              btn.textContent = toList ? "Показать сеткой" : "Показать списком";
              Flip.from(state, { duration: 0.75, ease: "power3.inOut", stagger: 0.04, absolute: true, nested: true });
            });
            btn.addEventListener("click", toggle);
            return () => btn.removeEventListener("click", toggle);
          }}
        >
          <button type="button" className="g-flip-btn mb-6 rounded-full bg-[#0A0A0A] px-5 py-2.5 font-title text-sm font-extrabold text-[#FFD200]">
            Показать списком
          </button>
          <div
            data-layout="grid"
            className="g-flip group grid grid-cols-2 gap-3 data-[layout=list]:grid-cols-1 sm:grid-cols-3 sm:data-[layout=list]:grid-cols-1"
          >
            {MODULES.slice(0, 6).map((m) => (
              <div
                key={m.n}
                className="g-fi flex flex-col gap-2 rounded-2xl bg-white p-2 ring-1 ring-black/10 group-data-[layout=list]:flex-row group-data-[layout=list]:items-center group-data-[layout=list]:gap-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/photos/modules/0${m.n}.webp`}
                  alt={m.t}
                  className="g-fimg aspect-[1465/1072] w-full rounded-xl object-cover group-data-[layout=list]:w-28 sm:group-data-[layout=list]:w-40"
                />
                <div className="px-1 pb-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Модуль {m.n} · {m.les}
                  </p>
                  <p className="font-bold text-[#0A0A0A]">{m.t}</p>
                </div>
              </div>
            ))}
          </div>
        </GsapDemo>

        <GsapDemo
          code="M6"
          title="Мяч можно схватить и бросить"
          plugins="Draggable · InertiaPlugin"
          note="Мяч падает на корт с отскоком. Схватите его мышкой или пальцем и бросьте — полетит по инерции и остановится у борта."
          bodyClassName="px-5 py-8 sm:px-8"
          setup={(root) => {
            const court = q(root, ".g-court");
            const ball = q(root, ".g-ball");
            if (!court || !ball) return;
            gsap.from(ball, { y: -260, duration: 1.2, ease: "bounce.out" });
            const [drag] = Draggable.create(ball, {
              type: "x,y",
              bounds: court,
              inertia: true,
              edgeResistance: 0.75,
              onPress: () => {
                gsap.to(ball, { scale: 0.88, duration: 0.15 });
              },
              onRelease: () => {
                gsap.to(ball, { scale: 1, duration: 0.4, ease: "back.out(3)" });
              },
            });
            return () => drag.kill();
          }}
        >
          <div className="g-court relative mx-auto h-[340px] max-w-[720px] overflow-hidden rounded-2xl bg-[#161616]">
            <div className="absolute inset-4 rounded-md border-2 border-white/60" />
            <div className="absolute inset-y-4 left-[27%] w-0.5 bg-white/35" />
            <div className="absolute inset-y-4 right-[27%] w-0.5 bg-white/35" />
            <div className="absolute left-[27%] right-[27%] top-1/2 h-0.5 bg-white/35" />
            <div className="absolute inset-y-2 left-1/2 w-1.5 -translate-x-1/2 rounded bg-[#FFD200]" />
            <div
              className="g-ball absolute h-14 w-14 cursor-grab rounded-full active:cursor-grabbing"
              style={{ left: "calc(50% - 28px)", top: "calc(50% - 28px)", background: BALL_BG, boxShadow: "0 12px 26px rgba(0,0,0,.55)" }}
            >
              <span className="absolute inset-[16%] rounded-full border-2 border-white/70 [clip-path:inset(0_50%_0_0)]" />
            </div>
            <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs font-semibold text-white/60">
              Хватайте мяч и бросайте
            </p>
          </div>
        </GsapDemo>

        <GsapDemo
          code="M7"
          title="Конфетти по физике на кнопке покупки"
          plugins="Physics2DPlugin"
          note="Бумажки вылетают из кнопки со скоростью и гравитацией, крутятся и падают. Для экрана «доступ открыт» или финального призыва."
          setup={(root, safe) => {
            const btn = q<HTMLButtonElement>(root, ".g-boom");
            const layer = q(root, ".g-layer");
            if (!btn || !layer) return;
            const colors = ["#FFD200", "#FFFFFF", "#FFDE3D", "#E5BC00"];
            const burst = safe(() => {
              const b = btn.getBoundingClientRect();
              const l = layer.getBoundingClientRect();
              const cx = b.left + b.width / 2 - l.left;
              const cy = b.top + b.height / 2 - l.top;
              for (let i = 0; i < 46; i++) {
                const bit = document.createElement("i");
                const size = gsap.utils.random(6, 14, 1);
                bit.className = "absolute block rounded-[2px]";
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
              gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.35)" });
            });
            btn.addEventListener("click", burst);
            gsap.delayedCall(0.5, burst);
            return () => {
              btn.removeEventListener("click", burst);
              layer.replaceChildren();
            };
          }}
        >
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-16">
            <div className="relative text-center">
              <p className={`${TITLE} text-3xl text-white sm:text-4xl`}>Доступ открыт!</p>
              <button type="button" className="g-boom mt-6 rounded-full bg-[#FFD200] px-9 py-5 font-title text-base font-extrabold text-[#0A0A0A]">
                Купить навсегда — 4 990 ₽
              </button>
              <p className="mt-4 text-sm text-white/55">Нажмите на кнопку</p>
            </div>
            <div className="g-layer pointer-events-none absolute inset-0 z-10" />
          </div>
        </GsapDemo>

        <GsapDemo
          code="M8"
          title="Мяч летит через сетку по своей кривой"
          plugins="CustomEase"
          note="Высота полёта задана собственной кривой, мяч сплющивается при приземлении, тень сжимается в верхней точке."
          tone="light"
          bodyClassName="px-5 py-10 sm:px-10"
          setup={(root) => {
            const court = q(root, ".g-court");
            const ball = q(root, ".g-ball");
            const shadow = q(root, ".g-shadow");
            if (!court || !ball || !shadow) return;
            CustomEase.create("padelArc", "M0,0 C0.16,0.74 0.32,1 0.5,1 0.68,1 0.84,0.74 1,0");
            const span = () => court.clientWidth - ball.offsetWidth;
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            tl.fromTo([ball, shadow], { x: 0 }, { x: () => span(), duration: 1.6, ease: "none" }, 0)
              .fromTo(ball, { y: 0 }, { y: -200, duration: 1.6, ease: "padelArc" }, 0)
              .fromTo(shadow, { scale: 1, opacity: 0.5 }, { scale: 0.4, opacity: 0.12, duration: 1.6, ease: "padelArc" }, 0)
              .fromTo(
                ball,
                { scaleX: 1.22, scaleY: 0.78 },
                { scaleX: 1, scaleY: 1, duration: 0.25, ease: "power2.out", transformOrigin: "50% 100%" },
                0,
              );
          }}
        >
          <div className="g-court relative mx-auto mt-[210px] h-16 max-w-[760px]">
            <div className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#0A0A0A]" />
            <div className="absolute bottom-0 left-1/2 h-[70px] w-1.5 -translate-x-1/2 rounded-t bg-[#0A0A0A]" />
            <div className="g-shadow absolute -bottom-1.5 left-0 h-3 w-14 rounded-full bg-black/40 blur-[2px]" />
            <div className="g-ball absolute bottom-1 left-0 h-14 w-14 rounded-full" style={{ background: BALL_BG }} />
          </div>
        </GsapDemo>

        <GsapDemo
          code="M9"
          title="Курсор-мяч с шлейфом"
          plugins="quickTo"
          note="Точка идёт точно за мышкой, кольцо догоняет с задержкой и раздувается над ключевыми словами. На телефоне не нужен — только для компьютера."
          tone="light"
          setup={(root, safe) => {
            const area = q(root, ".g-cur-area");
            const dot = q(root, ".g-dot");
            const ring = q(root, ".g-ring");
            if (!area || !dot || !ring) return;
            gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
            const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
            const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
            const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
            const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
            const move = safe((e: PointerEvent) => {
              const r = area.getBoundingClientRect();
              const x = e.clientX - r.left;
              const y = e.clientY - r.top;
              dx(x);
              dy(y);
              rx(x);
              ry(y);
            });
            const enter = safe(() => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));
            const leave = safe(() => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
            const hot = qa(root, ".g-hot");
            const on = safe(() => gsap.to(ring, { scale: 2.6, backgroundColor: "rgba(255,210,0,0.35)", duration: 0.35 }));
            const off = safe(() => gsap.to(ring, { scale: 1, backgroundColor: "rgba(255,210,0,0)", duration: 0.35 }));
            area.addEventListener("pointermove", move);
            area.addEventListener("pointerenter", enter);
            area.addEventListener("pointerleave", leave);
            hot.forEach((h) => {
              h.addEventListener("pointerenter", on);
              h.addEventListener("pointerleave", off);
            });
            return () => {
              area.removeEventListener("pointermove", move);
              area.removeEventListener("pointerenter", enter);
              area.removeEventListener("pointerleave", leave);
              hot.forEach((h) => {
                h.removeEventListener("pointerenter", on);
                h.removeEventListener("pointerleave", off);
              });
            };
          }}
        >
          <div className="g-cur-area relative cursor-none overflow-hidden px-6 py-20 sm:px-12">
            <p className={`${TITLE} max-w-[20ch] text-3xl leading-tight text-[#0A0A0A] sm:text-5xl`}>
              Разберём{" "}
              <span className="g-hot underline decoration-[#FFD200] decoration-4 underline-offset-8">бандеху</span>,{" "}
              <span className="g-hot underline decoration-[#FFD200] decoration-4 underline-offset-8">вибору</span> и{" "}
              <span className="g-hot underline decoration-[#FFD200] decoration-4 underline-offset-8">чикиту</span>
            </p>
            <p className="mt-4 text-sm text-neutral-500">Проведите курсором по блоку и наведите на подчёркнутые слова</p>
            <div className="g-ring pointer-events-none absolute left-0 top-0 h-12 w-12 rounded-full border-2 border-[#0A0A0A]" />
            <div className="g-dot pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-[#0A0A0A]" />
          </div>
        </GsapDemo>
      </div>
    </>
  );
}
