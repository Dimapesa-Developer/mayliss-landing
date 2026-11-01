"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { HeroMedia, type VideoHero } from "@/components/HeroMedia";
import { Marca } from "@/components/brand/Logotipo";
import { Redes } from "@/components/brand/Redes";
import { UnderlineLink } from "@/components/motion/UnderlineLink";
import { DUR, EASE, STAGGER } from "@/components/motion/ease";
import { useMediaQuery, usePasoDelHero } from "@/components/motion/hooks";
import { catalogo, site } from "@/config/site";

const NAV = [
  { label: "Catálogo", href: catalogo },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Visítanos", href: "#visitanos" },
  { label: "WhatsApp", href: site.whatsapp },
];

const transicionUI = { duration: DUR.ui, ease: EASE };

// Tamaño de la marca = alto de las letras (el isotipo mide 1.3×). Ver <Marca>.
const LOGO_GRANDE = "text-[clamp(60px,16.5vw,250px)]";
const LOGO_COMPACTO = "text-[24px] md:text-[28px]";

function Wordmark({ grande }: { grande: boolean }) {
  return (
    <motion.span
      layoutId="wordmark"
      transition={transicionUI}
      className={`block w-max ${grande ? `${LOGO_GRANDE} origin-bottom-left` : `${LOGO_COMPACTO} origin-top-left`}`}
    >
      <Marca />
    </motion.span>
  );
}

/** Header fijo + hero de 100svh. Comparten el wordmark (layoutId) para la transición gigante → compacto. */
export function Portada({ video }: { video: VideoHero | null }) {
  const compacto = usePasoDelHero(0.8);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <LayoutGroup>
      <Header compacto={compacto} onMenu={() => setMenuAbierto(true)} />
      <MenuMovil abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />
      <Hero compacto={compacto} video={video} />
    </LayoutGroup>
  );
}

function Header({ compacto, onMenu }: { compacto: boolean; onMenu: () => void }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-40 h-14 border-b border-linea bg-fondo md:h-16"
        initial={false}
        animate={{ opacity: compacto ? 1 : 0 }}
        transition={transicionUI}
      />
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between px-4 md:h-16 md:px-8">
        <a href="#inicio" aria-label="MayLiss, ir al inicio" className="min-w-[140px]">
          {compacto && <Wordmark grande={false} />}
        </a>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="ui-label flex gap-8">
            {NAV.map((n) => (
              <li key={n.label}>
                <UnderlineLink href={n.href}>{n.label}</UnderlineLink>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" onClick={onMenu} className="ui-label md:hidden" aria-haspopup="dialog">
          Menú
        </button>
      </header>
    </>
  );
}

function MenuMovil({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const reducido = useReducedMotion();

  useEffect(() => {
    if (!abierto) return;
    document.documentElement.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", esc);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [abierto, onCerrar]);

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-50 flex flex-col bg-fondo px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transicionUI}
        >
          <div className="flex h-14 items-center justify-between">
            <span className={`block w-max ${LOGO_COMPACTO}`}>
              <Marca />
            </span>
            <button type="button" onClick={onCerrar} className="ui-label" autoFocus>
              Cerrar
            </button>
          </div>
          <motion.ul
            className="mt-16 flex flex-col gap-4"
            initial="oculto"
            animate="visible"
            transition={{ staggerChildren: STAGGER, delayChildren: 0.1 }}
          >
            {NAV.map((n) => (
              <motion.li
                key={n.label}
                variants={{
                  oculto: { opacity: 0, y: reducido ? 0 : 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: DUR.texto, ease: EASE } },
                }}
              >
                <a
                  href={n.href}
                  onClick={onCerrar}
                  className="font-display text-[44px] leading-[1.05] tracking-[-0.02em]"
                >
                  {n.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-auto space-y-5 pb-8">
            <Redes conTexto />
            <p className="ui-label text-gris">
              {site.direccion.calle}, {site.direccion.ciudad}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ compacto, video }: { compacto: boolean; video: VideoHero | null }) {
  const ref = useRef<HTMLElement>(null);
  const reducido = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const parallax = desktop && !reducido;

  return (
    <section ref={ref} id="inicio" className="relative h-svh overflow-hidden bg-[#cbc8c5]">
      <motion.div className="absolute inset-0" style={parallax ? { y } : undefined}>
        <HeroMedia video={video} />
      </motion.div>

      {/* Velo sutil solo para el contraste AA del texto blanco sobre la foto */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 px-4 pb-5 text-white md:flex-row md:items-end md:justify-between md:px-8 md:pb-8">
        <motion.div
          className="ui-label order-1 flex flex-col items-start gap-1 md:order-2 md:items-end md:pb-3 md:text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.texto, ease: EASE, delay: 0.6 }}
        >
          <span className="whitespace-nowrap">Colección 2026 — Renta desde $350</span>
          <UnderlineLink href={catalogo} fijo>
            Ver catálogo →
          </UnderlineLink>
        </motion.div>
        <h1 className="relative order-2 md:order-1">
          <span className="sr-only">MayLiss — Renta de vestidos de fiesta en Tepic</span>
          {/* Reserva el espacio del logotipo gigante para que nada salte al compactarse */}
          <span aria-hidden className={`invisible block w-max ${LOGO_GRANDE}`}>
            <Marca />
          </span>
          <span aria-hidden className="absolute inset-0">
            {!compacto && <Wordmark grande />}
          </span>
        </h1>
      </div>
    </section>
  );
}
