// El mapa completo: 66 libros en orden pedagógico (ver content/plan-de-estudio.md).
// videos = panoramas de Proyecto Biblia (BibleProject en español).

export type Libro = {
  slug: string;
  nombre: string;
  caps: number;
  fase: number;
  genero: string;
  videos: string[];
};

const V = (s: string) => `https://spa.bibleproject.com/explore/video/${s}/`;

export const FASES: Record<number, { nombre: string; nota: string }> = {
  1: { nombre: "Jesús, el centro", nota: "Conocer a Jesús primero: Él es la clave de lectura de toda la Escritura." },
  2: { nombre: "Orígenes y pacto", nota: "El Pentateuco: creación, caída, promesa, redención y ley." },
  3: { nombre: "La tierra y el reino", nota: "El espinazo histórico de Israel, de la conquista al exilio." },
  4: { nombre: "Poesía y sabiduría", nota: "El corazón orante y sabio de Israel." },
  5: { nombre: "Profetas en contexto", nota: "Cada profeta leído sabiendo cuándo y a quién habló." },
  6: { nombre: "El Nuevo Testamento completo", nota: "Con el AT estudiado, Mateo, Lucas y Hebreos brillan." },
  7: { nombre: "La consumación", nota: "Apocalíptica, cuando ya se dominan géneros y trasfondo." },
};

export const CANON: Libro[] = [
  // Fase 1
  { slug: "marcos", nombre: "Marcos", caps: 16, fase: 1, genero: "Evangelio", videos: [V("mark"), V("euangelion-gospel")] },
  { slug: "juan", nombre: "Juan", caps: 21, fase: 1, genero: "Evangelio", videos: [V("john-1-12"), V("john-13-21")] },
  { slug: "hechos", nombre: "Hechos", caps: 28, fase: 1, genero: "Narrativa", videos: [V("acts-1-12"), V("acts-13-28")] },
  { slug: "santiago", nombre: "Santiago", caps: 5, fase: 1, genero: "Epístola", videos: [V("james")] },
  { slug: "filipenses", nombre: "Filipenses", caps: 4, fase: 1, genero: "Epístola", videos: [V("philippians")] },
  { slug: "1-juan", nombre: "1 Juan", caps: 5, fase: 1, genero: "Epístola", videos: [V("1-3-john")] },
  { slug: "romanos", nombre: "Romanos", caps: 16, fase: 1, genero: "Epístola", videos: [V("romans-1-4"), V("romans-5-16")] },
  // Fase 2
  { slug: "genesis", nombre: "Génesis", caps: 50, fase: 2, genero: "Narrativa", videos: [V("genesis-1-11"), V("genesis-12-50")] },
  { slug: "exodo", nombre: "Éxodo", caps: 40, fase: 2, genero: "Narrativa/Ley", videos: [V("exodus-1-18"), V("exodus-19-40")] },
  { slug: "levitico", nombre: "Levítico", caps: 27, fase: 2, genero: "Ley", videos: [V("leviticus")] },
  { slug: "numeros", nombre: "Números", caps: 36, fase: 2, genero: "Narrativa/Ley", videos: [V("numbers")] },
  { slug: "deuteronomio", nombre: "Deuteronomio", caps: 34, fase: 2, genero: "Ley/Sermón", videos: [V("deuteronomy")] },
  // Fase 3
  { slug: "josue", nombre: "Josué", caps: 24, fase: 3, genero: "Narrativa", videos: [V("joshua")] },
  { slug: "jueces", nombre: "Jueces", caps: 21, fase: 3, genero: "Narrativa", videos: [V("judges")] },
  { slug: "rut", nombre: "Rut", caps: 4, fase: 3, genero: "Narrativa", videos: [V("ruth")] },
  { slug: "1-samuel", nombre: "1 Samuel", caps: 31, fase: 3, genero: "Narrativa", videos: [V("1-samuel")] },
  { slug: "2-samuel", nombre: "2 Samuel", caps: 24, fase: 3, genero: "Narrativa", videos: [V("2-samuel")] },
  { slug: "1-reyes", nombre: "1 Reyes", caps: 22, fase: 3, genero: "Narrativa", videos: [V("kings")] },
  { slug: "2-reyes", nombre: "2 Reyes", caps: 25, fase: 3, genero: "Narrativa", videos: [V("kings")] },
  // Fase 4
  { slug: "salmos", nombre: "Salmos", caps: 150, fase: 4, genero: "Poesía", videos: [V("psalms"), V("art-biblical-poetry")] },
  { slug: "proverbios", nombre: "Proverbios", caps: 31, fase: 4, genero: "Sabiduría", videos: [V("proverbs"), V("wisdom-proverbs")] },
  { slug: "job", nombre: "Job", caps: 42, fase: 4, genero: "Sabiduría", videos: [V("job"), V("wisdom-job")] },
  { slug: "eclesiastes", nombre: "Eclesiastés", caps: 12, fase: 4, genero: "Sabiduría", videos: [V("ecclesiastes"), V("wisdom-ecclesiastes")] },
  { slug: "cantares", nombre: "Cantares", caps: 8, fase: 4, genero: "Poesía", videos: [V("song-songs")] },
  // Fase 5
  { slug: "jonas", nombre: "Jonás", caps: 4, fase: 5, genero: "Profecía", videos: [V("jonah")] },
  { slug: "amos", nombre: "Amós", caps: 9, fase: 5, genero: "Profecía", videos: [V("amos")] },
  { slug: "oseas", nombre: "Oseas", caps: 14, fase: 5, genero: "Profecía", videos: [V("hosea")] },
  { slug: "miqueas", nombre: "Miqueas", caps: 7, fase: 5, genero: "Profecía", videos: [V("micah")] },
  { slug: "isaias", nombre: "Isaías", caps: 66, fase: 5, genero: "Profecía", videos: [V("isaiah-1-39"), V("isaiah-40-66")] },
  { slug: "sofonias", nombre: "Sofonías", caps: 3, fase: 5, genero: "Profecía", videos: [V("zephaniah")] },
  { slug: "nahum", nombre: "Nahúm", caps: 3, fase: 5, genero: "Profecía", videos: [V("nahum")] },
  { slug: "habacuc", nombre: "Habacuc", caps: 3, fase: 5, genero: "Profecía", videos: [V("habakkuk")] },
  { slug: "joel", nombre: "Joel", caps: 3, fase: 5, genero: "Profecía", videos: [V("joel")] },
  { slug: "jeremias", nombre: "Jeremías", caps: 52, fase: 5, genero: "Profecía", videos: [V("jeremiah")] },
  { slug: "lamentaciones", nombre: "Lamentaciones", caps: 5, fase: 5, genero: "Poesía", videos: [V("lamentations")] },
  { slug: "abdias", nombre: "Abdías", caps: 1, fase: 5, genero: "Profecía", videos: [V("obadiah")] },
  { slug: "ezequiel", nombre: "Ezequiel", caps: 48, fase: 5, genero: "Profecía", videos: [V("ezekiel-1-33"), V("ezekiel-34-48")] },
  { slug: "daniel", nombre: "Daniel", caps: 12, fase: 5, genero: "Profecía/Apocalíptica", videos: [V("daniel")] },
  { slug: "hageo", nombre: "Hageo", caps: 2, fase: 5, genero: "Profecía", videos: [V("haggai")] },
  { slug: "zacarias", nombre: "Zacarías", caps: 14, fase: 5, genero: "Profecía", videos: [V("zechariah")] },
  { slug: "esdras", nombre: "Esdras", caps: 10, fase: 5, genero: "Narrativa", videos: [V("ezra-nehemiah")] },
  { slug: "nehemias", nombre: "Nehemías", caps: 13, fase: 5, genero: "Narrativa", videos: [V("ezra-nehemiah")] },
  { slug: "ester", nombre: "Ester", caps: 10, fase: 5, genero: "Narrativa", videos: [V("esther")] },
  { slug: "malaquias", nombre: "Malaquías", caps: 4, fase: 5, genero: "Profecía", videos: [V("malachi")] },
  { slug: "1-cronicas", nombre: "1 Crónicas", caps: 29, fase: 5, genero: "Narrativa", videos: [V("chronicles")] },
  { slug: "2-cronicas", nombre: "2 Crónicas", caps: 36, fase: 5, genero: "Narrativa", videos: [V("chronicles")] },
  // Fase 6
  { slug: "mateo", nombre: "Mateo", caps: 28, fase: 6, genero: "Evangelio", videos: [V("matthew-1-13"), V("matthew-14-28")] },
  { slug: "lucas", nombre: "Lucas", caps: 24, fase: 6, genero: "Evangelio", videos: [V("luke-1-9"), V("luke-10-24")] },
  { slug: "1-corintios", nombre: "1 Corintios", caps: 16, fase: 6, genero: "Epístola", videos: [V("1-corinthians")] },
  { slug: "2-corintios", nombre: "2 Corintios", caps: 13, fase: 6, genero: "Epístola", videos: [V("2-corinthians")] },
  { slug: "galatas", nombre: "Gálatas", caps: 6, fase: 6, genero: "Epístola", videos: [V("galatians")] },
  { slug: "efesios", nombre: "Efesios", caps: 6, fase: 6, genero: "Epístola", videos: [V("ephesians")] },
  { slug: "colosenses", nombre: "Colosenses", caps: 4, fase: 6, genero: "Epístola", videos: [V("colossians")] },
  { slug: "1-tesalonicenses", nombre: "1 Tesalonicenses", caps: 5, fase: 6, genero: "Epístola", videos: [V("1-thessalonians")] },
  { slug: "2-tesalonicenses", nombre: "2 Tesalonicenses", caps: 3, fase: 6, genero: "Epístola", videos: [V("2-thessalonians")] },
  { slug: "filemon", nombre: "Filemón", caps: 1, fase: 6, genero: "Epístola", videos: [V("philemon")] },
  { slug: "1-timoteo", nombre: "1 Timoteo", caps: 6, fase: 6, genero: "Pastoral", videos: [V("1-timothy")] },
  { slug: "2-timoteo", nombre: "2 Timoteo", caps: 4, fase: 6, genero: "Pastoral", videos: [V("2-timothy")] },
  { slug: "tito", nombre: "Tito", caps: 3, fase: 6, genero: "Pastoral", videos: [V("titus")] },
  { slug: "hebreos", nombre: "Hebreos", caps: 13, fase: 6, genero: "Epístola/Sermón", videos: [V("hebrews")] },
  { slug: "1-pedro", nombre: "1 Pedro", caps: 5, fase: 6, genero: "Epístola", videos: [V("1-peter")] },
  { slug: "2-pedro", nombre: "2 Pedro", caps: 3, fase: 6, genero: "Epístola", videos: [V("2-peter")] },
  { slug: "judas", nombre: "Judas", caps: 1, fase: 6, genero: "Epístola", videos: [V("jude")] },
  { slug: "2-juan", nombre: "2 Juan", caps: 1, fase: 6, genero: "Epístola", videos: [V("1-3-john")] },
  { slug: "3-juan", nombre: "3 Juan", caps: 1, fase: 6, genero: "Epístola", videos: [V("1-3-john")] },
  // Fase 7
  { slug: "apocalipsis", nombre: "Apocalipsis", caps: 22, fase: 7, genero: "Apocalíptica", videos: [V("revelation-1-11"), V("revelation-12-22"), V("apocalyptic-literature")] },
];

export const TOTAL_CAPS = CANON.reduce((n, l) => n + l.caps, 0);

export function libro(slug: string): Libro | undefined {
  return CANON.find((l) => l.slug === slug);
}
