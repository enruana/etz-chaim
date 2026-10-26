import Link from "next/link";
import { clave, NOMBRE_TIPO, ramas, rotuloAnclas, siguienteFolio } from "@/lib/ramas";
import { foliosLeidos } from "@/lib/db";
import { dos, k, talla } from "@/lib/estela";

export const dynamic = "force-dynamic";

// Las ramas: la historia alrededor de la Biblia, tema por tema, folio a folio.
export default function Ramas() {
  const todas = ramas();
  const leidos = foliosLeidos();
  const total = todas.reduce((s, r) => s + r.folios.length, 0);
  const hechos = todas.reduce((s, r) => s + r.folios.filter((f) => leidos.has(clave(f))).length, 0);
  const sig = siguienteFolio(leidos);

  return (
    <main className="pagina">
      <section className="losa">
        <div className="pad mono flex justify-between pt-5">
          <span>La Biblia / Las ramas</span>
          <span>
            {dos(todas.length)} ramas · {dos(total)} folios
          </span>
        </div>
        <h1 className="display incisa pad-talla losa-pie pt-3" style={{ marginBottom: "-0.04em" }}>
          <span className="gigante block lg:hidden" style={talla(k("LAS RAMAS"))}>
            Las ramas
          </span>
          <span className="gigante hidden lg:block" style={talla(k("RAMAS"))}>
            Las
          </span>
          <span className="gigante hidden lg:block" style={talla(k("RAMAS"))}>
            Ramas
          </span>
        </h1>
      </section>

      <div className="cuerpo">
        <section className="pad raya flex flex-col gap-2 py-4 lg:py-7">
          <p className="mono m-0">
            {dos(hechos)}/{dos(total)} folios leídos · Historia alrededor de la Biblia
          </p>
          <p className="serif m-0 text-[1.1875rem] leading-[1.28] lg:text-[1.75rem] lg:leading-[1.2]">
            Lo que no está en el texto pero lo rodea: la tierra, la gente, los manuscritos, cómo llegó hasta nosotros.
            Para leer sin Biblia a la mano. Cada rama es un tema abierto y crece folio a folio.
          </p>
        </section>

        {sig && (
          <Link href={`/ramas/${sig.rama}/${sig.slug}`} className="bloque">
            <span>
              {hechos > 0 ? "Continuar" : "Empezar"} · {sig.rotulo}
            </span>
            <span>→</span>
          </Link>
        )}

        {todas.map((r) => {
          const done = r.folios.filter((f) => leidos.has(clave(f))).length;
          return (
            <section key={r.slug}>
              <Link href={`/ramas/${r.slug}`} className="grupo-cab mono flex justify-between gap-3" style={{ textDecoration: "none" }}>
                <span>
                  Rama {dos(r.orden)} · {r.titulo}
                </span>
                <span className="shrink-0">
                  {dos(done)}/{dos(r.folios.length)} →
                </span>
              </Link>
              <p className="pad raya serif m-0 py-3" style={{ fontSize: "1rem", lineHeight: 1.35, color: "var(--gris)" }}>
                {r.entrada}
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
              {r.pendientes.slice(0, 2).map((t, i) => (
                <div key={t} className="fila apilada pendiente">
                  <span>
                    <span className="fila-titulo">{t}</span>
                    <span className="mono gris">Folio {dos(r.folios.length + i + 1)} · En investigación</span>
                  </span>
                  <span className="marca pendiente" aria-label="En investigación" />
                </div>
              ))}
            </section>
          );
        })}

        {todas.length === 0 && (
          <section className="pad py-10">
            <p className="mono m-0">Todavía no hay ramas</p>
          </section>
        )}
      </div>
    </main>
  );
}
