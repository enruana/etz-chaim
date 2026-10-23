import fs from "node:fs";
import path from "node:path";
import { CANON, libro as getLibro, type Libro } from "./canon";
import { dos } from "./estela";

// El arco redentor: la Biblia como una sola historia, en diez eras
// (content/plan-de-estudio.md, «Las 10 eras»). Es el orden en que pasó,
// frente a las siete fases del plan, que son el orden en que se estudia.
// Los textos de cada era viven en content/arco/NN-<slug>.md.

export type Era = {
  n: number;
  slug: string;
  nombre: string;
  periodo: string; // fechas aproximadas, para el rótulo
  entrada: string; // una línea
};

export const ERAS: Era[] = [
  { n: 1, slug: "creacion-y-caida", nombre: "Creación y caída", periodo: "Los orígenes", entrada: "Un mundo bueno, una grieta y la primera promesa" },
  { n: 2, slug: "patriarcas", nombre: "Patriarcas", periodo: "c. 2000–1700 a.C.", entrada: "Una familia elegida para bendecir a todas" },
  { n: 3, slug: "exodo-y-ley", nombre: "Éxodo y ley", periodo: "Siglos XV–XIII a.C.", entrada: "Un pueblo rescatado que aprende a vivir con Dios" },
  { n: 4, slug: "conquista-y-jueces", nombre: "Conquista y jueces", periodo: "c. 1400–1050 a.C.", entrada: "La tierra prometida y el ciclo del olvido" },
  { n: 5, slug: "reino-unido", nombre: "Reino unido", periodo: "c. 1050–931 a.C.", entrada: "Un rey conforme al corazón de Dios y un trono para siempre" },
  { n: 6, slug: "reino-dividido", nombre: "Reino dividido", periodo: "931–586 a.C.", entrada: "Dos reinos, muchos profetas y una paciencia larga" },
  { n: 7, slug: "exilio", nombre: "Exilio", periodo: "586–538 a.C.", entrada: "Lejos de casa, y Dios sigue hablando" },
  { n: 8, slug: "retorno", nombre: "Retorno", periodo: "538–c. 430 a.C.", entrada: "De vuelta a Jerusalén, esperando algo más grande" },
  { n: 9, slug: "jesus-y-la-iglesia", nombre: "Jesús y la iglesia", periodo: "c. 5 a.C.–95 d.C.", entrada: "Dios mismo entra en la historia" },
  { n: 10, slug: "consumacion", nombre: "Consumación", periodo: "Lo que viene", entrada: "Todo lo prometido, cumplido" },
];

export function era(n: number): Era | undefined {
  return ERAS.find((e) => e.n === n);
}

// Qué libros caen en cada era. Un libro que cruza de una era a otra se parte
// por capítulo: Génesis 1–11 / 12–50; 1 Reyes 1–11 / 12–22; 2 Reyes 1–24 / 25.
type Tramo = { libro: string; desde?: number; hasta?: number };
const T = (...libros: string[]): Tramo[] => libros.map((libro) => ({ libro }));

const TRAMOS: Record<number, Tramo[]> = {
  1: [{ libro: "genesis", hasta: 11 }],
  2: [{ libro: "genesis", desde: 12 }, { libro: "job" }],
  3: T("exodo", "levitico", "numeros", "deuteronomio"),
  4: T("josue", "jueces", "rut"),
  5: [...T("1-samuel", "2-samuel"), { libro: "1-reyes", hasta: 11 }, ...T("salmos", "proverbios", "eclesiastes", "cantares")],
  6: [
    { libro: "1-reyes", desde: 12 },
    { libro: "2-reyes", hasta: 24 },
    ...T("jonas", "amos", "oseas", "miqueas", "isaias", "sofonias", "nahum", "habacuc", "joel", "jeremias", "abdias"),
  ],
  7: [{ libro: "2-reyes", desde: 25 }, ...T("lamentaciones", "ezequiel", "daniel")],
  8: T("esdras", "nehemias", "ester", "hageo", "zacarias", "malaquias", "1-cronicas", "2-cronicas"),
  9: T(
    "marcos", "juan", "hechos", "santiago", "filipenses", "1-juan", "romanos",
    "mateo", "lucas", "1-corintios", "2-corintios", "galatas", "efesios", "colosenses",
    "1-tesalonicenses", "2-tesalonicenses", "filemon", "1-timoteo", "2-timoteo", "tito",
    "hebreos", "1-pedro", "2-pedro", "judas", "2-juan", "3-juan",
  ),
  10: T("apocalipsis"),
};

export type Segmento = { libro: Libro; desde: number; hasta: number; parcial: boolean };

// Los libros (o tramos de libro) de una era, en el orden del plan.
export function segmentosDeEra(n: number): Segmento[] {
  return (TRAMOS[n] ?? []).flatMap((t) => {
    const l = getLibro(t.libro);
    if (!l) return [];
    const desde = t.desde ?? 1;
    const hasta = t.hasta ?? l.caps;
    return [{ libro: l, desde, hasta, parcial: desde !== 1 || hasta !== l.caps }];
  });
}

export function capsDeEra(n: number): number {
  return segmentosDeEra(n).reduce((s, g) => s + (g.hasta - g.desde + 1), 0);
}

export function hechosDeEra(n: number, completo: (libro: string, cap: number) => boolean): number {
  let k = 0;
  for (const g of segmentosDeEra(n)) for (let c = g.desde; c <= g.hasta; c++) if (completo(g.libro.slug, c)) k++;
  return k;
}

export function erasDeLibro(slug: string): number[] {
  return ERAS.filter((e) => TRAMOS[e.n].some((t) => t.libro === slug)).map((e) => e.n);
}

export function eraDeCapitulo(slug: string, cap: number): number {
  for (const e of ERAS) {
    for (const t of TRAMOS[e.n]) {
      if (t.libro === slug && cap >= (t.desde ?? 1) && cap <= (t.hasta ?? Infinity)) return e.n;
    }
  }
  return erasDeLibro(slug)[0] ?? 1;
}

export function erasDeFase(fase: number): number[] {
  const eras = new Set<number>();
  for (const l of CANON) if (l.fase === fase) for (const e of erasDeLibro(l.slug)) eras.add(e);
  return [...eras].sort((a, b) => a - b);
}

// "Era 09" · "Eras 06–08" · "Eras 05, 07"
export function rotuloEras(eras: number[]): string {
  if (eras.length === 0) return "";
  if (eras.length === 1) return `Era ${dos(eras[0])}`;
  const seguidas = eras.every((e, i) => i === 0 || e === eras[i - 1] + 1);
  return seguidas ? `Eras ${dos(eras[0])}–${dos(eras[eras.length - 1])}` : `Eras ${eras.map(dos).join(", ")}`;
}

const DIR = path.join(process.cwd(), "content", "arco");

function leer(nombre: string): string {
  const f = path.join(DIR, nombre);
  return fs.existsSync(f) ? fs.readFileSync(f, "utf-8") : "";
}

export function textoIntro(): string {
  return leer("00-introduccion.md");
}

export function textoEra(n: number): string {
  const e = era(n);
  return e ? leer(`${dos(n)}-${e.slug}.md`) : "";
}
