const MEDIA = "https://renta-de-vestidos-production.up.railway.app/media/vestidos";

export type Vestido = {
  codigo: string;
  nombre: string;
  renta: number;
  talla: string;
  enVenta: boolean;
  alt: string;
  fotos: string[];
};

const foto = (id: number, archivo: string) => `${MEDIA}/${id}/${archivo}.webp`;

// Datos tomados de las fichas públicas de mayliss.com.mx (oct 2026).
export const vestidos = {
  medianoche: {
    codigo: "V-0113",
    nombre: "MEDIANOCHE",
    renta: 750,
    talla: "M–L",
    enVenta: true,
    alt: "Vestido negro MEDIANOCHE de satín, escote corazón con mangas largas de transparencia y aplicaciones florales",
    fotos: [
      foto(113, "73e6e37c-96d8-4b14-80f2-0d349fc7645d"),
      foto(113, "79959b5c-2e17-473f-b675-d62bab47e6b1"),
      foto(113, "c3f647c6-ae65-4428-9945-9ec68ef58c04"),
    ],
  },
  verbena: {
    codigo: "V-0124",
    nombre: "VERBENA",
    renta: 540,
    talla: "S–M",
    enVenta: true,
    alt: "Vestido rojo tipo corsé VERBENA, satín, con hombros descubiertos",
    fotos: [
      foto(124, "0747837e-325a-4295-a3f5-e81c676d5428"),
      foto(124, "99ee8cd8-013f-4cc8-a7e6-6e5d638e0d6a"),
    ],
  },
  soffia: {
    codigo: "V-0106",
    nombre: "SOFFIA",
    renta: 600,
    talla: "XS–S",
    enVenta: true,
    alt: "Vestido verde olivo SOFFIA, strapless tipo corsé con abertura en la pierna",
    fotos: [
      foto(106, "90b1f968-daf2-482b-bd77-8c743d0fe085"),
      foto(106, "73b134fc-4a0f-43fe-93b0-3dd5b3585cc5"),
    ],
  },
  encantado: {
    codigo: "V-0115",
    nombre: "ENCANTADO",
    renta: 550,
    talla: "S–M",
    enVenta: true,
    alt: "Vestido vino tinto ENCANTADO, sirena de satín con escote corazón y abertura en la pierna",
    fotos: [
      foto(115, "23560388-b6f5-47c1-a8be-ef278c9fb08b"),
      foto(115, "5c8591fb-f0e5-4ffe-b3d6-5a84c93f1b67"),
    ],
  },
  tentacion: {
    codigo: "V-0108",
    nombre: "TENTACIÓN",
    renta: 550,
    talla: "XS",
    enVenta: true,
    alt: "Vestido negro TENTACIÓN, sirena de satín con escote corazón y pliegues",
    fotos: [
      foto(108, "4f002303-0365-44f4-8d75-b334f7857650"),
      foto(108, "cdc6cf49-c547-4aac-8bca-61566855f6db"),
    ],
  },
  ensueno: {
    codigo: "V-0120",
    nombre: "ENSUEÑO",
    renta: 450,
    talla: "XS–S",
    enVenta: true,
    alt: "Vestido vino borgoña ENSUEÑO, strapless recto de satín",
    fotos: [
      foto(120, "86ffa5af-8e92-408d-ba14-22d894f45fd5"),
      foto(120, "88998929-0361-43f5-9b13-bc0cfb18d7a1"),
    ],
  },
  bosque: {
    codigo: "V-0110",
    nombre: "BOSQUE",
    renta: 480,
    talla: "XS–S",
    enVenta: true,
    alt: "Vestido verde olivo BOSQUE, strapless asimétrico de satín con drapeado",
    fotos: [
      foto(110, "5b5e4786-bb28-418b-a074-d1d02c1313af"),
      foto(110, "455135d0-b2c5-4b35-810e-9387d0ab66f5"),
    ],
  },
  bordeaux: {
    codigo: "V-0114",
    nombre: "BORDEAUX",
    renta: 400,
    talla: "M–L",
    enVenta: true,
    alt: "Vestido vino BORDEAUX de satín, escote en V profundo y silueta línea A",
    fotos: [
      foto(114, "1bcd1ea9-0be4-4125-902d-1af6ed6073cd"),
      foto(114, "16df8483-5689-4031-a7e6-23dd4b76b3f5"),
    ],
  },
  majestad: {
    codigo: "V-0119",
    nombre: "MAJESTAD",
    renta: 500,
    talla: "XL–XXL",
    enVenta: true,
    alt: "Vestido azul marino MAJESTAD, sirena de un hombro, tallas XL a XXL",
    fotos: [
      foto(119, "00543740-3252-4d29-99fd-e90d2a259b70"),
      foto(119, "838ae8af-400c-4623-b9ff-610ededa0692"),
    ],
  },
} satisfies Record<string, Vestido>;

export const estrenos: Vestido[] = [
  vestidos.medianoche,
  vestidos.encantado,
  vestidos.tentacion,
  vestidos.soffia,
  vestidos.ensueno,
  vestidos.bosque,
  vestidos.bordeaux,
  vestidos.majestad,
];

// tipoEventoId = id real del filtro del catálogo
export const eventos = [
  { nombre: "BODA", tipoEventoId: 1, vestido: vestidos.bosque },
  { nombre: "XV AÑOS", tipoEventoId: 2, vestido: vestidos.encantado },
  { nombre: "GRADUACIÓN", tipoEventoId: 3, vestido: vestidos.verbena },
  { nombre: "GALA", tipoEventoId: 4, vestido: vestidos.medianoche },
  { nombre: "COCTEL", tipoEventoId: 5, vestido: vestidos.bordeaux },
];

export const precio = (n: number) => `$${n.toLocaleString("es-MX")}`;
