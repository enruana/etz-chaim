import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const ROOT = path.join(process.cwd(), "content", "estudios");

export function studyPath(libro: string, cap: number) {
  const nn = String(cap).padStart(2, "0");
  return path.join(ROOT, libro, `${libro}-${nn}.md`);
}

export function hasStudy(libro: string, cap: number) {
  return fs.existsSync(studyPath(libro, cap));
}

export function getStudyHtml(libro: string, cap: number): string | null {
  const p = studyPath(libro, cap);
  if (!fs.existsSync(p)) return null;
  const md = fs.readFileSync(p, "utf-8");
  const html = marked.parse(md, { gfm: true, async: false }) as string;
  return sobrio(html);
}

// La línea histórica no usa emojis: los documentos los conservan (son parte de la
// metodología), pero al componer la página la pausa 🌿 se vuelve un fleuron y el
// resto de pictogramas se retira.
function sobrio(html: string): string {
  return html
    .replace(/🌿/g, "\u0001")
    .replace(/\s?\p{Extended_Pictographic}\uFE0F?/gu, "")
    .replace(/\u0001/g, "❦");
}

export function capitulosConEstudio(libro: string): number[] {
  const dir = path.join(ROOT, libro);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .map((f) => f.match(new RegExp(`^${libro}-(\\d+)\\.md$`)))
    .filter(Boolean)
    .map((m) => parseInt(m![1], 10))
    .sort((a, b) => a - b);
}
