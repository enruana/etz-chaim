import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { erasDeLibro, rotuloEras } from "@/lib/arco";
import { clave, hrefFolio, lineaDeLibro, NOMBRE_TIPO, posicionEnLibro, ramaDeLibro, rotuloAnclas, type Folio } from "@/lib/ramas";
import { resumenProgreso } from "@/lib/progreso";
import { foliosLeidos } from "@/lib/db";
import { getLibroTexto, hasStudy, html } from "@/lib/studies";
import { estadoCapitulo } from "@/lib/avance";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";
import { FilasPendientes } from "@/components/Folios";

export const dynamic = "force-dynamic";

// La página de un libro: una sola lista en orden de lectura. Los capítulos,
// con su número grande, y entre ellos, en filas aparte, los folios de
// «Alrededor de <Libro>» (tras el capítulo que nombran primero) y los videos
// panorama (antes de todo). El botón amarillo señala lo primero pendiente.
export default async function LibroPage({ params }: { params: Promise<{ libro: string }> }) {
  const { libro: slug } = await params;
  const l = getLibro(slug);
  if (!l) notFound();

  const p = resumenProgreso();
  const done = p.porLibro.get(slug) ?? 0;
  const caps = Array.from({ length: l.caps }, (_, i) => i + 1);
  const escritos = caps.filter((c) => hasStudy(slug, c)).length;
  const texto = getLibroTexto(slug);
  const alrededor = ramaDeLibro(slug);
  const leidos = alrededor ? foliosLeidos() : new Set<string>();
  const folios = alrededor?.folios ?? [];
  const pendientes = alrededor?.pendientes ?? [];
  const nombre = l.nombre.toUpperCase();

  // Estado de cada capítulo (solo se lee el estudio de los que lo tienen).
  const estados = new Map(caps.filter((c) => hasStudy(slug, c)).map((c) => [c, estadoCapitulo(slug, c)]));
  const completo = (c: number) => p.estaCompleto(slug, c) || !!estados.get(c)?.completo;

  // Libros largos (Salmos, Génesis, Isaías): en la lista solo los capítulos con
  // estudio, leídos, con folios o el que sigue; el resto, en una cuadrícula.
  const denso = l.caps > 40;
  const linea = lineaDeLibro(slug);
  const primerPendiente = caps.find((c) => !completo(c)) ?? null;
  const conFolio = new Set(folios.map((f) => Math.min(posicionEnLibro(f, slug), l.caps)));
  const enLista = (c: number) => !denso || estados.has(c) || completo(c) || c === primerPendiente || conFolio.has(c);
  const pasos = linea.filter((x) => x.tipo === "folio" || enLista(x.cap));
  const enRejilla = caps.filter((c) => !enLista(c));

  // Lo que sigue: lo primero de la línea que no esté hecho.
  const hecho = (x: (typeof linea)[number]) => (x.tipo === "capitulo" ? completo(x.cap) : leidos.has(clave(x.folio)));
  const sigue = linea.find((x) => !hecho(x)) ?? null;
  const hechos = linea.filter(hecho).length;
  const foliosLeidosN = folios.filter((f) => leidos.has(clave(f))).length;

  const filaFolio = (f: Folio) => {
    const leido = leidos.has(clave(f));
    const es = sigue?.tipo === "folio" && sigue.folio.slug === f.slug;
    const estado = es ? "Sigue · " : leido ? "Leído · " : "";
    return (
      <div key={clave(f)} className={`fila-cap aparte${es ? " activa" : ""}`}>
        <Link href={hrefFolio(f)} className="fila-cap-estudio">
          <span className="mono fila-cap-tipo">Folio</span>
          <span>
            <span className="fila-titulo">{f.titulo}</span>
            <span className="mono">
              {estado}Folio {dos(f.n)} · {NOMBRE_TIPO[f.tipo]} · {rotuloAnclas(f)}
            </span>
          </span>
          <span className={`marca${leido ? " on" : ""}`} aria-label={leido ? "Leído" : "Pendiente"} />
        </Link>
      </div>
    );
  };

  const filaCapitulo = (c: number) => {
    const e = estados.get(c) ?? null;
    const hay = estados.has(c);
    const listo = completo(c);
    const es = sigue?.tipo === "capitulo" && sigue.cap === c;
    let estado = "";
    if (!hay) estado = es ? "Sigue · por escribir" : "Por escribir";
    else if (listo) estado = "Leído";
    else if (e && e.hechas > 0) estado = `${es ? "Sigue · " : ""}${dos(e.hechas)}/${dos(e.total)} partes`;
    else estado = es ? "Sigue" : e ? `${e.total} partes` : "";
    return (
      <div key={`cap-${c}`} className={`fila-cap${listo ? " completa" : es ? " activa" : hay ? "" : " sin"}`}>
        <Link href={`/estudiar/${slug}/${c}`} className="fila-cap-estudio" aria-label={`${l.nombre} ${c}`}>
          <span className="celda-num">{dos(c)}</span>
          <span>
            {e?.capitulo.lema && <span className="fila-titulo">{e.capitulo.lema}</span>}
            {estado && <span className="mono">{estado}</span>}
          </span>
          <span className={`marca${listo ? " on" : ""}`} aria-label={listo ? "Leído" : "Pendiente"} />
        </Link>
      </div>
    );
  };

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
            Una sola lista, de arriba abajo: los capítulos, con la Biblia abierta, y entre ellos los folios de la historia que los rodea, para leer sin ella.
          </p>
        </section>

        {sigue?.tipo === "folio" ? (
          <Link href={hrefFolio(sigue.folio)} className="bloque">
            <span>
              Leer · {dos(sigue.folio.n)} {sigue.folio.rotulo}
            </span>
            <span>→</span>
          </Link>
        ) : (
          <Link href={`/estudiar/${slug}/${sigue?.tipo === "capitulo" ? sigue.cap : 1}`} className="bloque">
            <span>
              {!sigue ? "Releer" : done > 0 ? "Continuar" : "Empezar"} · {l.nombre} {dos(sigue?.tipo === "capitulo" ? sigue.cap : 1)}
            </span>
            <span>→</span>
          </Link>
        )}

        <section>
          <p className="grupo-cab mono m-0 flex justify-between gap-3">
            <span>En orden de lectura · capítulos y folios</span>
            <span className="shrink-0">
              {dos(hechos)}/{dos(linea.length)}
            </span>
          </p>
          {l.videos.map((v, i) => (
            <div key={v} className="fila-cap aparte">
              <a href={v} target="_blank" rel="noreferrer" className="fila-cap-estudio">
                <span className="mono fila-cap-tipo">Video</span>
                <span>
                  <span className="fila-titulo">
                    El panorama de {l.nombre}
                    {l.videos.length > 1 ? `, parte ${romano(i + 1)}` : ""}
                  </span>
                  <span className="mono">Video · Proyecto Biblia · fuera de la app</span>
                </span>
                <span className="mono">↗</span>
              </a>
            </div>
          ))}
          {pasos.map((x) => (x.tipo === "capitulo" ? filaCapitulo(x.cap) : filaFolio(x.folio)))}
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
          {alrededor && pendientes.length > 0 && (
            <details className="pliegue">
              <summary className="mono">
                <span>
                  Folios por investigar · {dos(pendientes.length)} {pendientes.length === 1 ? "tema" : "temas"}
                </span>
                <span aria-hidden="true">▾</span>
              </summary>
              <FilasPendientes rama={alrededor} />
            </details>
          )}
          <p className="pad raya mono gris m-0 py-3">
            {dos(done)} de {l.caps} capítulos leídos
            {folios.length > 0 ? ` · ${dos(foliosLeidosN)} de ${dos(folios.length)} folios` : ""}
            {escritos < l.caps ? ` · ${dos(escritos)} de ${l.caps} capítulos escritos, los demás van llegando` : ""}
          </p>
        </section>

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
