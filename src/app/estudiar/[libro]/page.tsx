import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { erasDeLibro, rotuloEras } from "@/lib/arco";
import { clave, hrefFolio, ramaDeLibro } from "@/lib/ramas";
import { resumenProgreso } from "@/lib/progreso";
import { foliosLeidos } from "@/lib/db";
import { getLibroTexto, hasStudy, html } from "@/lib/studies";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";
import { FilasFolios, FilasPendientes } from "@/components/Folios";

export const dynamic = "force-dynamic";

// La página de un libro: dos vías en paralelo, cada una con su propio
// "siguiente paso". Vía 01, el estudio capítulo por capítulo (con la Biblia
// abierta). Vía 02, «Alrededor de <Libro>», la historia del libro (para leer
// sin ella). Debajo, la presentación del libro.
export default async function LibroPage({ params }: { params: Promise<{ libro: string }> }) {
  const { libro: slug } = await params;
  const l = getLibro(slug);
  if (!l) notFound();

  const p = resumenProgreso();
  const done = p.porLibro.get(slug) ?? 0;
  const activo = p.actual.libro === slug;
  const caps = Array.from({ length: l.caps }, (_, i) => i + 1);
  const escritos = caps.filter((c) => hasStudy(slug, c)).length;
  let sigCap = activo ? p.actual.cap : (caps.find((c) => !p.estaCompleto(slug, c)) ?? l.caps);
  if (!activo && done === 0) sigCap = 1;
  const texto = getLibroTexto(slug);
  const alrededor = ramaDeLibro(slug);
  const leidos = alrededor ? foliosLeidos() : new Set<string>();
  const folios = alrededor?.folios ?? [];
  const pendientes = alrededor?.pendientes ?? [];
  const foliosLeidosN = folios.filter((f) => leidos.has(clave(f))).length;
  const sigFolio = folios.find((f) => !leidos.has(clave(f))) ?? null;
  const nombre = l.nombre.toUpperCase();
  const denso = l.caps > 40;

  return (
    <main className="pagina pagina-lectura">
      <section className="losa">
        <div className="mono flex items-center justify-between pl-1.5 pr-[18px] pt-2">
          <Link href="/mapa" className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← Mapa
          </Link>
          <span>
            Fase {romano(l.fase)} · {rotuloEras(erasDeLibro(slug))}
          </span>
        </div>
        <h1 className="display incisa gigante pad-talla losa-pie pt-1" style={{ ...talla(Math.min(k(nombre), 40)), marginBottom: "-0.04em" }}>
          {nombre}
        </h1>
      </section>

      <div className="cuerpo">
        <section className="pad raya flex flex-col gap-2 py-4 lg:py-6">
          {texto?.lema && (
            <p className="serif m-0 italic" style={{ fontSize: "1.375rem", lineHeight: 1.2 }}>
              {texto.lema}
            </p>
          )}
          <p className="mono gris m-0">
            {l.genero} · {l.caps} {l.caps === 1 ? "capítulo" : "capítulos"} · Fase {romano(l.fase)} · {FASES[l.fase].nombre}
          </p>
          <p className="serif m-0" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
            Dos vías en paralelo: el estudio, con la Biblia abierta, y la historia alrededor, para cuando no la tienes a la mano.
          </p>
        </section>

        <div className="vias-marco">
          <div className="vias">
            {/* Vía 01: el estudio, capítulo por capítulo */}
            <section className="via" aria-labelledby="via-estudio">
              <header className="via-cab">
                <p className="mono m-0 flex justify-between">
                  <span>Vía 01</span>
                  <span>
                    {dos(done)}/{dos(l.caps)}
                  </span>
                </p>
                <h2 id="via-estudio" className="via-titulo m-0">
                  El estudio
                </h2>
                <p className="via-nota mono m-0">Capítulo por capítulo, con la Biblia abierta.</p>
              </header>
              <Link href={`/estudiar/${slug}/${sigCap}`} className="bloque">
                <span>
                  {done >= l.caps ? "Releer" : done > 0 ? "Continuar" : "Empezar"} · {l.nombre} {dos(sigCap)}
                </span>
                <span>→</span>
              </Link>
              <div className={`rejilla-caps${denso ? " densa" : ""}`}>
                {caps.map((c) => {
                  const completo = p.estaCompleto(slug, c);
                  const es = activo && c === p.actual.cap;
                  const hay = hasStudy(slug, c);
                  return (
                    <Link
                      key={c}
                      href={`/estudiar/${slug}/${c}`}
                      className={`celda-cap${completo ? " completa" : es ? " activa" : hay ? "" : " sin"}`}
                      aria-label={`${l.nombre} ${c}`}
                    >
                      <span className="celda-num">{dos(c)}</span>
                      <span className="mono">{completo ? "Leído" : es ? "Sigue" : ""}</span>
                    </Link>
                  );
                })}
              </div>
              {escritos < l.caps && (
                <p className="pad raya mono gris m-0 py-3">
                  {dos(escritos)} de {l.caps} capítulos escritos · los demás van llegando
                </p>
              )}
              {l.videos.length > 0 && (
                <div className="pad raya mono py-3">
                  <p className="gris m-0">Antes de empezar · el panorama de Proyecto Biblia</p>
                  <div className="flex gap-5">
                    {l.videos.map((v, i) => (
                      <a key={v} href={v} target="_blank" rel="noreferrer" className="flex h-11 items-center">
                        Video {l.videos.length > 1 ? romano(i + 1) : "panorama"} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Vía 02: alrededor del libro, su historia */}
            <section className="via" aria-labelledby="via-alrededor">
              <header className="via-cab">
                <p className="mono m-0 flex justify-between">
                  <span>Vía 02</span>
                  <span>{folios.length === 0 ? "Por empezar" : `${dos(foliosLeidosN)}/${dos(folios.length)}`}</span>
                </p>
                <h2 id="via-alrededor" className="via-titulo m-0">
                  {alrededor?.titulo ?? `Alrededor de ${l.nombre}`}
                </h2>
                <p className="via-nota mono m-0">La historia del libro, sin Biblia a la mano.</p>
              </header>
              {sigFolio ? (
                <Link href={hrefFolio(sigFolio)} className="bloque">
                  <span>
                    {foliosLeidosN > 0 ? "Continuar" : "Leer"} · {dos(sigFolio.n)} {sigFolio.rotulo}
                  </span>
                  <span>→</span>
                </Link>
              ) : folios.length > 0 ? (
                <p className="pad raya mono m-0 py-3">Al día · todos los folios leídos</p>
              ) : null}
              {folios.length > 0 && <FilasFolios folios={folios} leidos={leidos} />}
              {alrededor && pendientes.length > 0 && (
                <details className="pliegue">
                  <summary className="mono">
                    <span>
                      Por investigar · {dos(pendientes.length)} {pendientes.length === 1 ? "tema" : "temas"}
                    </span>
                    <span aria-hidden="true">▾</span>
                  </summary>
                  <FilasPendientes rama={alrededor} />
                </details>
              )}
              {folios.length === 0 && pendientes.length === 0 && (
                <p className="pad raya serif m-0 py-4" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
                  Todavía no hay folios de {l.nombre}. Se escriben a medida que el estudio avanza y un capítulo pide saber algo que no está en la Biblia.
                </p>
              )}
            </section>
          </div>
        </div>

        {(texto?.md || alrededor?.nota) && (
          <section>
            {texto?.md && (
              <>
                <p className="grupo-cab mono m-0">Sobre {l.nombre}</p>
                <div className="lectura">
                  <article className="estudio pad py-5 lg:py-7" dangerouslySetInnerHTML={{ __html: html(texto.md) }} />
                </div>
              </>
            )}
            {alrededor?.nota && (
              <>
                <p className="grupo-cab mono m-0">Sobre «{alrededor.titulo}»</p>
                <div className="lectura">
                  <article className="estudio pad py-5 lg:py-7" dangerouslySetInnerHTML={{ __html: html(alrededor.nota) }} />
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
