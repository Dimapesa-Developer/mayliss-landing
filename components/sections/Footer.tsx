import { Redes } from "@/components/brand/Redes";
import { asset, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="ui-label bg-noche px-4 pb-28 pt-24 text-fondo md:px-8 md:pt-32">
      <div className="flex flex-col items-center text-center">
        {/* Logo oficial completo (versión letras blancas, para fondo oscuro) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/brand/logo-mayliss-letras-blancas.svg")}
          alt="MayLiss — Renta de vestidos"
          width={1254}
          height={1254}
          loading="lazy"
          className="h-auto w-[300px] md:w-[420px]"
        />
        <p className="mt-2 max-w-[30ch] font-display text-[clamp(22px,3vw,32px)] normal-case italic leading-tight tracking-normal text-oro-claro">
          “{site.lema}”
        </p>
        <Redes conTexto className="mt-10 justify-center text-oro-claro" />
      </div>

      <div className="mt-20 flex flex-col gap-4 border-t border-oro/30 pt-8 md:flex-row md:items-end md:justify-between">
        <p className="text-fondo/70">
          {site.direccion.calle}, {site.direccion.colonia}, {site.direccion.ciudad}, {site.direccion.estado}
        </p>
        <p className="text-oro">© 2026 MAYLISS</p>
      </div>
    </footer>
  );
}
