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
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="card flex gap-1 px-2 py-2" style={{ borderRadius: 999 }}>
        {TABS.map((t) => {
          const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="pill px-5 py-1.5 text-sm"
              style={
                active
                  ? { background: "var(--sky-soft)", color: "var(--sky-ink)" }
                  : { color: "var(--ink-2)" }
              }
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
