import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { asset, site } from "@/config/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // URL pública donde se publica (Pages la define al compilar); por defecto el dominio de la marca
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.url),
  title: "MayLiss — Renta de vestidos de fiesta en Tepic, Nayarit",
  description:
    "Renta de vestidos en Tepic para boda, XV años, graduación, gala y coctel. Rentas desde $350, ajustes incluidos y apartado con 50%. Visítanos en Col. Prieto Crispín.",
  alternates: { canonical: asset("/") },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "MayLiss",
    title: "MayLiss — Renta de vestidos de fiesta en Tepic",
    description: "Estrena sin comprar. Vestidos de fiesta para boda, XV años, graduación y gala desde $350.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${bodoni.variable} ${inter.variable}`}>
      <body className="bg-fondo text-tinta">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
