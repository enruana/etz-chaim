// Lugares de la Tierra Santa y las historias que ocurren en cada uno.
// pos = [x, z] en el diorama 3D (x: oeste→este, z: norte→sur).
// Cada historia enlaza al capítulo donde se estudia — el mapa se enciende al estudiar.

export type Historia = { ref: string; titulo: string; libro: string; cap: number };

export type Lugar = {
  id: string;
  nombre: string;
  desc: string;
  pos: [number, number];
  historias: Historia[];
};

export const LUGARES: Lugar[] = [
  {
    id: "rio-jordan",
    nombre: "Río Jordán",
    desc: "El río que baja del norte al Mar Muerto. Aquí predicaba Juan y aquí el cielo se rasgó.",
    pos: [1.0, -0.6],
    historias: [
      { ref: "Marcos 1:4-8", titulo: "Juan el Bautista predica en el desierto", libro: "marcos", cap: 1 },
      { ref: "Marcos 1:9-11", titulo: "El bautismo de Jesús: el cielo se abre", libro: "marcos", cap: 1 },
    ],
  },
  {
    id: "desierto-judea",
    nombre: "Desierto de Judea",
    desc: "Tierra árida entre Jerusalén y el Mar Muerto. Cuarenta días de prueba.",
    pos: [1.05, 1.0],
    historias: [{ ref: "Marcos 1:12-13", titulo: "La tentación en el desierto", libro: "marcos", cap: 1 }],
  },
  {
    id: "galilea",
    nombre: "Galilea",
    desc: "La región verde del norte, de aldeas y caminos. El escenario de la predicación de Jesús.",
    pos: [0.1, -2.35],
    historias: [
      { ref: "Marcos 1:14-15", titulo: "«El reino de Dios se ha acercado»", libro: "marcos", cap: 1 },
      { ref: "Marcos 1:39", titulo: "Predicando por toda Galilea", libro: "marcos", cap: 1 },
    ],
  },
  {
    id: "mar-galilea",
    nombre: "Mar de Galilea",
    desc: "El lago de agua dulce donde trabajaban los pescadores. Aquí sonó el «Venid en pos de mí».",
    pos: [0.95, -2.25],
    historias: [{ ref: "Marcos 1:16-20", titulo: "El llamado de los cuatro pescadores", libro: "marcos", cap: 1 }],
  },
  {
    id: "capernaum",
    nombre: "Capernaúm",
    desc: "El pueblo pesquero que se volvió la base de Jesús. La sinagoga y la casa de Simón.",
    pos: [0.62, -2.62],
    historias: [
      { ref: "Marcos 1:21-28", titulo: "Autoridad en la sinagoga", libro: "marcos", cap: 1 },
      { ref: "Marcos 1:29-34", titulo: "La casa de Simón y el atardecer de sanidades", libro: "marcos", cap: 1 },
      { ref: "Marcos 1:35-39", titulo: "La madrugada de oración", libro: "marcos", cap: 1 },
    ],
  },
  {
    id: "nazaret",
    nombre: "Nazaret",
    desc: "La aldea de las colinas de Galilea donde Jesús creció.",
    pos: [0.18, -1.95],
    historias: [{ ref: "Marcos 1:9", titulo: "«Jesús vino de Nazaret de Galilea»", libro: "marcos", cap: 1 }],
  },
  {
    id: "jerusalen",
    nombre: "Jerusalén",
    desc: "La ciudad del templo, en las colinas de Judea. El corazón de la historia.",
    pos: [0.68, 1.3],
    historias: [{ ref: "Marcos 1:5", titulo: "«Todos los de Jerusalén» salían al Jordán", libro: "marcos", cap: 1 }],
  },
  {
    id: "mar-muerto",
    nombre: "Mar Muerto",
    desc: "El punto más bajo de la tierra: agua tan salada que nada vive en ella.",
    pos: [1.25, 1.35],
    historias: [],
  },
];

export function lugar(id: string) {
  return LUGARES.find((l) => l.id === id);
}
