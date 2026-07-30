import { syncItems, itemsPendientes } from "@/lib/srs";
import { clozeTexto } from "@/lib/ejercicios";
import ReviewSession, { type Card } from "@/components/ReviewSession";

export const dynamic = "force-dynamic";

export default function Memoria() {
  syncItems();
  const pendientes = itemsPendientes();

  const cards: Card[] = pendientes.map(({ row, ejercicio: e }) => {
    if (e.tipo === "qa") {
      return { id: row.id, etiqueta: e.origen, front: e.front, back: e.back };
    }
    if (e.tipo === "cloze") {
      return {
        id: row.id,
        etiqueta: `${e.ref} · completa`,
        front: `«${clozeTexto(e.texto, e.ocultas)}»`,
        back: `«${e.texto}» — ${e.ref} (RVR1960)`,
      };
    }
    if (e.tipo === "recitar") {
      return {
        id: row.id,
        etiqueta: "Recitar de memoria",
        front: `Recita ${e.ref} en voz alta, palabra por palabra.`,
        back: `«${e.texto}» — ${e.ref} (RVR1960)`,
      };
    }
    return {
      id: row.id,
      etiqueta: "¿Dónde está escrito?",
      front: `«${e.texto}»`,
      back: e.ref,
    };
  });

  return (
    <main className="flex flex-col gap-5">
      <header>
        <h1 className="text-3xl">Memoria</h1>
        <p className="text-sm" style={{ color: "var(--ink-2)" }}>
          Repaso con repetición espaciada (FSRS) — el algoritmo decide cuándo, tú decides qué tan bien te fue.
        </p>
      </header>
      <ReviewSession cards={cards} />
    </main>
  );
}
