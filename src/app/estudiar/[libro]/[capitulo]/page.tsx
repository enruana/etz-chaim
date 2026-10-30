import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { era as getEra, eraDeCapitulo } from "@/lib/arco";
import { clave, foliosDelLibroEnCapitulo, foliosTransversalesDeCapitulo, hrefFolio, posicionEnLibro } from "@/lib/ramas";
import { FilasFolios } from "@/components/Folios";
import { foliosLeidos } from "@/lib/db";
import { esTematica, html, rotuloCorto, rotuloParte, subtituloParte, type Parte } from "@/lib/studies";
import { estadoCapitulo } from "@/lib/avance";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";
import { marcarTodoAction, desmarcarTodoAction } from "@/app/actions";

export const dynamic = "force-dynamic";

const GRUPOS: { titulo: string; tipos: Parte["tipo"][] }[] = [
  { titulo: "Antes de leer", tipos: ["portada", "contexto"] },
  { titulo: "El recorrido", tipos: ["escena"] },
  { titulo: "Después de leer", tipos: ["jesus", "dificil", "aplicacion", "memoria", "preguntas"] },
];

export default async function CapituloPage({ params }: { params: Promise<{ libro: string; capitulo: string }> }) {
  const { libro: slug, capitulo } = await params;
  const l = getLibro(slug);
  const cap = parseInt(capitulo, 10);
  if (!l || !Number.isInteger(cap) || cap < 1 || cap > l.caps) notFound();

  const e = estadoCapitulo(slug, cap);
  const fase = FASES[l.fase];
  const eraN = eraDeCapitulo(slug, cap);
  const era = getEra(eraN)!;
  const base = `/estudiar/${slug}/${cap}`;
  const alrededor = foliosDelLibroEnCapitulo(slug, cap);
  const ramas = foliosTransversalesDeCapitulo(slug, cap);
  const leidos = alrededor.length + ramas.length > 0 ? foliosLeidos() : new Set<string>();
  // Sin leer: primero los que la línea de lectura coloca tras este capítulo,
  // luego los que solo lo mencionan, y al final los del libro entero.
  const rango = (f: (typeof alrededor)[number]) =>
    posicionEnLibro(f, slug) === cap ? 0 : f.capitulos.some((x) => x.libro === slug && x.cap === cap) ? 1 : 2;
  const sinLeer = alrededor.filter((f) => !leidos.has(clave(f))).sort((a, b) => rango(a) - rango(b));
  const nombre = l.nombre.toUpperCase();
  const num = dos(cap);
  const titulo = `${nombre} ${num}`;

  return (
    <main className="pagina">
      <section className="losa">
        <div className="mono flex items-center justify-between px-1.5 pt-2">
          <Link href={`/estudiar/${slug}`} className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← {l.nombre}
          </Link>
          <div className="flex">
            {cap > 1 && (
              <Link href={`/estudiar/${slug}/${cap - 1}`} className="flex h-11 items-center px-3" style={{ textDecoration: "none" }} aria-label="Capítulo anterior">
                ← {dos(cap - 1)}
              </Link>
            )}
            {cap < l.caps && (
              <Link href={`/estudiar/${slug}/${cap + 1}`} className="flex h-11 items-center px-3" style={{ textDecoration: "none" }} aria-label="Capítulo siguiente">
                {dos(cap + 1)} →
              </Link>
            )}
          </div>
        </div>
        <h1 className="display incisa pad-talla losa-pie pt-1" style={{ marginBottom: "-0.04em" }}>
          <span className="gigante block lg:hidden" style={talla(k(titulo))}>
            {titulo}
          </span>
          <span className="gigante hidden lg:block" style={talla(k(nombre))}>
            {nombre}
          </span>
          <span className="gigante hidden lg:block" style={{ ...talla(k(num, 88)), marginTop: "0.03em", marginBottom: "-0.16em" }}>
            {num}
          </span>
        </h1>
      </section>

      <div className="cuerpo">

      <section className="pad raya flex flex-col gap-2 py-4">
        {e?.capitulo.lema && (
          <p className="serif m-0 italic" style={{ fontSize: "1.375rem", lineHeight: 1.2 }}>
            {e.capitulo.lema}
          </p>
        )}
        <p className="mono gris m-0">
          Fase {romano(l.fase)} · {fase.nombre} · {l.genero}
        </p>
        <Link href={`/mapa/arco/${eraN}`} className="mono m-0 self-start" style={{ textDecoration: "none" }}>
          Era {dos(eraN)} de 10 · {era.nombre} →
        </Link>
        {e && (
          <>
            <div className="segmentos pt-1">
              {e.capitulo.partes.map((parte) => (
                <i key={parte.slug} className={e.leidas.has(parte.slug) ? "on" : undefined} />
              ))}
            </div>
            <p className="mono m-0">
              {e.completo ? "Capítulo completo" : `${dos(e.hechas)}/${dos(e.total)} partes leídas`}
            </p>
          </>
        )}
      </section>

      {cap === 1 && l.videos.length > 0 && (
        <section className="pad raya mono py-3">
          <p className="gris m-0">Antes de empezar · el panorama de Proyecto Biblia</p>
          <div className="flex gap-5">
            {l.videos.map((v, i) => (
              <a key={v} href={v} target="_blank" rel="noreferrer" className="flex h-11 items-center">
                Video {l.videos.length > 1 ? romano(i + 1) : "panorama"} ↗
              </a>
            ))}
          </div>
        </section>
      )}

      {e ? (
        <>
          {e.siguiente ? (
            <Link href={`${base}/${e.siguiente.slug}`} className="bloque">
              <span>
                {e.hechas === 0 ? "Empezar" : "Continuar"} · {rotuloCorto(e.siguiente, cap)}
              </span>
              <span>→</span>
            </Link>
          ) : (
            <>
              {sinLeer.length > 0 && (
                <Link href={hrefFolio(sinLeer[0])} className="bloque bloque-tinta">
                  <span>
                    Antes de seguir · {dos(sinLeer[0].n)} {sinLeer[0].rotulo}
                  </span>
                  <span>→</span>
                </Link>
              )}
              {cap < l.caps && (
                <Link href={`/estudiar/${slug}/${cap + 1}`} className="bloque">
                  <span>
                    Seguir · {l.nombre} {dos(cap + 1)}
                  </span>
                  <span>→</span>
                </Link>
              )}
            </>
          )}

          {GRUPOS.map((g) => {
            const partes = e.capitulo.partes.filter((p) => g.tipos.includes(p.tipo));
            if (partes.length === 0) return null;
            return (
              <section key={g.titulo}>
                <p className="grupo-cab mono m-0">{g.titulo}</p>
                {partes.map((p) => {
                  const leida = e.leidas.has(p.slug);
                  const sub = subtituloParte(p);
                  if (esTematica(p)) {
                    return (
                      <Link key={p.slug} href={`${base}/${p.slug}`} className="fila apilada">
                        <span>
                          <span className="fila-titulo">{sub}</span>
                          <span className="mono gris">{rotuloParte(p, cap)}</span>
                        </span>
                        <span className={`marca${leida ? " on" : ""}`} aria-label={leida ? "Leída" : "Pendiente"} />
                      </Link>
                    );
                  }
                  return (
                    <Link key={p.slug} href={`${base}/${p.slug}`} className="fila">
                      <span className="mono">{rotuloParte(p, cap)}</span>
                      <span className="fila-titulo">{sub ?? ""}</span>
                      <span className={`marca${leida ? " on" : ""}`} aria-label={leida ? "Leída" : "Pendiente"} />
                    </Link>
                  );
                })}
              </section>
            );
          })}

        </>
      ) : (
        <section className="pad py-10">
          <p className="mono m-0">En investigación</p>
          <p className="serif m-0 mt-2" style={{ fontSize: "1.1875rem", lineHeight: 1.4, maxWidth: "32rem" }}>
            El estudio de {l.nombre} {cap} todavía no está escrito. Vamos capítulo a capítulo: cuando el anterior esté
            estudiado, investigamos el siguiente a profundidad.
          </p>
        </section>
      )}

      {alrededor.length > 0 && (
        <section>
          <Link href={`/estudiar/${slug}`} className="grupo-cab mono flex justify-between gap-3" style={{ textDecoration: "none" }}>
            <span>Alrededor de {l.nombre} · la historia que rodea este capítulo</span>
            <span className="shrink-0">
              {dos(alrededor.length - sinLeer.length)}/{dos(alrededor.length)}
            </span>
          </Link>
          <FilasFolios folios={alrededor} leidos={leidos} anclas={false} />
        </section>
      )}

      {ramas.length > 0 && (
        <section>
          <Link href="/ramas" className="grupo-cab mono flex justify-between gap-3" style={{ textDecoration: "none" }}>
            <span>Por las ramas · temas transversales</span>
            <span className="shrink-0">{dos(ramas.length)}</span>
          </Link>
          <FilasFolios folios={ramas} leidos={leidos} anclas={false} />
        </section>
      )}

      {e && (
        <>
          <form
            action={e.hechas > 0 ? desmarcarTodoAction.bind(null, slug, cap) : marcarTodoAction.bind(null, slug, cap)}
            className="pad pt-2"
          >
            <button type="submit" className="enlace mono gris">
              {e.hechas > 0 ? "Desmarcar todo el capítulo" : "Ya lo leí: marcar todo como leído"}
            </button>
          </form>

          {e.capitulo.fuentesMd && (
            <details className="fuentes pad pb-6">
              <summary className="mono gris cursor-pointer px-1.5 py-3">Fuentes consultadas</summary>
              <div className="estudio" dangerouslySetInnerHTML={{ __html: html(e.capitulo.fuentesMd) }} />
            </details>
          )}
        </>
      )}
      </div>
    </main>
  );
}
