export const site = {
  nombre: "MayLiss",
  url: "https://mayliss.com.mx",
  telefono: "+523114589288",
  telefonoVisible: "311 458 9288",
  correo: "Rvmayliss@hotmail.com",
  lema: "Porque cada ocasión merece un gran vestido",
  whatsapp:
    "https://wa.me/523114589288?text=Hola%20MayLiss%2C%20quiero%20informes%20para%20rentar%20un%20vestido",
  direccion: {
    calle: "Calle Niños Héroes #23",
    colonia: "Col. Prieto Crispín",
    ciudad: "Tepic",
    estado: "Nayarit",
    pais: "MX",
  },
  mapas:
    "https://www.google.com/maps/search/?api=1&query=Calle%20Ni%C3%B1os%20H%C3%A9roes%2023%2C%20Prieto%20Crisp%C3%ADn%2C%20Tepic%2C%20Nayarit",
  horario: [
    { dias: "Lunes a viernes", horas: "10:00–14:00 y 16:00–19:00" },
    { dias: "Sábado", horas: "10:00–15:00" },
  ],
  redes: {
    // Perfiles oficiales (verificados: usan el logo de MayLiss; oct 2026)
    instagram: "https://www.instagram.com/rvmayliss21/",
    instagramUsuario: "@rvmayliss21",
    facebook: "https://www.facebook.com/p/Mayliss-Renta-de-Vestidos-61594022717809/",
    facebookNombre: "Mayliss Renta de Vestidos",
  },
} as const;

/** Ruta a un archivo de /public respetando el subdirectorio de GitHub Pages */
export const asset = (ruta: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${ruta}`;

export const catalogo = `${site.url}/catalogo`;
export const ficha = (codigo: string) => `${site.url}/vestidos/${codigo}`;
/** Filtro real del catálogo: /catalogo?tipo_evento_id=N */
export const catalogoPorEvento = (id: number) =>
  `${catalogo}?tipo_evento_id=${id}`;
