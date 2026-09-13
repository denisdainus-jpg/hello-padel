"use client";

import { useEffect, useState } from "react";
import { BOT, NAV } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header>
        <div className="bar">
          <a className="brand" href="#top" aria-label="Hello Padel Russia">
            <span className="word">
              <i>HELLO</i>
              <i>PADEL</i>
            </span>
            <span className="tag">Russia</span>
          </a>
          <nav className="main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="btn sm" href={BOT}>
            Забрать бесплатную главу
          </a>
          <button
            className="burger"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={open}
            aria-controls="msheet"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className="msheet"
        id="msheet"
        data-open={open ? "1" : "0"}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
      >
        <div className="top">
          <span className="brand">
            <span className="word">
              <i>HELLO</i>
              <i>PADEL</i>
            </span>
            <span className="tag">Russia</span>
          </span>
          <button className="close" type="button" aria-label="Закрыть меню" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <nav>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="btn" href={BOT}>
          Забрать бесплатную главу
        </a>
      </div>
    </>
  );
}
