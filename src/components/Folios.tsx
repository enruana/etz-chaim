import Link from "next/link";
import { clave, hrefFolio, NOMBRE_TIPO, rotuloAnclas, type Folio, type Rama } from "@/lib/ramas";
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

// Lo que falta por investigar en una rama, numerado a continuación de sus folios.
export function FilasPendientes({ rama, max }: { rama: Rama; max?: number }) {
  const lista = max ? rama.pendientes.slice(0, max) : rama.pendientes;
  return (
    <>
      {lista.map((t, i) => (
        <div key={t} className="fila apilada pendiente">
          <span>
            <span className="fila-titulo">{t}</span>
            <span className="mono gris">Folio {dos(rama.folios.length + i + 1)} · En investigación</span>
          </span>
          <span className="marca pendiente" aria-label="En investigación" />
        </div>
      ))}
    </>
  );
}
