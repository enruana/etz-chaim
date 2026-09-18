# Línea de diseño «El Códice» — de la piedra a la pantalla

**Fecha:** 2026-09-18 · **Reemplaza a:** «Mañana en Brisbane» (`investigacion-2026-07-30-estilos.md`, que queda como historia).
**Pedido de Felipe:** pasar del aire dulce y dinámico a uno histórico, vinculado con lo que la Biblia realmente es: de dónde provino, cómo se han encontrado partes de ella, y cómo transmitimos el conocimiento — piedra, papiro, pergamino.

## La tesis

La Biblia llegó hasta nosotros por una cadena de soportes, cada uno entregándole el texto al siguiente:

**piedra** (las tablas del Sinaí) → **arcilla** (cuneiforme) → **papiro** (P52, ~125 d.C.: el fragmento más antiguo del NT) → **pergamino** (el Gran Rollo de Isaías de Qumrán, hallado en 1947) → **códice** (Sinaítico y Vaticano, s. IV) → **imprenta** (Gutenberg, 1454; los versículos de Estienne, 1551) → **pantalla**.

Un dato que lo resume: en el siglo II solo ~3% de los libros paganos eran códices, pero ~77% de los cristianos ya lo eran. Los cristianos adoptaron el códice porque permitía *saltar entre pasajes*. El códice es el antepasado directo de esta app — y la app es el siguiente eslabón legítimo de la cadena, no un disfraz del anterior.

## La regla de oro

**Heredar los oficios del libro, nunca imitar sus materiales.** Los proyectos que hacen bien lo histórico en digital (Codex Sinaiticus, los Rollos del Mar Muerto digitales, Bibliotheca de Adam Lewis Greene, los sistemas editoriales del Met y el Getty) tienen interfaces neutras y disciplinadas. Lo antiguo entra por tres canales legítimos:

1. la **fotografía real** del artefacto (nunca como textura de fondo),
2. las **convenciones tipográficas** heredadas: rúbricas, capitulares, versalitas, filetes, márgenes, colofones,
3. la **materialidad sugerida** (papel cálido, tinta casi-negra), jamás simulada.

Kitsch prohibido: pergamino quemado, bordes rasgados, sellos de cera, fuentes-disfraz (Papyrus, blackletter en la interfaz), marcos dorados, degradados metálicos, sepia extremo.

## Tokens (`src/app/globals.css`) — valores de la primera versión; los vigentes (más oscuros, de piedra) están en el CSS

| Token | Hex | De dónde viene |
|---|---|---|
| `--papel` | `#F7F1E3` | vitela clara: el fondo |
| `--papel-hundido` | `#EFE7D3` | paneles, pistas, la pausa |
| `--hoja` | `#FBF7EC` | la hoja sobre la mesa: superficies |
| `--tinta` | `#2B231C` | tinta ferrogálica: marrón-negro, nunca `#000` |
| `--tinta-suave` | `#65594A` | la ferrogálica desvanecida a sepia: secundarios |
| `--rubrica` | `#9A3324` | el rojo con que los escribas escribían los títulos (*rubrica* = tierra roja; de ahí la palabra). **Único acento. Si pasa del ~2% de la pantalla, sobra.** |
| `--filete` / `--filete-fuerte` | tinta al 20% / 50% | líneas en vez de sombras |
| `--ocre-suave` | `#EFE2BF` | lo que está en curso |
| `--cardenillo` / `-suave` | `#4F7A6D` / `#DDE6DC` | verdigris de las iluminaciones: lo completado |

Reservados, sin uso todavía (colores ceremoniales de los iluminadores): lapislázuli `#2F4F7F` y el púrpura de los códices purpúreos — este último sería la base histórica de un eventual modo oscuro ("vitrina"), hoy descartado: la app es solo clara.

## Tipografía: tres voces de la cadena

- **Cinzel** — *piedra*. Basada en las inscripciones romanas talladas del siglo I. Solo para los nombres grandes (`h1`) y la letra capitular. Usarla para todo sería kitsch.
- **EB Garamond** — *imprenta*. Revival fiel del tipo de Claude Garamont (espécimen Egenolff-Berner, 1592): el garamond del primer siglo de la imprenta. Todo lo que se lee: estudios, títulos de sección, citas. 20px, interlineado 1.68, columna de 36rem, guionado en español, cifras de estilo antiguo.
- **Alegreya Sans** — *pantalla*. Humanista, para la máquina: rótulos en versalitas espaciadas, botones, navegación, tablas.

## Motivos heredados

1. **Rúbrica** — los títulos de sección del estudio van en rojo, como en los manuscritos: jerarquía por color, no por tamaño.
2. **Capitular** — solo el primer párrafo de cada estudio, en Cinzel rojo, tres líneas.
3. **Doble filete** — umbral de sección (estudio, fases del mapa, encabezado de Hoy).
4. **Filete en vez de sombra** — las tarjetas son hojas con borde fino y radio de 3px; las sombras y las píldoras se fueron.
5. **La Escritura citada** — sangría con filete rojo a la izquierda; **la pausa** y las notas — recuadro hundido entre filetes, con fleuron ❦ en lugar de la hoja 🌿.
6. **Colofón** — cada estudio termina como firmaban los escribas: fleuron, «Aquí termina el estudio de…», y la versión del texto.
7. **Numeración romana** — fases (Fase IV) y videos.
8. **La cadena** — *Piedra · Arcilla · Papiro · Pergamino · Códice · Imprenta · **Pantalla*** al pie de Hoy y del login: la tesis, siempre a la vista.
9. **Sin emojis** — los documentos de estudio los conservan (son parte de la metodología), pero `src/lib/studies.ts` los retira al componer la página.

## Revisión del mismo día: la talla en piedra

La primera versión (papel cálido, editorial, casi sin textura) le pareció a Felipe demasiado limpia: pidió **más textura, que parezca roca, más interesante** — y letra más pequeña en móvil para aprovechar el espacio. La línea se mantiene (la cadena de transmisión, rúbricas, capitulares, colofón) pero el material dominante pasa del papel a **la piedra**, el primer eslabón de la cadena:

- **La pared de roca** — el fondo de la app es una sola pieza de caliza dorada (la piedra de Jerusalén), generada de forma procedural: ruido fractal en dos escalas (relieve + grano fino) con luz rasante (`feTurbulence` + `feDiffuseLighting` en un SVG inline) y manchas minerales. Relieve real, ~1 KB, sin imágenes ni costuras (una pieza fija del tamaño de la ventana).
- **Las losas** (`.hoja`) — la misma piedra cortada y pulida: textura suave para que el texto largo se lea nítido, con aristas (luz arriba-izquierda, sombra abajo-derecha) y sombra de apoyo. Las etiquetas del mapa son teselas; la pausa es un nicho rebajado.
- **La talla** — títulos en Cinzel como letra incisa (sombra arriba, luz en el borde inferior). El nombre de la app va tallado y **pintado de rojo**, como las inscripciones antiguas, cuyas letras se rellenaban con minio.
- **Basalto** — botones primarios y la repisa de navegación, en piedra oscura con la letra clara.
- **Texto sobre roca viva** (`.sobre-roca`): más oscuro y con halo de luz para que no pierda legibilidad.

Esto contradice a sabiendas una regla de la investigación ("materialidad sugerida, nunca simulada"): la preferencia de Felipe manda. Se conserva lo esencial de esa regla donde importa — el texto de lectura va siempre sobre losa pulida, nunca sobre la roca rugosa.

**Móvil compacto:** base 0.92rem, estudio 1.06rem/1.56 (antes 1.28rem), rótulos 0.62rem, márgenes y rellenos reducidos, Memoria y Mapa lado a lado en Hoy. En una pantalla de teléfono caben ~3 párrafos de estudio (antes 1) y 4 fases del mapa.

## Lo que sigue siendo cierto

Tema claro único. Gamificación solo informacional. La calidez no se fue: pasó de los radios y los pasteles a los tokens — papel crema, tinta marrón, óxido. No es un museo frío; es sobrio y cálido.

## Ideas para después

- Fotografías reales de manuscritos (dominio público) al abrir cada libro: P52 en Juan, el Rollo de Isaías en Isaías — presentadas como en vitrina, con pie de foto y procedencia.
- Un "modo lectura" que oculte numeración y encabezados (a lo Bibliotheca).
- Nombres divinos en versalitas.

## Fuentes principales

Historia material: Rylands P52, papiros Chester Beatty, Gran Rollo de Isaías (Museo de Israel), Codex Sinaiticus y Vaticanus, Códices de Alepo y Leningrado, genizá de El Cairo, Biblia de Gutenberg, capítulos de Langton y versículos de Estienne; pigmentos: muestrario del Traveling Scriptorium (Yale), *Inks and Pigments* (medievalbook). Diseño: codexsinaiticus.org y su reseña en RIDE; deadseascrolls.org.il; entrevista a Adam Lewis Greene (Bibliotheca) en Lectio; sistemas del Met y el Getty; *Rubrication: articulation, not decoration* (Bodleian); gwern.net/red; *Web Typography* de Richard Rutter; CSS-Tricks *Grainy Gradients*; Daring Fireball sobre el esqueuomorfismo.
