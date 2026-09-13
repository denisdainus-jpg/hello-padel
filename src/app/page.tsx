import { Header } from "@/components/site/Header";
import { VideoLane } from "@/components/site/VideoLane";
import { ModuleCarousel } from "@/components/site/ModuleCarousel";
import { SegmentTabs } from "@/components/site/SegmentTabs";
import { AcademyCounters } from "@/components/site/Counters";
import { MobileBar } from "@/components/site/MobileBar";
import { LevelScale } from "@/components/site/LevelScale";
import {
  BOT,
  CHANNEL,
  FINEPRINT,
  HERO_STATS,
  MARQUEE,
  PAINS,
  SOLUTION_COLS,
  RESULTS,
  FREE_CHAPTER,
  MODULES,
  COACH_TIMELINE,
  TRUST_STATS,
  TRUST_ARGS,
  REVIEWS,
  PLANS,
  STEPS,
  FAQ,
  NAV,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />

      {/* 1 — первый экран */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-in">
            <div className="stack" style={{ gap: 26 }}>
              <span className="badge">Официальный курс Hello Padel Academy в России</span>
              <h1>Падел по методу Маури Андрини — теперь на русском</h1>
              <p className="lead">
                166 видеоуроков от первого хвата до тактики в паре. Андрини — двукратный чемпион мира
                среди юниоров и главный тренер сборной Великобритании.
              </p>
              <div className="cta-row">
                <a className="btn" href={BOT}>
                  Купить доступ — от 2 990 ₽
                </a>
                <a className="btn ghost" href={BOT}>
                  Забрать главу бесплатно
                </a>
              </div>
              <span className="fineprint">{FINEPRINT}</span>
              <div className="note">Одна глава курса — бесплатно. Бот подберёт её под твой уровень.</div>
            </div>
            <div className="hero-shot">
              <div className="court" aria-hidden="true">
                <i style={{ left: "6%", right: "6%", top: "8%", height: 3 }} />
                <i style={{ left: "6%", right: "6%", bottom: "8%", height: 3 }} />
                <i style={{ left: "6%", top: "8%", bottom: "8%", width: 3 }} />
                <i style={{ right: "6%", top: "8%", bottom: "8%", width: 3 }} />
                <i style={{ left: "6%", right: "6%", top: "50%", height: 3 }} />
                <i style={{ left: "50%", top: "8%", bottom: "8%", width: 3 }} />
                <span className="ball" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/01.webp"
                width={760}
                height={813}
                fetchPriority="high"
                alt="Маури Андрини с ракеткой Hello Padel"
              />
              <span className="cap">Маури Андрини · автор методики · 9 модулей, 22 главы, 166 уроков</span>
            </div>
          </div>
          <div className="stats">
            {HERO_STATS.map((s) => (
              <div key={s.l}>
                <b>{s.n}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — короткие видео */}
      <section className="sect dark" id="shorts">
        <div className="wrap grid" style={{ gap: "clamp(28px,3vw,40px)" }}>
          <div className="stack">
            <p className="kick" style={{ color: "rgba(255,255,255,.6)" }}>
              Видео
            </p>
            <h2 className="h2">Восемь советов, которые можно попробовать сегодня</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,.85)", maxWidth: "70ch" }}>
              Это короткие ролики из наших соцсетей — один совет за минуту. В курсе уроки полноценные:
              от 2 до 15 минут каждый, 166 штук, разложенных по порядку от первого хвата до тактики в паре.
            </p>
          </div>
          <VideoLane />
          <p
            style={{
              font: "500 18px/1.55 var(--text)",
              color: "#9A9A9A",
              textAlign: "center",
              maxWidth: "70ch",
              margin: "0 auto",
            }}
          >
            Здесь — минута на совет. В курсе — более 15 часов разбора: каждый удар от подготовки до частых ошибок.
          </p>
          <div className="grid" style={{ gap: 14, justifyItems: "center" }}>
            <p className="body" style={{ color: "rgba(255,255,255,.85)" }}>
              Ещё 20 разборов выложены в канале
            </p>
            <a className="btn ghost" style={{ boxShadow: "inset 0 0 0 2px #fff", color: "#fff" }} href={CHANNEL}>
              Открыть канал
            </a>
          </div>
        </div>
      </section>

      {/* бегущая строка */}
      <div className="marquee" aria-hidden="true">
        <ul>
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <li key={`${m}-${i}`}>{m}</li>
          ))}
        </ul>
      </div>

      {/* 3 — боли */}
      <section className="sect">
        <div className="wrap grid" style={{ gap: "clamp(32px,4vw,48px)" }}>
          <div className="stack">
            <p className="kick">Знакомо?</p>
            <h2 className="h2">Ты играешь год, а прогресса нет</h2>
          </div>
          <div className="cards">
            {PAINS.map((p) => (
              <div className="card" key={p.n}>
                <div className="num">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
          <div className="split">
            <div className="cutout">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/08.webp" width={620} height={526} loading="lazy" alt="Маури Андрини разводит руками" />
            </div>
            <p className="lead">Курс закрывает все шесть пунктов. Ниже — как именно.</p>
          </div>
        </div>
      </section>

      {/* 4 — решение и результат */}
      <section className="sect brandish" id="course">
        <div className="wrap grid" style={{ gap: "clamp(32px,4vw,48px)" }}>
          <div className="stack">
            <p className="kick" style={{ color: "var(--ink)" }}>
              Решение
            </p>
            <h2 className="h2">Не набор роликов, а система</h2>
          </div>
          <p className="body">
            Hello Padel Russia — это полная программа международной академии Hello Padel, переведённая на
            русский официально. 9 модулей ведут от истории и правил игры до тактики уровня «Совершенный
            игрок». Каждый удар разобран по шагам: подготовка, выполнение, куда направлять, какие ошибки
            допускают чаще всего.
          </p>
          <div className="split">
            <p className="lead">
              Тот же материал, по которому академия учит тренеров в двадцати странах, — теперь на русском.
            </p>
            <div className="cutout">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/03.webp" width={660} height={762} loading="lazy" alt="Маури Андрини с логотипом Hello Padel" />
            </div>
          </div>
          <div className="cols">
            {SOLUTION_COLS.map((c) => (
              <div className="col" key={c.h}>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <div className="stack" style={{ marginTop: "clamp(20px,2.5vw,28px)" }}>
            <p className="kick" style={{ color: "var(--ink)" }}>
              Результат
            </p>
            <h3 className="h2">Что ты начнёшь делать на корте</h3>
          </div>
          <ul className="checks">
            {RESULTS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="body">
            Курс даёт технику и тактику. Прогресс на корте зависит от того, сколько ты играешь.
          </p>
        </div>
      </section>

      {/* 5 — бесплатная глава */}
      <section className="sect dark">
        <div
          className="wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
            gap: "clamp(32px,4vw,48px)",
            alignItems: "start",
          }}
        >
          <div className="grid" style={{ gap: 22 }}>
            <p className="kick" style={{ color: "rgba(255,255,255,.6)" }}>
              Без оплаты
            </p>
            <h2 className="h2">Забери одну главу бесплатно</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,.85)" }}>
              Не превью и не нарезка, а целая глава курса со всеми уроками внутри. Бот спросит, на каком ты
              уровне, и откроет ту главу, которая нужна именно тебе.
            </p>
            <div className="grid" style={{ gap: 12, justifyItems: "start" }}>
              <a className="btn" href={BOT}>
                Забрать главу в боте
              </a>
              <span style={{ font: "400 15px/1.5 var(--text)", color: "rgba(255,255,255,.7)" }}>
                Открывается в Telegram, @russian_padel_bot. Оплата не нужна.
              </span>
            </div>
          </div>
          <div className="grid" style={{ gap: 20 }}>
            <div className="cutout">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/07.webp" width={660} height={780} loading="lazy" alt="Маури Андрини готовится к удару" />
            </div>
            <ol className="glass">
              {FREE_CHAPTER.map((f, i) => (
                <li key={f}>
                  <b>{i + 1}</b>
                  {f}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6 — программа */}
      <section className="sect" id="program" style={{ background: "var(--off)" }}>
        <div className="wrap grid" style={{ gap: "clamp(28px,3vw,40px)" }}>
          <div className="stack">
            <p className="kick">Программа</p>
            <h2 className="h2">9 модулей, 22 главы, 166 уроков</h2>
            <p className="body" style={{ color: "var(--ink-soft)" }}>
              Пролистай карточки, чтобы увидеть маршрут курса.
            </p>
          </div>

          <ModuleCarousel />

          <details className="modules-toggle">
            <summary>Показать все 22 главы</summary>
            <div className="acc" id="modules">
              {MODULES.map((m) => (
                <details key={m.n} open={m.n === 1}>
                  <summary>
                    <span style={{ display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
                      <span className="pill">{m.n}</span>
                      <span>
                        Модуль {m.n} — {m.title} · {m.les}
                      </span>
                    </span>
                    <span className="sign" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <ul className="inner">
                    {m.chapters.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </details>

          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <p className="body" style={{ fontWeight: 600 }}>
              Итого: 166 уроков, более 15 часов, всё на русском языке.
            </p>
            <div className="grid" style={{ gap: 10, justifyItems: "start" }}>
              <a className="btn" href={BOT}>
                Купить доступ
              </a>
              <span className="fineprint">{FINEPRINT}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — сегменты */}
      <section className="sect brandish">
        <div className="wrap grid" style={{ gap: "clamp(24px,3vw,36px)" }}>
          <div className="stack">
            <p className="kick">Сегменты</p>
            <h2 className="h2">Растёшь с 1.0 до 5.0 — на каждом этапе свои модули</h2>
            <p className="lead">
              Курс поднимает тебя по шкале академии — с 1.0 до 5.0. У новичка, среднего игрока и тренера —
              разные модули и главы. Выбери себя:
            </p>
          </div>
          <SegmentTabs />
          <p className="body">
            Курс устроен так, что каждый видит собственные ошибки — в технике удара, в позиции на корте, в
            решениях по ходу розыгрыша — и получает чёткий ответ, что именно исправить.
          </p>
        </div>
      </section>

      {/* 8 — тренер и академия */}
      <section className="sect dark" id="coach">
        <div className="wrap coachgrid">
          <span className="glow" aria-hidden="true" style={{ left: "26%", top: "44%", width: "min(700px,90%)" }} />
          <div className="coach-shot">
            <span className="plate">Маури Андрини · основатель Hello Padel Academy</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/04.webp" width={900} height={653} loading="lazy" alt="Маури Андрини с ракеткой" />
          </div>
          <div className="grid" style={{ gap: 24, minWidth: 0 }}>
            <p className="kick" style={{ color: "rgba(255,255,255,.6)" }}>
              Автор методики
            </p>
            <h2 className="h2">Маури Андрини</h2>
            <p className="lead" style={{ maxWidth: "70ch" }}>
              Аргентинский тренер и профессиональный игрок. В падел пришёл больше 35 лет назад: начал играть
              в 6 лет в Пеуахо — городе, откуда вышли многие легенды падела. В 14 лет дебютировал на мировой арене.
            </p>
            <div className="ctl">
              {COACH_TIMELINE.map((t) => (
                <div className="ctl-row" key={t.year}>
                  <div className="ctl-year">{t.year}</div>
                  <div className="ctl-text">{t.text}</div>
                </div>
              ))}
            </div>
            <p className="body">Курс — его метод, переведённый на русский.</p>
          </div>
        </div>
        <div
          className="wrap grid"
          style={{ gap: "clamp(28px,3vw,40px)", marginTop: "clamp(40px,5vw,64px)" }}
        >
          <div className="stack">
            <p className="kick" style={{ color: "rgba(255,255,255,.6)" }}>
              За курсом стоит академия
            </p>
            <h3 className="h2">Ты покупаешь не ролики, а методику</h3>
            <p className="lead eco-lead">
              Hello Padel Academy обучает падел с 2013 года. По этой методике сертифицируют тренеров по всему
              миру — и это тот же материал, что в курсе.
            </p>
          </div>
          <LevelScale />
          <AcademyCounters />
        </div>
      </section>

      {/* 9 — доверие */}
      <section className="sect" id="trust" style={{ background: "var(--off)" }}>
        <div className="wrap grid" style={{ gap: "clamp(32px,4vw,48px)" }}>
          <div className="stack">
            <p className="kick">Доверие</p>
            <h2 className="h2">Метод, по которому учатся игроки и тренеры в 20+ странах</h2>
          </div>
          <div className="trust">
            {TRUST_STATS.map((t) => (
              <div key={t.n}>
                <div className="n">{t.n}</div>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
          <div className="args">
            {TRUST_ARGS.map((a) => (
              <div className="arg" key={a}>
                {a}
              </div>
            ))}
          </div>
          <h3 className="h2" style={{ fontSize: "clamp(22px,2.6vw,32px)" }}>
            Что говорят игроки
          </h3>
          <p
            className="body"
            style={{ color: "var(--ink-soft)", textAlign: "center", maxWidth: "68ch", margin: "0 auto" }}
          >
            Курс Hello Padel преподают по всему миру. Ниже — отзывы игроков о международной версии; русская
            версия — тот же курс в переводе.
          </p>
          <div className="revs">
            {REVIEWS.map((r) => (
              <div className="rev" key={r.av}>
                <div className="q">«</div>
                <p className="txt">{r.text}</p>
                <div className="line" />
                <div className="who">
                  <span className="av">{r.av}</span>
                  <span>
                    <span className="nm">{r.name}</span>
                    <br />
                    <span className="meta">Игрок Hello Padel Academy</span>
                  </span>
                </div>
                <p className="attr">Отзыв о международной версии курса Hello Padel</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — тарифы и шаги */}
      <section className="sect dark" id="pricing">
        <div className="wrap grid" style={{ gap: "clamp(36px,4vw,56px)" }}>
          <div className="stack">
            <p className="kick" style={{ color: "rgba(255,255,255,.6)" }}>
              Доступ
            </p>
            <h2 className="h2">Выбери формат</h2>
          </div>
          <div className="plans">
            <span className="glow" aria-hidden="true" style={{ width: "min(760px,70%)" }} />
            {PLANS.map((p) => (
              <div className={p.top ? "plan top" : "plan"} key={p.kick}>
                {p.flag ? <span className="flag">{p.flag}</span> : null}
                <p className="kick" style={p.top ? { color: "var(--ink)" } : undefined}>
                  {p.kick}
                </p>
                <div className="price">{p.price}</div>
                <ul>
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a className="btn" href={BOT}>
                  {p.cta}
                </a>
                <span className="fineprint">{FINEPRINT}</span>
              </div>
            ))}
          </div>
          <p className="body">Навсегда — это ≈30 ₽ за урок. Один тариф оплачивается один раз, автосписаний нет.</p>
          <div
            className="stack"
            style={{
              marginTop: "clamp(24px,3vw,32px)",
              paddingTop: "clamp(28px,3.5vw,44px)",
              borderTop: "1px solid rgba(255,255,255,.12)",
            }}
          >
            <p className="kick" style={{ color: "rgba(255,255,255,.6)" }}>
              Как это работает
            </p>
            <h3 className="h2">Четыре шага до первого урока</h3>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <b>{s.n}</b>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <p className="body">
            Смотреть можно с телефона, планшета или компьютера — везде, где есть Telegram.
          </p>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="sect" id="faq" style={{ background: "var(--off)" }}>
        <div className="wrap grid" style={{ gap: "clamp(24px,3vw,36px)" }}>
          <h2 className="h2">Частые вопросы</h2>
          <div className="faq-grid acc faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  <span>{f.q}</span>
                  <span className="sign" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="inner">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — финал */}
      <section className="sect brandish final">
        <div className="wrap">
          <span className="glow" aria-hidden="true" style={{ width: "min(900px,100%)" }} />
          <div className="cutout" style={{ maxWidth: 380 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/06.webp" width={620} height={529} loading="lazy" alt="Маури Андрини указывает на голову" />
          </div>
          <h2>166 уроков ждут. Начни с бесплатной главы</h2>
          <p className="lead">
            Забери одну главу курса бесплатно — целиком и под свой уровень. Понравится метод — откроешь полный
            курс прямо в боте.
          </p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <a className="btn dark" href={BOT}>
              Забрать бесплатную главу
            </a>
            <a className="btn ghost" href={BOT}>
              Купить полный доступ — 4 990 ₽
            </a>
          </div>
          <span className="fineprint">{FINEPRINT}</span>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="fgrid">
            <div className="fcol">
              <a className="brand" href="#top" aria-label="Hello Padel Russia">
                <span className="word">
                  <i>HELLO</i>
                  <i>PADEL</i>
                </span>
                <span className="tag">Russia</span>
              </a>
              <span>Официальный русский перевод курса Hello Padel. Лицензия на дистрибуцию в РФ.</span>
            </div>
            <div className="fcol">
              <b>Навигация</b>
              {NAV.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </div>
            <div className="fcol">
              <b>Связь</b>
              <a href={CHANNEL}>Telegram-канал @HELLO_PADEL_RUSSIA</a>
              <a href={BOT}>Бот @russian_padel_bot</a>
            </div>
            <div className="fcol">
              <b>Правовое</b>
              <span>Политика конфиденциальности</span>
              <span>Публичная оферта</span>
              <span>Условия доступа</span>
            </div>
          </div>
          <div className="rule">
            © 2026 Hello Padel Russia. Hello Padel и Hello Padel Academy — товарные знаки правообладателя,
            используются по лицензии.
          </div>
        </div>
      </footer>

      <MobileBar />
    </>
  );
}
