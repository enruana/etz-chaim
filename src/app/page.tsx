import Link from "next/link";
import { libro, FASES } from "@/lib/canon";
import { ESPECIALES } from "@/lib/especiales";
import { resumenProgreso } from "@/lib/progreso";
import { romano } from "@/lib/romano";
import { syncItems, contarPendientes } from "@/lib/srs";
import { hasStudy } from "@/lib/studies";
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
  const fase = FASES[l.fase];
  const pendientes = contarPendientes();
  const pct = Math.round((p.completados / p.total) * 1000) / 10;
  const listo = hasStudy(p.actual.libro, p.actual.cap);

  return (
    <main className="flex flex-col gap-3.5 sm:gap-6">
      <header className="pt-1 text-center sm:pt-3">
        <p className="rotulo">{saludo()}, Felipe</p>
        <h1 className="tallada-roja mt-2 text-4xl sm:mt-3 sm:text-5xl">La Biblia</h1>
        <p className="serif sobre-roca mt-2 text-[0.98rem] italic sm:mt-3 sm:text-lg">
          «Árbol de vida es a los que de ella echan mano» — Proverbios 3:18
        </p>
        <hr className="filete-doble mt-4 sm:mt-7" />
      </header>

      <Link href={`/estudiar/${l.slug}/${p.actual.cap}`} className="hoja block p-4 sm:p-7" style={{ textDecoration: "none" }}>
        <p className="rotulo">
          Estás estudiando · Fase {romano(l.fase)} — {fase.nombre}
        </p>
        <h2 className="mt-1.5 text-3xl sm:mt-2 sm:text-4xl">
          {l.nombre} {p.actual.cap}
        </h2>
        <p className="nota mt-1">
          {listo ? "El estudio está listo para ti — continúa donde ibas." : "Este capítulo aún está en investigación."}
        </p>
        <div className="mt-3.5 h-[4px] overflow-hidden sm:mt-5" style={{ background: "var(--papel-hundido)", boxShadow: "inset 0 1px 2px rgb(30 22 14 / 0.35), 0 1px 0 var(--luz)", borderRadius: 2 }}>
          <div className="h-full" style={{ width: `${Math.max(pct, 1)}%`, background: "var(--tinta)" }} />
        </div>
        <p className="rotulo mt-2.5" style={{ letterSpacing: "0.1em" }}>
          {p.completados} de {p.total} capítulos · {pct}% del canon
        </p>
      </Link>

      {ESPECIALES.filter((e) => hasStudy(e.libro, e.cap)).map((e) => (
        <Link
          key={`${e.libro}-${e.cap}`}
          href={`/estudiar/${e.libro}/${e.cap}`}
          className="hoja block p-4 sm:p-6"
          style={{ textDecoration: "none", borderLeft: "4px solid var(--rubrica)" }}
        >
          <p className="rotulo rotulo-rubrica">✦ Estudio especial</p>
          <h3 className="mt-1 text-2xl sm:mt-1.5 sm:text-3xl">{e.titulo}</h3>
          <p className="nota mt-0.5">{e.motivo}</p>
        </Link>
      ))}

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Link href="/memoria" className="hoja block p-3.5 sm:p-6" style={{ textDecoration: "none" }}>
          <p className="rotulo">Repaso espaciado</p>
          <h3 className="mt-1 text-2xl sm:mt-1.5 sm:text-3xl">Memoria</h3>
          <p className="nota mt-0.5">
            {pendientes > 0
              ? `${pendientes} ${pendientes === 1 ? "repaso pendiente" : "repasos pendientes"}`
              : "Todo repasado por hoy."}
          </p>
        </Link>
        <Link href="/mapa" className="hoja block p-3.5 sm:p-6" style={{ textDecoration: "none" }}>
          <p className="rotulo">Sesenta y seis libros</p>
          <h3 className="mt-1 text-2xl sm:mt-1.5 sm:text-3xl">El mapa</h3>
          <p className="nota mt-0.5">El canon en siete fases, y tu avance en él</p>
        </Link>
      </div>

      <Cadena />
    </main>
  );
}
