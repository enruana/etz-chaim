import Link from "next/link";
import { notFound } from "next/navigation";
import { clave, NOMBRE_TIPO, rama as getRama, rotuloAnclas } from "@/lib/ramas";
import { foliosLeidos } from "@/lib/db";
import { html } from "@/lib/studies";
import { dos, k, talla } from "@/lib/estela";

export const dynamic = "force-dynamic";

// Una rama: su presentación, los folios escritos y lo que falta por investigar.
export default async function RamaPage({ params }: { params: Promise<{ rama: string }> }) {
  const { rama: slug } = await params;
  const r = getRama(slug);
  if (!r) notFound();

  const leidos = foliosLeidos();
  const done = r.folios.filter((f) => leidos.has(clave(f))).length;
  const sig = r.folios.find((f) => !leidos.has(clave(f))) ?? null;
  const titulo = r.titulo.toUpperCase();

  return (
    <main className="pagina pagina-lectura">
      <section className="losa">
        <div className="mono flex items-center justify-between pl-1.5 pr-[18px] pt-2">
          <Link href="/ramas" className="flex h-11 items-center px-3" style={{ textDecoration: "none" }}>
            ← Las ramas
          </Link>
          <span>Rama {dos(r.orden)}</span>
        </div>
        <ol className="indice-losa mono hidden lg:block">
          {r.folios.map((f) => (
            <li key={f.slug}>
              <Link href={`/ramas/${r.slug}/${f.slug}`}>
                <span className={`marca${leidos.has(clave(f)) ? " on" : ""}`} />
                <span>
                  {dos(f.n)} {f.rotulo}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <h1 className="display incisa gigante pad-talla losa-pie pt-1" style={{ ...talla(Math.min(k(titulo), 40)), marginBottom: "-0.04em" }}>
          {titulo}
        </h1>
      </section>

      <div className="cuerpo">
        <div className="lectura">
          <section className="pad pt-5 lg:pt-9">
            <p className="serif m-0 italic" style={{ fontSize: "1.4375rem", lineHeight: 1.2 }}>
              {r.entrada}
            </p>
            <p className="mono gris m-0 mt-2">
              Rama {dos(r.orden)} · {dos(r.folios.length)} {r.folios.length === 1 ? "folio" : "folios"}
              {done > 0 ? ` · ${dos(done)} ${done === 1 ? "leído" : "leídos"}` : ""} · Sigue creciendo
            </p>
          </section>
          {r.nota && <article className="estudio pad py-5 lg:py-8" dangerouslySetInnerHTML={{ __html: html(r.nota) }} />}
        </div>

        {sig ? (
          <Link href={`/ramas/${r.slug}/${sig.slug}`} className="bloque">
            <span>
              {done > 0 ? "Continuar" : "Empezar"} · {dos(sig.n)} {sig.rotulo}
            </span>
            <span>→</span>
          </Link>
        ) : (
          r.folios.length > 0 && (
            <Link href="/ramas" className="bloque bloque-tinta">
              <span>Rama al día · volver a las ramas</span>
              <span>→</span>
            </Link>
          )
        )}

        <section>
          <p className="grupo-cab mono m-0 flex justify-between">
            <span>Folios</span>
            <span>
              {dos(done)}/{dos(r.folios.length)}
            </span>
          </p>
          {r.folios.map((f) => {
            const leido = leidos.has(clave(f));
            return (
              <Link key={f.slug} href={`/ramas/${r.slug}/${f.slug}`} className="fila apilada">
                <span>
                  <span className="fila-titulo">{f.titulo}</span>
                  <span className="mono gris">
                    Folio {dos(f.n)} · {NOMBRE_TIPO[f.tipo]}
                    {f.capitulos.length > 0 ? ` · ${rotuloAnclas(f)}` : ""}
                  </span>
                </span>
                <span className={`marca${leido ? " on" : ""}`} aria-label={leido ? "Leído" : "Pendiente"} />
              </Link>
            );
          })}
        </section>

        {r.pendientes.length > 0 && (
          <section>
            <p className="grupo-cab mono m-0 flex justify-between">
              <span>Por investigar</span>
              <span>{dos(r.pendientes.length)}</span>
            </p>
            {r.pendientes.map((t, i) => (
              <div key={t} className="fila apilada pendiente">
                <span>
                  <span className="fila-titulo">{t}</span>
                  <span className="mono gris">Folio {dos(r.folios.length + i + 1)} · En investigación</span>
                </span>
                <span className="marca pendiente" aria-label="En investigación" />
              </div>
            ))}
            <p className="pad serif m-0 py-4" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
              Los folios se investigan uno a uno, a medida que avanza el estudio. El orden puede cambiar.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
