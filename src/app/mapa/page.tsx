import Link from "next/link";
import { CANON, FASES } from "@/lib/canon";
import { resumenProgreso } from "@/lib/progreso";

export const dynamic = "force-dynamic";

export default function Mapa() {
  const p = resumenProgreso();
  const librosCompletos = CANON.filter((l) => (p.porLibro.get(l.slug) ?? 0) >= l.caps).length;
  const fases = [1, 2, 3, 4, 5, 6, 7];

  return (
    <main className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl">El mapa</h1>
        <p className="text-sm" style={{ color: "var(--ink-2)" }}>
          {p.completados} de {p.total} capítulos · {librosCompletos} de 66 libros
        </p>
      </header>

      {fases.map((f) => {
        const libros = CANON.filter((l) => l.fase === f);
        return (
          <section key={f}>
            <h2 className="text-xl">
              <span style={{ color: "var(--gold)" }}>Fase {f} · </span>
              {FASES[f].nombre}
            </h2>
            <p className="mb-3 text-sm" style={{ color: "var(--ink-2)" }}>
              {FASES[f].nota}
            </p>
            <div className="flex flex-wrap gap-2">
              {libros.map((l) => {
                const done = p.porLibro.get(l.slug) ?? 0;
                const completo = done >= l.caps;
                const activo = p.actual.libro === l.slug;
                return (
                  <Link
                    key={l.slug}
                    href={`/estudiar/${l.slug}/${activo ? p.actual.cap : 1}`}
                    className="pill lift px-4 py-2 text-sm"
                    style={{
                      textDecoration: "none",
                      background: completo ? "var(--green-soft)" : activo ? "var(--gold-soft)" : "var(--surface)",
                      border: "1.5px solid var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    {completo ? "✓ " : ""}
                    {l.nombre}
                    <span className="ml-1.5 text-xs font-bold" style={{ color: "var(--ink-2)" }}>
                      {done}/{l.caps}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
