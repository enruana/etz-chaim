import {
  capituloCompleto,
  desmarcarCapitulo,
  marcarCapitulo,
  marcarPartes,
  partesLeidas,
} from "./db";
import { getCapitulo } from "./studies";

// Estado de lectura de un capítulo: qué partes están leídas y cuál sigue.
export function estadoCapitulo(libro: string, cap: number) {
  const capitulo = getCapitulo(libro, cap);
  if (!capitulo) return null;

  let leidas = partesLeidas(libro, cap);
  // Capítulos marcados completos antes de que existieran las partes.
  if (leidas.size === 0 && capituloCompleto(libro, cap)) {
    marcarPartes(libro, cap, capitulo.partes.map((p) => p.slug));
    leidas = partesLeidas(libro, cap);
  }

  const hechas = capitulo.partes.filter((p) => leidas.has(p.slug)).length;
  return {
    capitulo,
    leidas,
    hechas,
    total: capitulo.partes.length,
    siguiente: capitulo.partes.find((p) => !leidas.has(p.slug)) ?? null,
    completo: hechas === capitulo.partes.length,
  };
}

// El capítulo queda completo exactamente cuando todas sus partes están leídas.
export function sincronizarCapitulo(libro: string, cap: number) {
  const capitulo = getCapitulo(libro, cap);
  if (!capitulo) return;
  const leidas = partesLeidas(libro, cap);
  if (capitulo.partes.every((p) => leidas.has(p.slug))) marcarCapitulo(libro, cap);
  else desmarcarCapitulo(libro, cap);
}
