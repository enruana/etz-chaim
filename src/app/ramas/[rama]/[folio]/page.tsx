import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro } from "@/lib/canon";
import { era as getEra } from "@/lib/arco";
import { clave, fechaLarga, htmlFolio, NOMBRE_TIPO, rama as getRama } from "@/lib/ramas";
import { foliosLeidos } from "@/lib/db";
import { dos, k, talla } from "@/lib/estela";
import { leerFolioAction, desmarcarFolioAction } from "@/app/actions";

export const dynamic = "force-dynamic";

// Un folio: el texto, a qué capítulos y eras se ata, y sus fuentes.
export default async function FolioPage({ params }: { params: Promise<{ rama: string; folio: string }> }) {
  const { rama: ramaSlug, folio: folioSlug } = await params;
  const r = getRama(ramaSlug);
  if (!r) notFound();
  const i = r.folios.findIndex((f) => f.slug === folioSlug);
  if (i === -1) notFound();

  const f = r.folios[i];
  const anterior = r.folios[i - 1];
  const siguiente = r.folios[i + 1];
  const leidos = foliosLeidos();
  const leido = leidos.has(clave(f));
  const base = `/ramas/${r.slug}`;
  const rotulo = f.rotulo.toUpperCase();

  return (
    <main className="pagina pagina-lectura">
      <section className="losa">
        <div className="mono flex items-center justify-between pl-1.5 pr-[18px] pt-2">
          <Link href={base} className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← {r.titulo}
          </Link>
          <span>
            {dos(f.n)}/{dos(r.folios.length)}
          </span>
        </div>
        <ol className="indice-losa mono hidden lg:block">
          {r.folios.map((x) => (
            <li key={x.slug}>
              <Link href={`${base}/${x.slug}`} className={x.slug === f.slug ? "aqui" : undefined} aria-current={x.slug === f.slug ? "page" : undefined}>
                <span className={`marca${leidos.has(clave(x)) ? " on" : ""}`} />
                <span>
                  {dos(x.n)} {x.rotulo}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <h1 className="display incisa gigante pad-talla losa-pie pt-1" style={{ ...talla(Math.min(k(rotulo), 40)), marginBottom: "-0.04em" }}>
          {rotulo}
        </h1>
      </section>

      <div className="cuerpo">
        <div className="lectura">
          <section className="pad flex flex-col gap-2 pt-5 lg:pt-9">
            <p className="serif m-0 italic" style={{ fontSize: "1.4375rem", lineHeight: 1.2 }}>
              {f.titulo}
            </p>
            {f.entrada && (
              <p className="serif m-0" style={{ fontSize: "1.0625rem", lineHeight: 1.35, color: "var(--gris)" }}>
                {f.entrada}
              </p>
            )}
            <p className="mono gris m-0">
              Rama {dos(r.orden)} · Folio {dos(f.n)} · {NOMBRE_TIPO[f.tipo]}
              {f.fecha ? ` · Al corte de ${fechaLarga(f.fecha)}` : ""}
            </p>
            {(f.capitulos.length > 0 || f.eras.length > 0) && (
              <p className="anclas mono m-0">
                {f.capitulos.map((a) => {
                  const l = getLibro(a.libro);
                  if (!l) return null;
                  const key = `${a.libro}-${a.cap ?? "libro"}`;
                  return (
                    <Link key={key} href={a.cap === null ? `/estudiar/${a.libro}/1` : `/estudiar/${a.libro}/${a.cap}`} style={{ textDecoration: "none" }}>
                      {l.nombre}
                      {a.cap === null ? "" : ` ${dos(a.cap)}`} →
                    </Link>
                  );
                })}
                {f.eras.map((n) => {
                  const e = getEra(n);
                  if (!e) return null;
                  return (
                    <Link key={n} href={`/mapa/arco/${n}`} style={{ textDecoration: "none" }}>
                      Era {dos(n)} · {e.nombre} →
                    </Link>
                  );
                })}
              </p>
            )}
          </section>

          <article className="estudio pad py-5 lg:py-8" dangerouslySetInnerHTML={{ __html: htmlFolio(f.md) }} />
        </div>

        {leido ? (
          <>
            {siguiente ? (
              <Link href={`${base}/${siguiente.slug}`} className="bloque bloque-tinta">
                <span>
                  Seguir · {dos(siguiente.n)} {siguiente.rotulo}
                </span>
                <span>→</span>
              </Link>
            ) : (
              <Link href={base} className="bloque bloque-tinta">
                <span>Volver a la rama</span>
                <span>→</span>
              </Link>
            )}
            <form action={desmarcarFolioAction.bind(null, r.slug, f.slug)} className="pad">
              <button type="submit" className="enlace mono gris">
                Leído — desmarcar
              </button>
            </form>
          </>
        ) : (
          <form action={leerFolioAction.bind(null, r.slug, f.slug)}>
            <button type="submit" className="bloque">
              <span>{siguiente ? `Leído · seguir ${dos(siguiente.n)} ${siguiente.rotulo}` : "Leído · terminar"}</span>
              <span>{siguiente ? "→" : "■"}</span>
            </button>
          </form>
        )}

        {f.fuentes.length > 0 && (
          <details className="fuentes pad pb-6">
            <summary className="mono gris cursor-pointer px-1.5 py-3">Fuentes consultadas</summary>
            <ul className="estudio m-0 list-none p-0">
              {f.fuentes.map((s) => (
                <li key={s.titulo} className="py-1">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.titulo} ↗
                    </a>
                  ) : (
                    s.titulo
                  )}
                  {s.postura ? <span className="mono"> · {s.postura}</span> : null}
                </li>
              ))}
            </ul>
          </details>
        )}

        <nav className="rejilla mono">
          {anterior ? (
            <Link href={`${base}/${anterior.slug}`} className="flex min-h-[52px] items-center px-[18px]" style={{ textDecoration: "none" }}>
              ← {dos(anterior.n)} {anterior.rotulo}
            </Link>
          ) : (
            <Link href={base} className="flex min-h-[52px] items-center px-[18px]" style={{ textDecoration: "none" }}>
              ← La rama
            </Link>
          )}
          {siguiente ? (
            <Link href={`${base}/${siguiente.slug}`} className="flex min-h-[52px] items-center justify-end px-[18px]" style={{ textDecoration: "none" }}>
              {dos(siguiente.n)} {siguiente.rotulo} →
            </Link>
          ) : (
            <span className="min-h-[52px]" />
          )}
        </nav>
      </div>
    </main>
  );
}
