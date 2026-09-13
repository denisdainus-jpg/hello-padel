"use client";

import { GsapDemo, GsapIntro, pinStart, q, qa } from "@/components/gsap/GsapDemo";
import { gsap, ScrollTrigger, SplitText } from "@/components/gsap/register";
import { MODULES, PAINS, STEPS, TITLE } from "@/components/gsap/data";

const WORDS = ["Бандеха", "Вибора", "Чикита", "Смэш", "Бахада", "Свеча"];

export default function GsapScrollPage() {
  return (
    <>
      <GsapIntro
        kicker="GSAP · раздел 2 из 4"
        title="Прокрутка: блоки живут от скролла"
        text="9 эффектов на ScrollTrigger. Всё завязано на прокрутку всей страницы — просто листайте вниз. «Повторить» возвращает к началу блока и запускает эффект заново."
      />

      <div className="grid min-w-0 gap-20">
        <GsapDemo
          code="S1"
          title="Параллакс: фон, заголовок и тренер едут с разной скоростью"
          plugins="ScrollTrigger"
          note="Три слоя сдвигаются с разной скоростью, из-за этого появляется глубина. Хорошо для первого экрана или секции модуля."
          scroll
          bodyClassName="overflow-hidden"
          setup={(root) => {
            const base = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
            gsap.fromTo(q(root, ".g-bg"), { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { ...base } });
            gsap.fromTo(q(root, ".g-mid"), { yPercent: 60 }, { yPercent: -60, ease: "none", scrollTrigger: { ...base } });
            gsap.fromTo(q(root, ".g-fg"), { yPercent: 30 }, { yPercent: -18, ease: "none", scrollTrigger: { ...base } });
          }}
        >
          <div className="relative h-[78vh] min-h-[440px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/modules/06.webp" alt="" className="g-bg absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
            <div className="g-mid absolute inset-x-6 top-[20%] sm:inset-x-12">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFD200]">Модуль 6 · 31 урок</p>
              <p className={`${TITLE} mt-3 max-w-[14ch] text-4xl leading-[1.05] text-white sm:text-6xl`}>Стены под контролем</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/03.webp"
              alt="Маури Андрини"
              className="g-fg absolute -bottom-6 right-[3%] w-[52%] max-w-[380px] drop-shadow-[0_30px_50px_rgba(0,0,0,.6)]"
            />
          </div>
        </GsapDemo>

        <GsapDemo
          code="S2"
          title="Страница стоит, модули едут вбок"
          plugins="ScrollTrigger · pin"
          note="Блок закрепляется, и вместо вертикальной прокрутки листается лента модулей. Жёлтая полоса снизу показывает прогресс."
          scroll
          setup={(root) => {
            const pin = q(root, ".g-pin");
            const track = q(root, ".g-track");
            if (!pin || !track) return;
            const dist = () => Math.max(0, track.scrollWidth - pin.clientWidth);
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pin,
                start: pinStart(),
                end: () => `+=${dist()}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
            tl.to(track, { x: () => -dist(), ease: "none" }, 0).fromTo(
              q(root, ".g-prog"),
              { scaleX: 0 },
              { scaleX: 1, ease: "none" },
              0,
            );
          }}
        >
          <div className="g-pin flex h-[78vh] min-h-[460px] flex-col justify-center gap-6 overflow-hidden rounded-3xl bg-[#0A0A0A] py-8">
            <div className="flex items-end justify-between gap-4 px-6 sm:px-10">
              <p className={`${TITLE} text-2xl text-white sm:text-4xl`}>9 модулей — маршрут курса</p>
              <span className="hidden text-sm font-semibold text-white/50 sm:block">листайте вниз →</span>
            </div>
            <div className="g-track flex w-max gap-5 px-6 sm:px-10">
              {MODULES.map((m) => (
                <article key={m.n} className="w-[76vw] flex-none overflow-hidden rounded-2xl bg-[#161616] sm:w-[440px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/photos/modules/0${m.n}.webp`} alt={m.t} className="aspect-[1465/1072] w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#FFD200]">
                      Модуль {m.n} · {m.les}
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">{m.t}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mx-6 h-1 overflow-hidden rounded-full bg-white/15 sm:mx-10">
              <div className="g-prog h-full origin-left rounded-full bg-[#FFD200]" />
            </div>
          </div>
        </GsapDemo>

        <GsapDemo
          code="S3"
          title="Карточки болей ложатся стопкой"
          plugins="ScrollTrigger · pin"
          note="Каждая следующая карточка наезжает на предыдущую, та отъезжает вглубь. Одна мысль на экран — боли читаются по очереди."
          tone="light"
          scroll
          setup={(root) => {
            const pin = q(root, ".g-pin");
            const cards = qa(root, ".g-card");
            if (!pin || cards.length < 2) return;
            gsap.set(cards.slice(1), { yPercent: 110 });
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pin,
                start: pinStart(),
                end: () => `+=${window.innerHeight * (cards.length - 1) * 0.9}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
            cards.slice(1).forEach((card, i) => {
              tl.to(card, { yPercent: 0, ease: "none" }, i).to(cards[i], { scale: 0.9, opacity: 0.4, ease: "none" }, i);
            });
          }}
        >
          <div className="g-pin relative h-[72vh] min-h-[420px] overflow-hidden rounded-3xl bg-[#FFFDF5]">
            {PAINS.map((p, i) => {
              const dark = i % 2 === 0;
              return (
                <article
                  key={p.n}
                  className="g-card absolute inset-3 flex flex-col justify-between rounded-[22px] p-7 sm:inset-5 sm:p-10"
                  style={{ zIndex: i + 1, background: dark ? "#0A0A0A" : "#FFD200", color: dark ? "#FFFFFF" : "#0A0A0A" }}
                >
                  <span className={`${TITLE} text-7xl sm:text-9xl`} style={{ color: dark ? "#FFD200" : "#0A0A0A" }}>
                    0{p.n}
                  </span>
                  <div>
                    <p className={`${TITLE} max-w-[18ch] text-2xl leading-tight sm:text-4xl`}>{p.h}</p>
                    <p className="mt-3 max-w-[48ch] text-base opacity-75 sm:text-lg">{p.p}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </GsapDemo>

        <GsapDemo
          code="S4"
          title="Фото раскрывается на весь блок"
          plugins="ScrollTrigger · pin"
          note="Маленькое окно с фото растягивается до краёв, заголовок уходит, снизу появляется призыв. Для секции бесплатной главы."
          scroll
          setup={(root) => {
            const pin = q(root, ".g-pin");
            if (!pin) return;
            const tl = gsap.timeline({
              scrollTrigger: { trigger: pin, start: pinStart(), end: "+=130%", pin: true, scrub: 0.6 },
            });
            tl.fromTo(
              q(root, ".g-clip"),
              { clipPath: "inset(22% 28% 22% 28% round 28px)" },
              { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", duration: 1 },
              0,
            )
              .fromTo(q(root, ".g-img"), { scale: 1.4 }, { scale: 1, ease: "none", duration: 1 }, 0)
              .fromTo(q(root, ".g-title"), { opacity: 1, y: 0 }, { opacity: 0, y: -80, ease: "none", duration: 0.45 }, 0)
              .fromTo(q(root, ".g-cap"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: "none", duration: 0.4 }, 0.6);
          }}
        >
          <div className="g-pin relative h-[80vh] min-h-[460px] overflow-hidden rounded-3xl bg-[#0A0A0A]">
            <p className={`g-title ${TITLE} absolute inset-x-0 top-[7%] z-10 px-6 text-center text-3xl text-white sm:text-5xl`}>
              Не нарезка, а целая глава
            </p>
            <div className="g-clip absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/modules/05.webp" alt="" className="g-img h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            </div>
            <div className="g-cap absolute inset-x-6 bottom-[8%] z-10 sm:inset-x-12">
              <p className={`${TITLE} max-w-[16ch] text-3xl text-white sm:text-5xl`}>Одна глава курса — бесплатно</p>
              <span className="mt-5 inline-flex rounded-full bg-[#FFD200] px-6 py-3 font-title text-sm font-extrabold text-[#0A0A0A]">
                Забрать главу в боте
              </span>
            </div>
          </div>
        </GsapDemo>

        <GsapDemo
          code="S5"
          title="Карточки появляются волной при входе в кадр"
          plugins="ScrollTrigger.batch"
          note="Карточки, которые одновременно попадают в кадр, выезжают друг за другом. Самый спокойный и универсальный приём."
          tone="light"
          scroll
          bodyClassName="p-5 sm:p-8"
          setup={(root, safe) => {
            const items = qa(root, ".g-item");
            gsap.set(items, { opacity: 0, y: 80, scale: 0.94 });
            ScrollTrigger.batch(items, {
              start: "top 90%",
              once: true,
              onEnter: safe((batch: Element[]) => {
                gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 });
              }),
            });
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <article key={m.n} className="g-item overflow-hidden rounded-2xl bg-white ring-1 ring-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/photos/modules/0${m.n}.webp`} alt={m.t} className="aspect-[1465/1072] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Модуль {m.n} · {m.les}
                  </p>
                  <p className="mt-1 font-bold text-[#0A0A0A]">{m.t}</p>
                </div>
              </article>
            ))}
          </div>
        </GsapDemo>

        <GsapDemo
          code="S6"
          title="Уровень растёт от 1.0 до 5.0 при прокрутке"
          plugins="ScrollTrigger · pin"
          note="Цифра уровня и полоса растут вместе с прокруткой, подписи этапов загораются по пути. Живая версия шкалы из сегментов."
          scroll
          setup={(root) => {
            const pin = q(root, ".g-pin");
            const num = q(root, ".g-lvl");
            const stages = qa(root, ".g-stage");
            if (!pin || !num) return;
            const o = { v: 1 };
            num.textContent = "1.0";
            stages.forEach((s, i) => {
              s.dataset.on = i === 0 ? "1" : "0";
            });
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pin,
                start: pinStart(),
                end: "+=160%",
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                  const idx = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
                  stages.forEach((s, i) => {
                    s.dataset.on = i <= idx ? "1" : "0";
                  });
                },
              },
            });
            tl.to(o, { v: 5, ease: "none", onUpdate: () => { num.textContent = o.v.toFixed(1); } }, 0).fromTo(
              q(root, ".g-bar"),
              { scaleX: 0.02 },
              { scaleX: 1, ease: "none" },
              0,
            );
          }}
        >
          <div className="g-pin flex h-[74vh] min-h-[440px] flex-col justify-center gap-8 overflow-hidden rounded-3xl bg-[#0A0A0A] px-6 sm:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Твой уровень по шкале академии</p>
            <p className={`g-lvl ${TITLE} text-[clamp(90px,20vw,220px)] leading-none tabular-nums text-[#FFD200]`}>1.0</p>
            <div className="h-3 overflow-hidden rounded-full bg-white/15">
              <div className="g-bar h-full origin-left rounded-full bg-[#FFD200]" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm font-semibold sm:text-base">
              {["Новичок · модули 1–2", "Средний · модули 3, 5, 6", "Опытный · модули 8–9"].map((s, i) => (
                <span
                  key={s}
                  data-on={i === 0 ? "1" : "0"}
                  className="g-stage text-white/35 transition-colors duration-300 data-[on=1]:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </GsapDemo>

        <GsapDemo
          code="S7"
          title="Абзац темнеет слово за словом"
          plugins="SplitText · ScrollTrigger"
          note="Приём с сайтов Apple: светлый текст по мере прокрутки наливается цветом. Внимание идёт вслед за словами."
          tone="light"
          scroll
          bodyClassName="px-6 py-24 sm:px-12"
          setup={(root) => {
            const el = q(root, ".g-t");
            SplitText.create(el, {
              type: "words",
              autoSplit: true,
              onSplit: (self) =>
                gsap.fromTo(
                  self.words,
                  { color: "#d6cfb6" },
                  {
                    color: "#0A0A0A",
                    ease: "none",
                    stagger: 0.1,
                    scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
                  },
                ),
            });
          }}
        >
          <p className={`g-t ${TITLE} max-w-[24ch] text-3xl leading-[1.25] text-[#0A0A0A] sm:text-5xl`}>
            Тот же материал, по которому академия учит тренеров в двадцати странах, — теперь на русском.
          </p>
        </GsapDemo>

        <GsapDemo
          code="S8"
          title="Бегущая строка ускоряется от прокрутки"
          plugins="ScrollTrigger · ticker"
          note="Две строки едут навстречу. Чем быстрее листаете, тем быстрее они несутся; листаете вверх — меняют направление."
          scroll
          bodyClassName="overflow-hidden py-14"
          setup={(root) => {
            const rows = qa(root, ".g-row");
            if (!rows.length) return;
            const pos = rows.map((_, i): number => (i % 2 ? -50 : 0));
            const setX = rows.map((r) => gsap.quickSetter(r, "xPercent") as (v: number) => void);
            let dir = 1;
            let boost = 0;
            const tick = () => {
              boost *= 0.94;
              rows.forEach((_, i) => {
                pos[i] = gsap.utils.wrap(-50, 0, pos[i] + (i % 2 ? 1 : -1) * dir * (0.03 + boost));
                setX[i](pos[i]);
              });
            };
            gsap.ticker.add(tick);
            ScrollTrigger.create({
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                dir = self.direction;
                boost = Math.min(1.2, Math.abs(self.getVelocity()) / 2400);
              },
            });
            return () => gsap.ticker.remove(tick);
          }}
        >
          <div className="grid gap-4">
            {[0, 1].map((r) => (
              <div key={r} className="g-row flex w-max">
                {[0, 1].map((copy) => (
                  <span
                    key={copy}
                    className={`${TITLE} whitespace-nowrap pr-8 text-5xl uppercase sm:text-7xl`}
                    style={r ? { color: "transparent", WebkitTextStroke: "1.5px #FFD200" } : { color: "#FFFFFF" }}
                  >
                    {WORDS.join(" · ")} ·
                  </span>
                ))}
              </div>
            ))}
          </div>
        </GsapDemo>

        <GsapDemo
          code="S9"
          title="Шаги сменяются на закреплённом блоке"
          plugins="ScrollTrigger · pin"
          note="Слева заголовок и шкала прогресса, справа шаги по одному. Для секции «Четыре шага до первого урока»."
          tone="light"
          scroll
          setup={(root) => {
            const pin = q(root, ".g-pin");
            const steps = qa(root, ".g-step");
            if (!pin || steps.length < 2) return;
            gsap.set(steps.slice(1), { opacity: 0, y: 70 });
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pin,
                start: pinStart(),
                end: () => `+=${window.innerHeight * 2.2}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
            steps.slice(1).forEach((s, i) => {
              tl.to(steps[i], { opacity: 0, y: -70, duration: 0.4, ease: "power1.in" }, i + 0.4).to(
                s,
                { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
                i + 0.6,
              );
            });
            tl.fromTo(q(root, ".g-vbar"), { scaleY: 0 }, { scaleY: 1, ease: "none", duration: tl.duration() }, 0);
          }}
        >
          <div className="g-pin grid h-[72vh] min-h-[440px] grid-cols-1 content-center gap-8 overflow-hidden rounded-3xl bg-[#FFD200] px-6 sm:grid-cols-[1fr_1.2fr] sm:items-center sm:px-12">
            <div className="flex gap-5">
              <div className="w-1.5 flex-none overflow-hidden rounded-full bg-black/15">
                <div className="g-vbar h-full origin-top rounded-full bg-[#0A0A0A]" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/60">Как это работает</p>
                <p className={`${TITLE} mt-3 text-3xl leading-tight text-[#0A0A0A] sm:text-5xl`}>Четыре шага до первого урока</p>
              </div>
            </div>
            <div className="relative h-[220px] sm:h-[260px]">
              {STEPS.map((s) => (
                <div key={s.n} className="g-step absolute inset-0 flex flex-col justify-center">
                  <span className={`${TITLE} text-7xl text-[#0A0A0A] sm:text-8xl`}>{s.n}</span>
                  <p className="mt-3 text-2xl font-bold text-[#0A0A0A]">{s.h}</p>
                  <p className="mt-2 max-w-[36ch] text-base text-black/70">{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </GsapDemo>

        {/* запас снизу, чтобы последний закреплённый блок успел доиграть */}
        <div className="h-[50vh]" />
      </div>
    </>
  );
}
