import { Reveal } from "@/components/motion/Reveal";
import { UnderlineLink } from "@/components/motion/UnderlineLink";
import { Redes } from "@/components/brand/Redes";
import { site } from "@/config/site";

export function Visitanos() {
  return (
    <section
      id="visitanos"
      aria-labelledby="visitanos-titulo"
      className="scroll-mt-16 px-4 py-24 md:grid md:grid-cols-12 md:gap-x-6 md:px-8 md:py-40"
    >
      <div className="md:col-span-6">
        <Reveal as="h2" className="font-display text-[clamp(48px,9vw,140px)] leading-[0.9] tracking-[-0.02em]">
          <span id="visitanos-titulo">Visítanos</span>
        </Reveal>
        <Reveal variante="etiqueta" delay={0.15} className="mt-10 space-y-6">
          <address className="not-italic">
            {site.direccion.calle}
            <br />
            {site.direccion.colonia}
            <br />
            {site.direccion.ciudad}, {site.direccion.estado}
          </address>
          <p className="ui-label text-oro-oscuro">También rentas a domicilio</p>
          <dl className="space-y-1">
            {site.horario.map((h) => (
              <div key={h.dias} className="flex flex-wrap gap-x-3">
                <dt className="ui-label pt-[3px] text-gris">{h.dias}</dt>
                <dd>{h.horas}</dd>
              </div>
            ))}
          </dl>
          <UnderlineLink href={site.mapas} fijo className="ui-label">
            Cómo llegar →
          </UnderlineLink>
        </Reveal>
      </div>
      <div className="mt-14 md:col-span-5 md:col-start-8 md:mt-0 md:self-end">
        <Reveal variante="etiqueta" delay={0.15}>
          <p className="mb-6 max-w-[34ch] text-gris">
            Agenda tu prueba o pregunta por disponibilidad para la fecha de tu evento.
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener"
            className="ui-label flex h-14 w-full items-center justify-center bg-noche text-oro-claro transition-opacity duration-300 hover:opacity-80 md:w-auto md:px-12"
          >
            Escríbenos por WhatsApp
          </a>
          <p className="ui-label mt-4 flex flex-wrap gap-x-4 gap-y-1 text-gris">
            <span>{site.telefonoVisible}</span>
            <a href={`mailto:${site.correo}`} className="normal-case tracking-normal hover:text-tinta">
              {site.correo}
            </a>
          </p>
          <Redes conTexto className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}
