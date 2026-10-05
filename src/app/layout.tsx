import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navegacion from "@/components/Navegacion";

// Talla, metadatos y lectura: tres voces y nada más.
// Big Shoulders es variable: el eje óptico (opsz) da el corte «display» en tamaños grandes.
const display = Big_Shoulders({ subsets: ["latin"], axes: ["opsz"], variable: "--font-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });
const serif = Source_Serif_4({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "La Biblia",
  description: "Árbol de vida es a los que de ella echan mano (Proverbios 3:18)",
};

// themeColor = --losa-plana: el tono con que el navegador pinta la franja de
// estado, igual al borde superior de la losa. viewportFit "cover" deja que la
// página llegue a los bordes físicos (zona del indicador de inicio, muesca).
export const viewport: Viewport = {
  themeColor: "#c4bfb8",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${mono.variable} ${serif.variable}`}>
        <div className="marco">
          <Navegacion />
          <div className="columna">{children}</div>
        </div>
      </body>
    </html>
  );
}
