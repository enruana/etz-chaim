import Link from "next/link";
import { clave, hrefFolio, hrefRama, NOMBRE_TIPO, rotuloAnclas, type Folio, type Rama } from "@/lib/ramas";
import { dos } from "@/lib/estela";

// Filas de folios con su marca de leído. `anclas` añade a qué capítulos se ata.
export function FilasFolios({ folios, leidos, anclas = true }: { folios: Folio[]; leidos: Set<string>; anclas?: boolean }) {
  return (
    <>
      {folios.map((f) => {
        const leido = leidos.has(clave(f));
        return (
          <Link key={clave(f)} href={hrefFolio(f)} className="fila apilada">
            <span>
              <span className="fila-titulo">{f.titulo}</span>
              <span className="mono gris">
                Folio {dos(f.n)} · {NOMBRE_TIPO[f.tipo]}
                {anclas && f.capitulos.length > 0 ? ` · ${rotuloAnclas(f)}` : ""}
              </span>
            </span>
            <span className={`marca${leido ? " on" : ""}`} aria-label={leido ? "Leído" : "Pendiente"} />
          </Link>
        );
      })}
    </>
  );
}

// Lo que falta por investigar en una rama: temas, no folios todavía (el orden puede cambiar),
// así que no llevan número de folio.
export function FilasPendientes({ rama }: { rama: Rama }) {
  const n = rama.pendientes.length;
  return (
    <>
      {rama.pendientes.map((t, i) => (
        <div key={t} className="fila apilada pendiente">
          <span>
            <span className="fila-titulo">{t}</span>
            <span className="mono gris">
              Tema {dos(i + 1)} de {dos(n)} · Por investigar
            </span>
          </span>
          <span className="marca pendiente" aria-label="Por investigar" />
        </div>
      ))}
    </>
  );
}

// En el índice de ramas: una sola fila con el siguiente tema por investigar y cuántos hay en la lista.
export function FilaPorInvestigar({ rama }: { rama: Rama }) {
  const n = rama.pendientes.length;
  if (n === 0) return null;
  return (
    <Link href={`${hrefRama(rama)}#por-investigar`} className="fila apilada pendiente enlace">
      <span>
        <span className="fila-titulo">{rama.pendientes[0]}</span>
        <span className="mono gris">
          Siguiente por investigar · {dos(n)} {n === 1 ? "tema" : "temas"} en la lista
        </span>
      </span>
      <span className="marca pendiente" aria-label="Por investigar" />
    </Link>
  );
}
