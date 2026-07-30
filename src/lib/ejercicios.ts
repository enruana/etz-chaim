// Banco de ejercicios curado a mano (nunca generado sin revisión).
// Fuente: content/estudios/marcos/marcos-01.md — secciones 11 (Memoria) y 12 (Preguntas).
// Texto bíblico: RVR1960 literal.

export type Ejercicio =
  | { id: string; tipo: "qa"; origen: string; front: string; back: string }
  | { id: string; tipo: "cloze"; origen: string; texto: string; ocultas: string[]; ref: string }
  | { id: string; tipo: "recitar"; origen: string; ref: string; texto: string }
  | { id: string; tipo: "referencia"; origen: string; texto: string; ref: string };

const MC_1_15 =
  "El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio.";
const MC_1_17 = "Venid en pos de mí, y haré que seáis pescadores de hombres.";

export const EJERCICIOS: Ejercicio[] = [
  // ——— Escalera de memoria: Marcos 1:15 ———
  { id: "v-mc-1-15-c1", tipo: "cloze", origen: "Marcos 1", texto: MC_1_15, ocultas: ["reino", "arrepentíos"], ref: "Marcos 1:15" },
  { id: "v-mc-1-15-c2", tipo: "cloze", origen: "Marcos 1", texto: MC_1_15, ocultas: ["tiempo", "cumplido", "reino", "acercado", "arrepentíos", "creed"], ref: "Marcos 1:15" },
  { id: "v-mc-1-15-rec", tipo: "recitar", origen: "Marcos 1", ref: "Marcos 1:15", texto: MC_1_15 },
  { id: "v-mc-1-15-ref", tipo: "referencia", origen: "Marcos 1", texto: MC_1_15, ref: "Marcos 1:15" },
  // ——— Marcos 1:17 ———
  { id: "v-mc-1-17-c1", tipo: "cloze", origen: "Marcos 1", texto: MC_1_17, ocultas: ["pos", "pescadores"], ref: "Marcos 1:17" },
  { id: "v-mc-1-17-rec", tipo: "recitar", origen: "Marcos 1", ref: "Marcos 1:17", texto: MC_1_17 },
  // ——— Comprensión: Marcos 1 ———
  {
    id: "q-mc1-01", tipo: "qa", origen: "Marcos 1",
    front: "¿Con qué frase abre Marcos su libro y qué dos títulos le da a Jesús desde el primer versículo?",
    back: "«Principio del evangelio de Jesucristo, Hijo de Dios» (1:1). Los títulos: Cristo (Mesías, el Rey ungido) e Hijo de Dios. Todo el libro demuestra esa doble tesis.",
  },
  {
    id: "q-mc1-02", tipo: "qa", origen: "Marcos 1",
    front: "¿Qué dos profetas cita Marcos en 1:2-3 y qué anunciaban esas profecías?",
    back: "Malaquías 3:1 e Isaías 40:3: un mensajero prepararía el camino del Señor. Al aplicarlas a Juan preparando el camino de Jesús, Marcos identifica a Jesús con el Señor mismo.",
  },
  {
    id: "q-mc1-03", tipo: "qa", origen: "Marcos 1",
    front: "En el bautismo de Jesús (1:9-11), ¿cómo aparecen las tres Personas de la Trinidad?",
    back: "El Hijo sube del agua; el Espíritu desciende como paloma; el Padre habla desde los cielos: «Tú eres mi Hijo amado; en ti tengo complacencia».",
  },
  {
    id: "q-mc1-04", tipo: "qa", origen: "Marcos 1",
    front: "¿Quién dijo esto y a quién?: «¿Qué tienes con nosotros, Jesús nazareno? … Sé quién eres, el Santo de Dios».",
    back: "El espíritu inmundo al Jesús, en la sinagoga de Capernaum (1:24). Lección: los demonios tienen la cristología correcta y están perdidos — saber quién es Jesús no es arrepentirse y creer (Stg 2:19).",
  },
  {
    id: "q-mc1-05", tipo: "qa", origen: "Marcos 1",
    front: "Ordena el «día en Capernaum»: (a) sanidades al ponerse el sol; (b) sinagoga y exorcismo; (c) oración de madrugada; (d) suegra de Simón.",
    back: "b → d → a → c: sinagoga en sábado (1:21-28), casa de Simón (1:29-31), al ponerse el sol (1:32-34), muy de mañana (1:35).",
  },
  {
    id: "q-mc1-06", tipo: "qa", origen: "Marcos 1",
    front: "Cuando Simón dice «Todos te buscan» (1:37), ¿por qué Jesús se va a otros pueblos en vez de volver a Capernaum?",
    back: "Su misión prioritaria era predicar el Reino: «Vamos a los lugares vecinos, para que predique también allí; porque para esto he venido» (1:38). Los milagros servían al mensaje. La claridad salió de la oración de madrugada.",
  },
  {
    id: "q-mc1-07", tipo: "qa", origen: "Marcos 1",
    front: "V/F: «Al tocar al leproso, Jesús quedó ceremonialmente inmundo y el milagro quedó invalidado».",
    back: "Falso. Con Jesús la corriente corre al revés: en lugar de contaminarse Él, el leproso quedó limpio (1:41-42). Y Jesús honró la ley enviándolo al sacerdote (1:44, Lv 14).",
  },
  {
    id: "q-mc1-08", tipo: "qa", origen: "Marcos 1",
    front: "¿Por qué Jesús le prohibió al leproso divulgar su sanidad, y qué consecuencia tuvo la desobediencia?",
    back: "Para proteger su predicación y evitar un mesianismo político-espectacular antes de tiempo. Consecuencia (1:45): «ya Jesús no podía entrar abiertamente en la ciudad» — el entusiasmo desobediente estorbó la misión.",
  },
  {
    id: "q-mc1-09", tipo: "qa", origen: "Marcos 1",
    front: "¿Qué paralelo hay entre los 40 días de Jesús en el desierto (1:12-13) y la historia de Israel?",
    back: "Israel, «hijo» de Dios, fue probado 40 años y falló; Jesús, el Hijo amado, es probado 40 días y permanece fiel. Jesús es el verdadero Israel y el nuevo Adán: gana como representante nuestro la batalla que el hombre perdía.",
  },
  {
    id: "q-mc1-10", tipo: "qa", origen: "Marcos 1",
    front: "Según 1:15, ¿cuál es el anuncio de Jesús y cuál es la doble respuesta que exige?",
    back: "Anuncio: «El tiempo se ha cumplido, y el reino de Dios se ha acercado». Respuesta: «arrepentíos, y creed en el evangelio» — cambiar de rumbo y confiar la vida a la buena noticia. Las dos juntas son la conversión.",
  },
];

export function ejercicio(id: string) {
  return EJERCICIOS.find((e) => e.id === id);
}

export function clozeTexto(texto: string, ocultas: string[]): string {
  let out = texto;
  for (const palabra of ocultas) {
    out = out.replace(new RegExp(`\\b${palabra}\\b`, "i"), "＿".repeat(Math.max(4, palabra.length)));
  }
  return out;
}
