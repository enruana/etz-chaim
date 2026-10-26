import Link from "next/link";
import { notFound } from "next/navigation";
import { ERAS, capsDeEra, era as getEra, eraDeCapitulo, hechosDeEra, segmentosDeEra, textoEra } from "@/lib/arco";
import { resumenProgreso } from "@/lib/progreso";
import { clave, foliosDeEra, NOMBRE_TIPO } from "@/lib/ramas";
import { foliosLeidos } from "@/lib/db";
import { html } from "@/lib/studies";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";

export const dynamic = "force-dynamic";

// Una era del arco redentor: su texto guiado y los libros que caen en ella.
export default async function EraPage({ params }: { params: Promise<{ era: string }> }) {
  const { era: s } = await params;
  const n = /^\d+$/.test(s) ? parseInt(s, 10) : NaN;
  const e = getEra(n);
  if (!e) notFound();

  const p = resumenProgreso();
  const actual = eraDeCapitulo(p.actual.libro, p.actual.cap);
  const segmentos = segmentosDeEra(n);
  const caps = capsDeEra(n);
  const hechos = hechosDeEra(n, p.estaCompleto);
  const anterior = getEra(n - 1);
  const siguiente = getEra(n + 1);
  const nombre = e.nombre.toUpperCase();
  const num = dos(n);
  const completa = (x: number) => hechosDeEra(x, p.estaCompleto) >= capsDeEra(x);
  const folios = foliosDeEra(n);
  const leidos = folios.length > 0 ? foliosLeidos() : new Set<string>();

  return (
    <main className="pagina pagina-lectura">
      <section className="losa">
        <div className="mono flex items-center justify-between pl-1.5 pr-[18px] pt-2">
          <Link href="/mapa/arco" className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← El arco
          </Link>
          <span>{num}/10</span>
        </div>
        <ol className="indice-losa mono hidden lg:block">
          {ERAS.map((x) => (
            <li key={x.n}>
              <Link
                href={`/mapa/arco/${x.n}`}
                className={x.n === n ? "aqui" : undefined}
                aria-current={x.n === n ? "page" : undefined}
              >
                <span className={`marca${completa(x.n) ? " on" : ""}`} />
                <span>
                  {dos(x.n)} {x.nombre}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <h1 className="display incisa pad-talla losa-pie pt-1" style={{ marginBottom: "-0.04em" }}>
          <span className="gigante block lg:hidden" style={talla(Math.min(k(nombre), 40))}>
            {nombre}
          </span>
          <span className="gigante hidden lg:block" style={talla(Math.min(k(nombre), 40))}>
            {nombre}
          </span>
          <span className="gigante hidden lg:block" style={{ ...talla(k(num, 88)), marginTop: "0.03em", marginBottom: "-0.16em" }}>
            {num}
          </span>
        </h1>
      </section>

      <div className="cuerpo">
        <div className="lectura">
          <section className="pad pt-5 lg:pt-9">
            <p className="serif m-0 italic" style={{ fontSize: "1.4375rem", lineHeight: 1.2 }}>
              {e.entrada}
            </p>
            <p className="mono gris m-0 mt-2">
              Era {num} de 10 · {e.periodo} · {caps} capítulos
              {hechos > 0 ? ` · ${dos(hechos)} estudiados` : ""}
            </p>
            {n === actual && (
              <p className="m-0 mt-3">
                <span className="sello mono">Estás aquí</span>
              </p>
            )}
          </section>

          <article className="estudio pad py-5 lg:py-8" dangerouslySetInnerHTML={{ __html: html(textoEra(n)) }} />
        </div>

        <section>
          <p className="grupo-cab mono m-0 flex justify-between">
            <span>Libros de esta era</span>
            <span>{dos(segmentos.length)}</span>
          </p>
          <div className="rejilla-libros">
            {segmentos.map((g) => {
              const total = g.hasta - g.desde + 1;
              let done = 0;
              for (let c = g.desde; c <= g.hasta; c++) if (p.estaCompleto(g.libro.slug, c)) done++;
              const completo = done >= total;
              const activo = p.actual.libro === g.libro.slug && p.actual.cap >= g.desde && p.actual.cap <= g.hasta;
              return (
                <Link
                  key={`${g.libro.slug}-${g.desde}`}
                  href={`/estudiar/${g.libro.slug}/${activo ? p.actual.cap : g.desde}`}
                  className={`celda${completo ? " completa" : activo ? " activa" : ""}`}
                  style={{ minHeight: 72, padding: "12px 18px" }}
                >
                  <span className="celda-titulo" style={{ fontSize: "1.375rem" }}>
                    {g.libro.nombre}
                    {g.parcial ? ` ${g.desde}–${g.hasta}` : ""}
                  </span>
                  <span className={`mono${activo ? "" : " gris"}`}>
                    Fase {romano(g.libro.fase)} · {dos(done)}/{dos(total)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {folios.length > 0 && (
          <section>
            <Link href="/ramas" className="grupo-cab mono flex justify-between gap-3" style={{ textDecoration: "none" }}>
              <span>Por las ramas · historia de esta era</span>
              <span className="shrink-0">{dos(folios.length)}</span>
            </Link>
            {folios.map((f) => {
              const leido = leidos.has(clave(f));
              return (
                <Link key={clave(f)} href={`/ramas/${f.rama}/${f.slug}`} className="fila apilada">
                  <span>
                    <span className="fila-titulo">{f.titulo}</span>
                    <span className="mono gris">{NOMBRE_TIPO[f.tipo]} · Folio {dos(f.n)}</span>
                  </span>
                  <span className={`marca${leido ? " on" : ""}`} aria-label={leido ? "Leído" : "Pendiente"} />
                </Link>
              );
            })}
          </section>
        )}

        {siguiente ? (
          <Link href={`/mapa/arco/${siguiente.n}`} className="bloque bloque-tinta">
            <span>
              Seguir · {dos(siguiente.n)} {siguiente.nombre}
            </span>
            <span>→</span>
          </Link>
        ) : (
          <Link href="/mapa" className="bloque bloque-tinta">
            <span>Volver al mapa</span>
            <span>→</span>
          </Link>
        )}

        <nav className="rejilla mono">
          {anterior ? (
            <Link href={`/mapa/arco/${anterior.n}`} className="flex min-h-[52px] items-center px-[18px]" style={{ textDecoration: "none" }}>
              ← {dos(anterior.n)} {anterior.nombre}
            </Link>
          ) : (
            <Link href="/mapa/arco" className="flex min-h-[52px] items-center px-[18px]" style={{ textDecoration: "none" }}>
              ← Introducción
            </Link>
          )}
          {siguiente ? (
            <Link href={`/mapa/arco/${siguiente.n}`} className="flex min-h-[52px] items-center justify-end px-[18px]" style={{ textDecoration: "none" }}>
              {dos(siguiente.n)} {siguiente.nombre} →
            </Link>
          ) : (
            <span className="min-h-[52px]" />
          )}
        </nav>
      </div>
    </main>
  );
}
