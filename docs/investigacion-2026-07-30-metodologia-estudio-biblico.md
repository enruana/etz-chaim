# Investigación: metodología para aprender la Biblia (base del currículo de la app)

**Fecha:** 2026-07-30
**Objetivo:** establecer la mejor metodología de estudio bíblico (perspectiva cristiana) para diseñar una app personal de aprendizaje estructurado en tracks/niveles con ejercicios interactivos y repetición espaciada FSRS, al estilo del proyecto `guitar-pro` (la intención, no los estilos).

Síntesis de tres investigaciones paralelas: (1) metodologías de estudio bíblico, (2) apps y currículos existentes, (3) ciencia del aprendizaje aplicada.

---

## 1. Conclusión principal

**No existe "un" método ganador: los métodos operan a escalas distintas y un buen currículo los secuencia.**

| Escala | Método | Rol en la app |
|---|---|---|
| Macro (mapa) | **Teología bíblica / arco redentor** (BibleProject, Vaughan Roberts): la Biblia como una historia unificada que lleva a Jesús | Niveles iniciales: organizador previo de todo lo demás |
| Meso (territorio) | **Estudio por libro / panorama por eras** (OT/NT survey) | Columna vertebral del contenido |
| Micro (microscopio) | **Método inductivo OIA** (Observación → Interpretación → Aplicación; Precept/Kay Arthur) + **géneros literarios** (Fee & Stuart) | La *habilidad* transferible que la app entrena |
| Hábito | SOAP / lectio divina | Ritual diario de la app, no columna de aprendizaje |

Reglas de consenso entre seminarios y ministerios:

1. **Nunca leer de Génesis a Apocalipsis de corrido** — el orden canónico es por tipo de literatura, no pedagógico; es el plan con mayor tasa de abandono (el "cementerio de Levítico").
2. **Empezar por un Evangelio** (Marcos o Juan): conocer a Jesús primero da la clave de lectura del resto.
3. **Mapa antes que microscopio**: el arco narrativo completo (en ~10 eras) antes de estudiar libros en detalle.
4. **El género literario es el descubrimiento pedagógico central** (Fee & Stuart): la mayoría de errores de interpretación son errores de género. La Biblia tiene ~8 géneros con reglas de lectura propias: narrativa, ley, poesía/salmos, sabiduría, profecía, evangelios, epístolas, apocalíptica.
5. **El "Viaje Interpretativo" de Duvall & Hays es el modelo más gamificable**: 5 pasos discretos y verificables (texto en su ciudad → medir el río de diferencias → puente de principios → mapa bíblico → nuestra ciudad).
6. La observación estilo Precept (marcar palabras clave, 5W+H, conectores, contrastes) **nunca se ha digitalizado como ejercicio interactivo** — oportunidad directa.

---

## 2. Qué hacen los productos existentes (y el hueco)

| Capa | Quién la hace bien | Qué le falta |
|---|---|---|
| Hábito diario | YouVersion (rachas, planes) | Mide apertura de app, no comprensión |
| Comprensión estructurada | BibleProject Classroom, Tercer Milenio (seminario gratuito **en español**) | Consumo pasivo + quiz; sin repaso espaciado |
| Práctica activa + SRS | Bible Memory App, Remember Me (SRS **en español**) | Solo memorización de versículos, nada más |
| Gamificación | Ascend/Manna ("Duolingo de la Biblia", solo inglés) | Contenido generado con IA con errores graves; fluff |

**Huecos que ningún producto cubre (y que esta app puede):**

1. Nadie combina las tres capas: hábito + comprensión por niveles + SRS con ejercicios activos.
2. La repetición espaciada solo se aplica a versículos, **nunca a estructura del canon, cronología, geografía, personajes o teología**. No existe un "Anki de alfabetización bíblica".
3. Nadie evalúa comprensión de lectura (¿entendiste el argumento de Romanos 3?), solo trivia.
4. El método inductivo nunca se ha convertido en ejercicio interactivo con feedback.
5. **En español el hueco es total**: hay contenido excelente (Tercer Milenio, BibleProject en español) pero cero apps de práctica estructurada.

Lección de los fracasos (reviews de Ascend): **banco de ejercicios curado a mano > generación automática con IA**. Los misquotes del texto bíblico destruyen la confianza inmediatamente.

Patrones que sí se repiten en los productos exitosos: unidad diaria de <10-20 min; explicación inmediatamente después de la lectura (The Bible Recap); narrativa macro antes del detalle; escalera de dificultad en memorización (texto completo → first-letter → blanks → tecleo); progreso visible por niveles/certificación.

---

## 3. Ciencia del aprendizaje: reglas de diseño

**Evidencia central:**

- **Testing effect** (Roediger & Karpicke 2006, con prosa): recitar retiene 61% a la semana vs. 40% releyendo. La relectura es ilusión de fluidez.
- **3R (Read-Recite-Review)** (McDaniel 2009): leer → recitar de memoria → verificar. La unidad de ejercicio ideal para pasajes nuevos.
- **Successive relearning** (Rawson & Dunlosky): 1 recuerdo correcto por sesión, en varias sesiones espaciadas — sobre-aprender en una sesión es ineficiente. **El algoritmo decide los repasos, no el usuario** (si el usuario auto-gestiona el descarte, el beneficio desaparece).
- **Organizadores previos** (Ausubel): el marco general antes del detalle funciona especialmente cuando no hay conocimiento previo. Pero el mapa se *presenta* como organizador y se *entrena* por recuperación (Karpicke & Blunt 2011: mapas conceptuales pasivos rinden menos que retrieval; el híbrido ganador es el mapa reconstruido de memoria).
- **Significado antes que memoria** (Noice, memoria de actores): anclar contexto y sentido (¿quién lo dice, a quién, por qué?) antes de memorizar verbatim.
- **Interleaving**: intercalar lo confundible (profetas menores, reyes de Israel vs. Judá, epístolas parecidas); bloquear la primera exposición a material nuevo.
- **Gamificación**: solo *informacional* (medición visible de dominio real), nunca controladora. Sí: mapa del canon iluminándose por dominio, % retención, hitos. Con cuidado: streak semanal flexible (5 de 7 días), no cadena diaria frágil. No: monedas, rankings, XP farmeable, mascota que llora.

**Escalera de memorización de un versículo** (cada peldaño = estado del ítem FSRS):

1. Leer con contexto + 2 preguntas de significado
2. 3R: leer → recitar → verificar
3. Cloze 20-30% (palabras de contenido)
4. Cloze 50-70%
5. First-letter (solo iniciales)
6. Recitación libre desde la referencia
7. Inverso: dado el texto, dar la referencia (carta separada)

**Estructura de sesión diaria (~15-20 min):**

1. **Repaso FSRS primero** (5-10 min): cartas vencidas de *todas* las habilidades mezcladas (interleaving gratis). El repaso nunca se sacrifica por contenido nuevo.
2. **Contenido nuevo** (5-8 min): UN bloque de la unidad activa: organizador previo → lectura guiada → primer retrieval (3R o quiz).
3. **Cierre generativo** (2-3 min): recuperación libre ("resume de memoria...") que siembra las cartas FSRS del día.

**Dosificación:** ~5-10 cartas nuevas/día máximo; 1 versículo nuevo cada 2-3 días; pausa automática de cartas nuevas si la cola de repaso supera ~15 min; retención FSRS 0.90 para versículos, 0.85 para hechos de fondo.

---

## 4. Taxonomía de habilidades → tipos de ejercicio

| Habilidad | Ejercicio óptimo |
|---|---|
| Estructura del canon (orden, géneros) | Ordenamiento drag-and-drop, clasificación por género, cartas FSRS de posición |
| Arco narrativo / cronología | Línea de tiempo reconstruida de memoria; ordenar eventos; emparejar rey↔profeta↔era |
| Geografía bíblica | Mapa interactivo ciego ("toca dónde está Ur", "traza el 2º viaje de Pablo") |
| Personajes y relaciones | Flashcards FSRS, árboles genealógicos para completar, "¿quién dijo esto a quién?" |
| Versículos clave (verbatim) | Escalera de 7 peldaños (arriba) con FSRS |
| Hermenéutica (género, contexto, OIA) | Lectura guiada con preguntas intercaladas; identificar género/audiencia/propósito de pasajes no vistos; marcar palabras clave con feedback |
| Teología / doctrina | Flashcards concepto↔definición↔versículos-soporte |
| Referencia↔contenido | Carta bidireccional ("¿de qué trata Filipenses 2?" / "¿dónde está el himno kenótico?") |

---

## 5. Propuesta de estructura para la app (análoga a guitar-pro)

Tres tracks paralelos e independientes (como Técnica/Lenguaje Musical) + un entrenador transversal:

### Track 1 — Historia (el mapa) 🟦
El arco redentor y el panorama del canon. Niveles:
1. **La gran historia** — el arco en ~10 eras (Creación → Patriarcas → Éxodo → Conquista → Reino → Exilio → Retorno → Evangelios → Iglesia → Consumación); línea de tiempo; los 66 libros y sus géneros.
2. **Jesús primero** — Evangelio de Marcos (o Juan): episodios, estructura, geografía de los evangelios.
3. **La columna del AT** — Génesis → Reyes: el espinazo histórico, pactos, personajes, geografía.
4. **Profetas y poesía en contexto** — dónde encaja cada profeta y salmo en la línea de tiempo.
5. **Iglesia y cartas** — Hechos, viajes de Pablo, epístolas en su contexto.

### Track 2 — Método (el microscopio) 🟨
La habilidad de estudiar un pasaje por ti mismo. Niveles:
1. **Observación** — palabras clave, 5W+H, contrastes, conectores (Precept digitalizado, con marcado interactivo del texto).
2. **Géneros literarios** — un módulo por género con sus reglas y trampas (temario Fee & Stuart).
3. **Interpretación** — contexto, comparar Escritura con Escritura, exégesis vs. hermenéutica.
4. **El Viaje Interpretativo** (Duvall & Hays, 5 pasos) — aplicado a epístolas cortas primero (Filipenses, Santiago), luego géneros difíciles.
5. **Aplicación y estudio autónomo** — pasajes no vistos, de dificultad creciente.

### Track 3 — Memoria (el tesoro) 🟩
Memorización de versículos y pasajes clave con la escalera de 7 peldaños + FSRS. Listas curadas por tema (el evangelio, promesas, sabiduría...) y pasajes largos troceados en cadena (Salmo 23, Romanos 8, Sermón del Monte).

### Entrenador transversal (análogo al note trainer de guitar-pro)
Pool FSRS global que mezcla todas las habilidades: canon, cronología, geografía, personajes, referencias, doctrina y versículos. Es la sesión diaria de repaso; los tracks siembran ítems aquí al completar niveles.

### Principios de implementación
- Catálogo en código con sync idempotente (patrón `seed.ts` de guitar-pro); `exercises.type` + `config` JSON data-driven.
- FSRS v4 reutilizado de guitar-pro (`src/lib/srs.ts`), con retención 0.90/0.85 según tipo de ítem.
- Texto bíblico: **curado a mano, nunca generado por IA** (lección de Ascend). Fuentes candidatas de contenido: Tercer Milenio (español, gratuito, nivel seminario), BibleProject en español, texto RVR60 (dominio público) o NVI/NTV (licencia — verificar).
- Gamificación informacional: mapa de los 66 libros iluminándose por dominio, % retención por habilidad, hitos.

---

## 6. Decisiones pendientes (del usuario)

1. **Orientación**: evangélica (66 libros, método inductivo como núcleo) / católica (73 libros, lectio divina + Bible Timeline de Jeff Cavins como paralelo) / ecuménica (núcleo común, canon con toggle). El NT es idéntico en todas; el 95% del currículo sería común. La investigación asume núcleo inductivo + arco redentor, que funciona para ambos públicos.
2. **Traducción base**: RVR60 (dominio público, tradicional) vs. NVI (equilibrio, licencia) vs. NTV (claridad). Afecta qué texto se puede embeber legalmente en la app.
3. **Alcance del track Memoria**: solo versículos clave vs. incluir pasajes largos encadenados desde el inicio.

---

## 7. Fuentes principales

**Metodología:** Precept ([método inductivo](https://www.precept.org/2023/02/what-is-inductive-bible-study/), [observación](https://www.preceptaustin.org/observation)) · Fee & Stuart, *How to Read the Bible for All Its Worth* · Hendricks, *Living by the Book* · Duvall & Hays, *Grasping God's Word* ([Viaje Interpretativo](https://e360bible.org/how-to-study-the-bible/the-interpretive-journey/)) · [God's Big Picture (TGC)](https://www.thegospelcoalition.org/course/gods-big-picture-tracing-storyline-bible/) · [orden de lectura recomendado](https://christianityfaq.com/suggested-reading-order-bible/)

**Productos:** [BibleProject Classroom](https://bibleproject.com/classroom/) · [Tercer Milenio (español)](http://espanol.thirdmill.org/) · [Bible Memory App](https://biblememory.com/) · [Remember Me](https://www.remem.me/) · [The Bible Recap](https://www.bible.com/reading-plans/42399-the-bible-recap-with-tara-leigh-cobble) · [reviews críticas de Ascend](https://apps.apple.com/us/app/ascend-bible-game/id6739925865?see-all=reviews&platform=iphone) · [BiblicalTraining.org](https://www.biblicaltraining.org/programs/institute)

**Ciencia del aprendizaje:** [Roediger & Karpicke 2006](http://psychnet.wustl.edu/memory/wp-content/uploads/2018/04/Roediger-Karpicke-2006_PPS.pdf) · [McDaniel 3R 2009](https://pubmed.ncbi.nlm.nih.gov/19320858/) · [Rawson & Dunlosky, successive relearning](https://journals.sagepub.com/doi/full/10.1177/09637214221100484) · [Karpicke & Blunt 2011 (Science)](https://www.science.org/doi/10.1126/science.1199327) · [Noice & Noice, memoria de actores](https://www.psychologicalscience.org/observer/to-be-or-or-um-line) · [Rubin, *Memory in Oral Traditions*](https://academic.oup.com/book/53811) · [FSRS retención óptima](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-optimal-retention) · [meta-análisis gamificación (Springer 2024)](https://link.springer.com/article/10.1007/s11423-023-10337-7) · [Gwern, spaced repetition](https://gwern.net/spaced-repetition)

*Los informes completos de las tres investigaciones (con todas las fuentes) están en los transcripts de la sesión "studying" del 2026-07-30.*
