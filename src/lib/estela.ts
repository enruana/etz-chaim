// Medidas de la talla. Un rótulo en Big Shoulders 900 mide ~0.54em por
// carácter (medido en pantalla); `k` es el tamaño en vw con el que llena el
// ancho de la losa sin salirse.
export function k(texto: string, ancho = 91): number {
  const n = Math.max(texto.length, 2);
  return Math.round((ancho / (0.54 * n)) * 10) / 10;
}

export function dos(n: number): string {
  return String(n).padStart(2, "0");
}

// style={{ ...talla(34) }} → fija --k para la clase .gigante
export function talla(valor: number): React.CSSProperties {
  return { ["--k" as string]: valor } as React.CSSProperties;
}
