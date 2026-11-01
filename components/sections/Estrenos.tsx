"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { UnderlineLink } from "@/components/motion/UnderlineLink";
import { catalogo, ficha } from "@/config/site";
import { estrenos, precio, type Vestido } from "@/data/vestidos";

// Ancho de tarjeta: limitado también por el alto de la pantalla para que la tira quepa completa en el sticky
const ANCHO_TARJETA =
  "w-[min(72vw,calc((100svh-280px)*0.75))] md:w-[min(30vw,calc((100svh-320px)*0.75))] lg:w-[min(22vw,calc((100svh-320px)*0.75))]";

/**
 * Estrenos: al hacer scroll vertical la tira de vestidos se recorre en horizontal
 * (sección alta + contenedor sticky). Con reduced motion vuelve al scroll horizontal nativo.
 */
export function Estrenos() {
  const reducido = useReducedMotion();
  return reducido ? <EstrenosNativo /> : <EstrenosConScroll />;
}

function Encabezado({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between px-4 md:mb-10 md:px-8">
      <Reveal as="h2" className="font-display text-[clamp(48px,7vw,112px)] leading-[0.9] tracking-[-0.02em]">
        <span id="estrenos">Estrenos</span>
      </Reveal>
      {children}
    </div>
  );
}

function EstrenosConScroll() {
  const seccion = useRef<HTMLElement>(null);
  const tira = useRef<HTMLUListElement>(null);
  const [distancia, setDistancia] = useState(0);

  // Distancia horizontal a recorrer = ancho de la tira − ancho visible
  useEffect(() => {
    const el = tira.current;
    if (!el) return;
    const medir = () => setDistancia(Math.max(0, el.scrollWidth - window.innerWidth));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: seccion, offset: ["start start", "end end"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(progreso, (p) => -p * distancia);

  // Si el foco del teclado cae en una tarjeta fuera de vista, llevamos el scroll a ella
  const enfocar = (e: React.FocusEvent<HTMLUListElement>) => {
    const sec = seccion.current;
    const li = (e.target as HTMLElement).closest("li");
    if (!sec || !li || !distancia) return;
    const objetivo = Math.min(distancia, Math.max(0, li.offsetLeft - 32));
    const inicio = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: inicio + objetivo, behavior: "auto" });
  };

  return (
    <section
      ref={seccion}
      aria-labelledby="estrenos"
      className="relative border-t border-linea"
      style={{ height: `calc(100svh + ${distancia}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-x-clip pt-14 md:pt-16">
        <Encabezado>
          <motion.div className="hidden h-px w-40 origin-left bg-linea md:block" aria-hidden>
            <motion.div className="h-px w-full origin-left bg-oro" style={{ scaleX: progreso }} />
          </motion.div>
        </Encabezado>
        <motion.ul
          ref={tira}
          style={{ x }}
          onFocus={enfocar}
          className="flex w-max gap-4 px-4 will-change-transform md:gap-6 md:px-8"
        >
          {estrenos.map((v) => (
            <Tarjeta key={v.codigo} v={v} />
          ))}
          <li className={`flex shrink-0 items-center ${ANCHO_TARJETA}`}>
            <div className="flex aspect-[3/4] w-full flex-col justify-end border border-linea p-6">
              <p className="font-display text-[clamp(32px,3.4vw,52px)] leading-[0.95] tracking-[-0.02em]">
                +100 vestidos para tu evento
              </p>
              <UnderlineLink href={catalogo} fijo className="ui-label mt-6 self-start">
                Ver catálogo →
              </UnderlineLink>
            </div>
          </li>
        </motion.ul>
      </div>
    </section>
  );
}

function EstrenosNativo() {
  return (
    <section aria-labelledby="estrenos" className="border-t border-linea py-24 md:py-40">
      <Encabezado />
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 md:gap-6 md:scroll-px-8 md:px-8">
        {estrenos.map((v) => (
          <Tarjeta key={v.codigo} v={v} snap />
        ))}
      </ul>
      <div className="mt-12 px-4 md:px-8">
        <UnderlineLink href={catalogo} fijo className="ui-label">
          Ver los +100 vestidos →
        </UnderlineLink>
      </div>
    </section>
  );
}

function Tarjeta({ v, snap = false }: { v: Vestido; snap?: boolean }) {
  const sizes = "(max-width: 767px) 72vw, (max-width: 1023px) 30vw, 22vw";
  return (
    <li className={`shrink-0 ${ANCHO_TARJETA} ${snap ? "snap-start" : ""}`}>
      <a href={ficha(v.codigo)} className="group block">
        <ImageReveal className="aspect-[3/4] bg-linea">
          <Image src={v.fotos[0]} alt={v.alt} fill sizes={sizes} className="object-cover" />
          {v.fotos[1] && (
            <Image
              src={v.fotos[1]}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-[400ms] ease-mayliss md:group-hover:opacity-100"
            />
          )}
        </ImageReveal>
        <Reveal variante="etiqueta" delay={0.15} className="ui-label mt-3 flex flex-col">
          <span>{v.nombre}</span>
          <span className="text-gris">
            Talla {v.talla} · Renta {precio(v.renta)}
          </span>
          {v.enVenta && <span className="mt-1 text-oro-oscuro">También en venta</span>}
        </Reveal>
      </a>
    </li>
  );
}
