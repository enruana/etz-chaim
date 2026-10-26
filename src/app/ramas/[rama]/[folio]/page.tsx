import { notFound } from "next/navigation";
import { rama as getRama } from "@/lib/ramas";
import { foliosLeidos } from "@/lib/db";
import FolioVista from "@/components/FolioVista";

export const dynamic = "force-dynamic";

// Un folio de una rama transversal.
export default async function FolioPage({ params }: { params: Promise<{ rama: string; folio: string }> }) {
  const { rama: ramaSlug, folio: folioSlug } = await params;
  const r = getRama(ramaSlug);
  if (!r || r.libro) notFound();
  const f = r.folios.find((x) => x.slug === folioSlug);
  if (!f) notFound();
  return <FolioVista r={r} f={f} leidos={foliosLeidos()} />;
}
