import Link from "next/link";
import { notFound } from "next/navigation";
import { libro as getLibro, FASES } from "@/lib/canon";
import { erasDeLibro, rotuloEras } from "@/lib/arco";
import { clave, hrefFolio, ramaDeLibro } from "@/lib/ramas";
import { resumenProgreso } from "@/lib/progreso";
import { foliosLeidos } from "@/lib/db";
import { getLibroTexto, hasStudy, html } from "@/lib/studies";
import { romano } from "@/lib/romano";
import { dos, k, talla } from "@/lib/estela";
import { FilasFolios, FilasPendientes } from "@/components/Folios";

export const dynamic = "force-dynamic";

// La página de un libro: presentación, sus capítulos con el avance, y la
// sección «Alrededor de <Libro>» con la historia propia del libro.
export default async function LibroPage({ params }: { params: Promise<{ libro: string }> }) {
  const { libro: slug } = await params;
  const l = getLibro(slug);
  if (!l) notFound();

  const p = resumenProgreso();
  const done = p.porLibro.get(slug) ?? 0;
  const activo = p.actual.libro === slug;
  const caps = Array.from({ length: l.caps }, (_, i) => i + 1);
  const escritos = caps.filter((c) => hasStudy(slug, c)).length;
  let sigCap = activo ? p.actual.cap : (caps.find((c) => !p.estaCompleto(slug, c)) ?? l.caps);
  if (!activo && done === 0) sigCap = 1;
  const texto = getLibroTexto(slug);
  const alrededor = ramaDeLibro(slug);
  const leidos = alrededor ? foliosLeidos() : new Set<string>();
  const foliosLeidosN = alrededor ? alrededor.folios.filter((f) => leidos.has(clave(f))).length : 0;
  const sigFolio = alrededor?.folios.find((f) => !leidos.has(clave(f))) ?? null;
  const nombre = l.nombre.toUpperCase();

  return (
    <main className="pagina">
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
        <section className="pad raya flex flex-col gap-2 py-4 lg:py-7">
          {texto?.lema && (
            <p className="serif m-0 italic" style={{ fontSize: "1.375rem", lineHeight: 1.2 }}>
              {texto.lema}
            </p>
          )}
          <p className="mono gris m-0">
            {l.genero} · {l.caps} {l.caps === 1 ? "capítulo" : "capítulos"} · {dos(done)} {done === 1 ? "estudiado" : "estudiados"} · {FASES[l.fase].nombre}
          </p>
        </section>

        {texto?.md && (
          <div className="lectura">
            <article className="estudio pad py-5 lg:py-8" dangerouslySetInnerHTML={{ __html: html(texto.md) }} />
          </div>
        )}

        {l.videos.length > 0 && (
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

        <Link href={`/estudiar/${slug}/${sigCap}`} className="bloque">
          <span>
            {done >= l.caps ? "Releer" : done > 0 ? "Continuar" : "Empezar"} · {l.nombre} {dos(sigCap)}
          </span>
          <span>→</span>
        </Link>

        <section>
          <p className="grupo-cab mono m-0 flex justify-between">
            <span>Capítulos</span>
            <span>
              {dos(done)}/{dos(l.caps)}
              {escritos < l.caps ? ` · ${dos(escritos)} escritos` : ""}
            </span>
          </p>
          <div className="rejilla-caps">
            {caps.map((c) => {
              const completo = p.estaCompleto(slug, c);
              const es = activo && c === p.actual.cap;
              const hay = hasStudy(slug, c);
              return (
                <Link
                  key={c}
                  href={`/estudiar/${slug}/${c}`}
                  className={`celda-cap${completo ? " completa" : es ? " activa" : hay ? "" : " sin"}`}
                  aria-label={`${l.nombre} ${c}`}
                >
                  <span className="celda-num">{dos(c)}</span>
                  <span className="mono">{completo ? "Leído" : es ? "Sigue" : hay ? "Listo" : ""}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {alrededor && (
          <section>
            <p className="grupo-cab mono m-0 flex justify-between">
              <span>{alrededor.titulo} · historia del libro</span>
              <span>
                {alrededor.folios.length === 0 ? "Por empezar" : `${dos(foliosLeidosN)}/${dos(alrededor.folios.length)}`}
              </span>
            </p>
            <p className="pad raya serif m-0 py-3" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
              {alrededor.entrada}
            </p>
            {sigFolio && (
              <Link href={hrefFolio(sigFolio)} className="bloque">
                <span>
                  {foliosLeidosN > 0 ? "Continuar" : "Leer"} · {dos(sigFolio.n)} {sigFolio.rotulo}
                </span>
                <span>→</span>
              </Link>
            )}
            <FilasFolios folios={alrededor.folios} leidos={leidos} />
            <FilasPendientes rama={alrededor} />
            {alrededor.nota && (
              <div className="lectura">
                <article className="estudio pad py-5" dangerouslySetInnerHTML={{ __html: html(alrededor.nota) }} />
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
