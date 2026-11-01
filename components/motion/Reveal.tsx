"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE, STAGGER, VIEWPORT } from "./ease";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "titulo": fade + translateY 24px · "etiqueta": fade simple */
  variante?: "titulo" | "etiqueta";
  as?: "div" | "p" | "span" | "h2" | "h3" | "li";
};

export function Reveal({ children, className, delay = 0, variante = "titulo", as = "div" }: Props) {
  const reducido = useReducedMotion();
  const Tag = motion[as];
  const y = variante === "titulo" && !reducido ? 24 : 0;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reducido ? DUR.reducido : DUR.texto,
        ease: EASE,
        delay: reducido ? 0 : delay,
      }}
    >
      {children}
    </Tag>
  );
}

/** Titular de varias líneas: cada línea entra con stagger */
export function RevealLines({
  lineas,
  className,
  as = "h2",
}: {
  lineas: string[];
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  const reducido = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ staggerChildren: reducido ? 0 : STAGGER }}
    >
      {lineas.map((linea) => (
        <motion.span
          key={linea}
          className="block"
          variants={{
            oculto: { opacity: 0, y: reducido ? 0 : 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reducido ? DUR.reducido : DUR.texto, ease: EASE },
            },
          }}
        >
          {linea}
        </motion.span>
      ))}
    </Tag>
  );
}
