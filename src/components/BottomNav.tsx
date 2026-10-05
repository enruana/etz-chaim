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
    <nav className="fixed inset-x-0 bottom-0 z-50">
      <div
        className="mx-auto grid max-w-3xl grid-cols-3"
        style={{ background: "var(--piedra)", borderTop: "1px solid var(--grafito)" }}
      >
        {TABS.map((t, i) => {
          const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="mono flex items-center justify-center"
              style={{
                height: 58,
                fontSize: "0.8125rem",
                textDecoration: "none",
                background: active ? "var(--grafito)" : "var(--piedra)",
                color: active ? "var(--piedra)" : "var(--grafito)",
                borderLeft: i > 0 ? "1px solid var(--grafito)" : undefined,
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
