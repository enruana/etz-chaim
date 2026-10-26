# Metodología de estudio por capítulo

Cada capítulo produce una carpeta `content/estudios/<libro>/<NN>/` con una parte por archivo (ver «Estructura» abajo). La metodología combina lo mejor de la investigación (`investigacion-2026-07-30-metodologia-estudio-biblico.md`): método inductivo OIA (Precept/Hendricks), lectura por género (Fee & Stuart), el Viaje Interpretativo (Duvall & Hays), lectura cristocéntrica del arco redentor, y la escalera de memorización con FSRS.

## La voz de los estudios (el tono)

El estudio se escribe **como un amigo que camina contigo por el texto**, no como un profesor dictando cátedra. La profundidad se queda; la rigidez se va. Reglas de voz:

- **Cálido y conversacional**: frases directas, párrafos cortos (3-5 líneas), segunda persona cuando ayude ("fíjate en...", "¿notaste que...?"). Que se lea como se conversa.
- **Explicativo, no técnico**: los términos griegos/hebreos y académicos entran solo si iluminan, y siempre traducidos en la misma frase y en cristiano ("Marcos usa una palabra que significa 'rasgar de arriba abajo' — la misma del velo del templo"). Jamás asumir jerga: si aparece "perícopa", mejor decir "escena". Nada de listas de abreviaturas ni paréntesis eruditos en cadena.
- **Narrativo**: contar la escena antes de analizarla — que el lector la *vea* (olores, geografía, quién está presente) y luego entienda por qué importa.
- **Reflexivo**: sembrar pausas de pensamiento a lo largo del texto, no solo al final. Preguntas breves en el camino («Pausa: ¿qué habrías sentido tú en esa sinagoga?») que inviten a contrastar y pensar, no a responder de memoria.
- **Honesto sin pesadez**: las dificultades se cuentan como conversación ("aquí es justo preguntarse..."), con la mejor respuesta explicada simple, y las fuentes al final sin interrumpir la lectura.
- **La estructura sirve a la lectura**: los títulos de sección pueden ser frases vivas ("Un día con Jesús en Capernaum") en vez de rótulos técnicos, siempre que cada parte siga reconocible.

**Principios innegociables:**

- **Texto base RVR1960**, citado fielmente — jamás parafrasear el texto bíblico como si fuera cita. Las explicaciones van en lenguaje natural nuestro, claro y colombiano si hace falta, pero el texto citado es RVR1960 literal.
- **Fidelidad a la ortodoxia cristiana histórica** (los credos: Apostólico, Niceno): la Escritura es Palabra de Dios, se interpreta a sí misma, y toda ella apunta a Cristo (Lc 24:27). Nada de especulación crítica que socave el texto; las dificultades se enfrentan con honestidad y con las mejores respuestas de la erudición creyente.
- **Significado antes que memoria**: nunca se memoriza un versículo sin antes haber entendido su contexto y sentido.
- **El texto manda**: primero observar qué dice, después interpretar qué significa, al final aplicar. Nunca al revés.

---

## Estructura: libro / capítulo / parte

Un capítulo ya no es una página larga: es una **carpeta con una parte por archivo**, y cada parte es una lectura corta (2-4 minutos, **300-800 palabras**) con su propia página y su propio ✓ de avance. La navegación tiene tres niveles — `marcos/3/7-12` — y un número de versículo lleva a la parte que lo contiene (`marcos/3/12` → `marcos/3/7-12`).

```
content/estudios/marcos/03/
  00-portada.md      Dónde estamos
  01-contexto.md     Contexto (+ hilos para ir siguiendo)
  02-1-6.md          escena 3:1-6
  03-7-12.md         escena 3:7-12
  …                  una por escena
  07-jesus.md        Lo que este capítulo dice de Jesús
  08-dificil.md      Hablemos de lo difícil
  09-aplicacion.md   ¿Y ahora qué?
  10-memoria.md      Memoria
  11-preguntas.md    Preguntas
  99-fuentes.md      Fuentes consultadas (no es una parte: va plegada al pie del índice)
```

El prefijo numérico fija el orden. Cada archivo abre con frontmatter (valores entre comillas dobles):

```
---
slug: "7-12"
tipo: "escena"
titulo: "El lago, una barca lista y los gritos que Jesús manda callar"
versos: "7-12"
---
```

- `tipo`: `portada` · `contexto` · `escena` · `jesus` · `dificil` · `aplicacion` · `memoria` · `preguntas` · `fuentes`.
- `slug`: `inicio` para la portada; el rango de versículos para una escena (`7-12`, o `1` si es un solo versículo); el nombre del tipo para las demás.
- `versos` (solo escenas): el rango, o una lista si la parte agrupa versículos salteados por tema, como en Proverbios (`"5,6,17,20,25-26"`; el slug es entonces el primer tramo: `5`).
- `titulo`: el título vivo de la parte. En la portada, `titulo` es el lema del capítulo («Los de adentro y los de afuera») y `entrada` el subtítulo de la parte.
- El cuerpo empieza directo con el texto: **sin encabezado propio** (la página lo pone) y sin emojis en el título.

### Las partes

**Dónde estamos** (`portada`) — libro, autor, audiencia, era del arco redentor, qué pasó antes y qué viene después, en 3-5 párrafos cortos. Termina invitando a leer el capítulo completo en la Biblia. **Sin tabla de escenas**: el índice del capítulo ya lo es. La era se escribe como enlace a su página en la app: `**[era 9 del arco redentor — Jesús y la iglesia](/mapa/arco/9)**` (las diez eras y sus libros están en `src/lib/arco.ts`; sus textos, en `content/arco/`).

**Contexto** (`contexto`) — lo que el lector original sabía sin que se lo dijeran: costumbres, geografía, política, religión, y dónde cae el capítulo en el argumento del libro. Si el género cambia respecto al capítulo anterior, la nota de cómo se lee va aquí. Cierra con `### Hilos para ir siguiendo`: 2-4 hilos (palabras que se repiten, contrastes, conectores) para llevar en la mano durante el recorrido.

**Las escenas** (`escena`) — el corazón del estudio, una parte por escena. Cada una se sostiene sola: primero se *ve* la escena, después qué dice el texto explicado en nuestra voz, con las citas RVR1960 literales, y —donde nazca natural— una pausa 🌿. Si una escena pasa de ~800 palabras, se parte en dos por su costura natural. En libros sin escenas (Proverbios), las partes son grupos temáticos.

**Jesús en el capítulo** (`jesus`) — Cristo en el capítulo y la doctrina: cómo apunta a Él (sin forzar) y qué enseña sobre Dios, el hombre, el pecado, la salvación.

**Lo difícil** (`dificil`) — las 2-3 dificultades que un lector honesto sí se va a preguntar, cada una bajo un `###`, contadas como conversación.

**¿Y ahora qué?** (`aplicacion`) — 2-3 preguntas de aplicación concretas, derivadas del punto teológico del capítulo.

**Memoria** (`memoria`) — versículo(s) clave (RVR1960 literal) con 1-2 preguntas de significado que se responden antes de memorizar. Alimenta el pool FSRS.

**Preguntas** (`preguntas`) — 6-10 preguntas con respuesta breve. Es el banco curado a mano de la app.

Meta total por capítulo: ~5.000-6.500 palabras, pero la medida que importa ahora es la de cada parte.

---

## Flujo de trabajo por capítulo

1. **Investigación profunda** del capítulo (agentes: comentarios clásicos y confiables, contexto histórico, original griego/hebreo donde importe) → las partes del capítulo, cada una en su archivo.
2. **Felipe lo estudia** con su Biblia RVR1960, parte por parte; la app registra el avance de cada una.
3. **Iteración**: dudas, correcciones y mejoras sobre el documento hasta que esté listo.
4. **Cierre**: se marca ✅ en `plan-de-estudio.md`, se registra el avance, y se pasa al siguiente capítulo.

Fuentes de consulta preferidas para la investigación: el texto mismo ante todo; comentarios de tradición evangélica conservadora (Matthew Henry, MacArthur, Hendriksen, Stott, Carson, comentarios técnicos NICNT/NICOT, Pillar), Tercer Milenio (español), BibleProject (panoramas), léxicos (Strong, BDAG/HALOT vía Blue Letter Bible). Siempre citando qué fuente respalda qué afirmación cuando no sea obvio del texto.

## Las ramas: historia alrededor de la Biblia

Una pista paralela al estudio por capítulos, pensada para leer **sin Biblia a la mano y sin tomar notas**: lo que no está en el texto pero lo rodea. Los temas transversales (canon, manuscritos, traducciones, comunidades, imperios…) viven en `content/ramas/` y se leen en la app bajo «Las ramas» (`/ramas`). **Lo propio de cada libro no es una rama**: va dentro del libro, en la sección «Alrededor de <Libro>» (`content/estudios/<libro>/alrededor/`, mismo formato), que se lee en la página del libro (`/estudiar/<libro>`) junto con su presentación (`content/estudios/<libro>/00-libro.md`: `titulo` es el lema, el cuerpo una presentación corta) y la cuadrícula de capítulos. Los datos los carga `src/lib/ramas.ts`.

**Estructura.** Cada **rama** es un tema abierto, una carpeta `content/ramas/<rama>/` (o `content/estudios/<libro>/alrededor/` para la del libro). Dentro, `00-rama.md` la presenta (frontmatter `titulo`, `entrada`, `orden`, y la lista `pendientes` con los folios que faltan por investigar, en orden tentativo) y cada `NN-<slug>.md` es un **folio**. No hay número fijo de folios: la rama crece a medida que avanzamos. Los folios se investigan uno a uno, no la rama completa de golpe; lo que falta se ve en la app como «En investigación».

**El folio.** Entre 600 y 1.200 palabras, para leerse en un rato suelto. Se sostiene solo: si cita un versículo, lo trae entero. Frontmatter:

- `rotulo`: una o dos palabras para tallar en la losa («Galilea», «66 libros»).
- `titulo` y `entrada`: el título vivo y una línea debajo.
- `tipo`: `contexto` | `arqueologia` | `cuadra` | `dificil` | `manuscritos` | `curiosidades`. Es una etiqueta, no una sección obligatoria: no todo folio tiene las seis cosas.
- `capitulos`: a qué capítulos se ata (`["marcos 1", "marcos 6"]`, o `["marcos"]` para todo el libro). El índice del capítulo lista los folios del libro bajo «Alrededor de <Libro>» y los transversales bajo «Por las ramas».
- `eras`: eras del arco redentor (`[9]`). La página de la era lista sus folios.
- `lugares`, `personas`: etiquetas en kebab-case para índices futuros.
- `fecha`: `"2026-10"`, el mes al corte del cual se escribió. La arqueología cambia; el folio dice de cuándo es.
- `fuentes`: lista de `titulo`, `postura` (`academica` | `confesional` | `critica` | `fuente antigua` | `arqueologia`) y `url` opcional. La postura va en la fuente, nunca en el folio.

**Honestidad con los dos lados.** Decimos qué se sabe, qué no, y quién dice qué. Ni apologética ni escepticismo de oficio. Un folio de tipo `dificil` lleva un bloque de **posturas**, dos o tres lecturas nombradas lado a lado, y cierra con «Dónde queda la cosa»: qué está resuelto y qué sigue abierto, y desde dónde estudiamos nosotros. El bloque se escribe así y la app lo compone como columnas:

```
::: posturas
### Católica
…
### Protestante
…
### Historiadores
…
:::
```

**Citas.** Las comillas angulares «…» se reservan para la RVR1960 literal y se cotejan contra el texto; cualquier otra cita (Josefo, Jerónimo, el Talmud, Lutero) va entre comillas rectas "…". La pausa 🌿 se usa igual que en los estudios.

**Las ramas transversales.** Están todas creadas desde el principio, aunque vacías, para que se vea el mapa de temas; cada una lista en `pendientes` por dónde va a empezar:

1. **Cómo se armó la Biblia**: el canon, qué libros entraron y cuáles no.
2. **Los que copiaron**: manuscritos, escribas, códices, variantes y crítica textual.
3. **La Biblia en español**: de la Vulgata a la Reina-Valera 1960; cómo se traduce.
4. **Las comunidades**: Israel y Judá, diáspora, Qumrán, partidos del judaísmo, iglesia primitiva.
5. **Los imperios**: Egipto, Asiria, Babilonia, Persia, Grecia, Roma, y la línea de tiempo.
6. **Quién lo escribió**: los debates de autoría, con los argumentos de cada lado.
7. **Lo que dice la pala**: arqueología y fuentes externas; cada folio dice de cuándo es.
8. **Las preguntas duras**: violencia, esclavitud, contradicciones aparentes, ciencia.
9. **Perdido en la traducción**: palabras hebreas y griegas, nombres, juegos de palabras.

**Alrededor de cada libro.** Cada libro estudiado tiene desde el inicio su sección «Alrededor de <Libro>» (la tierra, la gente y los papeles detrás del libro) con su propia lista de pendientes. Marcos ya la tiene; al abrir un libro nuevo se crean `00-libro.md` y `alrededor/00-rama.md`.

**Flujo.** Las ramas no esperan al capítulo. Cuando un capítulo de Marcos pide saber algo que no está en la Biblia, nace un folio en «Alrededor de Marcos», dentro del libro; las transversales avanzan un folio a la vez, cuando hay ganas de leer. El progreso es propio (tabla `folios_leidos`) y no toca el avance por capítulos.
