"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Spotlight } from "@/components/ui/spotlight-new";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { VideoText } from "@/components/ui/video-text";
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel";
import { FocusCards } from "@/components/ui/focus-cards";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { GlareCard } from "@/components/ui/glare-card";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { BentoGridAce, BentoGridAceItem } from "@/components/ui/bento-grid-ace";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CardStack } from "@/components/ui/card-stack";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { MagicCard } from "@/components/ui/magic-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { BorderBeam } from "@/components/ui/border-beam";
import { Meteors } from "@/components/ui/meteors";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Vortex } from "@/components/ui/vortex";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { WarpBackground } from "@/components/ui/warp-background";
import { Tabs } from "@/components/ui/tabs";

const MOD_PHOTOS = Array.from({ length: 9 }, (_, i) => `/photos/modules/0${i + 1}.webp`);

const MODS = [
  { n: 1, t: "Добро пожаловать в падел", d: "История игры, правила, экипировка, выбор ракетки, первая техника", les: "23 урока" },
  { n: 2, t: "Подача и приём", d: "Техника и прогрессия подачи, позиция на приёме, работа ног", les: "13 уроков" },
  { n: 3, t: "Бандеха, вибора, смэш", d: "Три удара сверху: бандеха шаг за шагом, вибора, силовой и кик-смэш", les: "21 урок" },
  { n: 4, t: "Игра у сетки", d: "Позиция и частые ошибки волея, дроп-волей, форхенд-волей", les: "11 уроков" },
  { n: 5, t: "Игра с задней линии", d: "Форхенд и бэкхенд, переход из защиты в атаку, свечка, чикита", les: "36 уроков" },
  { n: 6, t: "Стены под контролем", d: "Удары от стен, бахада, задняя стена, боковое и двойное стекло", les: "31 урок" },
  { n: 7, t: "Забота о своём теле", d: "Травмы, профилактика, физическая подготовка", les: "10 уроков" },
  { n: 8, t: "Средний уровень", d: "Работа 1 на 1 и групповая тренировка", les: "10 уроков" },
  { n: 9, t: "Совершенный уровень", d: "Работа 1 на 1 и групповая тренировка на высшем уровне", les: "11 уроков" },
];

const CODES = ["H1","H2","H3","H4","M1","M2","M3","M4","P1","P2","P3","S1","S2","S3","F1","F2","F3","R1","R2","T1","T2","T3","C1","C2","C3","Q1","L1"];

function Demo({
  code, title, source, note, tone = "light", flush = false, children,
}: {
  code: string; title: string; source: string; note: string;
  tone?: "light" | "dark" | "brand"; flush?: boolean; children: React.ReactNode;
}) {
  const bg = tone === "dark" ? "bg-[#0A0A0A]" : tone === "brand" ? "bg-[#FFD200]" : "bg-[#FFFDF5]";
  // «Повторить» пересоздаёт компонент целиком — анимация появления проигрывается заново
  const [take, setTake] = useState(0);
  return (
    <section id={code} className="min-w-0 scroll-mt-24 border-t-2 border-[#0A0A0A] pt-10">
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <span className="rounded-full bg-[#0A0A0A] px-3 py-1.5 font-title text-xs font-extrabold text-[#FFD200]">{code}</span>
        <h2 className="font-title text-2xl font-extrabold tracking-tight">{title}</h2>
        <span className="rounded-full bg-[#FFF6CC] px-2.5 py-1 text-xs font-semibold">оригинал · {source}</span>
      </div>
      <p className="mb-5 max-w-[80ch] text-sm leading-relaxed text-neutral-500">{note}</p>
      <div key={take} className={`overflow-hidden rounded-3xl ring-1 ring-black/10 ${bg} ${flush ? "" : "p-4 sm:p-6"}`}>
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

export default function Round2() {
  const [lenisOn, setLenisOn] = useState(false);

  // L1 — плавная прокрутка Lenis, включается кнопкой
  useEffect(() => {
    if (!lenisOn) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [lenisOn]);

  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 pb-24 sm:px-5">
      <header className="sticky top-0 z-50 -mx-4 mb-8 border-b border-black/10 bg-[#FFFDF5]/90 px-4 py-3 backdrop-blur sm:-mx-5 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <b className="font-title text-base font-extrabold">Раунд 2 · оригиналы библиотек</b>
          <nav className="flex flex-wrap gap-1 text-xs font-semibold">
            {CODES.map((c) => (
              <a key={c} href={`#${c}`} className="rounded-full bg-white px-2 py-1 ring-1 ring-black/10 hover:bg-[#FFD200]">{c}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mb-10 max-w-[80ch]">
        <h1 className="font-title text-3xl font-extrabold tracking-tight">Новые варианты по секциям</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Всё ниже — код библиотек без переписывания, наполненный вашим контентом. Назовите коды, которые
          понравились, — встрою их в сайт. Каждый блок проверен на узком экране.
        </p>
      </div>

      <div className="grid min-w-0 gap-14">

        {/* ============ ПЕРВЫЙ ЭКРАН ============ */}
        <Demo code="H1" title="Первый экран: фото модулей параллаксом" source="Aceternity · Hero Parallax"
          note="Три ряда фотографий разъезжаются в разные стороны при прокрутке, заголовок остаётся сверху. Показывает объём курса без единого слова."
          tone="dark" flush>
          <div className="h-[560px] overflow-y-auto overflow-x-hidden">
            <HeroParallax
              products={[...MODS, ...MODS.slice(0, 6)].map((m, i) => ({
                title: `Модуль ${m.n} — ${m.t}`,
                link: "#",
                thumbnail: MOD_PHOTOS[i % 9],
              }))}
            />
          </div>
        </Demo>

        <Demo code="H2" title="Первый экран: экран поворачивается при скролле" source="Aceternity · Container Scroll Animation"
          note="Как на презентациях Apple: панель с видео наклонена, при прокрутке разворачивается к зрителю."
          flush>
          <div className="h-[520px] overflow-y-auto overflow-x-hidden">
            <ContainerScroll
              titleComponent={
                <div className="mb-4">
                  <p className="text-sm font-bold uppercase tracking-wider text-neutral-500">Официальный курс</p>
                  <h3 className="font-title text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Падел по методу Маури Андрини
                  </h3>
                </div>
              }
            >
              <Image src="/photos/modules/03.webp" alt="Модуль курса" width={1456} height={1080}
                className="h-full w-full rounded-2xl object-cover" draggable={false} />
            </ContainerScroll>
          </div>
        </Demo>

        <Demo code="H3" title="Первый экран: прожектор и текст по словам" source="Aceternity · Spotlight New + Text Generate Effect"
          note="Луч мягко ходит по тёмному фону, заголовок проявляется слово за словом. Тихо и дорого."
          tone="dark" flush>
          <div className="relative flex min-h-[440px] w-full items-center overflow-hidden">
            <Spotlight />
            <div className="relative z-10 px-6 py-16 sm:px-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD200]">Hello Padel Russia</p>
              <TextGenerateEffect
                className="[&_span]:!text-white"
                words="Падел по методу Маури Андрини — теперь на русском"
              />
              <p className="mt-5 max-w-lg text-sm text-neutral-400">
                166 видеоуроков от первого хвата до тактики в паре.
              </p>
              <button className="mt-6 rounded-full bg-[#FFD200] px-6 py-3 font-title text-sm font-extrabold text-[#0A0A0A]">
                Забрать главу бесплатно
              </button>
            </div>
          </div>
        </Demo>

        <Demo code="H4" title="Первый экран: буквы, залитые видео" source="Magic UI · Video Text"
          note="Внутри крупных букв играет ролик с корта. Приём редкий, запоминается сразу."
          tone="dark" flush>
          <div className="relative h-[260px] w-full">
            <VideoText src="/video/03.mp4" fontSize={12} fontWeight="900" className="font-title">
              ПАДЕЛ
            </VideoText>
          </div>
        </Demo>

        {/* ============ МОДУЛИ ============ */}
        <Demo code="M1" title="Модули: карточки как на Apple" source="Aceternity · Apple Cards Carousel"
          note="Крупные фото едут лентой, клик разворачивает модуль с описанием глав. Тот же компонент подойдёт и для видео-советов."
          flush>
          <Carousel
            items={MODS.map((m, i) => (
              <AppleCard
                key={m.n}
                index={i}
                card={{
                  src: MOD_PHOTOS[i],
                  title: m.t,
                  category: `Модуль ${m.n} · ${m.les}`,
                  content: (
                    <div className="rounded-2xl bg-[#FFF6CC] p-6">
                      <p className="text-base font-semibold text-[#0A0A0A]">{m.d}</p>
                      <p className="mt-3 text-sm text-neutral-600">
                        Внутри модуля — уроки по 2–15 минут: подготовка, выполнение, куда направлять удар и разбор частых ошибок.
                      </p>
                    </div>
                  ),
                }}
              />
            ))}
          />
        </Demo>

        <Demo code="M2" title="Модули: сетка с фокусом" source="Aceternity · Focus Cards"
          note="Наведение оставляет резким один модуль, остальные уходят в размытие. На телефоне работает по тапу."
          flush>
          <FocusCards cards={MODS.map((m, i) => ({ title: `${m.n}. ${m.t}`, src: MOD_PHOTOS[i] }))} />
        </Demo>

        <Demo code="M3" title="Модули: клик разворачивает карточку" source="Aceternity · Layout Grid"
          note="Асимметричная сетка: нажатие плавно раскрывает модуль на весь блок с описанием."
          flush>
          <div className="h-[520px] w-full">
            <LayoutGrid
              cards={MODS.slice(0, 4).map((m, i) => ({
                id: m.n,
                thumbnail: MOD_PHOTOS[i],
                className: i === 0 || i === 3 ? "md:col-span-2" : "col-span-1",
                content: (
                  <div>
                    <p className="font-title text-xl font-extrabold text-white">{m.t}</p>
                    <p className="mt-2 text-sm text-neutral-300">{m.d}</p>
                    <span className="mt-3 inline-block rounded-full bg-[#FFD200] px-3 py-1 text-xs font-extrabold text-[#0A0A0A]">{m.les}</span>
                  </div>
                ),
              }))}
            />
          </div>
        </Demo>

        <Demo code="M4" title="Модули: маршрут с закреплённым фото" source="Aceternity · Sticky Scroll Reveal"
          note="Слева описание модуля, справа фото — меняются по мере прокрутки. Читается как маршрут курса."
          flush>
          <div className="h-[480px] overflow-hidden">
            <StickyScroll
              content={MODS.slice(0, 5).map((m, i) => ({
                title: `Модуль ${m.n} — ${m.t}`,
                description: `${m.d}. ${m.les}.`,
                content: (
                  <Image src={MOD_PHOTOS[i]} alt={m.t} width={1456} height={1080} className="h-full w-full object-cover" />
                ),
              }))}
            />
          </div>
        </Demo>

        {/* ============ БОЛИ ============ */}
        <Demo code="P1" title="Боли: блик по карточке" source="Aceternity · Glare Card"
          note="Карточка ловит блик под курсором, как на сайте Linear. Строго и premium."
          tone="dark">
          <div className="flex flex-wrap justify-center gap-5">
            {[
              ["1", "Мяч от стекла — и розыгрыш проигран"],
              ["2", "Бьёшь смэш, когда надо бандеху"],
            ].map(([n, t]) => (
              <GlareCard key={n} className="flex flex-col items-start justify-end p-6">
                <p className="font-title text-2xl font-extrabold text-[#FFD200]">{n}</p>
                <p className="mt-2 text-base font-semibold text-white">{t}</p>
              </GlareCard>
            ))}
          </div>
        </Demo>

        <Demo code="P2" title="Боли: фокус на одной" source="Aceternity · Focus Cards"
          note="Тот же приём, что и для модулей, но на фотографиях с корта: выбранная боль резкая, соседние размыты."
          flush>
          <FocusCards
            cards={[
              { title: "Не понимаешь, куда встать", src: "/video/05.webp" },
              { title: "Учишься по чужим роликам", src: "/video/06.webp" },
              { title: "Закрепляешь ошибки", src: "/video/07.webp" },
            ]}
          />
        </Demo>

        <Demo code="P3" title="Боли: карточки можно раскидать" source="Aceternity · Draggable Card"
          note="Карточки лежат стопкой под углом, их можно растащить мышкой — они пружинят. Игровой приём, хорошо ложится на спорт."
          tone="dark" flush>
          <DraggableCardContainer className="relative flex h-[420px] w-full items-center justify-center">
            <p className="absolute mx-auto max-w-sm text-center font-title text-xl font-extrabold text-neutral-700">
              Растащи карточки
            </p>
            {[
              ["Мяч от стекла", "/photos/modules/02.webp", "rotate-[-8deg] -translate-x-24"],
              ["Смэш вместо бандехи", "/photos/modules/05.webp", "rotate-[6deg] translate-x-16"],
              ["Тренер занят", "/photos/modules/08.webp", "rotate-[10deg] translate-x-40 translate-y-8"],
            ].map(([t, src, cls]) => (
              <DraggableCardBody key={t as string} className={cls as string}>
                <Image src={src as string} alt={t as string} width={1456} height={1080}
                  className="pointer-events-none relative z-10 h-56 w-56 object-cover" />
                <h3 className="mt-4 text-center font-title text-lg font-extrabold text-neutral-700">{t}</h3>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </Demo>

        {/* ============ РЕШЕНИЕ И РЕЗУЛЬТАТ ============ */}
        <Demo code="S1" title="Решение: бенто-сетка" source="Aceternity · Bento Grid"
          note="Асимметричные плитки: крупная — про систему, мелкие — про перевод и лицензию. При наведении плитка приподнимается."
          flush>
          <BentoGridAce className="md:auto-rows-[16rem]">
            {[
              { title: "166 уроков по порядку", description: "От первого хвата до тактики в паре, без пропусков.", span: "md:col-span-2" },
              { title: "Метод, а не мнение", description: "Та же методика, по которой академия учит тренеров.", span: "" },
              { title: "Всё по-русски", description: "Перевод под контролем академии, без автосубтитров.", span: "" },
              { title: "Официальная лицензия", description: "Права получены у правообладателя, курс не пропадёт.", span: "md:col-span-2" },
            ].map((it, i) => (
              <BentoGridAceItem
                key={it.title}
                title={it.title}
                description={it.description}
                className={it.span}
                header={
                  <div className="relative h-full min-h-[6rem] w-full overflow-hidden rounded-xl">
                    <Image src={MOD_PHOTOS[i + 2]} alt="" fill className="object-cover" />
                  </div>
                }
              />
            ))}
          </BentoGridAce>
        </Demo>

        <Demo code="S2" title="Решение: «мы и остальные» карточками" source="Aceternity · Card Hover Effect"
          note="Под курсором за карточкой мягко переезжает подложка. Здесь — сравнение курса с YouTube и тренером."
          flush>
          <HoverEffect
            items={[
              { title: "YouTube", description: "Обрывки без системы, чужой язык, порядок случайный.", link: "#" },
              { title: "Персональный тренер", description: "Дорого, по расписанию, разбор не пересмотреть.", link: "#" },
              { title: "Hello Padel", description: "166 уроков по порядку, на русском, доступ навсегда.", link: "#" },
            ]}
          />
        </Demo>

        <Demo code="S3" title="Результат: луч ведёт по списку" source="Aceternity · Tracing Beam"
          note="Слева тянется светящийся луч, отмечая, где вы находитесь в списке результатов."
          flush>
          <div className="h-[460px] overflow-y-auto overflow-x-hidden px-2">
            <TracingBeam className="px-6">
              <div className="mx-auto max-w-2xl pt-4">
                {[
                  ["Держишь сетку", "Перестанешь бить смэш там, где нужна бандеха."],
                  ["Выходишь из угла", "Начнёшь выходить из-под мяча у задней стены, а не отбивать в стекло."],
                  ["Бьёшь осознанно", "Поймёшь, куда направлять удар, а не просто попадать в корт."],
                  ["Знаешь, что тренировать", "Будет понятно, что отрабатывать в следующий раз."],
                ].map(([h, t]) => (
                  <div key={h} className="mb-10">
                    <span className="mb-3 inline-block rounded-full bg-[#0A0A0A] px-3 py-1 text-xs font-extrabold text-[#FFD200]">{h}</span>
                    <p className="text-base text-neutral-700">{t}</p>
                  </div>
                ))}
              </div>
            </TracingBeam>
          </div>
        </Demo>

        {/* ============ БЕСПЛАТНАЯ ГЛАВА ============ */}
        <Demo code="F1" title="Глава под уровень: три карточки" source="Aceternity · Card Hover Effect"
          note="Ровно ваша новая механика: бот подбирает главу под уровень, а карточки показывают, какая кому достанется."
          flush>
          <HoverEffect
            items={[
              { title: "Новичку", description: "Глава про фундамент: хват, стойка, правила и первые удары.", link: "#" },
              { title: "Среднему уровню", description: "Глава про разбор удара: бандеха или игра от стен.", link: "#" },
              { title: "Опытному", description: "Глава про тактику: позиция в паре и решения в розыгрыше.", link: "#" },
            ]}
          />
        </Demo>

        <Demo code="F2" title="Глава под уровень: подсветка за курсором" source="Magic UI · Magic Card"
          note="Градиент следует за указателем внутри карточки. Спокойнее предыдущего варианта, ближе к вашему стилю."
          tone="dark">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Новичку", "Фундамент: хват, стойка, правила"],
              ["Среднему", "Разбор удара: бандеха, стены"],
              ["Опытному", "Тактика: позиция и решения"],
            ].map(([h, t]) => (
              <MagicCard key={h} className="rounded-2xl p-6" gradientColor="#FFD200" gradientOpacity={0.22}>
                <p className="font-title text-lg font-extrabold text-white">{h}</p>
                <p className="mt-2 text-sm text-neutral-300">{t}</p>
              </MagicCard>
            ))}
          </div>
        </Demo>

        <Demo code="F3" title="Глава под уровень: живой градиент по краю" source="Aceternity · Background Gradient"
          note="Вокруг карточки медленно движется градиент. Хорошо выделяет один блок среди остальных."
          tone="dark">
          <div className="grid gap-5 sm:grid-cols-2">
            <BackgroundGradient className="rounded-[22px] bg-[#0A0A0A] p-6">
              <p className="font-title text-lg font-extrabold text-white">Глава бесплатно</p>
              <p className="mt-2 text-sm text-neutral-300">Целиком, со всеми уроками. Бот подберёт под твой уровень.</p>
              <button className="mt-4 rounded-full bg-[#FFD200] px-5 py-2.5 font-title text-sm font-extrabold text-[#0A0A0A]">Забрать</button>
            </BackgroundGradient>
            <div className="rounded-[22px] bg-white/5 p-6 ring-1 ring-white/10">
              <p className="font-title text-lg font-extrabold text-white">Для сравнения</p>
              <p className="mt-2 text-sm text-neutral-400">Обычная карточка без эффекта — видно разницу.</p>
            </div>
          </div>
        </Demo>

        {/* ============ ОТЗЫВЫ ============ */}
        <Demo code="R1" title="Отзывы: стопка карточек" source="Aceternity · Card Stack"
          note="Карточки сами перелистываются каждые несколько секунд. Занимает место одной, а отзывов показывает много."
          flush>
          <div className="flex h-[320px] items-center justify-center">
            <CardStack
              items={[
                { id: 0, name: "Marc Møller", designation: "Игрок Hello Padel Academy", content: <p>Метод помог мне прогрессировать быстрее, чем когда-либо. Видеть свой рост — сильная мотивация.</p> },
                { id: 1, name: "Carla Touly", designation: "Игрок Hello Padel Academy", content: <p>Уроки помогли исправить ошибки, которых я даже не замечала. Играю увереннее и стабильнее.</p> },
                { id: 2, name: "Scott Clayton", designation: "Игрок Hello Padel Academy", content: <p>Пришёл из большого тенниса — понимание игры и выбор ударов заметно выросли.</p> },
              ]}
            />
          </div>
        </Demo>

        <Demo code="R2" title="Отзывы: стена в перспективе" source="Aceternity · 3D Marquee"
          note="Кадры едут наклонной стеной. Подойдёт фоном под отзывы или как фон финального призыва."
          tone="dark" flush>
          <div className="h-[420px] overflow-hidden">
            <ThreeDMarquee images={[...MOD_PHOTOS, ...MOD_PHOTOS, ...MOD_PHOTOS, ...MOD_PHOTOS].slice(0, 31)} />
          </div>
        </Demo>

        {/* ============ ТАРИФЫ ============ */}
        <Demo code="T1" title="Тариф: луч по рамке" source="Magic UI · Border Beam"
          note="По периметру карточки бежит светящийся отрезок. Тоньше и дороже, чем сплошная подсветка."
          tone="dark">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Месяц</p>
              <p className="mt-2 font-title text-3xl font-extrabold">2 990 ₽</p>
              <p className="mt-2 text-sm text-neutral-500">30 дней доступа</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFDE3D] via-[#FFD200] to-[#E5BC00] p-6">
              <BorderBeam size={120} duration={7} colorFrom="#0A0A0A" colorTo="#ffffff" />
              <p className="text-xs font-bold uppercase tracking-wider">Навсегда</p>
              <p className="mt-2 font-title text-3xl font-extrabold">4 990 ₽</p>
              <p className="mt-2 text-sm font-semibold">≈30 ₽ за урок · без ограничения по времени</p>
            </div>
          </div>
        </Demo>

        <Demo code="T2" title="Тариф: живой градиент вокруг" source="Aceternity · Background Gradient"
          note="Тот же приём, что в F3, но на тарифе: выделенный вариант заметен сразу."
          tone="dark">
          <div className="mx-auto max-w-sm">
            <BackgroundGradient className="rounded-[22px] bg-[#0A0A0A] p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FFD200]">Навсегда</p>
              <p className="mt-2 font-title text-3xl font-extrabold text-white">4 990 ₽</p>
              <ul className="mt-4 grid gap-2 text-sm text-neutral-300">
                <li>Весь курс навсегда + новые уроки</li>
                <li>Доступ без ограничения по времени</li>
              </ul>
            </BackgroundGradient>
          </div>
        </Demo>

        <Demo code="T3" title="Тариф: бегущая рамка кнопки и метеоры" source="Aceternity · Moving Border + Magic UI · Meteors"
          note="По контуру кнопки бежит светящийся сегмент, по карточке падают метеоры. Самый заметный из трёх."
          tone="dark">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-[#111] p-6 ring-1 ring-white/10">
            <Meteors number={14} />
            <p className="relative text-xs font-bold uppercase tracking-wider text-[#FFD200]">Навсегда</p>
            <p className="relative mt-2 font-title text-3xl font-extrabold text-white">4 990 ₽</p>
            <div className="relative mt-5">
              <MovingBorderButton borderRadius="1.75rem" className="bg-[#0A0A0A] font-title text-sm font-extrabold text-white">
                Купить навсегда
              </MovingBorderButton>
            </div>
          </div>
        </Demo>

        {/* ============ ФИНАЛ ============ */}
        <Demo code="C1" title="Финал: завихрённый фон" source="Aceternity · Vortex"
          note="Частицы закручиваются вокруг кнопки. Живо, но не отвлекает от действия."
          tone="dark" flush>
          <div className="h-[380px] w-full overflow-hidden">
            <Vortex backgroundColor="#0A0A0A" particleCount={420} baseHue={45} className="flex h-full w-full flex-col items-center justify-center px-6 py-10">
              <h3 className="text-center font-title text-2xl font-extrabold text-white">166 уроков ждут</h3>
              <p className="mt-3 max-w-md text-center text-sm text-neutral-300">
                Забери одну главу бесплатно — целиком и под свой уровень.
              </p>
              <button className="mt-6 rounded-full bg-[#FFD200] px-6 py-3 font-title text-sm font-extrabold text-[#0A0A0A]">
                Забрать главу
              </button>
            </Vortex>
          </div>
        </Demo>

        <Demo code="C2" title="Финал: лучи со вспышками" source="Aceternity · Background Beams With Collision"
          note="Лучи падают сверху и разбиваются о нижнюю границу блока. Эффектнее всего на тёмном."
          tone="dark" flush>
          <div className="h-[380px] w-full">
            <BackgroundBeamsWithCollision className="h-full bg-[#0A0A0A]">
              <div className="relative z-20 text-center">
                <h3 className="font-title text-2xl font-extrabold text-white">Начни с бесплатной главы</h3>
                <button className="mt-5 rounded-full bg-[#FFD200] px-6 py-3 font-title text-sm font-extrabold text-[#0A0A0A]">
                  Забрать главу
                </button>
              </div>
            </BackgroundBeamsWithCollision>
          </div>
        </Demo>

        <Demo code="C3" title="Финал: искривлённое пространство" source="Magic UI · Warp Background"
          note="Вокруг блока бегут светящиеся линии в перспективе, будто это экран. Самый необычный вариант."
          tone="dark" flush>
          <WarpBackground className="border-0 bg-[#0A0A0A] p-8" beamsPerSide={4} gridColor="rgba(255,210,0,.25)">
            <div className="mx-auto max-w-sm rounded-2xl bg-[#111] p-6 text-center ring-1 ring-white/10">
              <h3 className="font-title text-xl font-extrabold text-white">166 уроков ждут</h3>
              <button className="mt-5 rounded-full bg-[#FFD200] px-6 py-3 font-title text-sm font-extrabold text-[#0A0A0A]">
                Забрать главу бесплатно
              </button>
            </div>
          </WarpBackground>
        </Demo>

        {/* ============ FAQ ============ */}
        <Demo code="Q1" title="FAQ: вкладки по темам" source="Aceternity · Tabs"
          note="Шестнадцать вопросов разложены по трём вкладкам — оплата, курс, для кого. Активная вкладка переезжает плавно."
          flush>
          <div className="h-[26rem] [perspective:1000px] sm:h-[24rem]">
            <Tabs
              containerClassName="mb-4"
              activeTabClassName="bg-[#0A0A0A]"
              tabClassName="font-body text-sm font-bold text-[#0A0A0A]"
              tabs={[
                { title: "Оплата и доступ", value: "pay", content: <FaqCard items={[["Как оплатить?", "Способ оплаты предложит бот при выборе тарифа. Оплата разовая."], ["Что после окончания срока?", "Доступ закроется, продлить можно в боте в любой момент."]]} /> },
                { title: "Про курс", value: "course", content: <FaqCard items={[["Из чего состоит курс?", "9 модулей, 22 главы и 166 видеоуроков — от базовой техники до продвинутых связок."], ["Чем лучше YouTube?", "Разборы идут по системе, на русском, без пропусков и повторов."]]} /> },
                { title: "Для кого", value: "who", content: <FaqCard items={[["Играю раз в неделю — подойдёт?", "Да. Урок можно пересматривать перед каждой игрой."], ["Я новичок, не рано?", "Наоборот: модуль 1 начинается с правил и первого хвата."]]} /> },
              ]}
            />
          </div>
        </Demo>

        {/* ============ ИНСТРУМЕНТ ============ */}
        <Demo code="L1" title="Плавная прокрутка всей страницы" source="Lenis"
          note="Не компонент, а слой поверх сайта: прокрутка становится инерционной, как в приложениях Apple. Включите и покрутите страницу — разница чувствуется сразу."
          tone="brand">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setLenisOn((v) => !v)}
              className={`rounded-full px-6 py-3 font-title text-sm font-extrabold transition ${
                lenisOn ? "bg-[#0A0A0A] text-[#FFD200]" : "bg-white text-[#0A0A0A] ring-2 ring-[#0A0A0A]"
              }`}
            >
              {lenisOn ? "Плавная прокрутка включена" : "Включить плавную прокрутку"}
            </button>
            <p className="text-sm font-semibold">
              {lenisOn ? "Покрутите страницу колесом — движение стало мягче и с довыбегом." : "Нажмите и сравните ощущение прокрутки."}
            </p>
          </div>
        </Demo>

        <footer className="border-t-2 border-[#0A0A0A] pt-8 text-sm text-neutral-500">
          Всё установлено из открытых реестров Magic UI и Aceternity. Назовите коды — встрою в сайт.
        </footer>
      </div>
    </main>
  );
}

function FaqCard({ items }: { items: string[][] }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0A0A0A] p-6 sm:p-8">
      {items.map(([q, a]) => (
        <div key={q} className="mb-5">
          <p className="font-title text-base font-extrabold text-[#FFD200]">{q}</p>
          <p className="mt-2 text-sm text-neutral-300">{a}</p>
        </div>
      ))}
    </div>
  );
}
