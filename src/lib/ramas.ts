import fs from "node:fs";
import path from "node:path";
import { libro as getLibro } from "./canon";
import { html } from "./studies";

// Las ramas: historia alrededor de la Biblia, para leer sin Biblia a la mano.
// Cada rama es un tema abierto (content/ramas/<rama>/) que crece folio a
// folio: 00-rama.md presenta el tema y lista lo que falta por investigar;
// cada NN-<slug>.md es un folio, con frontmatter que lo ata a capítulos,
// eras del arco, lugares y personas. Ver content/metodologia.md, «Las ramas».

const ROOT = path.join(process.cwd(), "content", "ramas");

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
  rama: string;
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

function leerFolio(rama: string, file: string): Folio | null {
  const m = file.match(/^(\d{2})-(.+)\.md$/);
  if (!m) return null;
  const { data, body } = frontmatter(fs.readFileSync(path.join(ROOT, rama, file), "utf-8"));
  const titulo = texto(data, "titulo");
  const tipo = texto(data, "tipo") as TipoFolio;
  return {
    rama,
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

function leerRama(slug: string): Rama | null {
  const d = path.join(ROOT, slug);
  const cab = path.join(d, "00-rama.md");
  if (!fs.existsSync(cab)) return null;
  const { data, body } = frontmatter(fs.readFileSync(cab, "utf-8"));
  const folios = fs
    .readdirSync(d)
    .filter((f) => /^\d{2}-.+\.md$/.test(f) && f !== "00-rama.md")
    .sort()
    .map((f) => leerFolio(slug, f))
    .filter((f): f is Folio => !!f);
  return {
    slug,
    orden: parseInt(texto(data, "orden", "99"), 10),
    titulo: texto(data, "titulo"),
    entrada: texto(data, "entrada"),
    nota: body.trim(),
    pendientes: cadenas(data, "pendientes"),
    folios,
  };
}

export function ramas(): Rama[] {
  if (!fs.existsSync(ROOT)) return [];
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => leerRama(e.name))
    .filter((r): r is Rama => !!r)
    .sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, "es"));
}

export function rama(slug: string): Rama | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  return leerRama(slug) ?? undefined;
}

export function folio(ramaSlug: string, slug: string): Folio | undefined {
  return rama(ramaSlug)?.folios.find((f) => f.slug === slug);
}

export function todosLosFolios(): Folio[] {
  return ramas().flatMap((r) => r.folios);
}

// Clave de un folio en la tabla de leídos: "<rama>/<folio>".
export function clave(f: Folio): string {
  return `${f.rama}/${f.slug}`;
}

// Folios que hablan de un capítulo (o de todo su libro).
export function foliosDeCapitulo(libro: string, cap: number): Folio[] {
  return todosLosFolios().filter((f) => f.capitulos.some((a) => a.libro === libro && (a.cap === null || a.cap === cap)));
}

export function foliosDeEra(n: number): Folio[] {
  return todosLosFolios().filter((f) => f.eras.includes(n));
}

// El folio que sigue: el primero sin leer de una rama ya empezada; si no hay
// ninguna a medias, el primero sin leer de todas.
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
