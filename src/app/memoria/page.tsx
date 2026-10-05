import { syncItems, itemsPendientes } from "@/lib/srs";
import { clozeTexto } from "@/lib/ejercicios";
import ReviewSession, { type Card } from "@/components/ReviewSession";
import { k, talla } from "@/lib/estela";

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
    <main>
      <section className="losa">
        <div className="pad mono flex justify-between pt-5">
          <span>La Biblia / Memoria</span>
          <span>Repaso espaciado</span>
        </div>
        <h1 className="display incisa gigante px-4 pt-3" style={{ ...talla(k("MEMORIA")), marginBottom: "-0.04em" }}>
          Memoria
        </h1>
      </section>
      <ReviewSession cards={cards} />
    </main>
  );
}
