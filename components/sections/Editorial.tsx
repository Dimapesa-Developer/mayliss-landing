import Image from "next/image";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { ficha } from "@/config/site";
import { precio, vestidos, type Vestido } from "@/data/vestidos";

function Look({ v, sizes, className = "" }: { v: Vestido; sizes: string; className?: string }) {
  return (
    <a href={ficha(v.codigo)} className={`group block ${className}`}>
      <ImageReveal className="aspect-[3/4] bg-linea">
        <Image src={v.fotos[0]} alt={v.alt} fill sizes={sizes} className="object-cover" />
      </ImageReveal>
      <Reveal variante="etiqueta" delay={0.15} className="ui-label mt-3 flex flex-col">
        <span>{v.nombre}</span>
        <span className="text-gris">
          Renta {precio(v.renta)} · Talla {v.talla}
        </span>
      </Reveal>
    </a>
  );
}

export function Editorial() {
  return (
    <section aria-label="Editorial" className="px-4 py-24 md:grid md:grid-cols-12 md:gap-x-6 md:px-8 md:py-40">
      <RevealLines
        lineas={["Estrena", "sin comprar."]}
        className="mb-12 font-display text-[clamp(48px,7vw,120px)] leading-[0.9] tracking-[-0.02em] md:col-span-5 md:col-start-8 md:row-start-1 md:mb-0 md:self-start md:pt-10"
      />
      <Look
        v={vestidos.verbena}
        sizes="(max-width: 767px) 100vw, 58vw"
        className="md:col-span-7 md:col-start-1 md:row-span-2 md:row-start-1"
      />
      <Look
        v={vestidos.soffia}
        sizes="(max-width: 767px) 66vw, 33vw"
        className="ml-auto mt-16 w-2/3 md:col-span-4 md:col-start-9 md:row-start-2 md:ml-0 md:mt-[120px] md:w-auto"
      />
    </section>
  );
}
