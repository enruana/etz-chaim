import Link from "next/link";
import { CANON, FASES } from "@/lib/canon";
import { resumenProgreso } from "@/lib/progreso";
import { romano } from "@/lib/romano";

export const dynamic = "force-dynamic";

export default function Mapa() {
  const p = resumenProgreso();
  const librosCompletos = CANON.filter((l) => (p.porLibro.get(l.slug) ?? 0) >= l.caps).length;
  const fases = [1, 2, 3, 4, 5, 6, 7];

  return (
    <main className="flex flex-col gap-3.5 sm:gap-6">
      <header>
        <p className="rotulo">
          {p.completados} de {p.total} capítulos · {librosCompletos} de 66 libros
        </p>
        <h1 className="mt-1 text-[1.7rem] sm:mt-1.5 sm:text-4xl">El mapa</h1>
      </header>

      {fases.map((f) => {
        const libros = CANON.filter((l) => l.fase === f);
        return (
          <section key={f} className="hoja p-4 sm:p-6">
            <p className="rotulo rotulo-rubrica">Fase {romano(f)}</p>
            <h2 className="mt-0.5 text-2xl sm:mt-1 sm:text-3xl">{FASES[f].nombre}</h2>
            <p className="nota mb-3 mt-0.5 sm:mb-4 sm:mt-1">{FASES[f].nota}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {libros.map((l) => {
                const done = p.porLibro.get(l.slug) ?? 0;
                const completo = done >= l.caps;
                const activo = p.actual.libro === l.slug;
                return (
                  <Link
                    key={l.slug}
                    href={`/estudiar/${l.slug}/${activo ? p.actual.cap : 1}`}
                    className="etiqueta etiqueta-rebajada"
                    style={
                      completo
                        ? { background: "var(--cardenillo-suave)", borderColor: "var(--cardenillo)" }
                        : activo
                          ? { background: "var(--ocre-suave)", borderColor: "var(--filete-fuerte)" }
                          : undefined
                    }
                  >
                    {completo ? "✓ " : ""}
                    {l.nombre}
                    <span className="ml-2" style={{ color: "var(--tinta-suave)", fontSize: "0.78rem", fontVariantNumeric: "tabular-nums" }}>
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
