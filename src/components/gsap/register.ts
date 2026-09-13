"use client";

/* Все плагины GSAP бесплатны с версии 3.13 — регистрируем их один раз для раздела /gsap. */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    ScrambleTextPlugin,
    TextPlugin,
    DrawSVGPlugin,
    MorphSVGPlugin,
    MotionPathPlugin,
    Flip,
    Draggable,
    InertiaPlugin,
    Physics2DPlugin,
    CustomEase,
  );
  // только в разработке: доступ к триггерам из консоли браузера для отладки
  if (process.env.NODE_ENV !== "production") {
    Object.assign(window, { gsap, ScrollTrigger });
  }
}

export { gsap, useGSAP, ScrollTrigger, SplitText, Flip, Draggable, CustomEase };
