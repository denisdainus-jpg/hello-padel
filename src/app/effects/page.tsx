"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const CODES = [
  "3D1","3D2","3D3",
  "TX1","TX2","TX3","TX4","TX5","TX6","TX7","TX8","TX9","TX10",
  "GS1","GS2","GS3",
];

function Demo({
  code, title, source, note, tone = "dark", flush = false, children,
}: {
  code: string; title: string; source: string; note?: string;
  tone?: "light" | "dark" | "brand"; flush?: boolean; children: React.ReactNode;
}) {
  const bg = tone === "dark" ? "bg-[#0A0A0A]" : tone === "brand" ? "bg-[#FFD200]" : "bg-[#FFFDF5]";
  return (
    <section id={code} className="min-w-0 scroll-mt-24 border-t-2 border-[#0A0A0A] pt-10">
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <span className="rounded-full bg-[#0A0A0A] px-3 py-1.5 font-title text-xs font-extrabold text-[#FFD200]">{code}</span>
        <h2 className="font-title text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
        <span className="rounded-full bg-[#FFF6CC] px-2.5 py-1 text-xs font-semibold">{source}</span>
      </div>
      {note ? <p className="mb-5 max-w-[80ch] text-sm leading-relaxed text-neutral-500">{note}</p> : null}
      <div className={`overflow-hidden rounded-3xl ring-1 ring-black/10 ${bg} ${flush ? "" : "p-5 sm:p-8"}`}>
        {children}
      </div>
    </section>
  );
}

/* ---------- GSAP: параллакс фотографий ---------- */
function GsapParallax() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gp-layer").forEach((el, i) => {
        gsap.to(el, {
          yPercent: (i + 1) * -18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="relative h-[320px] overflow-hidden rounded-2xl">
      {[0, 1, 2].map((i) => (
        <div key={i} className="gp-layer absolute inset-0" style={{ zIndex: 3 - i }}>
          <Image
            src={`/photos/modules/0${i + 3}.webp`}
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 1 - i * 0.28, transform: `scale(${1.1 + i * 0.06})` }}
          />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center bg-black/45">
        <p className="font-title text-2xl font-extrabold text-white">Слои едут с разной скоростью</p>
      </div>
    </div>
  );
}

/* ---------- GSAP: горизонтальная лента модулей с закреплением ---------- */
function GsapPinnedTrack() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const t = track.current!;
      const distance = t.scrollWidth - t.clientWidth;
      if (distance <= 0) return;
      gsap.to(t, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="relative h-[360px] overflow-hidden rounded-2xl bg-[#111]">
      <div ref={track} className="flex h-full items-center gap-5 px-6 will-change-transform">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="relative h-[240px] w-[300px] flex-none overflow-hidden rounded-xl sm:w-[360px]">
            <Image src={`/photos/modules/0${i + 1}.webp`} alt="" fill className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-[#FFD200] px-3 py-1 font-title text-xs font-extrabold text-[#0A0A0A]">
              Модуль {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- GSAP: заголовок проявляется из-под маски ---------- */
function GsapMaskReveal() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".gm-line span", {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="py-6">
      {["Падел по методу", "Маури Андрини —", "теперь на русском"].map((line) => (
        <div key={line} className="gm-line overflow-hidden">
          <span className="block font-title text-3xl font-extrabold leading-[1.1] text-white sm:text-5xl">{line}</span>
        </div>
      ))}
    </div>
  );
}

export default function EffectsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 pb-24 sm:px-5">
      <header className="sticky top-0 z-50 -mx-4 mb-8 border-b border-black/10 bg-[#FFFDF5]/90 px-4 py-3 backdrop-blur sm:-mx-5 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <b className="font-title text-base font-extrabold">Эффекты: 3D, текст, GSAP</b>
          <nav className="flex flex-wrap gap-1 text-xs font-semibold">
            {CODES.map((c) => (
              <a key={c} href={`#${c}`} className="rounded-full bg-white px-2 py-1 ring-1 ring-black/10 hover:bg-[#FFD200]">{c}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mb-10 max-w-[80ch]">
        <h1 className="font-title text-3xl font-extrabold tracking-tight">Эффекты для первого экрана и заголовков</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Три блока: 3D-карточка тренера для первого экрана, текстовые эффекты и работа GSAP —
          того самого инструмента, которым сделаны эффекты прокрутки на дорогих сайтах.
          Наводите, прокручивайте, называйте коды.
        </p>
      </div>

      <div className="grid min-w-0 gap-14">

        {/* ---------- 3D ---------- */}
        <Demo code="3D1" title="Тренер: карточка наклоняется за курсором" source="React Bits · Tilted Card"
          note="Фото Маури в 3D: карточка следует за мышкой, подпись всплывает рядом. На телефоне — реагирует на касание.">
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

        <Demo code="3D2" title="Тренер: объёмная карточка с бликом" source="Aceternity · Comet Card"
          note="Карточка живёт в перспективе: наклон, блик и лёгкое приподнимание. Появляется мягко при загрузке.">
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

        <Demo code="3D3" title="Стопка карточек, которая сама перекладывается" source="React Bits · Card Swap"
          note="Карточки по очереди выходят вперёд. Годится и для модулей, и для отзывов, и для первого экрана."
          flush>
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

        <Demo code="TX2" title="Блик бежит по надписи" source="React Bits · Shiny Text"
          note="Тонкий приём для подзаголовка или кнопки: по тексту едет светлая полоса.">
          <ShinyText
            text="166 видеоуроков · 9 модулей · 22 главы"
            className="font-title text-2xl font-extrabold sm:text-3xl"
            color="#8a8a8a"
            shineColor="#FFD200"
            speed={3}
            spread={2}
          />
        </Demo>

        <Demo code="TX3" title="Текст расшифровывается" source="React Bits · Decrypted Text"
          note="Буквы перебираются и складываются в слово. Хорошо для одного акцентного слова, не для абзаца.">
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

        <Demo code="TX4" title="Слова всплывают при прокрутке" source="React Bits · Scroll Float"
          note="Каждое слово поднимается и проявляется по мере того, как блок входит в кадр." flush>
          <div className="h-[320px] overflow-y-auto px-6 py-10">
            <div className="h-24" />
            <ScrollFloat
              containerClassName="text-white"
              textClassName="font-title text-3xl font-extrabold sm:text-4xl"
              stagger={0.04}
            >
              Ты играешь год, а прогресса нет
            </ScrollFloat>
            <div className="h-40" />
          </div>
        </Demo>

        <Demo code="TX5" title="Абзац проявляется по словам" source="React Bits · Scroll Reveal"
          note="Длинный текст расфокусирован, при прокрутке слова наводятся на резкость. Годится для описания курса." flush>
          <div className="h-[340px] overflow-y-auto px-6 py-10">
            <div className="h-20" />
            <ScrollReveal
              containerClassName="text-white"
              textClassName="text-lg leading-relaxed"
              enableBlur
              baseOpacity={0.1}
              blurStrength={5}
            >
              Hello Padel Russia — полная программа международной академии, переведённая на русский официально.
            </ScrollReveal>
            <div className="h-40" />
          </div>
        </Demo>

        <Demo code="TX6" title="Слово меняется в заголовке" source="Aceternity · Flip Words"
          note="Одна строка, в которой по очереди сменяются удары. Показывает широту курса в одной фразе.">
          <div className="font-title text-2xl font-extrabold text-white sm:text-4xl">
            Разберём твою <FlipWords words={["бандеху", "виbtoру", "чикиту", "подачу", "смэш"]} className="text-[#FFD200]" />
          </div>
        </Demo>

        <Demo code="TX7" title="Печатная машинка" source="Aceternity · Typewriter Effect">
          <TypewriterEffectSmooth
            words={[
              { text: "Падел" },
              { text: "по" },
              { text: "методу" },
              { text: "Маури" },
              { text: "Андрини", className: "text-[#FFD200]" },
            ]}
            className="my-0"
          />
        </Demo>

        <Demo code="TX8" title="Контур текста светится за курсором" source="Aceternity · Text Hover Effect"
          note="Крупная надпись прозрачная, при наведении внутри букв проявляется градиент. Сильный приём для первого экрана." flush>
          <div className="h-[260px] w-full">
            <TextHoverEffect text="PADEL" />
          </div>
        </Demo>

        <Demo code="TX9" title="Северное сияние в буквах" source="Magic UI · Aurora Text">
          <p className="font-title text-3xl font-extrabold text-white sm:text-5xl">
            Курс <AuroraText colors={["#FFD200", "#FFDE3D", "#E5BC00", "#fff"]}>Hello Padel</AuroraText> на русском
          </p>
        </Demo>

        <Demo code="TX10" title="Ещё четыре варианта подачи текста" source="Magic UI · Hyper Text, Sparkles, Line Shadow, Text Animate"
          note="Собрал в один блок, чтобы сравнить: перебор символов, искры, объёмная тень и появление по словам.">
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

        {/* ---------- GSAP ---------- */}
        <Demo code="GS1" title="GSAP: слои едут с разной скоростью" source="GSAP · ScrollTrigger"
          note="Классический параллакс. Библиотека бесплатна целиком с 2025 года, включая плагины прокрутки." flush>
          <div className="p-5 sm:p-8">
            <GsapParallax />
          </div>
        </Demo>

        <Demo code="GS2" title="GSAP: модули едут вбок, пока страница стоит" source="GSAP · ScrollTrigger + Pin"
          note="Блок закрепляется, и вместо вертикальной прокрутки едет лента модулей. Тот самый приём с дорогих сайтов. Прокрутите внутри блока." flush>
          <div className="h-[420px] overflow-y-auto">
            <div className="h-10" />
            <GsapPinnedTrack />
            <div className="h-[420px]" />
          </div>
        </Demo>

        <Demo code="GS3" title="GSAP: заголовок выезжает из-под маски" source="GSAP · ScrollTrigger"
          note="Строки выходят снизу с лёгким опозданием друг за другом. Самый универсальный приём для заголовков секций.">
          <GsapMaskReveal />
        </Demo>

        <footer className="border-t-2 border-[#0A0A0A] pt-8 text-sm text-neutral-500">
          React Bits, Aceternity, Magic UI и GSAP — всё бесплатное и установлено из открытых источников.
        </footer>
      </div>
    </main>
  );
}
