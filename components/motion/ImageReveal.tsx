"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE, VIEWPORT } from "./ease";

/**
 * clip-path inset(100% 0 0 0) → inset(0) + scale 1.08 → 1.
 * El disparador (whileInView) va en un contenedor sin clip: un elemento recortado
 * al 100% no lo detecta el IntersectionObserver.
 */
export function ImageReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducido = useReducedMotion();
  const t = { duration: reducido ? DUR.reducido : DUR.imagen, ease: EASE };

  return (
    <motion.div
      className={`relative ${className}`}
      initial="oculto"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={
          reducido
            ? { oculto: { opacity: 0 }, visible: { opacity: 1, transition: t } }
            : {
                oculto: { clipPath: "inset(100% 0% 0% 0%)" },
                visible: { clipPath: "inset(0% 0% 0% 0%)", transition: t },
              }
        }
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            oculto: { scale: reducido ? 1 : 1.08 },
            visible: { scale: 1, transition: t },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
