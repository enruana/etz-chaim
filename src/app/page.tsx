import Link from "next/link";
import { libro, FASES } from "@/lib/canon";
import { resumenProgreso } from "@/lib/progreso";
import { syncItems, contarPendientes } from "@/lib/srs";
import { hasStudy } from "@/lib/studies";

export const dynamic = "force-dynamic";

function saludo() {
  const h = parseInt(
    new Intl.DateTimeFormat("es-CO", { hour: "numeric", hour12: false, timeZone: "America/Bogota" }).format(new Date()),
    10,
  );
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function Hoy() {
  syncItems();
  const p = resumenProgreso();
  const l = libro(p.actual.libro)!;
  const fase = FASES[l.fase];
  const pendientes = contarPendientes();
  const pct = Math.round((p.completados / p.total) * 1000) / 10;
  const listo = hasStudy(p.actual.libro, p.actual.cap);

  return (
    <main className="flex flex-col gap-5">
      <header className="pt-2">
        <p className="text-sm font-extrabold uppercase tracking-widest" style={{ color: "var(--ink-2)" }}>
          {saludo()}, Felipe
        </p>
        <h1 className="mt-1 text-4xl">Etz Chaim</h1>
        <p className="mt-1 max-w-md" style={{ color: "var(--ink-2)" }}>
          «Árbol de vida es a los que de ella echan mano» — Proverbios 3:18
        </p>
      </header>

      <Link href={`/estudiar/${l.slug}/${p.actual.cap}`} className="card lift block p-6" style={{ textDecoration: "none" }}>
        <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--ink-2)" }}>
          Estás estudiando · Fase {l.fase} — {fase.nombre}
        </p>
        <h2 className="mt-2 text-3xl">
          {l.nombre} {p.actual.cap}
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-2)" }}>
          {listo ? "El estudio está listo para ti — continúa donde ibas." : "Este capítulo aún está en investigación."}
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: "var(--track)" }}>
          <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 1)}%`, background: "var(--gold)" }} />
        </div>
        <p className="mt-2 text-xs font-bold" style={{ color: "var(--ink-2)" }}>
          {p.completados} de {p.total} capítulos · {pct}% del canon
        </p>
      </Link>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/memoria" className="card lift block p-5" style={{ textDecoration: "none" }}>
          <div
            className="mb-3 grid h-11 w-11 place-items-center rounded-2xl text-xl"
            style={{ background: "var(--green-soft)" }}
          >
            🌱
          </div>
          <h3 className="text-xl">Memoria</h3>
          <p className="text-sm" style={{ color: "var(--ink-2)" }}>
            {pendientes > 0
              ? `${pendientes} ${pendientes === 1 ? "repaso pendiente" : "repasos pendientes"}`
              : "Todo repasado por hoy 🎉"}
          </p>
        </Link>
        <Link href="/mapa" className="card lift block p-5" style={{ textDecoration: "none" }}>
          <div
            className="mb-3 grid h-11 w-11 place-items-center rounded-2xl text-xl"
            style={{ background: "var(--sky-soft)" }}
          >
            🗺️
          </div>
          <h3 className="text-xl">El mapa</h3>
          <p className="text-sm" style={{ color: "var(--ink-2)" }}>
            66 libros en 7 fases — y tu árbol creciendo
          </p>
        </Link>
      </div>
    </main>
  );
}
