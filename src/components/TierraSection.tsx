"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Pin } from "./TierraSanta";
import type { Lugar } from "@/lib/lugares";

const TierraSanta = dynamic(() => import("./TierraSanta"), {
  ssr: false,
  loading: () => (
    <div className="grid h-96 place-items-center text-sm" style={{ color: "var(--ink-2)" }}>
      Dibujando la Tierra Santa…
    </div>
  ),
});

export default function TierraSection({ lugares }: { lugares: (Lugar & { estudiado: boolean })[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const pins: Pin[] = lugares.map((l) => ({ id: l.id, nombre: l.nombre, pos: l.pos, estudiado: l.estudiado }));
  const lugarSel = lugares.find((l) => l.id === sel);

  return (
    <div className="flex flex-col gap-4">
      <div className="card overflow-hidden" style={{ borderRadius: 26 }}>
        <TierraSanta pins={pins} onSelect={setSel} />
        <p className="px-5 py-3 text-center text-xs font-bold" style={{ color: "var(--ink-2)" }}>
          Arrastra para girar · pellizca para acercar · toca un pin para ver sus historias.
          <span style={{ color: "var(--gold)" }}> ● dorado</span> = historias ya estudiadas ·
          <span style={{ color: "var(--sky-ink)" }}> ● azul</span> = por descubrir
        </p>
      </div>

      {lugarSel ? (
        <div className="card p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--ink-2)" }}>
                {lugarSel.estudiado ? "✨ Ya estuviste aquí" : "Por descubrir"}
              </p>
              <h2 className="mt-1 text-2xl">{lugarSel.nombre}</h2>
            </div>
            <button
              onClick={() => setSel(null)}
              className="pill px-3 py-1 text-sm"
              style={{ background: "var(--track)", border: "none", cursor: "pointer", color: "var(--ink-2)" }}
            >
              ✕
            </button>
          </div>
          <p className="mt-2" style={{ color: "var(--ink-2)" }}>
            {lugarSel.desc}
          </p>
          {lugarSel.historias.length > 0 ? (
            <ul className="mt-4 flex list-none flex-col gap-2 p-0">
              {lugarSel.historias.map((h) => (
                <li key={h.ref}>
                  <Link
                    href={`/estudiar/${h.libro}/${h.cap}`}
                    className="card lift flex items-center justify-between gap-3 px-4 py-3 text-sm"
                    style={{ textDecoration: "none", borderRadius: 16 }}
                  >
                    <span className="font-bold">{h.titulo}</span>
                    <span className="shrink-0 text-xs font-extrabold" style={{ color: "var(--sky-ink)" }}>
                      {h.ref} →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm italic" style={{ color: "var(--ink-2)" }}>
              Las historias de este lugar llegarán con los próximos capítulos.
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-sm" style={{ color: "var(--ink-2)" }}>
          Toca un pin del mapa para viajar a sus historias 🌿
        </p>
      )}
    </div>
  );
}
