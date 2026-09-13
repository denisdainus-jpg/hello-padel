import type { Metadata } from "next";
import { GsapNav } from "@/components/gsap/GsapNav";

export const metadata: Metadata = {
  title: "GSAP · библиотека эффектов — Hello Padel",
};

export default function GsapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#0A0A0A]">
      <GsapNav />
      {/* overflow-x-clip, а не hidden: hidden ломает закрепление блоков при прокрутке */}
      <main className="mx-auto w-full max-w-6xl overflow-x-clip px-4 pb-32 sm:px-5">{children}</main>
    </div>
  );
}
