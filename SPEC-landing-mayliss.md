# SPEC — Landing page MayLiss (renta de vestidos, Tepic)

> Para Claude Code. Construye una landing editorial de moda **inspirada** en la estética minimalista de ZARA (no copiar logo, tipografía propietaria ni nombre). Todo el copy en español de México.

## Antes de empezar
0. **Fase 1 = sin video.** Todavía no existen los archivos de `public/media/`. Construye todo con el fallback de foto (Ken Burns, sección 5.3) y deja lista la lógica de video de la sección 5B para que, al copiar los archivos después, funcione sin tocar código.
1. Si está instalada la skill **frontend-design**, cárgala y síguela junto con este spec. Si hay conflicto, manda este spec.
2. Lee el spec completo antes de escribir código.
3. Orden de trabajo: setup y dependencias → tokens de diseño (colores, fuentes) → componentes de motion → secciones en orden → videos y fallback → SEO → QA.
4. Al terminar cada sección, toma screenshot en 375px y 1440px (Playwright) y compárala contra la sección 2 (dirección de arte) antes de seguir.

## 0. Contexto del negocio
- **Marca:** MayLiss — renta y venta de vestidos de fiesta. Sitio actual: https://mayliss.com.mx (Next.js). Catálogo: `/catalogo`, ficha: `/vestidos/V-0113`.
- **Dirección:** Calle Niños Héroes #23, Col. Prieto Crispín, Tepic, Nayarit.
- **WhatsApp:** 311 458 9288 → `https://wa.me/523114589288?text=Hola%20MayLiss%2C%20quiero%20informes%20para%20rentar%20un%20vestido`
- **Horario:** L–V 10:00–14:00 y 16:00–19:00 · Sáb 10:00–15:00.
- **Cómo funciona la renta (datos reales):** se renta por un día de evento y se regresa al día siguiente · se aparta con 50% de anticipo · ajustes de costura incluidos · para recoger: INE + comprobante de domicilio con los mismos datos · muchos vestidos también están en venta.
- **Eventos:** boda (invitada), XV años, graduación, gala, coctel. Rentas desde $350.
- **Público:** mujeres 15–35 de Tepic, llegan desde Instagram/WhatsApp → **mobile-first**.

## 1. Stack
- Si trabajas dentro del repo existente de MayLiss: la landing es la ruta `/` y **reutiliza la capa de datos/API que ya alimenta `/catalogo`** (no hardcodees productos si existe la API).
- Si es proyecto nuevo: Next.js (App Router) + TypeScript + Tailwind. Datos de vestidos en `data/vestidos.ts`.
- Imágenes remotas: añadir `renta-de-vestidos-production.up.railway.app` a `images.remotePatterns`. Usar `next/image` con `sizes` correctos.
- Fuentes con `next/font/google` (Bodoni Moda y Inter), `display: swap`, solo los pesos que se usan.
- Dependencias a instalar: `motion`, `lenis`. Nada más para UI.

## 2. Dirección de arte (no negociable)
- **La foto manda.** Imágenes full-bleed, texto mínimo.
- **Paleta:** fondo `#FAF8F5` (blanco cálido, ya es su theme color), tinta `#111111`, gris texto secundario `#6B6B6B`, líneas `#E5E2DD`. **Sin color de acento**: el color lo ponen los vestidos.
- **Tipografía:**
  - Display: `Bodoni Moda` (Google Fonts), 400/500, titulares enormes (`clamp(56px, 14vw, 220px)`), tracking `-0.02em`, line-height 0.9.
  - UI/texto: `Inter`, nav y etiquetas en 11px, MAYÚSCULAS, tracking `0.14em`. Párrafos 15px/1.6.
- **Wordmark:** "MAYLISS" en Bodoni Moda gigante, superpuesto a la imagen del hero; al hacer scroll se encoge a header compacto (transición 400ms).
- **Prohibido:** border-radius, sombras, gradientes, emojis, iconos decorativos, botones con fondo de color, burbuja verde de WhatsApp, carruseles con puntitos, stock photos.
- **Botones/links:** texto plano subrayado (`underline-offset-4`) o rectángulo negro sólido con texto blanco 11px mayúsculas.
- **Espaciado:** generoso. Secciones con `py-24 md:py-40`. Grid de 12 columnas asimétrico en desktop.

## 3. Estructura (en orden)

### 3.1 Header
- Fijo, transparente sobre el hero → fondo `#FAF8F5` al hacer scroll.
- Izquierda: wordmark. Derecha: `CATÁLOGO` · `CÓMO FUNCIONA` · `VISÍTANOS` · `WHATSAPP`. En móvil: wordmark + `MENÚ` (texto, no hamburguesa) que abre overlay full-screen con links en Bodoni grande.

### 3.2 Hero (100svh)
- Media de fondo: **video** vertical en móvil y horizontal en desktop (archivos e implementación en sección 5B). Poster = foto de MEDIANOCHE V-0113. Si aún no hay video, foto con Ken Burns (sección 5.3).
- Wordmark gigante abajo-izquierda, encima de la imagen, en blanco si la foto es oscura.
- Abajo-derecha, pequeño: `COLECCIÓN 2026 — RENTA DESDE $350` y link `VER CATÁLOGO →`.

### 3.3 Editorial doble (asimétrico)
- Izquierda 7/12: VERBENA (V-0124, rojo, corsé satín). Derecha 4/12 desplazada hacia abajo ~120px: SOFFIA (V-0106, verde olivo, abertura).
- Bajo cada foto: `VERBENA` / `RENTA $540 · TALLA S–M` en 11px. Click → `/vestidos/V-0124`.
- Titular grande entre ambas: *"Estrena sin comprar."*

### 3.4 Por evento
- Lista vertical de palabras gigantes en Bodoni: `BODA` · `XV AÑOS` · `GRADUACIÓN` · `GALA` · `COCTEL`.
- Desktop: hover muestra una foto flotante del vestido representativo siguiendo el cursor. Móvil: foto pequeña a la derecha de cada palabra.
- Cada una enlaza a `/catalogo` con el filtro de evento correspondiente (revisar los query params reales que usa el catálogo).

### 3.5 Estrenos (scroll horizontal)
- Tira de 8 vestidos, tarjetas 3:4, `scroll-snap`, sin flechas en móvil (swipe), flechas de texto `← →` en desktop.
- Debajo de cada tarjeta: NOMBRE / TALLA / RENTA $. Etiqueta `TAMBIÉN EN VENTA` cuando aplique.
- Vestidos sugeridos: MEDIANOCHE V-0113 ($750), ENCANTADO V-0115 ($550), TENTACIÓN V-0108 ($550), SOFFIA V-0106 ($600), ENSUEÑO V-0120 ($450), BOSQUE V-0110 ($480), BORDEAUX V-0114 ($400), MAJESTAD V-0119 ($500, tallas XL–XXL: inclusión de tallas).
- Link final: `VER LOS +100 VESTIDOS →` a `/catalogo`.

### 3.6 Cómo funciona
- 4 columnas (2×2 en móvil), número grande en Bodoni + texto corto:
  - `01` **Elige** — Ven a probártelo o escríbenos por WhatsApp.
  - `02` **Aparta** — Con el 50% de anticipo.
  - `03` **Ajustamos** — Los ajustes de costura van incluidos.
  - `04` **Brilla y regrésalo** — Lo devuelves al día siguiente de tu evento.
- Nota pequeña: *Para recoger: INE y comprobante de domicilio con los mismos datos.*

### 3.7 Imagen/video full-bleed #2
- `public/media/editorial.mp4` si existe (sección 5B); si no, una foto distinta de MEDIANOCHE con parallax. Texto superpuesto: *"Un vestido distinto para cada fiesta."*

### 3.8 Visítanos
- Dos columnas: izquierda dirección + horarios + `CÓMO LLEGAR →` (Google Maps); derecha botón negro `ESCRÍBENOS POR WHATSAPP`.

### 3.9 Footer
- Wordmark, Instagram/Facebook, dirección, `© 2026 MAYLISS`. Todo en 11px.
- Las URLs de redes aún no están confirmadas: déjalas en `config/site.ts` como constantes con `// TODO: confirmar URL`. No inventes handles. Si están vacías, oculta esos links.

### 3.10 WhatsApp flotante
- Rectángulo negro abajo-derecha, texto `WHATSAPP` 11px. Aparece después del hero.

## 4. Imágenes
- Patrón de URL: `https://renta-de-vestidos-production.up.railway.app/media/vestidos/{id}/{uuid}.webp` (ej. id 113 = V-0113).
- Fotos confirmadas:
  - V-0113 MEDIANOCHE: `113/79959b5c-2e17-473f-b675-d62bab47e6b1.webp`, `113/9e89afa7-5693-40b3-b4db-b8fe3231bbf8.webp`, `113/178ddf3a-649b-4dad-8d2d-6fff2cfdb4ed.webp`, `113/71a4816e-e262-4570-b5cd-4eda4fc0cc78.webp`
  - V-0124 VERBENA: `124/0747837e-325a-4295-a3f5-e81c676d5428.webp`, `124/d298b47a-53e9-4f05-9c43-560a9fa94f24.webp`, `124/d2c6dfd0-9d98-4f3f-a437-8e766979142e.webp`
  - V-0106 SOFFIA: `106/73b134fc-4a0f-43fe-93b0-3dd5b3585cc5.webp`, `106/1ae3359a-50d6-4cf8-987d-b4efe468a261.webp`, `106/94d1f323-a828-4354-a568-47acd70b9840.webp`
- Para el resto: obtenerlas de la API/datos del catálogo o de cada ficha `/vestidos/V-XXXX`.
- **Antes de asignar fotos, descárgalas a `/tmp/candidatas/` y revísalas visualmente.** Elige por sección:
  - Hero y full-bleed: vertical, cuerpo completo, fondo limpio, buena luz, alta resolución.
  - Descarta fotos borrosas, con fondo saturado, colgadas en gancho o recortadas.
  - Prefiere siempre la foto con modelo sobre la de maniquí.
- Hero en móvil usa foto vertical; en desktop, `object-position` ajustado para no cortar el vestido.

## 5. Animaciones y transiciones

### 5.1 Librerías (decididas, no cambiar)
- **Motion** (`motion`, antes Framer Motion) → reveals, transición del wordmark, overlay del menú, hover de "Por evento". Importar desde `motion/react`.
- **Lenis** (`lenis`) → smooth scroll global. Config: `lerp: 0.1`, `smoothWheel: true`; en touch dejar scroll nativo (no forzar smooth en móvil).
- **No usar** GSAP, AOS, Swiper ni librerías de carrusel. El scroll horizontal de Estrenos es CSS (`overflow-x: auto` + `scroll-snap`).
- Crear `components/motion/` con piezas reutilizables: `<Reveal>`, `<ImageReveal>`, `<SmoothScroll>` (provider de Lenis en el layout, client component).

### 5.2 Curva y tiempos (globales)
- Easing único para todo el sitio: `[0.2, 0.7, 0.2, 1]`.
- Duraciones: imágenes 900ms · textos 600ms · UI (menú, header) 400ms.
- Escalonado (stagger) de 80ms entre elementos hermanos.
- Se disparan una sola vez (`viewport={{ once: true, amount: 0.25 }}`).

### 5.3 Qué anima y cómo
| Elemento | Animación |
|---|---|
| Imágenes de secciones | `clip-path: inset(100% 0 0 0)` → `inset(0)` + scale 1.08 → 1 |
| Titulares Bodoni | Fade + translateY 24px; si son de varias líneas, línea por línea con stagger |
| Etiquetas 11px / precios | Fade simple, 150ms después de su imagen |
| Wordmark hero → header | Al pasar el 80% del hero, el wordmark gigante se encoge y sube al header (Motion `layoutId` o `useScroll` + `useTransform` sobre scale/y). Fondo del header pasa de transparente a `#FAF8F5` en 400ms |
| Hero (si es foto, sin video) | Ken Burns: scale 1.08 → 1 en 8s, una vez |
| Hero (scroll) | Parallax suave: la media se mueve al 30% de la velocidad del scroll (`useScroll` + `useTransform`), solo desktop |
| Menú móvil | Overlay full-screen con fade 400ms; links en Bodoni entran con stagger desde abajo |
| "Por evento" (desktop) | Foto flotante sigue al cursor con `useSpring` (stiffness 150, damping 20); fade/scale 0.95 → 1 al entrar |
| Tarjetas de Estrenos | Hover desktop: la foto cambia a la 2ª imagen del vestido con crossfade 400ms. Sin zoom ni sombras |
| Links de texto | Subrayado que crece de izquierda a derecha (`scaleX` 0 → 1, 300ms) |
| WhatsApp flotante | Aparece con fade + translateY 12px al salir del hero |

### 5.4 Reglas
- Solo animar `transform`, `opacity` y `clip-path` (nada de width/height/top/left) → 60fps.
- `prefers-reduced-motion: reduce` → sin parallax, sin Ken Burns, sin Lenis; los reveals pasan a fade de 200ms. Usar `useReducedMotion()` de Motion.
- Nada de rebotes, giros ni animaciones "llamativas": todo lento, elegante, casi imperceptible.

## 5B. Videos

### 5B.1 Archivos esperados
```
public/media/hero-mobile.mp4     (9:16, ≤ 3 MB)
public/media/hero-mobile.webm
public/media/hero-desktop.mp4    (16:9, ≤ 4 MB)
public/media/hero-desktop.webm
public/media/hero-poster.webp    (primer frame o foto de MEDIANOCHE)
public/media/editorial.mp4       (opcional, para la sección 3.7; + .webm)
```

### 5B.2 Implementación
- `<video autoPlay muted loop playsInline preload="metadata" poster=...>` con `<source media="(max-width: 767px)">` para la versión móvil y la de desktop en el resto. Si el navegador ignora `media` en `<source>`, elegir la fuente en el cliente con `matchMedia`.
- El video del hero carga de inmediato. El de la sección 3.7 solo se carga y reproduce cuando entra al viewport (IntersectionObserver) y se pausa al salir.
- **Fallback:** si no existen los archivos de video, usar la foto con Ken Burns (5.3) sin romper nada. El sitio debe funcionar hoy sin videos y mejorar en cuanto se agreguen.
- Con `prefers-reduced-motion` se muestra solo el poster.

### 5B.3 Compresión (cuando te pase el video crudo de Higgsfield)
```bash
ffmpeg -i entrada.mp4 -an -vf "scale=-2:1280" -c:v libx264 -preset veryfast -crf 26 -movflags +faststart -pix_fmt yuv420p hero-mobile.mp4
ffmpeg -i entrada.mp4 -an -vf "scale=-2:1280" -c:v libvpx-vp9 -crf 36 -b:v 0 hero-mobile.webm
ffmpeg -i entrada.mp4 -vframes 1 -q:v 80 hero-poster.webp
```
(Para desktop usar `scale=1920:-2`.) Si un archivo supera el límite, sube el CRF 2 puntos y vuelve a comprimir.

## 6. Rendimiento, SEO y accesibilidad
- LCP < 2.5s en 4G: hero con `priority`, videos dentro de los límites de 5B.1, poster siempre.
- `<title>`: "MayLiss — Renta de vestidos de fiesta en Tepic, Nayarit". Meta description con "renta de vestidos Tepic", XV años, graduación, boda.
- JSON-LD `LocalBusiness` (dirección, horario, teléfono).
- Alt descriptivo por foto ("Vestido rojo tipo corsé VERBENA, satín"). Contraste AA del texto sobre imágenes (usa overlay sutil si hace falta). Navegación por teclado y focus visible.

## 7. Criterios de aceptación
- [ ] Se ve como una revista de moda: fotos dominantes, Bodoni gigante, UI en 11px mayúsculas, cero adornos.
- [ ] Mobile-first impecable en 375px; desktop con grid asimétrico.
- [ ] Todos los CTAs llevan a `/catalogo`, a fichas reales o a WhatsApp con mensaje prellenado.
- [ ] Animaciones de la sección 5 implementadas con Motion + Lenis, misma curva y tiempos en todo el sitio, a 60fps.
- [ ] Con `prefers-reduced-motion` no hay parallax, Ken Burns ni smooth scroll.
- [ ] Videos: versión móvil/desktop correcta, poster visible al instante y fallback a foto si faltan los archivos.
- [ ] Datos (dirección, horario, WhatsApp, precios, reglas de renta) idénticos a la sección 0.
- [ ] Lighthouse móvil ≥ 90 en Performance y ≥ 95 en Accessibility y SEO.
- [ ] Screenshot final en 375px y 1440px para revisión, más un video corto o GIF del scroll completo mostrando las animaciones.
