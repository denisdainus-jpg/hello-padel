import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import "./site.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hello Padel Russia — официальный русский курс падел-академии",
  description:
    "Официальный русский перевод курса Hello Padel Academy: 9 модулей, 166 видеоуроков, более 15 часов. Метод Маури Андрини. Одна глава — бесплатно.",
  openGraph: {
    title: "Hello Padel Russia — официальный русский курс",
    description:
      "9 модулей, 22 главы, 166 уроков. Техника, тактика и тренировки падела на русском.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${unbounded.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
