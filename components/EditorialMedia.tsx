"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { RevealLines } from "@/components/motion/Reveal";
import { useMediaQuery } from "@/components/motion/hooks";
import { vestidos } from "@/data/vestidos";
import { asset } from "@/config/site";

export type VideoEditorial = { webm: boolean } | null;

/** Sección 3.7: video si existe public/media/editorial.mp4; si no, foto con parallax. */
export function EditorialMedia({ video }: { video: VideoEditorial }) {
  const ref = useRef<HTMLElement>(null);
  const reducido = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const conVideo = video && !reducido;

  return (
    <section ref={ref} aria-label="Editorial" className="relative h-[110svh] overflow-hidden bg-[#cbc8c5]">
      <motion.div
        className="absolute inset-x-0 -inset-y-[14%]"
        style={reducido || !desktop ? undefined : { y }}
      >
        <Image
          src={vestidos.medianoche.fotos[2]}
          alt="Espalda del vestido negro MEDIANOCHE con cola de satín"
          fill
          sizes="100vw"
          className="object-cover object-[50%_25%]"
        />
        {conVideo && <VideoPerezoso webm={video.webm} />}
      </motion.div>
      {/* Velo sutil para contraste AA del texto blanco */}
      <div aria-hidden className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 px-4 pb-12 text-white md:px-8 md:pb-20">
        <RevealLines
          as="p"
          lineas={["Un vestido distinto", "para cada fiesta."]}
          className="font-display text-[clamp(44px,8vw,128px)] leading-[0.92] tracking-[-0.02em]"
        />
      </div>
    </section>
  );
}

function VideoPerezoso({ webm }: { webm: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cargar, setCargar] = useState(false);
  const [listo, setListo] = useState(false);

  // Solo se carga al entrar al viewport y se pausa al salir.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCargar(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (cargar) ref.current?.load();
  }, [cargar]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-mayliss"
      style={{ opacity: listo ? 1 : 0 }}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      onPlaying={() => setListo(true)}
      aria-hidden
    >
      {cargar && webm && <source src={asset("/media/editorial.webm")} type="video/webm" />}
      {cargar && <source src={asset("/media/editorial.mp4")} type="video/mp4" />}
    </video>
  );
}
