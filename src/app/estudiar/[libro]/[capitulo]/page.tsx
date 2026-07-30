import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { getStudyHtml } from "@/lib/studies";
import { resumenProgreso } from "@/lib/progreso";
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
    <main className="flex flex-col gap-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--ink-2)" }}>
            Fase {l.fase} · {fase.nombre} · {l.genero}
          </p>
          <h1 className="text-3xl">
            {l.nombre} {cap}
          </h1>
        </div>
        <div className="flex gap-2 text-sm font-extrabold">
          {cap > 1 && (
            <Link href={`/estudiar/${slug}/${cap - 1}`} className="card pill px-4 py-2" style={{ textDecoration: "none" }}>
              ←
            </Link>
          )}
          {cap < l.caps && (
            <Link href={`/estudiar/${slug}/${cap + 1}`} className="card pill px-4 py-2" style={{ textDecoration: "none" }}>
              →
            </Link>
          )}
        </div>
      </header>

      {cap === 1 && l.videos.length > 0 && (
        <div className="card p-4 text-sm">
          <p className="font-extrabold" style={{ color: "var(--ink-2)" }}>
            🎬 Antes de empezar {l.nombre}: mira el panorama de Proyecto Biblia
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {l.videos.map((v, i) => (
              <a
                key={v}
                href={v}
                target="_blank"
                rel="noreferrer"
                className="pill px-4 py-1.5 text-xs"
                style={{ background: "var(--sky-soft)", color: "var(--sky-ink)", textDecoration: "none" }}
              >
                Video {l.videos.length > 1 ? i + 1 : "panorama"}
              </a>
            ))}
          </div>
        </div>
      )}

      {html ? (
        <>
          <article className="estudio card px-6 py-8 sm:px-10" dangerouslySetInnerHTML={{ __html: html }} />
          <form action={completado ? desmarcar : marcar} className="pb-4">
            <button
              type="submit"
              className="pill w-full px-6 py-3.5 text-base"
              style={
                completado
                  ? { background: "var(--green-soft)", color: "var(--ink)", border: "1.5px solid var(--line)" }
                  : { background: "var(--gold)", color: "#fff", border: "none" }
              }
            >
              {completado ? "✓ Estudiado — tocar para desmarcar" : "Marcar capítulo como estudiado"}
            </button>
          </form>
        </>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-4xl">🌱</p>
          <h2 className="mt-2 text-2xl">Aún en investigación</h2>
          <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--ink-2)" }}>
            El estudio de {l.nombre} {cap} todavía no está escrito. Vamos capítulo a capítulo: cuando el anterior esté
            estudiado, investigamos el siguiente a profundidad.
          </p>
        </div>
      )}
    </main>
  );
}
