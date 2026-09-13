"use client";

import { GsapDemo, GsapIntro, q, qa } from "@/components/gsap/GsapDemo";
import { gsap, SplitText } from "@/components/gsap/register";
import { TITLE } from "@/components/gsap/data";

const ROLL = ["бандеху", "вибору", "чикиту", "бахаду", "бандеху"];

const COUNTERS = [
  { v: 50000, s: "+", txt: "50 000+", l: "игроков в приложении академии" },
  { v: 4000, s: "+", txt: "4 000+", l: "тренеров прошли сертификацию" },
  { v: 166, s: "", txt: "166", l: "уроков в курсе" },
  { v: 20, s: "+", txt: "20+", l: "стран с кэмпами академии" },
];

export default function GsapTextPage() {
  return (
    <>
      <GsapIntro
        kicker="GSAP · раздел 1 из 4"
        title="Текст: буквы, строки, слова"
        text="12 приёмов для заголовков и подзаголовков на плагинах SplitText, ScrambleText и TextPlugin. Всё запускается само при открытии страницы, кнопка «Повторить» проигрывает эффект заново."
      />

      <div className="grid min-w-0 gap-16">
        <GsapDemo
          code="T1"
          title="Буквы падают сверху с отскоком"
          plugins="SplitText"
          note="Каждая буква падает со своим наклоном и пружинит на месте. Кандидат на главный заголовок первого экрана."
          bodyClassName="overflow-hidden px-6 py-16 sm:px-12"
          setup={(root) => {
            SplitText.create(q(root, ".g-t"), {
              type: "words,chars",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.chars, {
                  yPercent: -160,
                  opacity: 0,
                  rotation: () => gsap.utils.random(-35, 35),
                  duration: 1,
                  ease: "back.out(2.2)",
                  stagger: 0.03,
                }),
            });
          }}
        >
          <p className={`g-t ${TITLE} text-4xl uppercase leading-[1.05] text-white sm:text-6xl`}>
            Падел по методу Маури Андрини
          </p>
        </GsapDemo>

        <GsapDemo
          code="T2"
          title="Строки выезжают из-под маски"
          plugins="SplitText · mask"
          note="Самый универсальный приём: строки поднимаются снизу из-за невидимой кромки. Подходит для заголовков всех секций."
          bodyClassName="px-6 py-16 sm:px-12"
          setup={(root) => {
            SplitText.create(q(root, ".g-t"), {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.13 }),
            });
          }}
        >
          <p className={`g-t ${TITLE} max-w-[20ch] text-3xl leading-[1.12] text-white sm:text-5xl`}>
            Одна глава курса бесплатно — бот подберёт её под твой уровень
          </p>
        </GsapDemo>

        <GsapDemo
          code="T3"
          title="Слова проявляются из размытия"
          plugins="SplitText"
          note="Мягкий эффект для абзацев: каждое слово наводится на резкость с небольшим сдвигом."
          tone="light"
          bodyClassName="px-6 py-14 sm:px-12"
          setup={(root) => {
            SplitText.create(q(root, ".g-t"), {
              type: "words",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.words, {
                  opacity: 0,
                  y: 26,
                  filter: "blur(14px)",
                  duration: 0.9,
                  ease: "power3.out",
                  stagger: 0.06,
                }),
            });
          }}
        >
          <p className="g-t max-w-[48ch] text-2xl font-semibold leading-snug text-[#0A0A0A] sm:text-3xl">
            Hello Padel Russia — полная программа международной академии, переведённая на русский официально.
            Каждый удар разобран по шагам.
          </p>
        </GsapDemo>

        <GsapDemo
          code="T4"
          title="Буквы разлетаются и собираются"
          plugins="SplitText"
          note="Буквы прилетают со всех сторон и собираются в название. Громкий приём — для одного акцентного места."
          tone="brand"
          bodyClassName="overflow-hidden px-6 py-20 sm:px-12"
          setup={(root) => {
            SplitText.create(q(root, ".g-t"), {
              type: "words,chars",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.chars, {
                  x: () => gsap.utils.random(-320, 320),
                  y: () => gsap.utils.random(-220, 220),
                  rotation: () => gsap.utils.random(-220, 220),
                  scale: 0,
                  opacity: 0,
                  duration: 1.4,
                  ease: "expo.out",
                  stagger: { amount: 0.6, from: "random" },
                }),
            });
          }}
        >
          <p className={`g-t ${TITLE} text-center text-5xl uppercase text-[#0A0A0A] sm:text-7xl`}>Hello Padel</p>
        </GsapDemo>

        <GsapDemo
          code="T5"
          title="Текст перебирается и складывается в слово"
          plugins="ScrambleTextPlugin"
          note="Буквы перебираются, как на табло, и складываются в название удара. Слова сменяются по кругу."
          bodyClassName="px-6 py-16 sm:px-12"
          setup={(root) => {
            const el = q(root, ".g-t");
            if (!el) return;
            const words = ["ВИБОРА", "ЧИКИТА", "БАХАДА", "СМЭШ", "БАНДЕХА"];
            const tl = gsap.timeline({ repeat: -1, delay: 0.6 });
            words.forEach((w) => {
              tl.to(el, {
                duration: 1.2,
                scrambleText: { text: w, chars: "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ", revealDelay: 0.3, speed: 0.45 },
              }).to({}, { duration: 1.2 });
            });
          }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/55">В курсе разобран каждый удар</p>
          <p className={`g-t ${TITLE} mt-3 min-h-[1.2em] text-5xl text-[#FFD200] sm:text-7xl`}>БАНДЕХА</p>
        </GsapDemo>

        <GsapDemo
          code="T6"
          title="Печатная машинка с мигающим курсором"
          plugins="TextPlugin"
          note="Фраза печатается, стирается, печатается следующая. Хорошо для блока «Результат»."
          bodyClassName="px-6 py-16 sm:px-12"
          setup={(root) => {
            const el = q(root, ".g-type");
            const cur = q(root, ".g-cursor");
            if (!el || !cur) return;
            const phrases = [
              "перестанешь бить смэш вместо бандехи",
              "поймёшь, куда встать после стекла",
              "начнёшь играть тактически в паре",
            ];
            const tl = gsap.timeline({ repeat: -1 });
            phrases.forEach((p) => {
              tl.to(el, { duration: p.length * 0.045, text: { value: p }, ease: "none" })
                .to({}, { duration: 1.5 })
                .to(el, { duration: 0.5, text: { value: "" }, ease: "none" });
            });
            gsap.to(cur, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
          }}
        >
          <p className={`${TITLE} min-h-[3.4em] text-2xl leading-snug text-white sm:text-4xl`}>
            С курсом ты
            <br />
            <span className="g-type text-[#FFD200]" />
            <span className="g-cursor ml-1 inline-block text-[#FFD200]">|</span>
          </p>
        </GsapDemo>

        <GsapDemo
          code="T7"
          title="Буквы прыгают волной"
          plugins="SplitText"
          note="Буквы по очереди подпрыгивают и вспыхивают жёлтым — бесконечно. Для короткого слогана."
          bodyClassName="overflow-hidden px-6 py-16 sm:px-12"
          setup={(root) => {
            SplitText.create(q(root, ".g-t"), {
              type: "words,chars",
              autoSplit: true,
              onSplit: (self) =>
                gsap.to(self.chars, {
                  y: -18,
                  color: "#FFD200",
                  duration: 0.5,
                  ease: "sine.inOut",
                  stagger: { each: 0.055, repeat: -1, yoyo: true },
                }),
            });
          }}
        >
          <p className={`g-t ${TITLE} pt-4 text-4xl text-white sm:text-6xl`}>Прыгай выше — играй умнее</p>
        </GsapDemo>

        <GsapDemo
          code="T8"
          title="Заголовок проявляется по буквам при прокрутке"
          plugins="SplitText · ScrollTrigger"
          note="Буквы разгораются ровно настолько, насколько вы прокрутили. Прокрутите назад — погаснут."
          scroll
          bodyClassName="px-6 py-28 sm:px-12"
          setup={(root) => {
            const el = q(root, ".g-t");
            SplitText.create(el, {
              type: "words,chars",
              autoSplit: true,
              onSplit: (self) =>
                gsap.fromTo(
                  self.chars,
                  { opacity: 0.12 },
                  {
                    opacity: 1,
                    ease: "none",
                    stagger: 0.03,
                    scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: true },
                  },
                ),
            });
          }}
        >
          <p className={`g-t ${TITLE} max-w-[22ch] text-3xl leading-[1.2] text-white sm:text-5xl`}>
            Не набор роликов, а система: 9 модулей, 22 главы, 166 уроков по порядку
          </p>
        </GsapDemo>

        <GsapDemo
          code="T9"
          title="Цифры набегают до значения"
          plugins="GSAP core"
          note="Счётчики крутятся от нуля. Для блока доверия и цифр академии."
          tone="brand"
          bodyClassName="px-6 py-14 sm:px-12"
          setup={(root) => {
            qa(root, ".g-num").forEach((n, i) => {
              const target = Number(n.dataset.v);
              const suffix = n.dataset.s ?? "";
              const o = { v: 0 };
              n.textContent = `0${suffix}`;
              gsap.to(o, {
                v: target,
                duration: 2.2,
                delay: i * 0.12,
                ease: "power3.out",
                onUpdate: () => {
                  n.textContent = `${Math.round(o.v).toLocaleString("ru-RU")}${suffix}`;
                },
              });
            });
          }}
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COUNTERS.map((c) => (
              <div key={c.l}>
                <b
                  className={`g-num block ${TITLE} text-4xl tabular-nums text-[#0A0A0A] sm:text-5xl`}
                  data-v={c.v}
                  data-s={c.s}
                >
                  {c.txt}
                </b>
                <span className="mt-2 block text-sm font-semibold text-[#0A0A0A]/70">{c.l}</span>
              </div>
            ))}
          </div>
        </GsapDemo>

        <GsapDemo
          code="T10"
          title="Блик пробегает по надписи"
          plugins="GSAP core"
          note="По тексту едет светлая полоса с жёлтым краем. Для бейджа «Официальный курс» или цены."
          bodyClassName="px-6 py-16 sm:px-12"
          setup={(root) => {
            gsap.fromTo(
              q(root, ".g-shine"),
              { backgroundPosition: "120% 0%" },
              { backgroundPosition: "-20% 0%", duration: 2.4, ease: "power2.inOut", repeat: -1, repeatDelay: 0.7 },
            );
          }}
        >
          <p
            className={`g-shine ${TITLE} bg-clip-text text-4xl text-transparent sm:text-6xl`}
            style={{
              backgroundImage:
                "linear-gradient(100deg, #9a9a9a 38%, #ffffff 47%, #FFD200 50%, #ffffff 53%, #9a9a9a 62%)",
              backgroundSize: "250% 100%",
              backgroundPosition: "120% 0%",
            }}
          >
            Официальный курс Hello Padel
          </p>
        </GsapDemo>

        <GsapDemo
          code="T11"
          title="Маркер подчёркивает главное"
          plugins="GSAP core"
          note="Жёлтая плашка прорисовывается под ключевыми словами, будто выделили маркером."
          tone="light"
          bodyClassName="px-6 py-16 sm:px-12"
          setup={(root) => {
            gsap.fromTo(
              qa(root, ".g-mark"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: "power3.inOut", stagger: 0.6, delay: 0.3 },
            );
          }}
        >
          <p className="max-w-[30ch] text-3xl font-semibold leading-[1.4] text-[#0A0A0A] sm:text-4xl">
            Курс ведёт{" "}
            <span className="relative isolate inline-block">
              <span className="g-mark absolute -inset-x-1 bottom-[0.08em] top-[0.55em] -z-10 origin-left rounded-[3px] bg-[#FFD200]" />
              с 1.0 до 5.0
            </span>{" "}
            по шкале академии — и{" "}
            <span className="relative isolate inline-block">
              <span className="g-mark absolute -inset-x-1 bottom-[0.08em] top-[0.55em] -z-10 origin-left rounded-[3px] bg-[#FFD200]" />
              без плохих привычек
            </span>
          </p>
        </GsapDemo>

        <GsapDemo
          code="T12"
          title="Слово в заголовке прокручивается как барабан"
          plugins="GSAP core"
          note="Одно слово в строке сменяется, прокручиваясь вверх. Показывает широту курса одной фразой."
          bodyClassName="px-6 py-16 sm:px-12"
          setup={(root) => {
            const inner = q(root, ".g-roll-in");
            const n = qa(root, ".g-roll-w").length;
            if (!inner || n < 2) return;
            const step = 100 / n;
            const tl = gsap.timeline({ repeat: -1 });
            for (let i = 1; i < n; i++) {
              tl.to(inner, { yPercent: -step * i, duration: 0.7, ease: "power3.inOut" }, "+=1.1");
            }
            tl.set(inner, { yPercent: 0 }, "+=1.1");
          }}
        >
          <p className={`${TITLE} text-3xl leading-[1.15] text-white sm:text-5xl`}>
            Разберём твою{" "}
            <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
              <span className="g-roll-in flex flex-col">
                {ROLL.map((w, i) => (
                  <span key={i} className="g-roll-w block h-[1.15em] leading-[1.15em] text-[#FFD200]">
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </p>
        </GsapDemo>
      </div>
    </>
  );
}
