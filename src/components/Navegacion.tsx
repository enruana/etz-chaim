"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Hoy" },
  { href: "/mapa", label: "Mapa" },
  { href: "/memoria", label: "Memoria" },
];

const ESLABONES = ["Piedra", "Arcilla", "Papiro", "Pergamino", "Códice", "Imprenta", "Pantalla"];

// En teléfono y iPad vertical: barra inferior. En ancho: riel lateral.
export default function Navegacion() {
  const path = usePathname();
  if (path === "/login") return null;
  const activo = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <aside className="riel">
        <Link href="/" className="riel-marca">
          La
          <br />
          Biblia
        </Link>
        <nav>
          {TABS.map((t) => (
            <Link key={t.href} href={t.href} className={`riel-item mono${activo(t.href) ? " activo" : ""}`}>
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="riel-pie mono gris">
          {ESLABONES.map((e, i) => (
            <div key={e} style={i === ESLABONES.length - 1 ? { color: "var(--grafito)" } : undefined}>
              {i > 0 ? "↓ " : "  "}
              {e}
            </div>
          ))}
        </div>
      </aside>

      <nav className="nav-inferior mono">
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} className={activo(t.href) ? "activo" : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
