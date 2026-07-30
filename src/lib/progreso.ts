import { CANON, TOTAL_CAPS } from "./canon";
import { getProgress } from "./db";

export function resumenProgreso() {
  const rows = getProgress();
  const done = new Set(rows.map((r) => `${r.book}:${r.chapter}`));

  let actual: { libro: string; cap: number } | null = null;
  for (const l of CANON) {
    for (let c = 1; c <= l.caps; c++) {
      if (!done.has(`${l.slug}:${c}`)) {
        actual = { libro: l.slug, cap: c };
        break;
      }
    }
    if (actual) break;
  }

  const porLibro = new Map<string, number>();
  for (const r of rows) porLibro.set(r.book, (porLibro.get(r.book) ?? 0) + 1);

  return {
    completados: done.size,
    total: TOTAL_CAPS,
    actual: actual ?? { libro: "apocalipsis", cap: 22 },
    porLibro,
    estaCompleto: (libro: string, cap: number) => done.has(`${libro}:${cap}`),
  };
}
