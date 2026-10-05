import Link from "next/link";
import { libro, FASES } from "@/lib/canon";
import { ESPECIALES } from "@/lib/especiales";
import { resumenProgreso } from "@/lib/progreso";
import { romano } from "@/lib/romano";
import { syncItems, contarPendientes } from "@/lib/srs";
import { hasStudy, rotuloCorto, subtituloParte } from "@/lib/studies";
import { estadoCapitulo } from "@/lib/avance";
import { dos, k, talla } from "@/lib/estela";
import Cadena from "@/components/Cadena";

export const dynamic = "force-dynamic";

function saludo() {
  const h = parseInt(
    new Intl.DateTimeFormat("es-CO", { hour: "numeric", hour12: false, timeZone: "America/Bogota" }).format(new Date()),
    10,
  );
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function Hoy() {
  syncItems();
  const p = resumenProgreso();
  const l = libro(p.actual.libro)!;
  const cap = p.actual.cap;
  const fase = FASES[l.fase];
  const pendientes = contarPendientes();
  const e = estadoCapitulo(l.slug, cap);
  const sig = e?.siguiente ?? null;
  const destino = sig ? `/estudiar/${l.slug}/${cap}/${sig.slug}` : `/estudiar/${l.slug}/${cap}`;
  const nombre = l.nombre.toUpperCase();
  const num = dos(cap);
  const especiales = ESPECIALES.filter((x) => hasStudy(x.libro, x.cap));

  return (
    <main>
      <section className="losa">
        <div className="pad mono flex justify-between pt-5">
          <span>La Biblia</span>
          <span>{saludo()}, Felipe</span>
        </div>
        <Link href={destino} className="block px-4 pt-3" style={{ textDecoration: "none" }} aria-label={`Continuar ${l.nombre} ${cap}`}>
          <div className="display incisa gigante" style={talla(k(nombre))}>
            {nombre}
          </div>
          <div className="display incisa gigante" style={{ ...talla(k(num, 88)), marginTop: "0.03em", marginBottom: "-0.2em" }}>
            {num}
          </div>
        </Link>
      </section>

      <section className="pad raya flex flex-col gap-2 py-4">
        <p className="mono m-0">
          {e && sig
            ? `Sigue → ${rotuloCorto(sig, cap)} · Parte ${dos(e.capitulo.partes.indexOf(sig) + 1)}/${dos(e.total)}`
            : e
              ? "Capítulo completo"
              : "En investigación"}
          {" · "}Fase {romano(l.fase)}
        </p>
        <p className="serif m-0" style={{ fontSize: "1.1875rem", lineHeight: 1.28 }}>
          {e && sig
            ? (subtituloParte(sig) ?? e.capitulo.lema)
            : e
              ? e.capitulo.lema
              : `El estudio de ${l.nombre} ${cap} todavía no está escrito.`}
        </p>
        {e && (
          <div className="segmentos pt-1">
            {e.capitulo.partes.map((parte) => (
              <i key={parte.slug} className={e.leidas.has(parte.slug) ? "on" : undefined} />
            ))}
          </div>
        )}
      </section>

      <Link href={destino} className="bloque">
        <span>{e && e.hechas > 0 ? "Continuar" : "Empezar"}</span>
        <span>→</span>
      </Link>

      <div className="rejilla">
        {especiales.map((x) => (
          <Link key={`${x.libro}-${x.cap}`} href={`/estudiar/${x.libro}/${x.cap}`} className="celda">
            <span className="mono gris">Estudio especial</span>
            <span className="celda-titulo">{x.titulo}</span>
          </Link>
        ))}
        <Link href="/memoria" className="celda">
          <span className="mono gris">
            {pendientes > 0 ? `${pendientes} ${pendientes === 1 ? "repaso" : "repasos"} hoy` : "Al día"}
          </span>
          <span className="celda-titulo">Memoria</span>
        </Link>
        <Link href="/mapa" className="celda">
          <span className="mono gris">
            {dos(p.completados)}/{p.total} capítulos · {fase.nombre}
          </span>
          <span className="celda-titulo">El mapa</span>
        </Link>
      </div>

      <Cadena />
    </main>
  );
}
