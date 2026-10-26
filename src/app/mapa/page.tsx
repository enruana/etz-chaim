import Link from "next/link";
import { CANON, FASES } from "@/lib/canon";
import { ERAS, capsDeEra, eraDeCapitulo, erasDeFase, erasDeLibro, hechosDeEra, rotuloEras } from "@/lib/arco";
import { resumenProgreso } from "@/lib/progreso";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";

export const dynamic = "force-dynamic";

export default function Mapa() {
  const p = resumenProgreso();
  const librosCompletos = CANON.filter((l) => (p.porLibro.get(l.slug) ?? 0) >= l.caps).length;
  const eraActual = eraDeCapitulo(p.actual.libro, p.actual.cap);
  const fases = [1, 2, 3, 4, 5, 6, 7];

  return (
    <main className="pagina">
      <section className="losa">
        <div className="pad mono flex justify-between pt-5">
          <span>La Biblia / Mapa</span>
          <span>66 libros · 7 fases</span>
        </div>
        <h1 className="display incisa pad-talla losa-pie pt-3" style={{ marginBottom: "-0.04em" }}>
          <span className="gigante block lg:hidden" style={talla(k("EL MAPA"))}>
            El mapa
          </span>
          <span className="gigante hidden lg:block" style={talla(k("MAPA"))}>
            El
          </span>
          <span className="gigante hidden lg:block" style={talla(k("MAPA"))}>
            Mapa
          </span>
        </h1>
      </section>

      <div className="cuerpo">

      <section className="pad raya mono flex justify-between py-3">
        <span>
          {dos(p.completados)}/{p.total} capítulos
        </span>
        <span>
          {dos(librosCompletos)}/66 libros
        </span>
      </section>

      {/* La historia en orden: las diez eras del arco redentor. Las fases de
          abajo son el orden de estudio; cada una dice a qué eras pertenece. */}
      <section>
        <Link href="/mapa/arco" className="grupo-cab mono flex justify-between gap-3" style={{ textDecoration: "none" }}>
          <span>El arco redentor · la historia en 10 eras</span>
          <span>Leer →</span>
        </Link>
        <div className="rejilla-eras">
          {ERAS.map((e) => {
            const caps = capsDeEra(e.n);
            const hechos = hechosDeEra(e.n, p.estaCompleto);
            const completa = hechos >= caps;
            const activa = e.n === eraActual;
            return (
              <Link
                key={e.n}
                href={`/mapa/arco/${e.n}`}
                className={`era${completa ? " completa" : activa ? " activa" : ""}`}
                aria-label={`Era ${e.n}: ${e.nombre}`}
              >
                <span className="era-num">{dos(e.n)}</span>
                <span className={`era-nombre mono${completa || activa ? "" : " gris"}`}>{e.nombre}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {fases.map((f) => {
        const libros = CANON.filter((l) => l.fase === f);
        return (
          <section key={f}>
            <div className="grupo-cab mono flex justify-between gap-3">
              <span>
                Fase {romano(f)} · {FASES[f].nombre}
              </span>
              <span className="shrink-0">{rotuloEras(erasDeFase(f))}</span>
            </div>
            <p className="pad raya serif m-0 py-3" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
              {FASES[f].nota}
            </p>
            <div className="rejilla-libros">
              {libros.map((l) => {
                const done = p.porLibro.get(l.slug) ?? 0;
                const completo = done >= l.caps;
                const activo = p.actual.libro === l.slug;
                return (
                  <Link
                    key={l.slug}
                    href={`/estudiar/${l.slug}`}
                    className={`celda${completo ? " completa" : activo ? " activa" : ""}`}
                    style={{ minHeight: 72, padding: "12px 18px" }}
                  >
                    <span className="celda-titulo" style={{ fontSize: "1.375rem" }}>
                      {l.nombre}
                    </span>
                    <span className={`mono${activo ? "" : " gris"}`}>
                      {dos(done)}/{dos(l.caps)} · {rotuloEras(erasDeLibro(l.slug))}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
      </div>
    </main>
  );
}
