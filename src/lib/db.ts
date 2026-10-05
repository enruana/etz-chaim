import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

let _db: Database.Database | null = null;

// Singleton perezoso: `next build` no debe crear la base.
export function getDb(): Database.Database {
  if (_db) return _db;
  const file = process.env.DB_PATH || path.join(process.cwd(), "data", "etz-chaim.db");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  _db = new Database(file);
  _db.pragma("journal_mode = WAL");
  _db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      book TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'completado',
      updated_at TEXT NOT NULL,
      PRIMARY KEY (book, chapter)
    );
    CREATE TABLE IF NOT EXISTS unit_progress (
      book TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      unit TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (book, chapter, unit)
    );
    CREATE TABLE IF NOT EXISTS srs_items (
      id TEXT PRIMARY KEY,
      due TEXT NOT NULL,
      stability REAL NOT NULL DEFAULT 0,
      difficulty REAL NOT NULL DEFAULT 0,
      reps INTEGER NOT NULL DEFAULT 0,
      lapses INTEGER NOT NULL DEFAULT 0,
      state TEXT NOT NULL DEFAULT 'new',
      last_review TEXT
    );
    CREATE TABLE IF NOT EXISTS srs_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id TEXT NOT NULL,
      rating INTEGER NOT NULL,
      reviewed_at TEXT NOT NULL
    );
  `);
  return _db;
}

export type ProgressRow = { book: string; chapter: number; status: string; updated_at: string };

export function getProgress(): ProgressRow[] {
  return getDb().prepare("SELECT * FROM progress").all() as ProgressRow[];
}

export function marcarCapitulo(book: string, chapter: number) {
  getDb()
    .prepare(
      "INSERT INTO progress (book, chapter, status, updated_at) VALUES (?, ?, 'completado', ?) ON CONFLICT(book, chapter) DO UPDATE SET status='completado', updated_at=excluded.updated_at",
    )
    .run(book, chapter, new Date().toISOString());
}

export function desmarcarCapitulo(book: string, chapter: number) {
  getDb().prepare("DELETE FROM progress WHERE book = ? AND chapter = ?").run(book, chapter);
}

// ——— Progreso por parte (libro / capítulo / parte) ———
// La tabla `progress` (por capítulo) se mantiene sincronizada: un capítulo está
// completo cuando todas sus partes están leídas. Ver src/lib/avance.ts.

export function capituloCompleto(book: string, chapter: number): boolean {
  return !!getDb().prepare("SELECT 1 FROM progress WHERE book = ? AND chapter = ?").get(book, chapter);
}

export function partesLeidas(book: string, chapter: number): Set<string> {
  const rows = getDb()
    .prepare("SELECT unit FROM unit_progress WHERE book = ? AND chapter = ?")
    .all(book, chapter) as { unit: string }[];
  return new Set(rows.map((r) => r.unit));
}

export function marcarPartes(book: string, chapter: number, units: string[]) {
  const db = getDb();
  const ins = db.prepare(
    "INSERT OR IGNORE INTO unit_progress (book, chapter, unit, updated_at) VALUES (?, ?, ?, ?)",
  );
  const now = new Date().toISOString();
  db.transaction(() => {
    for (const u of units) ins.run(book, chapter, u, now);
  })();
}

export function desmarcarParte(book: string, chapter: number, unit: string) {
  getDb().prepare("DELETE FROM unit_progress WHERE book = ? AND chapter = ? AND unit = ?").run(book, chapter, unit);
}

export function desmarcarPartes(book: string, chapter: number) {
  getDb().prepare("DELETE FROM unit_progress WHERE book = ? AND chapter = ?").run(book, chapter);
}
