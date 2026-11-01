import { Reveal } from "@/components/motion/Reveal";

const PASOS = [
  { n: "01", titulo: "Elige", texto: "Ven a probártelo o escríbenos por WhatsApp." },
  { n: "02", titulo: "Aparta", texto: "Con el 50% de anticipo." },
  { n: "03", titulo: "Ajustamos", texto: "Los ajustes de costura van incluidos." },
  { n: "04", titulo: "Brilla y regrésalo", texto: "Lo devuelves al día siguiente de tu evento." },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-titulo"
      className="scroll-mt-16 border-t border-linea px-4 py-24 md:px-8 md:py-40"
    >
      <Reveal variante="etiqueta" as="h2" className="ui-label mb-12 text-gris md:mb-20">
        <span id="como-funciona-titulo">Cómo funciona la renta</span>
      </Reveal>
      <ol className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-4 md:gap-x-6">
        {PASOS.map((p, i) => (
          <Reveal as="li" key={p.n} delay={i * 0.08}>
            <span className="block font-display text-oro-medio text-[clamp(64px,10vw,140px)] leading-[0.9] tracking-[-0.02em]">
              {p.n}
            </span>
            <h3 className="ui-label mt-6 font-medium">{p.titulo}</h3>
            <p className="mt-2 max-w-[28ch] text-gris">{p.texto}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal variante="etiqueta" as="p" className="mt-16 text-[13px] italic text-gris">
        Para recoger: INE y comprobante de domicilio con los mismos datos.
      </Reveal>
    </section>
  );
}
