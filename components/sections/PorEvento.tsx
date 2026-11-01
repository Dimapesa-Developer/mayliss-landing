"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { DUR, EASE } from "@/components/motion/ease";
import { catalogoPorEvento } from "@/config/site";
import { eventos } from "@/data/vestidos";

export function PorEvento() {
  const ref = useRef<HTMLElement>(null);
  const reducido = useReducedMotion();
  const [activo, setActivo] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 20 });
  const y = useSpring(my, { stiffness: 150, damping: 20 });

  const mover = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      ref={ref}
      aria-labelledby="por-evento"
      className="relative border-t border-linea px-4 py-24 md:px-8 md:py-40"
      onPointerMove={mover}
      onPointerLeave={() => setActivo(null)}
    >
      <Reveal variante="etiqueta" as="h2" className="ui-label mb-10 text-gris md:mb-16">
        <span id="por-evento">Por evento</span>
      </Reveal>

      <ul>
        {eventos.map((ev, i) => (
          <li key={ev.nombre} className="border-b border-linea first:border-t">
            <a
              href={catalogoPorEvento(ev.tipoEventoId)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActivo(i)}
              onFocus={() => setActivo(i)}
              onBlur={() => setActivo(null)}
              className="flex items-center justify-between gap-4 py-3 md:py-4"
            >
              <Reveal
                as="span"
                delay={i * 0.08}
                className="font-display text-[clamp(36px,10vw,160px)] leading-[0.95] tracking-[-0.02em] transition-colors duration-300 md:[a:hover_&]:text-oro-medio"
              >
                {ev.nombre}
              </Reveal>
              {/* Móvil: miniatura a la derecha */}
              <span className="relative block aspect-[3/4] w-12 shrink-0 overflow-hidden bg-linea md:hidden">
                <Image src={ev.vestido.fotos[0]} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="ui-label hidden text-gris md:block">Ver vestidos →</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop: foto flotante que sigue al cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden md:block"
        style={reducido ? undefined : { x, y }}
      >
        <AnimatePresence>
          {activo !== null && (
            <motion.div
              key={activo}
              className="absolute -left-[130px] -top-[173px] aspect-[3/4] w-[260px] overflow-hidden bg-linea"
              initial={{ opacity: 0, scale: reducido ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.ui, ease: EASE }}
            >
              <Image
                src={eventos[activo].vestido.fotos[0]}
                alt=""
                fill
                sizes="260px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
