"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Hoy" },
  { href: "/mapa", label: "Mapa" },
  { href: "/memoria", label: "Memoria" },
];

export default function BottomNav() {
  const path = usePathname();
  if (path === "/login") return null;
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50"
      style={{
        background: "color-mix(in srgb, var(--papel) 94%, transparent)",
        backdropFilter: "blur(6px)",
        borderTop: "1px solid var(--filete-fuerte)",
      }}
    >
      <div className="mx-auto flex max-w-3xl justify-around px-5">
        {TABS.map((t) => {
          const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="rotulo px-5 pb-4 pt-3.5"
              style={{
                textDecoration: "none",
                color: active ? "var(--rubrica)" : "var(--tinta-suave)",
                borderTop: active ? "2px solid var(--rubrica)" : "2px solid transparent",
                marginTop: -1,
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
