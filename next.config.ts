import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт: npm run build кладёт готовый сайт в папку out/,
  // её целиком заливаем в public_html на Timeweb. Сервер Node не нужен.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
