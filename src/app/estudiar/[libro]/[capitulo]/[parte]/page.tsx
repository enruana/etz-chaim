import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { libro as getLibro } from "@/lib/canon";
import { esTematica, html, partePorVersiculo, rotuloCorto, rotuloParte, subtituloParte } from "@/lib/studies";
import { estadoCapitulo } from "@/lib/avance";
import { dos, k, talla } from "@/lib/estela";
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
  const sub = subtituloParte(parte);
  // lo que se talla en la losa: la referencia de la escena, o el nombre de la sección
  const grande = rotuloCorto(parte, cap).replace("-", "–").toUpperCase();

  return (
    <main className="pagina pagina-lectura">
      <section className="losa">
        <div className="mono flex items-center justify-between pl-1.5 pr-[18px] pt-2">
          <Link href={base} className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← {l.nombre} {dos(cap)}
          </Link>
          <span>
            {dos(i + 1)}/{dos(partes.length)}
          </span>
        </div>
        <ol className="indice-losa mono hidden lg:block">
          {partes.map((p) => (
            <li key={p.slug}>
              <Link href={`${base}/${p.slug}`} className={p.slug === parte.slug ? "aqui" : undefined} aria-current={p.slug === parte.slug ? "page" : undefined}>
                <span className={`marca${e.leidas.has(p.slug) ? " on" : ""}`} />
                <span>{rotuloCorto(p, cap)}</span>
              </Link>
            </li>
          ))}
        </ol>
        <h1 className="display incisa gigante pad-talla losa-pie pt-1" style={{ ...talla(Math.min(k(grande), 40)), marginBottom: "-0.04em" }}>
          {grande}
        </h1>
      </section>

      <div className="cuerpo">
      <div className="lectura">

      {(sub || esTematica(parte)) && (
        <section className="pad pt-5 lg:pt-9">
          {sub && (
            <p className="serif m-0 italic" style={{ fontSize: "1.4375rem", lineHeight: 1.2 }}>
              {sub}
            </p>
          )}
          {esTematica(parte) && (
            <p className="mono gris m-0 mt-2">
              {l.nombre} {rotuloParte(parte, cap)}
            </p>
          )}
        </section>
      )}

      <article className="estudio pad py-5 lg:py-8" dangerouslySetInnerHTML={{ __html: html(parte.md) }} />
      </div>

      {leida ? (
        <>
          {siguiente ? (
            <Link href={`${base}/${siguiente.slug}`} className="bloque bloque-tinta">
              <span>Seguir · {rotuloCorto(siguiente, cap)}</span>
              <span>→</span>
            </Link>
          ) : (
            <Link href={base} className="bloque bloque-tinta">
              <span>Volver al índice</span>
              <span>→</span>
            </Link>
          )}
          <form action={desmarcarParteAction.bind(null, slug, cap, parte.slug)} className="pad">
            <button type="submit" className="enlace mono gris">
              Leída — desmarcar
            </button>
          </form>
        </>
      ) : (
        <form action={leerParteAction.bind(null, slug, cap, parte.slug)}>
          <button type="submit" className="bloque">
            <span>{siguiente ? `Leída · seguir ${rotuloCorto(siguiente, cap)}` : "Leída · terminar"}</span>
            <span>{siguiente ? "→" : "■"}</span>
          </button>
        </form>
      )}

      <nav className="rejilla mono">
        {anterior ? (
          <Link href={`${base}/${anterior.slug}`} className="flex min-h-[52px] items-center px-[18px]" style={{ textDecoration: "none" }}>
            ← {rotuloCorto(anterior, cap)}
          </Link>
        ) : (
          <span className="min-h-[52px]" />
        )}
        {siguiente ? (
          <Link href={`${base}/${siguiente.slug}`} className="flex min-h-[52px] items-center justify-end px-[18px]" style={{ textDecoration: "none" }}>
            {rotuloCorto(siguiente, cap)} →
          </Link>
        ) : (
          <span className="min-h-[52px]" />
        )}
      </nav>
      </div>
    </main>
  );
}
