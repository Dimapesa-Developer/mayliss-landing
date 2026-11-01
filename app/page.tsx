import fs from "node:fs";
import path from "node:path";
import { EditorialMedia } from "@/components/EditorialMedia";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Editorial } from "@/components/sections/Editorial";
import { Estrenos } from "@/components/sections/Estrenos";
import { Footer } from "@/components/sections/Footer";
import { PorEvento } from "@/components/sections/PorEvento";
import { Portada } from "@/components/sections/Portada";
import { Visitanos } from "@/components/sections/Visitanos";
import { WhatsAppFlotante } from "@/components/sections/WhatsAppFlotante";
import { asset, site } from "@/config/site";

// Los videos se detectan al compilar: basta con copiarlos a public/media y volver a hacer build.
const existe = (archivo: string) => fs.existsSync(path.join(process.cwd(), "public/media", archivo));

const videoHero =
  existe("hero-mobile.mp4") && existe("hero-desktop.mp4")
    ? {
        webm: existe("hero-mobile.webm") && existe("hero-desktop.webm"),
        poster: existe("hero-poster.webp") ? asset("/media/hero-poster.webp") : undefined,
      }
    : null;

const videoEditorial = existe("editorial.mp4") ? { webm: existe("editorial.webm") } : null;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MayLiss",
  description: "Renta y venta de vestidos de fiesta en Tepic, Nayarit.",
  url: site.url,
  telephone: site.telefono,
  priceRange: "Desde $350 MXN",
  email: site.correo,
  sameAs: [site.redes.instagram, site.redes.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Niños Héroes #23, Col. Prieto Crispín",
    addressLocality: "Tepic",
    addressRegion: "Nayarit",
    addressCountry: "MX",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "16:00",
      closes: "19:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "15:00" },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Portada video={videoHero} />
      <main>
        <Editorial />
        <PorEvento />
        <Estrenos />
        <ComoFunciona />
        <EditorialMedia video={videoEditorial} />
        <Visitanos />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}
