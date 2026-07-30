import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito, Lora } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const ui = Nunito({ subsets: ["latin"], variable: "--font-ui" });
const serif = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Etz Chaim · estudio de la Biblia",
  description: "Árbol de vida es a los que de ella echan mano (Proverbios 3:18)",
};

export const viewport: Viewport = {
  themeColor: "#fffdfa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${ui.variable} ${serif.variable}`}>
        <div className="mx-auto max-w-3xl px-5 pb-28 pt-8">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
