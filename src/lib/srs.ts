import { getDb } from "./db";
import { EJERCICIOS, ejercicio, type Ejercicio } from "./ejercicios";
import { review, type Rating, type SrsState } from "./fsrs";

export type ItemRow = SrsState & { id: string; due: string };

// Sync idempotente: agrega al pool los ejercicios nuevos del catálogo; nunca toca el historial.
export function syncItems() {
  const db = getDb();
  const insert = db.prepare(
    "INSERT OR IGNORE INTO srs_items (id, due, stability, difficulty, reps, lapses, state) VALUES (?, ?, 0, 0, 0, 0, 'new')",
  );
  const now = new Date().toISOString();
  const tx = db.transaction(() => {
    for (const e of EJERCICIOS) insert.run(e.id, now);
  });
  tx();
}

export function itemsPendientes(limit = 30): { row: ItemRow; ejercicio: Ejercicio }[] {
  const db = getDb();
  const now = new Date().toISOString();
  const rows = db
    .prepare("SELECT * FROM srs_items WHERE due <= ? ORDER BY due ASC LIMIT ?")
    .all(now, limit) as ItemRow[];
  return rows
    .map((row) => ({ row, ejercicio: ejercicio(row.id)! }))
    .filter((x) => x.ejercicio);
}

export function contarPendientes(): number {
  const now = new Date().toISOString();
  const r = getDb().prepare("SELECT COUNT(*) AS n FROM srs_items WHERE due <= ?").get(now) as { n: number };
  return r.n;
}

export function calificar(id: string, rating: Rating) {
  const db = getDb();
  const prev = db.prepare("SELECT * FROM srs_items WHERE id = ?").get(id) as ItemRow | undefined;
  if (!prev) return;
  const next = review(prev, rating);
  db.prepare(
    "UPDATE srs_items SET due=?, stability=?, difficulty=?, reps=?, lapses=?, state=?, last_review=? WHERE id=?",
  ).run(next.due, next.stability, next.difficulty, next.reps, next.lapses, next.state, next.last_review, id);
  db.prepare("INSERT INTO srs_reviews (item_id, rating, reviewed_at) VALUES (?, ?, ?)").run(
    id,
    rating,
    new Date().toISOString(),
  );
}
