"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { vestidos } from "@/data/vestidos";
import { asset } from "@/config/site";

export type VideoHero = {
  webm: boolean;
  poster?: string;
};

const PANELES = [
  // Orden pensado para que ninguna cabeza quede bajo el nav (arriba a la derecha)
  { src: vestidos.medianoche.fotos[1], alt: vestidos.medianoche.alt, soloDesktop: true },
  { src: vestidos.medianoche.fotos[0], alt: vestidos.medianoche.alt, soloDesktop: false },
  { src: vestidos.tentacion.fotos[0], alt: vestidos.tentacion.alt, soloDesktop: true },
];

/**
 * Media del hero. Sin video (fase 1): foto(s) con Ken Burns.
 * Con video en public/media: se monta encima de la foto y aparece al poder reproducirse.
 */
export function HeroMedia({ video }: { video: VideoHero | null }) {
  const reducido = useReducedMotion();

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0 grid md:grid-cols-3"
        initial={{ scale: reducido ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {PANELES.map((p, i) => (
          <div key={p.src} className={`relative h-full ${p.soloDesktop ? "hidden md:block" : ""}`}>
            <Image
              src={p.src}
              alt={p.alt}
              fill
              priority={i === 1}
              fetchPriority={i === 1 ? "high" : undefined}
              sizes={p.soloDesktop ? "(max-width: 767px) 1px, 34vw" : "(max-width: 767px) 100vw, 34vw"}
              className="object-cover object-[50%_30%]"
            />
          </div>
        ))}
      </motion.div>
      {video && !reducido && <VideoDeFondo video={video} />}
    </div>
  );
}

function VideoDeFondo({ video }: { video: VideoHero }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [variante, setVariante] = useState<"mobile" | "desktop" | null>(null);
  const [listo, setListo] = useState(false);

  // Algunos navegadores ignoran `media` en <source>: elegimos la fuente con matchMedia.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const elegir = () => setVariante(mq.matches ? "mobile" : "desktop");
    elegir();
    mq.addEventListener("change", elegir);
    return () => mq.removeEventListener("change", elegir);
  }, []);

  useEffect(() => {
    setListo(false);
    ref.current?.load();
  }, [variante]);

  if (!variante) return null;
  const base = asset(`/media/hero-${variante}`);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-mayliss"
      style={{ opacity: listo ? 1 : 0 }}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={video.poster}
      onPlaying={() => setListo(true)}
      aria-hidden
    >
      {video.webm && <source src={`${base}.webm`} type="video/webm" />}
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}
