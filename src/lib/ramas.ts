import fs from "node:fs";
import path from "node:path";
import { CANON, libro as getLibro } from "./canon";
import { html } from "./studies";

// Las ramas: historia alrededor de la Biblia, para leer sin Biblia a la mano.
// Hay dos clases de rama con el mismo formato (00-rama.md + NN-<slug>.md):
//  - las transversales, en content/ramas/<rama>/ (canon, manuscritos,
//    imperios…), que se leen en /ramas;
//  - la de cada libro, «Alrededor de <Libro>», en
//    content/estudios/<libro>/alrededor/, que vive en la página del libro.
// 00-rama.md presenta el tema y lista lo que falta por investigar; cada folio
// lleva frontmatter que lo ata a capítulos, eras, lugares y personas.
// Ver content/metodologia.md, «Las ramas».

const ROOT = path.join(process.cwd(), "content", "ramas");
const ESTUDIOS = path.join(process.cwd(), "content", "estudios");
const PREFIJO = "alrededor-de-"; // slug de la rama de un libro: alrededor-de-<libro>

export type TipoFolio = "contexto" | "arqueologia" | "cuadra" | "dificil" | "manuscritos" | "curiosidades";

export const NOMBRE_TIPO: Record<TipoFolio, string> = {
  contexto: "Contexto",
  arqueologia: "Arqueología",
  cuadra: "Lo que cuadra",
  dificil: "Lo difícil",
  manuscritos: "Manuscritos",
  curiosidades: "Curiosidades",
};

export type Fuente = { titulo: string; postura?: string; url?: string };

// A qué capítulo se ata un folio: "marcos 6" → cap 6; "marcos" → todo el libro.
export type Ancla = { libro: string; cap: number | null };

export type Folio = {
  rama: string; // slug de la rama
  libro: string | null; // si la rama es la de un libro
  slug: string;
  n: number; // orden dentro de la rama (prefijo NN del archivo)
  rotulo: string; // lo que se talla en la losa: una o dos palabras
  titulo: string;
  entrada: string; // una línea, debajo del título
  tipo: TipoFolio;
  capitulos: Ancla[];
  eras: number[];
  lugares: string[];
  personas: string[];
  fecha: string; // "2026-10": al corte de qué mes se escribió
  fuentes: Fuente[];
  md: string;
};

export type Rama = {
  slug: string;
  libro: string | null;
  orden: number;
  titulo: string;
  entrada: string;
  nota: string; // presentación de la rama (cuerpo de 00-rama.md)
  pendientes: string[]; // folios por investigar, en orden
  folios: Folio[];
};

type Item = string | Record<string, string>;
type Valor = string | Item[];

// Frontmatter: `clave: "texto"`, `clave: [a, "b c"]` o listas en bloque
// (`- "texto"`, o `- clave: "texto"` con más claves indentadas debajo).
function frontmatter(raw: string): { data: Record<string, Valor>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, Valor> = {};
  const limpiar = (s: string) => s.trim().replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
  let lista: Item[] | null = null;
  for (const line of m[1].split("\n")) {
    let kv = line.match(/^(\w+):\s*"(.*)"\s*$/);
    if (kv) {
      data[kv[1]] = kv[2].replace(/\\"/g, '"');
      lista = null;
      continue;
    }
    kv = line.match(/^(\w+):\s*\[(.*)\]\s*$/);
    if (kv) {
      data[kv[1]] = kv[2].split(",").map(limpiar).filter(Boolean);
      lista = null;
      continue;
    }
    kv = line.match(/^(\w+):\s*$/);
    if (kv) {
      lista = [];
      data[kv[1]] = lista;
      continue;
    }
    if (!lista) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item) {
      const obj = item[1].match(/^(\w+):\s*"(.*)"\s*$/);
      lista.push(obj ? { [obj[1]]: obj[2] } : limpiar(item[1]));
      continue;
    }
    const prop = line.match(/^\s+(\w+):\s*"(.*)"\s*$/);
    const ultimo = lista[lista.length - 1];
    if (prop && ultimo && typeof ultimo === "object") ultimo[prop[1]] = prop[2];
  }
  return { data, body: m[2] };
}

const texto = (d: Record<string, Valor>, k: string, def = "") => (typeof d[k] === "string" ? (d[k] as string) : def);
const cadenas = (d: Record<string, Valor>, k: string) =>
  Array.isArray(d[k]) ? (d[k] as Item[]).filter((x): x is string => typeof x === "string") : [];
const objetos = (d: Record<string, Valor>, k: string) =>
  Array.isArray(d[k]) ? (d[k] as Item[]).filter((x): x is Record<string, string> => typeof x === "object") : [];

function ancla(s: string): Ancla | null {
  const m = s.trim().match(/^([a-z0-9-]+)(?:\s+(\d+))?$/);
  if (!m || !getLibro(m[1])) return null;
  return { libro: m[1], cap: m[2] ? parseInt(m[2], 10) : null };
}

function leerFolio(dir: string, rama: string, libro: string | null, file: string): Folio | null {
  const m = file.match(/^(\d{2})-(.+)\.md$/);
  if (!m) return null;
  const { data, body } = frontmatter(fs.readFileSync(path.join(dir, file), "utf-8"));
  const titulo = texto(data, "titulo");
  const tipo = texto(data, "tipo") as TipoFolio;
  return {
    rama,
    libro,
    slug: m[2],
    n: parseInt(m[1], 10),
    rotulo: texto(data, "rotulo") || titulo.split(/\s+/).slice(0, 2).join(" "),
    titulo,
    entrada: texto(data, "entrada"),
    tipo: tipo in NOMBRE_TIPO ? tipo : "contexto",
    capitulos: cadenas(data, "capitulos").map(ancla).filter((a): a is Ancla => !!a),
    eras: cadenas(data, "eras").map((x) => parseInt(x, 10)).filter((x) => Number.isInteger(x)),
    lugares: cadenas(data, "lugares"),
    personas: cadenas(data, "personas"),
    fecha: texto(data, "fecha"),
    fuentes: objetos(data, "fuentes").filter((f) => f.titulo) as Fuente[],
    md: body.trim(),
  };
}

function leerRama(dir: string, slug: string, libro: string | null): Rama | null {
  const cab = path.join(dir, "00-rama.md");
  if (!fs.existsSync(cab)) return null;
  const { data, body } = frontmatter(fs.readFileSync(cab, "utf-8"));
  const folios = fs
    .readdirSync(dir)
    .filter((f) => /^\d{2}-.+\.md$/.test(f) && f !== "00-rama.md")
    .sort()
    .map((f) => leerFolio(dir, slug, libro, f))
    .filter((f): f is Folio => !!f);
  return {
    slug,
    libro,
    orden: parseInt(texto(data, "orden", "99"), 10),
    titulo: texto(data, "titulo"),
    entrada: texto(data, "entrada"),
    nota: body.trim(),
    pendientes: cadenas(data, "pendientes"),
    folios,
  };
}

// Las ramas transversales, en orden.
export function ramas(): Rama[] {
  if (!fs.existsSync(ROOT)) return [];
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => leerRama(path.join(ROOT, e.name), e.name, null))
    .filter((r): r is Rama => !!r)
    .sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, "es"));
}

// «Alrededor de <Libro>»: la rama propia de un libro, si ya tiene carpeta.
export function ramaDeLibro(slug: string): Rama | null {
  const l = getLibro(slug);
  if (!l) return null;
  const r = leerRama(path.join(ESTUDIOS, slug, "alrededor"), PREFIJO + slug, slug);
  if (r && !r.titulo) r.titulo = `Alrededor de ${l.nombre}`;
  return r;
}

export function ramasDeLibros(): Rama[] {
  return CANON.map((l) => ramaDeLibro(l.slug)).filter((r): r is Rama => !!r);
}

// Cualquier rama por su slug: transversal, o alrededor-de-<libro>.
export function rama(slug: string): Rama | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  if (slug.startsWith(PREFIJO)) return ramaDeLibro(slug.slice(PREFIJO.length)) ?? undefined;
  return leerRama(path.join(ROOT, slug), slug, null) ?? undefined;
}

export function todosLosFolios(): Folio[] {
  return [...ramas(), ...ramasDeLibros()].flatMap((r) => r.folios);
}

// Clave de un folio en la tabla de leídos: "<rama>/<folio>".
export function clave(f: Folio): string {
  return `${f.rama}/${f.slug}`;
}

export function hrefRama(r: { slug: string; libro: string | null }): string {
  return r.libro ? `/estudiar/${r.libro}` : `/ramas/${r.slug}`;
}

export function hrefFolio(f: Folio): string {
  return f.libro ? `/estudiar/${f.libro}/alrededor/${f.slug}` : `/ramas/${f.rama}/${f.slug}`;
}

function ancladoA(f: Folio, libro: string, cap: number): boolean {
  return f.capitulos.some((a) => a.libro === libro && (a.cap === null || a.cap === cap));
}

// Folios de «Alrededor de <Libro>» que hablan de un capítulo (o de todo el libro).
export function foliosDelLibroEnCapitulo(libro: string, cap: number): Folio[] {
  return (ramaDeLibro(libro)?.folios ?? []).filter((f) => ancladoA(f, libro, cap));
}

// Folios de las ramas transversales que hablan de un capítulo (o de su libro).
export function foliosTransversalesDeCapitulo(libro: string, cap: number): Folio[] {
  return ramas()
    .flatMap((r) => r.folios)
    .filter((f) => ancladoA(f, libro, cap));
}

export function foliosDeEra(n: number): Folio[] {
  return todosLosFolios().filter((f) => f.eras.includes(n));
}

// El folio transversal que sigue: el primero sin leer de una rama ya empezada;
// si no hay ninguna a medias, el primero sin leer de todas.
export function siguienteFolio(leidos: Set<string>): Folio | null {
  const todas = ramas();
  for (const r of todas) {
    const pendiente = r.folios.find((f) => !leidos.has(clave(f)));
    if (pendiente && r.folios.some((f) => leidos.has(clave(f)))) return pendiente;
  }
  for (const r of todas) {
    const pendiente = r.folios.find((f) => !leidos.has(clave(f)));
    if (pendiente) return pendiente;
  }
  return null;
}

// "Marcos 1, 6 · Juan 1" o "Marcos" si el folio es de todo el libro.
export function rotuloAnclas(f: Folio): string {
  const porLibro = new Map<string, number[]>();
  for (const a of f.capitulos) {
    const caps = porLibro.get(a.libro) ?? [];
    if (a.cap !== null) caps.push(a.cap);
    porLibro.set(a.libro, caps);
  }
  return [...porLibro.entries()]
    .map(([slug, caps]) => `${getLibro(slug)?.nombre ?? slug}${caps.length ? " " + caps.join(", ") : ""}`)
    .join(" · ");
}

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// "2026-10" → "octubre de 2026"
export function fechaLarga(f: string): string {
  const m = f.match(/^(\d{4})-(\d{2})$/);
  if (!m) return f;
  return `${MESES[parseInt(m[2], 10) - 1] ?? m[2]} de ${m[1]}`;
}

// Un folio «difícil» pone las posturas lado a lado:
//   ::: posturas
//   ### Católica
//   …
//   ### Protestante
//   …
//   :::
// Cada «### Nombre» es una postura; se compone como <section class="postura">.
export function htmlFolio(md: string): string {
  const bloques: string[] = [];
  const conMarcas = md.replace(/^::: posturas\n([\s\S]*?)\n:::\s*$/gm, (_, cuerpo: string) => {
    const partes = cuerpo.split(/^### +(.+)$/m).slice(1);
    let out = '<div class="posturas">';
    for (let i = 0; i < partes.length; i += 2) {
      out += `<section class="postura"><h4>${partes[i].trim()}</h4>${html(partes[i + 1] ?? "")}</section>`;
    }
    out += "</div>";
    bloques.push(out);
    return `\u0002${bloques.length - 1}\u0002`;
  });
  return html(conMarcas).replace(/(?:<p>)?\u0002(\d+)\u0002(?:<\/p>)?/g, (_, i) => bloques[parseInt(i, 10)]);
}
