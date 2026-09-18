"use client";

import { useState, useTransition } from "react";
import { calificarAction } from "@/app/actions";
import type { Rating } from "@/lib/fsrs";

export type Card = { id: string; etiqueta: string; front: string; back: string };

const BOTONES: { rating: Rating; label: string; bg: string }[] = [
  { rating: 1, label: "Otra vez", bg: "var(--papel-hundido)" },
  { rating: 2, label: "Difícil", bg: "var(--ocre-suave)" },
  { rating: 3, label: "Bien", bg: "var(--hoja)" },
  { rating: 4, label: "Fácil", bg: "var(--cardenillo-suave)" },
];

export default function ReviewSession({ cards }: { cards: Card[] }) {
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [hechas, setHechas] = useState(0);
  const [, startTransition] = useTransition();

  if (cards.length === 0 || i >= cards.length) {
    return (
      <div className="hoja px-6 py-12 text-center">
        <p className="fleuron">❦</p>
        <h2 className="mt-3 text-2xl sm:text-3xl">
          {hechas > 0 ? `${hechas} ${hechas === 1 ? "repaso hecho" : "repasos hechos"}` : "Nada pendiente"}
        </h2>
        <p className="nota mx-auto mt-2 max-w-sm">
          {hechas > 0
            ? "Poco, seguido y a tiempo: así se graba un texto en la memoria."
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
      <p className="rotulo">
        {i + 1} de {cards.length} · {card.etiqueta}
      </p>
      <div className="hoja flex min-h-52 flex-col justify-center gap-4 p-4 sm:min-h-60 sm:gap-5 sm:p-8">
        <p className="serif" style={{ fontSize: "clamp(1.08rem, 3.4vw, 1.3rem)", lineHeight: 1.55, margin: 0 }}>
          {card.front}
        </p>
        {reveal && (
          <p
            className="serif"
            style={{
              fontSize: "clamp(1.02rem, 3.2vw, 1.2rem)",
              lineHeight: 1.55,
              margin: 0,
              paddingLeft: "1rem",
              borderLeft: "2px solid var(--rubrica)",
            }}
          >
            {card.back}
          </p>
        )}
      </div>
      {!reveal ? (
        <button onClick={() => setReveal(true)} className="boton boton-tinta w-full">
          Mostrar respuesta
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {BOTONES.map((b) => (
            <button
              key={b.rating}
              onClick={() => grade(b.rating)}
              className="boton boton-linea"
              style={{ background: b.bg, padding: "0.9rem 0.3rem", letterSpacing: "0.08em", fontSize: "0.72rem" }}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
