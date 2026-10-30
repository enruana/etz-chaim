import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { erasDeLibro, rotuloEras } from "@/lib/arco";
import { clave, hrefFolio, ramaDeLibro } from "@/lib/ramas";
import { resumenProgreso } from "@/lib/progreso";
import { foliosLeidos } from "@/lib/db";
import { getLibroTexto, hasStudy, html } from "@/lib/studies";
import { estadoCapitulo } from "@/lib/avance";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";
import { Fichas, FilasFolios, FilasPendientes } from "@/components/Folios";

export const dynamic = "force-dynamic";

// La página de un libro: un solo camino, capítulo por capítulo. De cada
// capítulo cuelgan, como fichas, los folios de «Alrededor de <Libro>» que
// hablan de él. Más abajo va la sección entera en orden, para leerla de
// corrido sin Biblia a la mano, y al final la presentación del libro.
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
  // Folios del libro entero (sin capítulo) y folios de cada capítulo.
  const delLibro = folios.filter((f) => f.capitulos.some((a) => a.libro === slug && a.cap === null));
  const deCap = (c: number) => folios.filter((f) => f.capitulos.some((a) => a.libro === slug && a.cap === c));
  const nombre = l.nombre.toUpperCase();

  // Libros largos (Salmos, Génesis, Isaías): en filas solo los capítulos con
  // estudio, con folios, leídos o el que sigue; el resto, en una cuadrícula.
  const denso = l.caps > 40;
  const enFila = caps.filter((c) => !denso || hasStudy(slug, c) || p.estaCompleto(slug, c) || c === sigCap || deCap(c).length > 0);
  const enRejilla = caps.filter((c) => !enFila.includes(c));
  const antes = l.videos.length > 0 || delLibro.length > 0;

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
            Se estudia capítulo por capítulo, con la Biblia abierta. Debajo de cada capítulo cuelga la historia que lo rodea, para leer sin ella.
          </p>
        </section>

        <Link href={`/estudiar/${slug}/${sigCap}`} className="bloque">
          <span>
            {done >= l.caps ? "Releer" : done > 0 ? "Continuar" : "Empezar"} · {l.nombre} {dos(sigCap)}
          </span>
          <span>→</span>
        </Link>

        {antes && (
          <section>
            <p className="grupo-cab mono m-0">Antes de empezar</p>
            {l.videos.map((v, i) => (
              <a key={v} href={v} target="_blank" rel="noreferrer" className="fila apilada ver">
                <span>
                  <span className="fila-titulo">
                    El panorama de {l.nombre}
                    {l.videos.length > 1 ? `, parte ${romano(i + 1)}` : ""}
                  </span>
                  <span className="mono gris">Video · Proyecto Biblia · fuera de la app</span>
                </span>
                <span className="mono">↗</span>
              </a>
            ))}
            {delLibro.length > 0 && <FilasFolios folios={delLibro} leidos={leidos} />}
          </section>
        )}

        <section>
          <p className="grupo-cab mono m-0 flex justify-between">
            <span>Capítulo por capítulo</span>
            <span>
              {dos(done)}/{dos(l.caps)}
            </span>
          </p>
          {enFila.map((c) => {
            const hay = hasStudy(slug, c);
            const e = hay ? estadoCapitulo(slug, c) : null;
            const completo = p.estaCompleto(slug, c) || !!e?.completo;
            const sigue = c === sigCap && !completo;
            const propios = deCap(c);
            let estado = "";
            if (!hay) estado = sigue ? "Sigue · por escribir" : "Por escribir";
            else if (completo) estado = "Leído";
            else if (e && e.hechas > 0) estado = `${sigue ? "Sigue · " : ""}${dos(e.hechas)}/${dos(e.total)} partes`;
            else estado = sigue ? "Sigue" : e ? `${e.total} partes` : "";
            return (
              <div key={c} className={`fila-cap${completo ? " completa" : sigue ? " activa" : hay ? "" : " sin"}`}>
                <Link href={`/estudiar/${slug}/${c}`} className="fila-cap-estudio" aria-label={`${l.nombre} ${c}`}>
                  <span className="celda-num">{dos(c)}</span>
                  <span>
                    {e?.capitulo.lema && <span className="fila-titulo">{e.capitulo.lema}</span>}
                    {estado && <span className="mono">{estado}</span>}
                  </span>
                  <span className={`marca${completo ? " on" : ""}`} aria-label={completo ? "Leído" : "Pendiente"} />
                </Link>
                {propios.length > 0 && <Fichas folios={propios} leidos={leidos} />}
              </div>
            );
          })}
          {enRejilla.length > 0 && (
            <>
              <p className="pad raya mono gris m-0 py-3">Los demás · por escribir</p>
              <div className="rejilla-caps densa">
                {enRejilla.map((c) => (
                  <Link key={c} href={`/estudiar/${slug}/${c}`} className="celda-cap sin" aria-label={`${l.nombre} ${c}`}>
                    <span className="celda-num">{dos(c)}</span>
                    <span className="mono"></span>
                  </Link>
                ))}
              </div>
            </>
          )}
          {escritos < l.caps && (
            <p className="pad raya mono gris m-0 py-3">
              {dos(escritos)} de {l.caps} capítulos escritos · los demás van llegando
            </p>
          )}
        </section>

        {alrededor && (
          <section>
            <p className="grupo-cab mono m-0 flex justify-between gap-3">
              <span>{alrededor.titulo} · la historia del libro</span>
              <span className="shrink-0">{folios.length === 0 ? "Por empezar" : `${dos(foliosLeidosN)}/${dos(folios.length)}`}</span>
            </p>
            {folios.length > 0 && (
              <p className="pad raya serif m-0 py-3" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
                Los mismos folios que cuelgan de los capítulos, aquí en orden, para leerlos de corrido sin Biblia a la mano.
              </p>
            )}
            {sigFolio ? (
              <Link href={hrefFolio(sigFolio)} className="bloque bloque-tinta">
                <span>
                  {foliosLeidosN > 0 ? "Seguir leyendo" : "Leer"} · {dos(sigFolio.n)} {sigFolio.rotulo}
                </span>
                <span>→</span>
              </Link>
            ) : folios.length > 0 ? (
              <p className="pad raya mono m-0 py-3">Al día · todos los folios leídos</p>
            ) : null}
            {folios.length > 0 && <FilasFolios folios={folios} leidos={leidos} />}
            {pendientes.length > 0 && (
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
        )}

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
