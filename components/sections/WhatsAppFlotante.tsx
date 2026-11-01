"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DUR, EASE } from "@/components/motion/ease";
import { usePasoDelHero } from "@/components/motion/hooks";
import { site } from "@/config/site";

export function WhatsAppFlotante() {
  const visible = usePasoDelHero(1);
  const reducido = useReducedMotion();
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={site.whatsapp}
          target="_blank"
          rel="noopener"
          aria-label="Escríbenos por WhatsApp"
          className="ui-label fixed bottom-4 right-4 z-30 border border-oro/40 bg-noche px-5 py-3.5 text-oro-claro md:bottom-8 md:right-8"
          initial={{ opacity: 0, y: reducido ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducido ? 0 : 12 }}
          transition={{ duration: DUR.ui, ease: EASE }}
        >
          WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  );
}
