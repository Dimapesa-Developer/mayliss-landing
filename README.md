# Landing MayLiss

Landing editorial de renta de vestidos (Tepic). Next.js 15 + Tailwind 4 + Motion + Lenis. El spec está en `SPEC-landing-mayliss.md`.

**En vivo:** https://dimapesa-developer.github.io/mayliss-landing/

```bash
git clone https://github.com/Dimapesa-Developer/mayliss-landing.git
cd mayliss-landing
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Publicación
Cada push a `main` publica el sitio en GitHub Pages (`.github/workflows/deploy.yml`). Ahí el sitio se exporta como estático (`GITHUB_PAGES=true`, imágenes sin optimizar y `basePath` = nombre del repo). En local o en cualquier hosting de Next.js (Vercel, etc.) funciona como un Next.js normal, sin cambios.

## Integrarla en otro sitio Next.js
- La landing es `app/page.tsx` + `components/` + `config/` + `data/`; copia esas carpetas y los estilos de `app/globals.css` (tokens `@theme`).
- Fuentes: Bodoni Moda e Inter (`app/layout.tsx`); el smooth scroll (`SmoothScroll`) envuelve el `body`.
- Dependencias: `motion` y `lenis`. Añade el host de las fotos a `images.remotePatterns` (ver `next.config.ts`).
- Las rutas a `/public` pasan por `asset()` (`config/site.ts`) para respetar `NEXT_PUBLIC_BASE_PATH`.

## Dónde está cada cosa
- `config/site.ts` — WhatsApp, dirección, horario, mapas, redes (Instagram @rvmayliss21 y Facebook "Mayliss Renta de Vestidos", verificadas), filtro real del catálogo (`?tipo_evento_id=N`).
- `data/vestidos.ts` — vestidos, precios, tallas y fotos (tomados de las fichas públicas de mayliss.com.mx).
- `components/motion/` — curva/tiempos globales (`ease.ts`), `Reveal`, `ImageReveal`, `SmoothScroll`, `UnderlineLink`.
- `components/sections/` — secciones en orden; `components/HeroMedia.tsx` y `EditorialMedia.tsx` manejan video/foto.

## Videos (fase 2)
Copia los archivos a `public/media/` con estos nombres y vuelve a hacer `npm run build` (la detección es al compilar; no hay que tocar código):

```
hero-mobile.mp4 / .webm    (9:16, ≤ 3 MB)
hero-desktop.mp4 / .webm   (16:9, ≤ 4 MB)
hero-poster.webp
editorial.mp4 / .webm      (opcional, sección "Un vestido distinto…")
```

Sin esos archivos se usa la foto con Ken Burns. Con `prefers-reduced-motion` solo se muestra la foto/poster. Comandos de compresión: sección 5B.3 del spec.

## Marca
- Originales: `recursos mayliss/MAYLISS_LOGO.rar` y su contenido descomprimido en `recursos mayliss/extraido/`.
- En uso (SVG limpios, sin metadatos): `public/brand/` — logo completo (letras negras / blancas), logotipo caligráfico, monograma ML.
- `components/brand/Logotipo.tsx` — caligrafía "MayLiss" extraída del logo oficial (hero y header).
- `app/icon.svg` (favicon, monograma), `app/apple-icon.png`, `app/opengraph-image.png` (reverso de la tarjeta).
- Colores (`app/globals.css`): `oro #B69A76`, `oro-claro #E3CB9C`, `noche #0B0B0B`; para texto sobre el fondo claro se usa `oro-oscuro #7A6140` (contraste AA).
