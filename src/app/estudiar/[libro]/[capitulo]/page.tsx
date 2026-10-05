import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { esTematica, html, rotuloCorto, rotuloParte, subtituloParte, type Parte } from "@/lib/studies";
import { estadoCapitulo } from "@/lib/avance";
import { romano } from "@/lib/romano";
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

  return (
    <main className="flex flex-col gap-4 sm:gap-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="rotulo">
            Fase {romano(l.fase)} · {fase.nombre} · {l.genero}
          </p>
          <h1 className="mt-1 text-[1.7rem] sm:mt-1.5 sm:text-4xl">
            {l.nombre} {cap}
          </h1>
          {e?.capitulo.lema && (
            <p className="serif sobre-roca mt-0.5 text-[1.05rem] italic sm:text-xl">{e.capitulo.lema}</p>
          )}
        </div>
        <div className="flex gap-2">
          {cap > 1 && (
            <Link href={`/estudiar/${slug}/${cap - 1}`} className="boton boton-linea" style={{ padding: "0.6rem 1rem" }} aria-label="Capítulo anterior">
              ←
            </Link>
          )}
          {cap < l.caps && (
            <Link href={`/estudiar/${slug}/${cap + 1}`} className="boton boton-linea" style={{ padding: "0.6rem 1rem" }} aria-label="Capítulo siguiente">
              →
            </Link>
          )}
        </div>
      </header>

      {cap === 1 && l.videos.length > 0 && (
        <div className="hoja p-3.5 sm:p-5">
          <p className="rotulo">Antes de empezar {l.nombre} · el panorama de Proyecto Biblia</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {l.videos.map((v, i) => (
              <a key={v} href={v} target="_blank" rel="noreferrer" className="etiqueta">
                Video {l.videos.length > 1 ? romano(i + 1) : "panorama"} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {e ? (
        <>
          <div className="hoja p-4 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="rotulo">
                {e.completo ? "Capítulo completo" : `${e.hechas} de ${e.total} partes leídas`}
              </p>
              {e.completo && <span style={{ color: "var(--cardenillo)", fontWeight: 800 }}>✓</span>}
            </div>
            <div className="barra mt-2.5">
              <div style={{ width: `${(e.hechas / e.total) * 100}%` }} />
            </div>
            {e.siguiente ? (
              <Link href={`${base}/${e.siguiente.slug}`} className="boton boton-tinta mt-4 block w-full">
                {e.hechas === 0 ? "Empezar" : "Continuar"} · {rotuloCorto(e.siguiente, cap)} →
              </Link>
            ) : (
              cap < l.caps && (
                <Link href={`/estudiar/${slug}/${cap + 1}`} className="boton boton-tinta mt-4 block w-full">
                  Seguir con {l.nombre} {cap + 1} →
                </Link>
              )
            )}
          </div>

          {GRUPOS.map((g) => {
            const partes = e.capitulo.partes.filter((p) => g.tipos.includes(p.tipo));
            if (partes.length === 0) return null;
            return (
              <section key={g.titulo} className="hoja px-4 pb-1 pt-4 sm:px-6 sm:pt-5">
                <p className="rotulo rotulo-rubrica">{g.titulo}</p>
                <div className="mt-1.5">
                  {partes.map((p) => {
                    const leida = e.leidas.has(p.slug);
                    const sub = subtituloParte(p);
                    if (esTematica(p)) {
                      return (
                        <Link key={p.slug} href={`${base}/${p.slug}`} className="fila fila-apilada">
                          <span>
                            <span className="fila-titulo">{sub}</span>
                            <span className="fila-ref">{rotuloParte(p, cap)}</span>
                          </span>
                          <span className="fila-marca" style={leida ? { color: "var(--cardenillo)" } : undefined}>
                            {leida ? "✓" : "›"}
                          </span>
                        </Link>
                      );
                    }
                    return (
                      <Link key={p.slug} href={`${base}/${p.slug}`} className="fila">
                        <span className="fila-ref">{rotuloParte(p, cap)}</span>
                        <span className="fila-titulo">{sub ?? ""}</span>
                        <span className="fila-marca" style={leida ? { color: "var(--cardenillo)" } : undefined}>
                          {leida ? "✓" : "›"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <form action={e.hechas > 0 ? desmarcarTodoAction.bind(null, slug, cap) : marcarTodoAction.bind(null, slug, cap)} className="text-center">
            <button type="submit" className="enlace-discreto">
              {e.hechas > 0 ? "Desmarcar todo el capítulo" : "Ya lo leí: marcar todo el capítulo como leído"}
            </button>
          </form>

          {e.capitulo.fuentesMd && (
            <details className="fuentes">
              <summary className="rotulo">Fuentes consultadas</summary>
              <div className="estudio mt-2" dangerouslySetInnerHTML={{ __html: html(e.capitulo.fuentesMd) }} />
            </details>
          )}
        </>
      ) : (
        <div className="hoja px-6 py-12 text-center">
          <p className="fleuron">❧</p>
          <h2 className="mt-3 text-2xl sm:text-3xl">Aún en investigación</h2>
          <p className="nota mx-auto mt-2 max-w-md">
            El estudio de {l.nombre} {cap} todavía no está escrito. Vamos capítulo a capítulo: cuando el anterior esté
            estudiado, investigamos el siguiente a profundidad.
          </p>
        </div>
      )}
    </main>
  );
}
