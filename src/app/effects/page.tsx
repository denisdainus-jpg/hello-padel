"use client";

import Image from "next/image";
import { useState } from "react";

import SplitText from "@/components/SplitText";
import ShinyText from "@/components/ShinyText";
import DecryptedText from "@/components/DecryptedText";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import TiltedCard from "@/components/TiltedCard";
import CardSwap, { Card as SwapCard } from "@/components/CardSwap";

import { CometCard } from "@/components/ui/comet-card";
import { FlipWords } from "@/components/ui/flip-words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { AuroraText } from "@/components/ui/aurora-text";
import { HyperText } from "@/components/ui/hyper-text";
import { SparklesText } from "@/components/ui/sparkles-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { LineShadowText } from "@/components/ui/line-shadow-text";

const CODES = ["3D1", "3D2", "3D3", "TX1", "TX2", "TX3", "TX4", "TX5", "TX6", "TX7", "TX8", "TX9", "TX10"];

function Demo({
  code,
  title,
  source,
  note,
  tone = "dark",
  flush = false,
  children,
}: {
  code: string;
  title: string;
  source: string;
  note?: string;
  tone?: "light" | "dark" | "brand";
  flush?: boolean;
  children: React.ReactNode;
}) {
  const bg = tone === "dark" ? "bg-[#0A0A0A] text-white" : tone === "brand" ? "bg-[#FFD200] text-[#0A0A0A]" : "bg-[#FFFDF5] text-[#0A0A0A]";
  // «Повторить» пересоздаёт компонент — анимация появления проигрывается заново
  const [take, setTake] = useState(0);
  return (
    <section id={code} className="min-w-0 scroll-mt-24 border-t-2 border-[#0A0A0A] pt-10">
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <span className="rounded-full bg-[#0A0A0A] px-3 py-1.5 font-title text-xs font-extrabold text-[#FFD200]">{code}</span>
        <h2 className="font-title text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
        <span className="rounded-full bg-[#FFF6CC] px-2.5 py-1 text-xs font-semibold">{source}</span>
      </div>
      {note ? <p className="mb-5 max-w-[80ch] text-sm leading-relaxed text-neutral-500">{note}</p> : null}
      <div key={take} className={`overflow-hidden rounded-3xl ring-1 ring-black/10 ${bg} ${flush ? "" : "p-5 sm:p-8"}`}>
        {children}
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setTake((t) => t + 1)}
          className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 font-title text-sm font-extrabold text-[#FFD200] transition-transform hover:scale-[1.03] active:scale-95"
        >
          <span aria-hidden="true">↻</span> Повторить
        </button>
      </div>
    </section>
  );
}

export default function EffectsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-clip px-4 pb-24 text-[#0A0A0A] sm:px-5">
      <header className="sticky top-0 z-50 -mx-4 mb-8 border-b border-black/10 bg-[#FFFDF5]/90 px-4 py-3 backdrop-blur sm:-mx-5 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <b className="font-title text-base font-extrabold">Эффекты: 3D и текст</b>
          <nav className="flex flex-wrap gap-1 text-xs font-semibold">
            {CODES.map((c) => (
              <a key={c} href={`#${c}`} className="rounded-full bg-white px-2 py-1 ring-1 ring-black/10 hover:bg-[#FFD200]">
                {c}
              </a>
            ))}
            <a href="/gsap/" className="rounded-full bg-[#0A0A0A] px-2.5 py-1 text-[#FFD200]">
              GSAP →
            </a>
          </nav>
        </div>
      </header>

      <div className="mb-8 max-w-[80ch]">
        <h1 className="font-title text-3xl font-extrabold tracking-tight">Эффекты для первого экрана и заголовков</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          3D-карточка тренера и текстовые эффекты из React Bits, Aceternity и Magic UI. Под каждым блоком —
          кнопка «Повторить», она проигрывает эффект заново.
        </p>
      </div>

      <a
        href="/gsap/"
        className="mb-12 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-[#0A0A0A] p-6 text-white transition-transform hover:-translate-y-0.5 sm:p-8"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FFD200]">Отдельный раздел</p>
          <p className="mt-2 font-title text-2xl font-extrabold tracking-tight">GSAP — 36 эффектов на четырёх страницах</p>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-white/65">
            Текст, прокрутка, движение и SVG. Отсюда GSAP-демо убраны: во вложенных окошках они не срабатывали.
          </p>
        </div>
        <span className="rounded-full bg-[#FFD200] px-6 py-3 font-title text-sm font-extrabold text-[#0A0A0A]">Открыть →</span>
      </a>

      <div className="grid min-w-0 gap-14">
        {/* ---------- 3D ---------- */}
        <Demo
          code="3D1"
          title="Тренер: карточка наклоняется за курсором"
          source="React Bits · Tilted Card"
          note="Фото Маури в 3D: карточка следует за мышкой, подпись всплывает рядом. На телефоне реагирует на касание."
        >
          <div className="flex justify-center">
            <TiltedCard
              imageSrc="/photos/04.webp"
              altText="Маури Андрини"
              captionText="Маури Андрини · автор методики"
              containerHeight="380px"
              containerWidth="min(90vw, 420px)"
              imageHeight="380px"
              imageWidth="min(90vw, 420px)"
              rotateAmplitude={14}
              scaleOnHover={1.06}
              showMobileWarning={false}
              showTooltip
              displayOverlayContent
              overlayContent={
                <span className="m-4 inline-block rounded-full bg-[#FFD200] px-4 py-2 font-title text-sm font-extrabold text-[#0A0A0A]">
                  9 модулей · 166 уроков
                </span>
              }
            />
          </div>
        </Demo>

        <Demo
          code="3D2"
          title="Тренер: объёмная карточка с бликом"
          source="Aceternity · Comet Card"
          note="Карточка живёт в перспективе: наклон, блик и лёгкое приподнимание."
        >
          <div className="flex justify-center">
            <CometCard rotateDepth={16} translateDepth={16}>
              <div className="w-[min(90vw,360px)] rounded-2xl bg-[#111] p-3 ring-1 ring-white/10">
                <div className="relative aspect-[900/653] w-full overflow-hidden rounded-xl">
                  <Image src="/photos/04.webp" alt="Маури Андрини" fill className="object-cover" />
                </div>
                <div className="px-2 py-4">
                  <p className="font-title text-lg font-extrabold text-white">Маури Андрини</p>
                  <p className="mt-1 text-sm text-neutral-400">Двукратный чемпион мира среди юниоров</p>
                </div>
              </div>
            </CometCard>
          </div>
        </Demo>

        <Demo
          code="3D3"
          title="Стопка карточек, которая сама перекладывается"
          source="React Bits · Card Swap"
          note="Карточки по очереди выходят вперёд. Годится для модулей, отзывов или первого экрана."
          flush
        >
          <div className="relative h-[420px] w-full overflow-hidden">
            <CardSwap width={420} height={300} cardDistance={54} verticalDistance={64} delay={3200} pauseOnHover skewAmount={5}>
              {[1, 3, 5].map((n) => (
                <SwapCard key={n} customClass="overflow-hidden border-white/20">
                  <div className="relative h-full w-full">
                    <Image src={`/photos/modules/0${n}.webp`} alt="" fill className="object-cover" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-[#FFD200] px-3 py-1 font-title text-xs font-extrabold text-[#0A0A0A]">
                      Модуль {n}
                    </span>
                  </div>
                </SwapCard>
              ))}
            </CardSwap>
          </div>
        </Demo>

        {/* ---------- ТЕКСТ ---------- */}
        <Demo code="TX1" title="Буквы влетают по одной" source="React Bits · Split Text">
          <SplitText
            text="Падел по методу Маури Андрини"
            className="font-title text-3xl font-extrabold text-white sm:text-5xl"
            delay={40}
            duration={0.7}
            splitType="chars"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
          />
        </Demo>

        <Demo code="TX2" title="Блик бежит по надписи" source="React Bits · Shiny Text" note="По тексту едет светлая полоса. Для подзаголовка или кнопки.">
          <ShinyText
            text="166 видеоуроков · 9 модулей · 22 главы"
            className="font-title text-2xl font-extrabold sm:text-3xl"
            color="#8a8a8a"
            shineColor="#FFD200"
            speed={3}
            spread={2}
          />
        </Demo>

        <Demo code="TX3" title="Текст расшифровывается" source="React Bits · Decrypted Text" note="Буквы перебираются и складываются в слово.">
          <p className="font-title text-2xl font-extrabold text-white sm:text-4xl">
            <DecryptedText
              text="БАНДЕХА · ВИБОРА · ЧИКИТА"
              speed={45}
              maxIterations={16}
              sequential
              revealDirection="center"
              animateOn="view"
              className="text-white"
              encryptedClassName="text-[#FFD200]/60"
            />
          </p>
        </Demo>

        <Demo
          code="TX4"
          title="Буквы всплывают при прокрутке"
          source="React Bits · Scroll Float"
          note="Работает от прокрутки всей страницы: листайте медленно, и буквы поднимаются по одной."
        >
          <div className="py-10">
            <ScrollFloat containerClassName="text-white" textClassName="font-title font-extrabold text-white" stagger={0.03}>
              Ты играешь год, а прогресса нет
            </ScrollFloat>
          </div>
        </Demo>

        <Demo
          code="TX5"
          title="Абзац проявляется по словам"
          source="React Bits · Scroll Reveal"
          note="Слова наводятся на резкость по мере прокрутки страницы. Для описания курса."
        >
          <div className="py-10">
            <ScrollReveal
              containerClassName="text-white"
              textClassName="text-white"
              enableBlur
              baseOpacity={0.15}
              blurStrength={5}
            >
              Hello Padel Russia — полная программа международной академии, переведённая на русский официально.
            </ScrollReveal>
          </div>
        </Demo>

        <Demo code="TX6" title="Слово меняется в заголовке" source="Aceternity · Flip Words" note="Одна строка, в которой по очереди сменяются удары.">
          <div className="font-title text-2xl font-extrabold text-white sm:text-4xl">
            Разберём твою <FlipWords words={["бандеху", "вибору", "чикиту", "подачу", "смэш"]} className="text-[#FFD200]" />
          </div>
        </Demo>

        <Demo code="TX7" title="Печатная машинка" source="Aceternity · Typewriter Effect">
          <TypewriterEffectSmooth
            words={[
              { text: "Падел", className: "text-white" },
              { text: "по", className: "text-white" },
              { text: "методу", className: "text-white" },
              { text: "Маури", className: "text-white" },
              { text: "Андрини", className: "text-[#FFD200]" },
            ]}
            className="my-0"
            cursorClassName="bg-[#FFD200]"
          />
        </Demo>

        <Demo
          code="TX8"
          title="Контур текста светится за курсором"
          source="Aceternity · Text Hover Effect"
          note="Надпись прозрачная, при наведении внутри букв проявляется градиент."
          flush
        >
          <div className="h-[260px] w-full">
            <TextHoverEffect text="PADEL" />
          </div>
        </Demo>

        <Demo code="TX9" title="Северное сияние в буквах" source="Magic UI · Aurora Text">
          <p className="font-title text-3xl font-extrabold text-white sm:text-5xl">
            Курс <AuroraText colors={["#FFD200", "#FFDE3D", "#E5BC00", "#fff"]}>Hello Padel</AuroraText> на русском
          </p>
        </Demo>

        <Demo
          code="TX10"
          title="Ещё пять вариантов подачи текста"
          source="Magic UI · Hyper Text, Sparkles, Line Shadow, Text Animate · Aceternity · Pointer Highlight"
          note="Перебор символов, искры, объёмная тень, появление по словам и выделение рамкой."
        >
          <div className="grid gap-7">
            <HyperText className="font-title text-2xl font-extrabold text-white sm:text-3xl" duration={900}>
              HELLO PADEL RUSSIA
            </HyperText>
            <SparklesText className="font-title text-2xl font-extrabold text-white sm:text-3xl" colors={{ first: "#FFD200", second: "#FFFFFF" }}>
              Одна глава бесплатно
            </SparklesText>
            <p className="font-title text-2xl font-extrabold text-white sm:text-4xl">
              <LineShadowText shadowColor="#FFD200">166</LineShadowText> уроков
            </p>
            <TextAnimate animation="blurInUp" by="word" className="text-lg text-neutral-200" once>
              От первого хвата до тактики в паре — по порядку и на русском.
            </TextAnimate>
            <div className="text-lg text-neutral-200">
              Курс ведёт{" "}
              <PointerHighlight rectangleClassName="border-[#FFD200]" pointerClassName="text-[#FFD200]">
                <span className="px-1">с 1.0 до 5.0</span>
              </PointerHighlight>{" "}
              по шкале академии.
            </div>
          </div>
        </Demo>

        <div className="h-[40vh]" />
      </div>
    </main>
  );
}
