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

**Dónde estamos** (`portada`) — libro, autor, audiencia, era del arco redentor, qué pasó antes y qué viene después, en 3-5 párrafos cortos. Termina invitando a leer el capítulo completo en la Biblia. **Sin tabla de escenas**: el índice del capítulo ya lo es.

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
