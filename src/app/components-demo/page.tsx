"use client";

import { BookOpen, Globe, ShieldCheck, Trophy } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { ShineBorder } from "@/components/ui/shine-border";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Tabs } from "@/components/ui/tabs";

/* ---------- обёртка витрины ---------- */
function Demo({
  code,
  title,
  source,
  note,
  tone = "light",
  children,
}: {
  code: string;
  title: string;
  source: string;
  note: string;
  tone?: "light" | "dark" | "brand";
  children: React.ReactNode;
}) {
  const bg =
    tone === "dark" ? "bg-[#0A0A0A]" : tone === "brand" ? "bg-brand" : "bg-paper";
  return (
    <section id={code} className="scroll-mt-24 border-t-2 border-ink pt-10">
      <div className="mb-4 flex flex-wrap items-baseline gap-3">
        <span className="rounded-full bg-ink px-3 py-1.5 font-title text-xs font-extrabold text-brand">
          {code}
        </span>
        <h2 className="font-title text-2xl font-extrabold tracking-tight">{title}</h2>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold">
          оригинал · {source}
        </span>
      </div>
      <p className="mb-5 max-w-[80ch] text-sm leading-relaxed text-neutral-500">{note}</p>
      <div className={`overflow-hidden rounded-3xl ${bg} p-6 ring-1 ring-black/10`}>
        {children}
      </div>
    </section>
  );
}

/* ---------- данные Hello Padel ---------- */
const MODULES = [
  { title: "Модуль 1", head: "Добро пожаловать в падел", text: "История игры, правила, экипировка, выбор ракетки, первая техника", les: "23 урока" },
  { title: "Модуль 2", head: "Подача и приём", text: "Техника и прогрессия подачи, позиция на приёме, работа ног, приём от стен", les: "13 уроков" },
  { title: "Модуль 3", head: "Бандеха, вибора, смэш", text: "Три удара сверху: бандеха шаг за шагом, вибора, силовой и кик-смэш", les: "21 урок" },
  { title: "Модуль 5", head: "Игра с задней линии", text: "Форхенд и бэкхенд, переход из защиты в атаку, свечка, чикита", les: "36 уроков" },
];

const REVIEWS = [
  { quote: "Метод Hello Padel помог мне прогрессировать быстрее, чем когда-либо. Видеть свой рост — сильная мотивация.", name: "Marc Møller", title: "Игрок Hello Padel Academy" },
  { quote: "Уроки помогли исправить ошибки, которых я даже не замечала, и теперь я играю увереннее и стабильнее.", name: "Carla Touly", title: "Игрок Hello Padel Academy" },
  { quote: "Учиться у тренеров, которые выросли в паделе, — это понятные и практичные уроки.", name: "Abdullah Albasiri", title: "Игрок Hello Padel Academy" },
  { quote: "Пришёл из большого тенниса — понимание игры и выбор ударов заметно выросли.", name: "Scott Clayton", title: "Игрок Hello Padel Academy" },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24">
      {/* шапка */}
      <header className="sticky top-0 z-50 -mx-5 mb-8 border-b border-black/10 bg-paper/90 px-5 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <b className="font-title text-base font-extrabold">Оригинальные компоненты библиотек</b>
          <nav className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {["1A", "1B", "1C", "3A", "4B", "6A", "7A", "9A", "9B", "10A", "12A"].map((c) => (
              <a key={c} href={`#${c}`} className="rounded-full bg-white px-2.5 py-1 ring-1 ring-black/10 hover:bg-brand">
                {c}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mb-10 max-w-[80ch]">
        <h1 className="font-title text-3xl font-extrabold tracking-tight">
          То же самое, но кодом из библиотек
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Здесь ничего не переписано руками: каждый блок — исходный компонент Magic UI или Aceternity,
          установленный командой <code className="rounded bg-brand-soft px-1.5 py-0.5">npx shadcn add</code>,
          с вашим контентом внутри. Работает на React с анимационной библиотекой motion — той самой,
          что даёт пружины и плавность, которые вы заметили.
        </p>
      </div>

      <div className="grid gap-14">
        {/* 1A */}
        <Demo
          code="1A"
          title="Первый экран с видео"
          source="Magic UI · Hero Video Dialog"
          note="Клик по портрету открывает ролик в модальном окне с анимацией разворота из центра. Здесь подставлен ваш ролик про бандеху."
          tone="dark"
        >
          <HeroVideoDialog
            className="block w-full"
            animationStyle="from-center"
            videoSrc="/video/02.mp4"
            thumbnailSrc="/photos/01.webp"
            thumbnailAlt="Маури Андрини"
          />
        </Demo>

        {/* 1B */}
        <Demo
          code="1B"
          title="Цифры курса"
          source="Magic UI · Number Ticker"
          note="Пружинная анимация числа при появлении в кадре. В отличие от ручного счётчика, цифра доезжает с инерцией."
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: 166, l: "видеоуроков" },
              { v: 9, l: "модулей" },
              { v: 22, l: "главы" },
              { v: 15, l: "часов", suf: "+" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-title text-4xl font-extrabold tracking-tight">
                  <NumberTicker value={s.v} />
                  {s.suf}
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">{s.l}</div>
              </div>
            ))}
          </div>
        </Demo>

        {/* 1C */}
        <Demo
          code="1C"
          title="Полоса доверия"
          source="Magic UI · Marquee"
          note="Бесконечная лента с паузой при наведении и мягким затуханием по краям. Та же механика подойдёт для финального призыва."
          tone="dark"
        >
          <Marquee pauseOnHover className="[--duration:22s]">
            {["Официальная лицензия", "50 000+ игроков", "4 000+ тренеров", "20+ стран", "166 уроков"].map((t) => (
              <span key={t} className="mx-4 font-title text-sm font-extrabold uppercase tracking-wide text-brand">
                {t}
              </span>
            ))}
          </Marquee>
        </Demo>

        {/* 3A */}
        <Demo
          code="3A"
          title="Карточки болей"
          source="Aceternity · Card Spotlight"
          note="За курсором идёт подсветка, а фоном работает анимированная точечная сетка на canvas. Ручной версией такой глубины не добиться."
          tone="dark"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <CardSpotlight className="h-56 w-full">
              <p className="relative z-20 font-title text-xl font-extrabold text-brand">1</p>
              <p className="relative z-20 mt-3 text-sm font-semibold text-white">
                Мяч от стекла — и ты уже проиграл розыгрыш
              </p>
              <p className="relative z-20 mt-2 text-xs text-neutral-300">
                Не понимаешь, куда встать и когда бить, поэтому отбиваешь как получится.
              </p>
            </CardSpotlight>
            <CardSpotlight className="h-56 w-full">
              <p className="relative z-20 font-title text-xl font-extrabold text-brand">2</p>
              <p className="relative z-20 mt-3 text-sm font-semibold text-white">
                Бьёшь смэш, когда надо бандеху
              </p>
              <p className="relative z-20 mt-2 text-xs text-neutral-300">
                И отдаёшь сетку сопернику вместе с очком.
              </p>
            </CardSpotlight>
          </div>
        </Demo>

        {/* 4B */}
        <Demo
          code="4B"
          title="Преимущества бенто-сеткой"
          source="Magic UI · Bento Grid"
          note="Плитки разного размера с появлением кнопки при наведении. Заменяет три одинаковые колонки в секции «Решение»."
        >
          <BentoGrid className="grid-rows-2">
            <BentoCard
              name="166 уроков по порядку"
              className="col-span-3 lg:col-span-2 lg:row-span-2"
              background={<div className="absolute inset-0 bg-gradient-to-br from-brand/40 to-transparent" />}
              Icon={BookOpen}
              description="От первого хвата до тактики в паре — без пропусков и повторов."
              href="#"
              cta="Смотреть программу"
            />
            <BentoCard
              name="Метод академии"
              className="col-span-3 lg:col-span-1"
              background={<div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-transparent" />}
              Icon={Trophy}
              description="Та же методика, по которой учат тренеров."
              href="#"
              cta="Подробнее"
            />
            <BentoCard
              name="Официальная лицензия"
              className="col-span-3 lg:col-span-1"
              background={<div className="absolute inset-0 bg-gradient-to-br from-brand-soft to-transparent" />}
              Icon={ShieldCheck}
              description="Права на перевод получены у правообладателя."
              href="#"
              cta="Что это значит"
            />
          </BentoGrid>
        </Demo>

        {/* 6A */}
        <Demo
          code="6A"
          title="Маршрут курса"
          source="Aceternity · Timeline"
          note="Линия слева заполняется по мере прокрутки, заголовок модуля залипает сбоку. Показан фрагмент из четырёх модулей."
        >
          <div className="-m-6">
            <Timeline
              data={MODULES.map((m) => ({
                title: m.title,
                content: (
                  <div>
                    <p className="font-title text-lg font-extrabold">{m.head}</p>
                    <p className="mt-2 text-sm text-neutral-600">{m.text}</p>
                    <span className="mt-3 inline-block rounded-full bg-brand px-3 py-1 text-xs font-extrabold">
                      {m.les}
                    </span>
                  </div>
                ),
              }))}
            />
          </div>
        </Demo>

        {/* 7A */}
        <Demo
          code="7A"
          title="Сегменты вкладками"
          source="Aceternity · Tabs"
          note="Активная вкладка перетекает под курсор, карточки лежат стопкой и меняются местами. Здесь — ваши четыре уровня."
          tone="brand"
        >
          <div className="h-[22rem] [perspective:1000px]">
            <Tabs
              containerClassName="mb-4"
              activeTabClassName="bg-ink"
              tabClassName="font-body text-sm font-bold text-ink"
              contentClassName="mt-6"
              tabs={[
                { title: "Новичок", value: "n", content: <TabCard head="Новичок · 1.0–2.0" text="Разберёшься с базой: хват, стойка, структура корта, правила игры, первые удары. Начинать стоит с модуля 1 «Фундаментализм»." /> },
                { title: "Средний", value: "s", content: <TabCard head="Средний уровень · 2.0–3.5" text="Разбор конкретных ударов: бандеха, вибора, смэш, игра от стен. Модули 3, 5 и 6 закроют большую часть потерь." /> },
                { title: "Опытный", value: "o", content: <TabCard head="Опытный игрок · 3.5–5.0" text="Тактика: куда и когда бить, как читать ситуацию, как строить атаку в паре. Модули 8 и 9." /> },
                { title: "Тренер", value: "t", content: <TabCard head="Тренер" text="Методика по шагам, чтобы объяснять ученикам своими словами. По ней академия сертифицировала 4 000+ тренеров." /> },
              ]}
            />
          </div>
        </Demo>

        {/* 9A */}
        <Demo
          code="9A"
          title="Лента отзывов"
          source="Aceternity · Infinite Moving Cards"
          note="Карточки едут бесконечно и замирают при наведении. Сейчас отзывы о международной версии — заработает в полную силу, когда появятся русские."
          tone="dark"
        >
          <div className="-mx-6">
            <InfiniteMovingCards items={REVIEWS} direction="right" speed="slow" />
          </div>
        </Demo>

        {/* 9B */}
        <Demo
          code="9B"
          title="Отзывы с портретами"
          source="Aceternity · Animated Testimonials"
          note="Фотографии перелистываются стопкой с лёгким поворотом, текст набирается по словам. Нужны фото людей — здесь подставлены кадры из курса."
        >
          <AnimatedTestimonials
            autoplay
            testimonials={[
              { quote: "Метод помог мне прогрессировать быстрее, чем когда-либо. Видеть свой рост — сильная мотивация.", name: "Marc Møller", designation: "Игрок Hello Padel Academy", src: "/photos/modules/02.webp" },
              { quote: "Уроки помогли исправить ошибки, которых я даже не замечала. Играю увереннее и стабильнее.", name: "Carla Touly", designation: "Игрок Hello Padel Academy", src: "/photos/modules/05.webp" },
              { quote: "Пришёл из большого тенниса — понимание игры и выбор ударов заметно выросли.", name: "Scott Clayton", designation: "Игрок Hello Padel Academy", src: "/photos/modules/08.webp" },
            ]}
          />
        </Demo>

        {/* 10A */}
        <Demo
          code="10A"
          title="Тариф с бегущей рамкой"
          source="Magic UI · Shine Border"
          note="По рамке карточки непрерывно идёт блик заданного цвета. Ставится на тариф «Навсегда»."
          tone="dark"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Месяц</div>
              <div className="mt-2 font-title text-3xl font-extrabold">2 990 ₽</div>
              <p className="mt-2 text-sm text-neutral-500">30 дней доступа ко всем 166 урокам</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFDE3D] via-brand to-[#E5BC00] p-6">
              <ShineBorder shineColor={["#0A0A0A", "#ffffff", "#0A0A0A"]} borderWidth={2} duration={9} />
              <div className="text-xs font-bold uppercase tracking-wider">Навсегда</div>
              <div className="mt-2 font-title text-3xl font-extrabold">4 990 ₽</div>
              <p className="mt-2 text-sm font-semibold">≈30 ₽ за урок · доступ без ограничения по времени</p>
            </div>
          </div>
        </Demo>

        {/* 12A */}
        <Demo
          code="12A"
          title="Финальный призыв"
          source="Magic UI · Marquee + BlurFade"
          note="Названия ударов едут фоном, заголовок и кнопка проявляются со смещением при появлении в кадре."
          tone="brand"
        >
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-10 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center opacity-20">
              <Marquee className="[--duration:18s]">
                <span className="mx-6 font-title text-3xl font-extrabold text-brand">
                  БАНДЕХА · ВИБОРА · ЧИКИТА · СМЭШ · СВЕЧА
                </span>
              </Marquee>
            </div>
            <div className="relative">
              <BlurFade delay={0.1} inView>
                <p className="font-title text-xl font-extrabold text-white">166 уроков ждут</p>
              </BlurFade>
              <BlurFade delay={0.25} inView>
                <p className="mx-auto mt-3 max-w-md text-sm text-neutral-300">
                  Забери одну главу бесплатно — целиком и под свой уровень.
                </p>
              </BlurFade>
              <BlurFade delay={0.4} inView>
                <button className="mt-5 rounded-full bg-brand px-6 py-3 font-title text-sm font-extrabold text-ink">
                  Забрать главу бесплатно
                </button>
              </BlurFade>
            </div>
          </div>
        </Demo>

        <footer className="border-t-2 border-ink pt-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <Globe className="size-4" /> Все компоненты установлены из открытых реестров Magic UI и Aceternity, лимиты 21st.dev не тратились.
          </p>
        </footer>
      </div>
    </main>
  );
}

function TabCard({ head, text }: { head: string; text: string }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-ink p-8 text-white">
      <p className="font-title text-xl font-extrabold text-brand">{head}</p>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-200">{text}</p>
    </div>
  );
}
