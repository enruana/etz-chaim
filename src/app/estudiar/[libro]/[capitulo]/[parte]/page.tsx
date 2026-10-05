import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { libro as getLibro } from "@/lib/canon";
import { esTematica, html, partePorVersiculo, rotuloCorto, rotuloParte, subtituloParte } from "@/lib/studies";
import { estadoCapitulo } from "@/lib/avance";
import { leerParteAction, desmarcarParteAction } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function PartePage({
  params,
}: {
  params: Promise<{ libro: string; capitulo: string; parte: string }>;
}) {
  const { libro: slug, capitulo, parte: parteSlug } = await params;
  const l = getLibro(slug);
  const cap = parseInt(capitulo, 10);
  if (!l || !Number.isInteger(cap) || cap < 1 || cap > l.caps) notFound();

  const e = estadoCapitulo(slug, cap);
  if (!e) redirect(`/estudiar/${slug}/${cap}`);

  const base = `/estudiar/${slug}/${cap}`;
  const partes = e.capitulo.partes;
  const i = partes.findIndex((p) => p.slug === parteSlug);

  if (i === -1) {
    // marcos/3/12 → la escena que contiene el versículo 12
    const v = /^\d+$/.test(parteSlug) ? partePorVersiculo(e.capitulo, parseInt(parteSlug, 10)) : undefined;
    if (v) redirect(`${base}/${v.slug}`);
    notFound();
  }

  const parte = partes[i];
  const anterior = partes[i - 1];
  const siguiente = partes[i + 1];
  const leida = e.leidas.has(parte.slug);
  const esEscena = parte.tipo === "escena";
  const tematica = esTematica(parte);
  const sub = subtituloParte(parte);

  return (
    <main className="flex flex-col gap-4 sm:gap-6">
      <header>
        <div className="flex items-baseline justify-between gap-3">
          <Link href={base} className="rotulo" style={{ textDecoration: "none" }}>
            ← {l.nombre} {cap}
          </Link>
          <p className="rotulo">
            Parte {i + 1} de {partes.length}
          </p>
        </div>
        <div className="barra mt-2">
          <div style={{ width: `${((i + 1) / partes.length) * 100}%` }} />
        </div>
        {tematica ? (
          <>
            <h1 className="mt-4 text-[1.35rem] sm:mt-5 sm:text-3xl">{sub}</h1>
            <p className="rotulo mt-1.5">
              {l.nombre} {rotuloParte(parte, cap)}
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-4 text-[1.5rem] sm:mt-5 sm:text-4xl">
              {esEscena ? `${l.nombre} ${rotuloParte(parte, cap)}` : rotuloParte(parte, cap)}
            </h1>
            {sub && <p className="serif sobre-roca mt-1 text-[1.08rem] italic sm:text-xl">{sub}</p>}
          </>
        )}
      </header>

      <div className="hoja px-4 py-6 sm:px-10 sm:py-10">
        <article className="estudio" dangerouslySetInnerHTML={{ __html: html(parte.md) }} />
      </div>

      {leida ? (
        <div className="flex flex-col gap-2">
          {siguiente ? (
            <Link href={`${base}/${siguiente.slug}`} className="boton boton-tinta block w-full">
              Seguir · {rotuloCorto(siguiente, cap)} →
            </Link>
          ) : (
            <Link href={base} className="boton boton-tinta block w-full">
              Volver al índice de {l.nombre} {cap}
            </Link>
          )}
          <form action={desmarcarParteAction.bind(null, slug, cap, parte.slug)} className="text-center">
            <button type="submit" className="enlace-discreto">
              ✓ Leída — desmarcar
            </button>
          </form>
        </div>
      ) : (
        <form action={leerParteAction.bind(null, slug, cap, parte.slug)}>
          <button type="submit" className="boton boton-tinta w-full">
            {siguiente ? `Leída · seguir con ${rotuloCorto(siguiente, cap)} →` : "Leída · terminar el capítulo ✓"}
          </button>
        </form>
      )}

      <nav className="flex items-center justify-between gap-2">
        {anterior ? (
          <Link href={`${base}/${anterior.slug}`} className="etiqueta">
            ← {rotuloCorto(anterior, cap)}
          </Link>
        ) : (
          <span />
        )}
        {siguiente && (
          <Link href={`${base}/${siguiente.slug}`} className="etiqueta">
            {rotuloCorto(siguiente, cap)} →
          </Link>
        )}
      </nav>
    </main>
  );
}
