"use client";

import dynamic from "next/dynamic";

const TreeOfLife = dynamic(() => import("./TreeOfLife"), {
  ssr: false,
  loading: () => (
    <div className="grid h-64 place-items-center text-sm" style={{ color: "var(--ink-2)" }}>
      Plantando el árbol…
    </div>
  ),
});

export default function TreeSection({ capitulos, libros }: { capitulos: number; libros: number }) {
  return (
    <div className="card overflow-hidden" style={{ borderRadius: 26 }}>
      <TreeOfLife capitulos={capitulos} libros={libros} />
      <p className="px-5 pb-4 text-center text-xs font-bold" style={{ color: "var(--ink-2)" }}>
        Tu árbol de la vida: una hoja por capítulo estudiado, un fruto dorado por libro completo.
      </p>
    </div>
  );
}
