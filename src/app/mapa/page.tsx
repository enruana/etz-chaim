import Link from "next/link";
import { CANON, FASES } from "@/lib/canon";
import { resumenProgreso } from "@/lib/progreso";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";

export const dynamic = "force-dynamic";

export default function Mapa() {
  const p = resumenProgreso();
  const librosCompletos = CANON.filter((l) => (p.porLibro.get(l.slug) ?? 0) >= l.caps).length;
  const fases = [1, 2, 3, 4, 5, 6, 7];

  return (
    <main>
      <section className="losa">
        <div className="pad mono flex justify-between pt-5">
          <span>La Biblia / Mapa</span>
          <span>66 libros · 7 fases</span>
        </div>
        <h1 className="display incisa gigante px-4 pt-3" style={{ ...talla(k("EL MAPA")), marginBottom: "-0.04em" }}>
          El mapa
        </h1>
      </section>

      <section className="pad raya mono flex justify-between py-3">
        <span>
          {dos(p.completados)}/{p.total} capítulos
        </span>
        <span>
          {dos(librosCompletos)}/66 libros
        </span>
      </section>

      {fases.map((f) => {
        const libros = CANON.filter((l) => l.fase === f);
        return (
          <section key={f}>
            <div className="grupo-cab mono flex justify-between gap-3">
              <span>
                Fase {romano(f)} · {FASES[f].nombre}
              </span>
              <span>{dos(libros.length)}</span>
            </div>
            <p className="pad raya serif m-0 py-3" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
              {FASES[f].nota}
            </p>
            <div className="rejilla">
              {libros.map((l) => {
                const done = p.porLibro.get(l.slug) ?? 0;
                const completo = done >= l.caps;
                const activo = p.actual.libro === l.slug;
                return (
                  <Link
                    key={l.slug}
                    href={`/estudiar/${l.slug}/${activo ? p.actual.cap : 1}`}
                    className={`celda${completo ? " completa" : activo ? " activa" : ""}`}
                    style={{ minHeight: 72, padding: "12px 18px" }}
                  >
                    <span className="celda-titulo" style={{ fontSize: "1.375rem" }}>
                      {l.nombre}
                    </span>
                    <span className={`mono${activo ? "" : " gris"}`}>
                      {dos(done)}/{dos(l.caps)}
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
