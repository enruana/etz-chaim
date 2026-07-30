"use client";

import { useState, useTransition } from "react";
import { calificarAction } from "@/app/actions";
import type { Rating } from "@/lib/fsrs";

export type Card = { id: string; etiqueta: string; front: string; back: string };

const BOTONES: { rating: Rating; label: string; bg: string }[] = [
  { rating: 1, label: "Otra vez", bg: "var(--track)" },
  { rating: 2, label: "Difícil", bg: "var(--gold-soft)" },
  { rating: 3, label: "Bien", bg: "var(--sky-soft)" },
  { rating: 4, label: "Fácil", bg: "var(--green-soft)" },
];

export default function ReviewSession({ cards }: { cards: Card[] }) {
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [hechas, setHechas] = useState(0);
  const [, startTransition] = useTransition();

  if (cards.length === 0 || i >= cards.length) {
    return (
      <div className="card p-10 text-center">
        <p className="text-4xl">🌳</p>
        <h2 className="mt-2 text-2xl">{hechas > 0 ? `¡${hechas} ${hechas === 1 ? "repaso" : "repasos"} hechos!` : "Nada pendiente"}</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-2)" }}>
          {hechas > 0
            ? "El árbol se riega así: poco, seguido y a tiempo."
            : "Vuelve mañana — el algoritmo te espera con lo justo."}
        </p>
      </div>
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
    <div className="flex flex-col gap-4">
      <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--ink-2)" }}>
        {i + 1} de {cards.length} · {card.etiqueta}
      </p>
      <div className="card flex min-h-56 flex-col justify-center gap-4 p-7">
        <p style={{ fontFamily: "var(--font-serif), serif", fontSize: "1.15rem", lineHeight: 1.7 }}>{card.front}</p>
        {reveal && (
          <p
            className="rounded-2xl p-4"
            style={{ background: "var(--hl)", fontFamily: "var(--font-serif), serif", lineHeight: 1.65 }}
          >
            {card.back}
          </p>
        )}
      </div>
      {!reveal ? (
        <button
          onClick={() => setReveal(true)}
          className="pill w-full px-6 py-3.5 text-base"
          style={{ background: "var(--gold)", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Mostrar respuesta
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {BOTONES.map((b) => (
            <button
              key={b.rating}
              onClick={() => grade(b.rating)}
              className="pill px-2 py-3 text-sm"
              style={{ background: b.bg, color: "var(--ink)", border: "1.5px solid var(--line)", cursor: "pointer" }}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
