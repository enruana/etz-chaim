import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Cada capítulo es una carpeta (content/estudios/<libro>/<NN>/) con un archivo
// por parte, en orden: 00-portada, 01-contexto, las escenas por rango de
// versículos, y las secciones de cierre. Cada archivo lleva frontmatter con
// slug, tipo, título y (en las escenas) los versículos que cubre.

const ROOT = path.join(process.cwd(), "content", "estudios");

export type TipoParte = "portada" | "contexto" | "escena" | "jesus" | "dificil" | "aplicacion" | "memoria" | "preguntas";

export type Parte = {
  slug: string;
  tipo: TipoParte;
  titulo: string;
  versos: string | null; // "7-12" o "1-2,30-31"
  md: string;
};

export type Capitulo = {
  lema: string;
  partes: Parte[];
  fuentesMd: string | null;
};

const NOMBRE: Record<TipoParte, string> = {
  portada: "Dónde estamos",
  contexto: "Contexto",
  escena: "",
  jesus: "Jesús en el capítulo",
  dificil: "Lo difícil",
  aplicacion: "¿Y ahora qué?",
  memoria: "Memoria",
  preguntas: "Preguntas",
};

function dir(libro: string, cap: number) {
  return path.join(ROOT, libro, String(cap).padStart(2, "0"));
}

function leer(file: string): { data: Record<string, string>; body: string } {
  const raw = fs.readFileSync(file, "utf-8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"(.*)"\s*$/);
    if (kv) data[kv[1]] = kv[2].replace(/\\"/g, '"');
  }
  return { data, body: m[2] };
}

export function hasStudy(libro: string, cap: number) {
  return fs.existsSync(dir(libro, cap));
}

export function getCapitulo(libro: string, cap: number): Capitulo | null {
  const d = dir(libro, cap);
  if (!fs.existsSync(d)) return null;
  let lema = "";
  let fuentesMd: string | null = null;
  const partes: Parte[] = [];
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".md")).sort()) {
    const { data, body } = leer(path.join(d, f));
    if (data.tipo === "fuentes") {
      fuentesMd = body;
      continue;
    }
    const tipo = data.tipo as TipoParte;
    if (tipo === "portada") lema = data.titulo ?? "";
    partes.push({
      slug: data.slug,
      tipo,
      titulo: tipo === "portada" ? data.entrada || "" : data.titulo ?? "",
      versos: data.versos ?? null,
      md: body,
    });
  }
  return { lema, partes, fuentesMd };
}

// "1-2,30-31" → [1, 2, 30, 31]
export function expandir(versos: string): number[] {
  const out: number[] = [];
  for (const tramo of versos.split(",")) {
    const [a, b] = tramo.split("-").map((x) => parseInt(x, 10));
    for (let v = a; v <= (b ?? a); v++) out.push(v);
  }
  return out;
}

export function partePorVersiculo(capitulo: Capitulo, versiculo: number): Parte | undefined {
  return capitulo.partes.find((p) => p.versos && expandir(p.versos).includes(versiculo));
}

// Rótulo corto de una parte: "3:7-12" para una escena, "Contexto" para una sección.
export function rotuloParte(parte: Parte, cap: number): string {
  if (parte.tipo === "escena" && parte.versos) return `${cap}:${parte.versos.replace(/,/g, ", ")}`;
  return NOMBRE[parte.tipo];
}

// Versión breve para botones: "21:5…" cuando la parte reúne versículos salteados.
export function rotuloCorto(parte: Parte, cap: number): string {
  if (parte.tipo === "escena" && parte.versos?.includes(",")) return `${cap}:${parte.versos.split(",")[0]}…`;
  return rotuloParte(parte, cap);
}

export function esTematica(parte: Parte): boolean {
  return parte.tipo === "escena" && !!parte.versos?.includes(",");
}

// Nombres genéricos de sección: no aportan nada como subtítulo.
const GENERICOS = new Set([
  ...Object.values(NOMBRE),
  "Lo que este capítulo dice de Jesús",
  "Hablemos de lo difícil",
]);

// Subtítulo: el título propio de la parte, si dice algo más que su rótulo.
export function subtituloParte(parte: Parte): string | null {
  if (!parte.titulo || GENERICOS.has(parte.titulo)) return null;
  return parte.titulo;
}

export function html(md: string): string {
  return sobrio(marked.parse(md, { gfm: true, async: false }) as string);
}

// La línea histórica no usa emojis: los documentos los conservan (son parte de la
// metodología), pero al componer la página la pausa 🌿 se vuelve un fleuron y el
// resto de pictogramas se retira.
function sobrio(h: string): string {
  return h
    .replace(/🌿/g, "\u0001")
    .replace(/\s?\p{Extended_Pictographic}️?/gu, "")
    .replace(/\u0001/g, "❦");
}
