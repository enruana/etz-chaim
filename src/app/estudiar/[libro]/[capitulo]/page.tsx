import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
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
  const base = `/estudiar/${slug}/${cap}`;
  const titulo = `${l.nombre.toUpperCase()} ${dos(cap)}`;

  return (
    <main>
      <section className="losa">
        <div className="mono flex items-center justify-between px-1.5 pt-2">
          <Link href="/" className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← Hoy
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
        <h1 className="display incisa gigante px-4 pt-1" style={{ ...talla(k(titulo)), marginBottom: "-0.04em" }}>
          {titulo}
        </h1>
      </section>

      <section className="pad raya flex flex-col gap-2 py-4">
        {e?.capitulo.lema && (
          <p className="serif m-0 italic" style={{ fontSize: "1.375rem", lineHeight: 1.2 }}>
            {e.capitulo.lema}
          </p>
        )}
        <p className="mono gris m-0">
          Fase {romano(l.fase)} · {fase.nombre} · {l.genero}
        </p>
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
            cap < l.caps && (
              <Link href={`/estudiar/${slug}/${cap + 1}`} className="bloque">
                <span>
                  Seguir · {l.nombre} {dos(cap + 1)}
                </span>
                <span>→</span>
              </Link>
            )
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
      ) : (
        <section className="pad py-10">
          <p className="mono m-0">En investigación</p>
          <p className="serif m-0 mt-2" style={{ fontSize: "1.1875rem", lineHeight: 1.4, maxWidth: "32rem" }}>
            El estudio de {l.nombre} {cap} todavía no está escrito. Vamos capítulo a capítulo: cuando el anterior esté
            estudiado, investigamos el siguiente a profundidad.
          </p>
        </section>
      )}
    </main>
  );
}
