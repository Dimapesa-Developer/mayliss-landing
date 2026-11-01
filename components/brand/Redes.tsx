import { site } from "@/config/site";

function IconoInstagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconoFacebook({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}

export const REDES = [
  { nombre: "Instagram", usuario: site.redes.instagramUsuario, href: site.redes.instagram, Icono: IconoInstagram },
  { nombre: "Facebook", usuario: site.redes.facebookNombre, href: site.redes.facebook, Icono: IconoFacebook },
] as const;

/** Links a redes con ícono. `conTexto` agrega el usuario/página junto al ícono. */
export function Redes({ conTexto = false, className = "" }: { conTexto?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {REDES.map(({ nombre, usuario, href, Icono }) => (
        <li key={nombre}>
          <a
            href={href}
            target="_blank"
            rel="noopener"
            aria-label={`${nombre} de MayLiss: ${usuario}`}
            className="group inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-70"
          >
            <Icono className="size-5 shrink-0" />
            {conTexto && <span className="ui-label">{usuario}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
