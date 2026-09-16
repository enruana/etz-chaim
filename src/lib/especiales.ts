// Estudios especiales: saltos temporales fuera de la ruta del plan
// (p. ej. un capítulo que se está viendo en un grupo). La tarjeta aparece
// en Hoy solo si el documento del estudio ya existe.

export type Especial = {
  libro: string;
  cap: number;
  titulo: string;
  motivo: string;
};

export const ESPECIALES: Especial[] = [
  {
    libro: "proverbios",
    cap: 21,
    titulo: "Proverbios 21",
    motivo: "Para tu grupo de parejas — la casa se construye con sabiduría",
  },
];
