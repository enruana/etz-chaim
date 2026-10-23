import Link from "next/link";
import { ERAS, capsDeEra, eraDeCapitulo, hechosDeEra, textoIntro } from "@/lib/arco";
import { resumenProgreso } from "@/lib/progreso";
import { html } from "@/lib/studies";
import { dos, k, talla } from "@/lib/estela";

export const dynamic = "force-dynamic";

// La introducción al arco redentor: la Biblia como una sola historia, en diez eras.
export default function Arco() {
  const p = resumenProgreso();
  const actual = eraDeCapitulo(p.actual.libro, p.actual.cap);
  const primera = ERAS[0];

  return (
    <main className="pagina">
      <section className="losa">
        <div className="mono flex items-center justify-between px-1.5 pt-2">
          <Link href="/mapa" className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← Mapa
          </Link>
          <span className="px-3">10 eras</span>
        </div>
        <h1 className="display incisa pad-talla losa-pie pt-1" style={{ marginBottom: "-0.04em" }}>
          <span className="gigante block" style={talla(k("REDENTOR"))}>
            El arco
          </span>
          <span className="gigante block" style={talla(k("REDENTOR"))}>
            Redentor
          </span>
        </h1>
      </section>

      <div className="cuerpo">
        <section className="pad raya mono flex justify-between py-3">
          <span>Una historia · {p.total.toLocaleString("es-CO")} capítulos</span>
          <span>Estás en la era {dos(actual)}</span>
        </section>

        <div className="lectura">
          <article className="estudio pad py-5 lg:py-8" dangerouslySetInnerHTML={{ __html: html(textoIntro()) }} />
        </div>

        <section>
          <p className="grupo-cab mono m-0 flex justify-between">
            <span>Las diez eras</span>
            <span>En orden de la historia</span>
          </p>
          {ERAS.map((e) => {
            const caps = capsDeEra(e.n);
            const hechos = hechosDeEra(e.n, p.estaCompleto);
            const completa = hechos >= caps;
            const activa = e.n === actual;
            return (
              <Link
                key={e.n}
                href={`/mapa/arco/${e.n}`}
                className={`fila fila-era${completa ? " completa" : activa ? " activa" : ""}`}
              >
                <span className="mono">{dos(e.n)}</span>
                <span>
                  <span className="fila-rotulo block">{e.nombre}</span>
                  <span className={`mono${completa || activa ? "" : " gris"} mt-1 block`}>
                    {e.periodo} · {dos(hechos)}/{caps} caps
                  </span>
                </span>
                <span className="mono">→</span>
              </Link>
            );
          })}
        </section>

        <Link href={`/mapa/arco/${primera.n}`} className="bloque">
          <span>
            Empezar · {dos(primera.n)} {primera.nombre}
          </span>
          <span>→</span>
        </Link>
      </div>
    </main>
  );
}
