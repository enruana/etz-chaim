import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { getStudyHtml } from "@/lib/studies";
import { resumenProgreso } from "@/lib/progreso";
import { romano } from "@/lib/romano";
import { marcarEstudiadoAction, desmarcarAction } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function Estudiar({ params }: { params: Promise<{ libro: string; capitulo: string }> }) {
  const { libro: slug, capitulo } = await params;
  const l = getLibro(slug);
  const cap = parseInt(capitulo, 10);
  if (!l || !Number.isInteger(cap) || cap < 1 || cap > l.caps) notFound();

  const html = getStudyHtml(slug, cap);
  const p = resumenProgreso();
  const completado = p.estaCompleto(slug, cap);
  const fase = FASES[l.fase];

  const marcar = marcarEstudiadoAction.bind(null, slug, cap);
  const desmarcar = desmarcarAction.bind(null, slug, cap);

  return (
    <main className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="rotulo">
            Fase {romano(l.fase)} · {fase.nombre} · {l.genero}
          </p>
          <h1 className="mt-1.5 text-4xl">
            {l.nombre} {cap}
          </h1>
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
        <div className="hoja p-5">
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

      {html ? (
        <>
          <div className="hoja px-5 py-9 sm:px-10 sm:py-12">
            <article className="estudio" dangerouslySetInnerHTML={{ __html: html }} />
            {/* colofón: así cerraban los escribas su trabajo */}
            <div className="mt-12 text-center">
              <p className="fleuron">❦</p>
              <p className="rotulo mt-3">
                Aquí termina el estudio de {l.nombre} {cap}
              </p>
              <p className="serif nota mt-1 italic">Texto bíblico: Reina-Valera 1960</p>
            </div>
          </div>
          <form action={completado ? desmarcar : marcar} className="pb-2">
            <button
              type="submit"
              className={`boton w-full ${completado ? "boton-linea" : "boton-tinta"}`}
              style={completado ? { background: "var(--cardenillo-suave)", borderColor: "var(--cardenillo)" } : undefined}
            >
              {completado ? "✓ Estudiado — tocar para desmarcar" : "Marcar capítulo como estudiado"}
            </button>
          </form>
        </>
      ) : (
        <div className="hoja px-6 py-12 text-center">
          <p className="fleuron">❧</p>
          <h2 className="mt-3 text-3xl">Aún en investigación</h2>
          <p className="nota mx-auto mt-2 max-w-md">
            El estudio de {l.nombre} {cap} todavía no está escrito. Vamos capítulo a capítulo: cuando el anterior esté
            estudiado, investigamos el siguiente a profundidad.
          </p>
        </div>
      )}
    </main>
  );
}
