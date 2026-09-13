const SECTIONS = [
  {
    href: "/gsap/text/",
    title: "Текст",
    codes: "T1–T12",
    count: 12,
    text: "Буквы падают с отскоком, строки выезжают из-под маски, текст перебирается, печатается, бликует и прыгает волной.",
  },
  {
    href: "/gsap/scroll/",
    title: "Прокрутка",
    codes: "S1–S9",
    count: 9,
    text: "Параллакс, лента модулей едет вбок, карточки болей ложатся стопкой, фото раскрывается на весь экран, уровень растёт от 1.0 до 5.0.",
  },
  {
    href: "/gsap/motion/",
    title: "Движение и интерактив",
    codes: "M1–M9",
    count: 9,
    text: "Сцена появления первого экрана, 3D-карточка тренера, магнитные кнопки, мяч с инерцией, конфетти по физике.",
  },
  {
    href: "/gsap/svg/",
    title: "SVG и линии",
    codes: "V1–V6",
    count: 6,
    text: "Разметка корта рисуется линиями, мяч летит по траектории свечи, фигуры перетекают, линия бежит по контуру тарифа.",
  },
];

const PICKS = [
  ["Первый экран", "M1 — сцена появления, M2 — 3D-карточка тренера"],
  ["Заголовки секций", "T2 — строки выезжают из-под маски"],
  ["Боли", "S3 — карточки ложатся стопкой"],
  ["Модули", "S2 — лента едет вбок при прокрутке"],
  ["Шкала 1.0 → 5.0", "S6 — уровень растёт при прокрутке или V4 — маршрут рисуется"],
  ["Бесплатная глава", "S4 — фото раскрывается на весь экран"],
  ["Четыре шага", "S9 — шаги сменяются на закреплённом блоке"],
  ["Тарифы", "V5 — линия по контуру, M3 — магнитная кнопка"],
  ["Финал", "M7 — конфетти на кнопке покупки"],
];

export default function GsapIndex() {
  return (
    <>
      <div className="mb-12 mt-10 max-w-[78ch]">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">Отдельный раздел</p>
        <h1 className="mt-2 font-title text-3xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-5xl">
          GSAP — 36 эффектов для сайта
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          GSAP — библиотека, на которой сделаны эффекты прокрутки на дорогих сайтах. С 2025 года она бесплатна
          целиком, со всеми плагинами. Здесь каждый эффект работает от обычной прокрутки страницы и наполнен
          вашим контентом. Под каждым блоком — кнопка «Повторить».
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="group flex flex-col justify-between gap-6 rounded-3xl bg-[#0A0A0A] p-7 text-white transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#FFD200] px-3 py-1 font-title text-xs font-extrabold text-[#0A0A0A]">
                  {s.codes}
                </span>
                <span className="text-sm font-semibold text-white/50">{s.count} эффектов</span>
              </div>
              <p className="mt-5 font-title text-2xl font-extrabold tracking-tight sm:text-3xl">{s.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">{s.text}</p>
            </div>
            <span className="font-title text-sm font-extrabold text-[#FFD200] group-hover:underline">Открыть →</span>
          </a>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-white p-6 ring-1 ring-black/10 sm:p-8">
        <p className="font-title text-xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-2xl">
          Что предлагаю поставить на сайт
        </p>
        <p className="mt-2 text-sm text-neutral-500">Черновая раскладка — финально решаете вы по кодам.</p>
        <div className="mt-6 grid divide-y divide-black/10">
          {PICKS.map(([where, what]) => (
            <div key={where} className="grid gap-1 py-3 sm:grid-cols-[220px_1fr] sm:gap-6">
              <span className="text-sm font-bold text-[#0A0A0A]">{where}</span>
              <span className="text-sm text-neutral-600">{what}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
