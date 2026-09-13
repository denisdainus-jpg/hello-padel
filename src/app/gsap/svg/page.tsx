"use client";

import { GsapDemo, GsapIntro, q, qa } from "@/components/gsap/GsapDemo";
import { gsap } from "@/components/gsap/register";
import { TITLE } from "@/components/gsap/data";

const LOB = "M90,196 C190,-40 420,-40 486,234 C520,190 552,160 576,150 C560,150 530,170 500,200";

const BALL = "M100,20 C144,20 180,56 180,100 C180,144 144,180 100,180 C56,180 20,144 20,100 C20,56 56,20 100,20 Z";
const RACKET =
  "M100,14 C148,14 176,50 176,92 C176,132 148,158 112,163 L112,190 L88,190 L88,163 C52,158 24,132 24,92 C24,50 52,14 100,14 Z";
const STAR = "M100,14 L124,72 L186,75 L138,114 L154,178 L100,142 L46,178 L62,114 L14,75 L76,72 Z";

const ROUTE = "M60,250 C160,250 190,190 290,190 S420,230 500,210 S640,110 720,110 S860,60 940,50";
const MILES = [
  { x: 60, y: 250, n: "1.0", l: "Старт" },
  { x: 290, y: 190, n: "2.0", l: "База" },
  { x: 500, y: 210, n: "3.0", l: "Удары сверху" },
  { x: 720, y: 110, n: "4.0", l: "Стены" },
  { x: 940, y: 50, n: "5.0", l: "Тактика" },
];

function Squig({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="absolute -bottom-2 left-0 h-4 w-full overflow-visible"
        viewBox="0 0 240 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="g-squig" d="M3,13 C40,3 78,19 118,10 S196,4 237,12" fill="none" stroke="#FFD200" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function GsapSvgPage() {
  return (
    <>
      <GsapIntro
        kicker="GSAP · раздел 4 из 4"
        title="SVG и линии"
        text="6 эффектов на DrawSVG, MotionPath и MorphSVG: линии рисуются, мяч летит по траектории, фигуры перетекают. Векторная графика остаётся чёткой на любом экране и почти ничего не весит."
      />

      <div className="grid min-w-0 gap-16">
        <GsapDemo
          code="V1"
          title="Разметка корта рисуется линиями"
          plugins="DrawSVGPlugin"
          note="Корт прорисовывается как схема тренера: периметр, линии подачи, сетка, игроки и мяч. Для секции тактики или программы."
          bodyClassName="px-5 py-10 sm:px-10"
          setup={(root) => {
            const tl = gsap.timeline({ delay: 0.2 });
            tl.from(qa<SVGElement>(root, ".g-line"), { drawSVG: "0%", duration: 1.1, ease: "power2.inOut", stagger: 0.16 })
              .from(q<SVGElement>(root, ".g-net"), { drawSVG: "50% 50%", duration: 0.7, ease: "power3.out" }, "-=0.3")
              .from(
                qa<SVGElement>(root, ".g-player"),
                { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)", stagger: 0.1 },
                "-=0.2",
              )
              .from(q<SVGElement>(root, ".g-dot"), { scale: 0, transformOrigin: "50% 50%", duration: 0.45, ease: "back.out(4)" });
          }}
        >
          <svg viewBox="0 0 400 210" className="mx-auto block w-full max-w-[760px]" role="img" aria-label="Разметка корта для падела">
            <rect className="g-line" x="10" y="15" width="380" height="180" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <line className="g-line" x1="78" y1="15" x2="78" y2="195" stroke="#FFFFFF" strokeWidth="2" />
            <line className="g-line" x1="322" y1="15" x2="322" y2="195" stroke="#FFFFFF" strokeWidth="2" />
            <line className="g-line" x1="78" y1="105" x2="322" y2="105" stroke="#FFFFFF" strokeWidth="2" />
            <line className="g-net" x1="200" y1="8" x2="200" y2="202" stroke="#FFD200" strokeWidth="5" strokeLinecap="round" />
            <circle className="g-player" cx="130" cy="60" r="9" fill="#FFD200" />
            <circle className="g-player" cx="130" cy="150" r="9" fill="#FFD200" />
            <circle className="g-player" cx="285" cy="60" r="9" fill="#FFFFFF" />
            <circle className="g-player" cx="285" cy="150" r="9" fill="#FFFFFF" />
            <circle className="g-dot" cx="238" cy="92" r="5" fill="#EFFF4A" />
          </svg>
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#FFD200]" /> Твоя пара
            </span>
            <span className="flex items-center gap-2">
              <i className="inline-block h-2.5 w-2.5 rounded-full bg-white" /> Соперники
            </span>
          </div>
        </GsapDemo>

        <GsapDemo
          code="V2"
          title="Мяч летит по траектории свечи"
          plugins="MotionPathPlugin · DrawSVG"
          note="Мяч идёт по настоящей траектории: свеча над соперниками, отскок от пола и от заднего стекла. За ним рисуется след."
          bodyClassName="px-4 py-10 sm:px-10"
          setup={(root) => {
            const path = q<SVGPathElement>(root, ".g-path");
            const ball = q<SVGCircleElement>(root, ".g-ball");
            const trail = q<SVGPathElement>(root, ".g-trail");
            if (!path || !ball || !trail) return;
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
            tl.set(trail, { opacity: 1 })
              .fromTo(trail, { drawSVG: "0%" }, { drawSVG: "100%", duration: 2.6, ease: "power1.inOut" }, 0)
              .to(ball, { duration: 2.6, ease: "power1.inOut", motionPath: { path, align: path, alignOrigin: [0.5, 0.5] } }, 0)
              .to(trail, { opacity: 0, duration: 0.5 }, "+=0.2");
          }}
        >
          <svg viewBox="0 0 600 260" className="mx-auto block w-full max-w-[820px] overflow-visible" role="img" aria-label="Траектория свечи в паделе">
            <line x1="10" y1="236" x2="590" y2="236" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
            <rect x="12" y="96" width="10" height="140" rx="2" fill="rgba(255,255,255,.18)" />
            <rect x="578" y="96" width="10" height="140" rx="2" fill="rgba(255,255,255,.18)" />
            <rect x="296" y="176" width="8" height="60" rx="2" fill="#FFD200" />
            <path className="g-path" d={LOB} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="2" strokeDasharray="4 8" />
            <path className="g-trail" d={LOB} fill="none" stroke="#FFD200" strokeWidth="3" strokeLinecap="round" />
            <circle className="g-ball" cx="0" cy="0" r="9" fill="#EFFF4A" />
            <text x="150" y="30" fill="#FFFFFF" fontSize="15" fontWeight="700">Свеча над соперниками</text>
            <text x="450" y="130" fill="rgba(255,255,255,.7)" fontSize="13" fontWeight="600">отскок от стекла</text>
          </svg>
        </GsapDemo>

        <GsapDemo
          code="V3"
          title="Фигура перетекает: мяч → ракетка → уровень 5.0"
          plugins="MorphSVGPlugin"
          note="Одна фигура плавно превращается в следующую, подпись сменяется вместе с ней. Короткий рассказ о пути игрока без слов."
          tone="brand"
          setup={(root) => {
            const shape = q<SVGPathElement>(root, ".g-shape");
            const labels = qa(root, ".g-label");
            if (!shape || labels.length < 3) return;
            gsap.set(labels, { opacity: 0, y: 14 });
            gsap.set(labels[0], { opacity: 1, y: 0 });
            const tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.95, ease: "power3.inOut" } });
            [RACKET, STAR, BALL].forEach((d, i) => {
              tl.to(shape, { morphSVG: d }, "+=1.1")
                .to(labels[i], { opacity: 0, y: -14, duration: 0.35 }, "<")
                .to(labels[(i + 1) % 3], { opacity: 1, y: 0, duration: 0.45 }, "<0.35");
            });
          }}
        >
          <div className="grid items-center gap-8 px-6 py-12 sm:grid-cols-[auto_1fr] sm:px-12">
            <svg viewBox="0 0 200 200" className="mx-auto h-48 w-48 sm:h-56 sm:w-56" aria-hidden="true">
              <path className="g-shape" d={BALL} fill="#0A0A0A" />
            </svg>
            <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
              {[
                ["Мяч", "Начинаешь с первого хвата и правил"],
                ["Ракетка", "Разбираешь каждый удар по шагам"],
                ["Уровень 5.0", "Выходишь на тактику в паре"],
              ].map(([t, d], i) => (
                <div key={t} className="g-label" style={i ? { opacity: 0 } : undefined}>
                  <p className={`${TITLE} text-4xl text-[#0A0A0A] sm:text-5xl`}>{t}</p>
                  <p className="mt-2 max-w-[30ch] text-lg text-black/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </GsapDemo>

        <GsapDemo
          code="V4"
          title="Маршрут от 1.0 до 5.0 рисуется при прокрутке"
          plugins="DrawSVG · ScrollTrigger"
          note="Линия маршрута тянется за прокруткой, по пути загораются уровни. Прокрутите назад — линия сматывается."
          scroll
          bodyClassName="px-4 py-24 sm:px-10"
          setup={(root) => {
            const route = q<SVGPathElement>(root, ".g-route");
            const dots = qa<SVGElement>(root, ".g-mile");
            const labels = qa<SVGElement>(root, ".g-mile-t");
            if (!route) return;
            gsap.set(dots, { scale: 0, transformOrigin: "50% 50%" });
            gsap.set(labels, { opacity: 0, y: 12 });
            const tl = gsap.timeline({
              scrollTrigger: { trigger: root, start: "top 72%", end: "bottom 40%", scrub: 0.6 },
            });
            tl.fromTo(route, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: 1 }, 0);
            dots.forEach((d, i) => {
              const at = (i / (dots.length - 1)) * 0.94;
              tl.to(d, { scale: 1, duration: 0.06, ease: "back.out(3)" }, at).to(labels[i], { opacity: 1, y: 0, duration: 0.06 }, at);
            });
          }}
        >
          <svg viewBox="0 0 1000 300" className="block w-full overflow-visible" role="img" aria-label="Маршрут уровня от 1.0 до 5.0">
            <path d={ROUTE} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="6" strokeLinecap="round" />
            <path className="g-route" d={ROUTE} fill="none" stroke="#FFD200" strokeWidth="6" strokeLinecap="round" />
            {MILES.map((m) => (
              <g key={m.n}>
                <circle className="g-mile" cx={m.x} cy={m.y} r="14" fill="#0A0A0A" stroke="#FFD200" strokeWidth="4" />
                <g className="g-mile-t">
                  <text x={m.x} y={m.y - 30} textAnchor="middle" fill="#FFD200" fontSize="24" fontWeight="800" fontFamily="var(--font-unbounded), sans-serif">
                    {m.n}
                  </text>
                  <text x={m.x} y={m.y + 44} textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="16" fontWeight="600">
                    {m.l}
                  </text>
                </g>
              </g>
            ))}
          </svg>
        </GsapDemo>

        <GsapDemo
          code="V5"
          title="Линия бежит по контуру тарифа"
          plugins="SVG · stroke-dashoffset"
          note="Два жёлтых отрезка бесконечно обегают карточку «Навсегда». Выделяет главный тариф без лишнего блеска."
          setup={(root) => {
            const card = q(root, ".g-plan");
            const svg = q<SVGSVGElement>(root, ".g-frame");
            const rects = qa<SVGRectElement>(root, ".g-run");
            if (!card || !svg || !rects.length) return;
            let len = 0;
            const fit = () => {
              const w = card.offsetWidth;
              const h = card.offsetHeight;
              svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
              rects.forEach((r) => {
                r.setAttribute("width", String(w - 4));
                r.setAttribute("height", String(h - 4));
              });
              len = rects[0].getTotalLength();
              const dash = len * 0.16;
              rects.forEach((r) => {
                r.style.strokeDasharray = `${dash} ${len - dash}`;
              });
            };
            fit();
            const tweens = rects.map((r, i) =>
              gsap.fromTo(
                r,
                { strokeDashoffset: () => -(len / 2) * i },
                { strokeDashoffset: () => -(len / 2) * i - len, duration: 3.2, ease: "none", repeat: -1 },
              ),
            );
            const onResize = () => {
              fit();
              tweens.forEach((t) => t.invalidate().restart());
            };
            window.addEventListener("resize", onResize);
            gsap.from(card, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" });
            return () => window.removeEventListener("resize", onResize);
          }}
        >
          <div className="flex justify-center px-5 py-14">
            <div className="g-plan relative w-full max-w-[380px] rounded-[22px] bg-[#141414] p-7">
              <svg className="g-frame pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                <rect className="g-run" x="2" y="2" rx="20" fill="none" stroke="#FFD200" strokeWidth="3" strokeLinecap="round" />
                <rect className="g-run" x="2" y="2" rx="20" fill="none" stroke="#FFD200" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="relative">
                <span className="rounded-full bg-[#FFD200] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                  Выбирают чаще всего
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/55">Навсегда</p>
                <p className={`${TITLE} mt-2 text-5xl text-white`}>4 990 ₽</p>
                <ul className="mt-5 grid gap-2.5 text-[15px] text-white/80">
                  {["Весь курс навсегда + новые уроки", "Доступ без ограничения по времени", "≈30 ₽ за урок"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#FFD200]" />
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 flex min-h-[52px] items-center justify-center rounded-full bg-[#FFD200] font-title text-sm font-extrabold text-[#0A0A0A]">
                  Купить навсегда
                </span>
              </div>
            </div>
          </div>
        </GsapDemo>

        <GsapDemo
          code="V6"
          title="Подчёркивание от руки"
          plugins="DrawSVGPlugin"
          note="Под ключевыми словами прорисовывается волнистая линия, будто тренер подчеркнул маркером на доске."
          tone="light"
          bodyClassName="px-6 py-16 sm:px-12"
          setup={(root) => {
            gsap.from(qa<SVGPathElement>(root, ".g-squig"), {
              drawSVG: "0%",
              duration: 0.9,
              ease: "power2.inOut",
              stagger: 0.5,
              delay: 0.3,
            });
          }}
        >
          <p className={`${TITLE} max-w-[22ch] text-3xl leading-[1.35] text-[#0A0A0A] sm:text-5xl`}>
            Не набор роликов, а <Squig>система</Squig> — от первого хвата до <Squig>тактики</Squig>
          </p>
        </GsapDemo>
      </div>
    </>
  );
}
