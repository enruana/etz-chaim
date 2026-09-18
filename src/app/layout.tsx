import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond, Alegreya_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

// Piedra · imprenta · pantalla: tres voces de la cadena de transmisión.
const display = Cinzel({ subsets: ["latin"], variable: "--font-display" });
const serif = EB_Garamond({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const ui = Alegreya_Sans({ subsets: ["latin"], weight: ["400", "500", "700", "800"], variable: "--font-ui" });

export const metadata: Metadata = {
  title: "La Biblia",
  description: "Árbol de vida es a los que de ella echan mano (Proverbios 3:18)",
};

export const viewport: Viewport = {
  themeColor: "#d9cbab",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${serif.variable} ${ui.variable}`}>
        <div className="mx-auto max-w-3xl px-3.5 pb-24 pt-5 sm:px-5 sm:pb-28 sm:pt-8">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
