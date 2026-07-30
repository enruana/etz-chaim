import { LUGARES } from "@/lib/lugares";
import { resumenProgreso } from "@/lib/progreso";
import TierraSection from "@/components/TierraSection";

export const dynamic = "force-dynamic";

export default function Tierra() {
  const p = resumenProgreso();
  const lugares = LUGARES.map((l) => ({
    ...l,
    estudiado: l.historias.some((h) => p.estaCompleto(h.libro, h.cap)),
  }));

  return (
    <main className="flex flex-col gap-5">
      <header>
        <h1 className="text-3xl">La Tierra</h1>
        <p className="text-sm" style={{ color: "var(--ink-2)" }}>
          Galilea, el Jordán, Jerusalén — el escenario real de las historias. Se enciende a medida que estudias.
        </p>
      </header>
      <TierraSection lugares={lugares} />
    </main>
  );
}
