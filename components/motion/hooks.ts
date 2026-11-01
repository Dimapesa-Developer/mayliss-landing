"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [coincide, setCoincide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const actualizar = () => setCoincide(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, [query]);
  return coincide;
}

/** true cuando el scroll pasó `fraccion` de la altura de la ventana (el hero mide 100svh) */
export function usePasoDelHero(fraccion: number) {
  const [paso, setPaso] = useState(false);
  useEffect(() => {
    const revisar = () => setPaso(window.scrollY > window.innerHeight * fraccion);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    window.addEventListener("resize", revisar);
    return () => {
      window.removeEventListener("scroll", revisar);
      window.removeEventListener("resize", revisar);
    };
  }, [fraccion]);
  return paso;
}
