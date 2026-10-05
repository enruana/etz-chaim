"use client";

import { useState, useTransition } from "react";
import { calificarAction } from "@/app/actions";
import type { Rating } from "@/lib/fsrs";

export type Card = { id: string; etiqueta: string; front: string; back: string };

const BOTONES: { rating: Rating; label: string }[] = [
  { rating: 1, label: "Otra vez" },
  { rating: 2, label: "Difícil" },
  { rating: 3, label: "Bien" },
  { rating: 4, label: "Fácil" },
];

function dos(n: number) {
  return String(n).padStart(2, "0");
}

export default function ReviewSession({ cards }: { cards: Card[] }) {
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [hechas, setHechas] = useState(0);
  const [, startTransition] = useTransition();

  if (cards.length === 0 || i >= cards.length) {
    return (
      <section className="pad py-10">
        <p className="mono m-0">{hechas > 0 ? `${dos(hechas)} ${hechas === 1 ? "repaso hecho" : "repasos hechos"}` : "Nada pendiente"}</p>
        <p className="serif m-0 mt-2" style={{ fontSize: "1.25rem", lineHeight: 1.35, maxWidth: "30rem" }}>
          {hechas > 0
            ? "Poco, seguido y a tiempo: así se graba un texto en la memoria."
            : "Vuelve mañana. El algoritmo decide cuándo; tú decides qué tan bien te fue."}
        </p>
      </section>
    );
  }

  const card = cards[i];

  function grade(rating: Rating) {
    startTransition(() => calificarAction(card.id, rating));
    setHechas((h) => h + 1);
    setReveal(false);
    setI((x) => x + 1);
  }

  return (
    <>
      <section className="pad raya mono flex justify-between gap-3 py-3">
        <span>{card.etiqueta}</span>
        <span>
          {dos(i + 1)}/{dos(cards.length)}
        </span>
      </section>

      <section className="pad flex flex-col gap-5 py-6" style={{ minHeight: 230 }}>
        <p className="serif m-0" style={{ fontSize: "1.25rem", lineHeight: 1.45 }}>
          {card.front}
        </p>
        {reveal && (
          <p
            className="serif m-0"
            style={{ fontSize: "1.1875rem", lineHeight: 1.45, paddingLeft: 14, borderLeft: "8px solid var(--oropimente)" }}
          >
            {card.back}
          </p>
        )}
      </section>

      {!reveal ? (
        <button onClick={() => setReveal(true)} className="bloque">
          <span>Mostrar respuesta</span>
          <span>→</span>
        </button>
      ) : (
        <div className="grid grid-cols-4" style={{ borderBlock: "1px solid var(--grafito)" }}>
          {BOTONES.map((b, n) => (
            <button
              key={b.rating}
              onClick={() => grade(b.rating)}
              className="mono"
              style={{
                height: 66,
                cursor: "pointer",
                border: 0,
                borderLeft: n > 0 ? "1px solid var(--grafito)" : undefined,
                background: b.rating === 3 ? "var(--oropimente)" : "var(--piedra)",
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
