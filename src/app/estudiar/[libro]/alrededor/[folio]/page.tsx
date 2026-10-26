import { notFound } from "next/navigation";
import { ramaDeLibro } from "@/lib/ramas";
import { foliosLeidos } from "@/lib/db";
import FolioVista from "@/components/FolioVista";

export const dynamic = "force-dynamic";

// Un folio de «Alrededor de <Libro>»: /estudiar/marcos/alrededor/<folio>.
export default async function FolioDeLibroPage({ params }: { params: Promise<{ libro: string; folio: string }> }) {
  const { libro, folio: folioSlug } = await params;
  const r = /^[a-z0-9-]+$/.test(libro) ? ramaDeLibro(libro) : null;
  if (!r) notFound();
  const f = r.folios.find((x) => x.slug === folioSlug);
  if (!f) notFound();
  return <FolioVista r={r} f={f} leidos={foliosLeidos()} />;
}
