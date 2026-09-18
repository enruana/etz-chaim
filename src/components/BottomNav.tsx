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
      className="repisa fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto flex max-w-3xl justify-around px-5">
        {TABS.map((t) => {
          const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="rotulo px-5 pb-3.5 pt-3 sm:pb-4 sm:pt-3.5"
              style={{
                textDecoration: "none",
                color: active ? "#f3e9d0" : "#a3957d",
                textShadow: "0 -1px 0 rgb(0 0 0 / 0.6)",
                borderTop: active ? "2px solid #f3e9d0" : "2px solid transparent",
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
