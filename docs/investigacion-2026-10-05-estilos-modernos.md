# Investigación: moderno, pero de piedra — cinco propuestas

**Fecha:** 2026-10-05 · **Estado:** decidido — **Felipe eligió la D · Estela**, ya implementada en la app (ver «La línea vigente» al final).
**Lienzo con las cinco propuestas:** https://claude.ai/artifact/KCqCjeVA8vzyp2JX5q2WxG

**El pedido:** la versión actual de «El Códice» (roca en toda la pantalla, relieve en cada tarjeta, títulos en Cinzel) se siente como "una página de esas antiguas". Felipe quiere algo más moderno, que capte la atención, pero conservando la roca y los tallados.

## Diagnóstico

El problema no es la roca: es que la roca, el bisel y la letra tallada están aplicados **a todo por igual**. Esa es la firma de la web de 2008-2012. Todos los referentes actuales hacen lo contrario: el material vive en **un solo lugar por pantalla**, el resto es plano y tranquilo, y la energía viene del contraste de escala, un acento vivo y el movimiento.

| Se siente anticuado | Se siente actual |
|---|---|
| Textura en toda la pantalla y en cada componente | Textura como pieza protagonista; la lectura va sobre superficie plana |
| Bisel y sombra en cada tarjeta, botón y etiqueta | Profundidad en una sola capa |
| Letra en relieve en todo el texto | Talla solo en el numeral o título gigante |
| Fuente "de época" en todos los títulos y rótulos | Fuente de época en un único rol; el resto, actual |
| Versalitas diminutas muy espaciadas, todo centrado | Un elemento enorme y lo demás compacto; alineado a la izquierda |
| Beige sobre beige con un rojo apagado | Neutro seguro + un acento saturado y escaso |
| Radios tímidos de 3-4px | Decisión clara: 0px, o píldora y radios grandes |
| Ornamento repetido | Ornamento solo en el marco de la pieza principal |
| Barra de navegación pesada y texturizada | Navegación flotante o plana |

Dato que respalda el color: la escultura antigua **estaba pintada** (exposición *Chroma*, The Met, 2022-23). Lo antiguo real era colorido, no beige.

## Referentes y qué tomar de cada uno

- **Hades / Hades II** — la fuente antigua en un único rol; ornamento (greca) solo en cabeza y pie de la tarjeta; un color por dios; palabras clave resaltadas dentro del texto.
- **God of War (2018 / Ragnarök)** — dos fuentes y nada más; la interfaz se retira al leer.
- **Assassin's Creed Odyssey / Mirage** — el oro solo para el estado activo; paneles translúcidos sobre el mundo en vez de losas biseladas.
- **Pentiment / Clair Obscur** — el título que se talla al entrar; cifras en sans moderna junto a serif antigua.
- **Monument Valley 3 / Chants of Sennaar** — arquitectura antigua en color plano; alternar pantallas con textura y pantallas lisas.
- **Civilization VII (anti-referente)** — quitar textura sin añadir color ni escala deja algo aburrido, no moderno.
- **Getty (identidad 2026)** — la piedra como ventana con forma, no como papel tapiz; un azul eléctrico único.
- **Aesop / Marvell** — el acento se cuenta con los dedos; cero sombras en superficies de lectura.
- **Alabaster (Pentagram, 2025) / Bibliotheca** — la portada de capítulo como portada de revista; la lectura, sin ruido.
- **Apple Liquid Glass (2025), Airbnb, Material 3 Expressive** — la materialidad vuelve, pero como capa de controles que flota sobre el contenido.

## Las cinco propuestas (en el lienzo: Hoy + una parte de lectura, con el texto real de Marcos 3:7-12)

**A · Cantera** — clara. Un solo bloque de roca por pantalla, a sangre, con el numeral del capítulo tallado en profundidad y pintado de cinabrio; todo lo demás es caliza lisa, radio 0 y filetes de 1px. *Instrument Serif + Instrument Sans + Newsreader.* Riesgo: si el bloque queda pequeño, recae en lo editorial limpio que ya se rechazó.

**B · Obsidiana** — oscura. Basalto casi negro, inscripciones como líneas de luz, tarjeta al estilo Hades (negro plano, doble filete y greca de oropimente). *Bricolage Grotesque + Spectral + Geist Mono.* Riesgo: revierte la decisión previa de "solo tema claro".

**C · Policromía** — la piedra pintada. Mosaico de bloques en pigmentos minerales (azul egipcio, cinabrio, ocre, malaquita) sobre caliza pálida; un color por fase o libro. *Gloock + Schibsted Grotesk + Literata.* Riesgo: la más alejada de lo actual; con más de dos pigmentos por pantalla puede sentirse juguetona.

**D · Estela** — tipografía monumental. La inscripción es el diseño: «MARCOS 03» condensado e inciso a escala de pantalla en una losa gris, retícula brutalista, metadatos en monoespaciada y un bloque amarillo de oropimente. *Big Shoulders Display + IBM Plex Mono + Source Serif 4.* Riesgo: la más fría.

**E · Vidrio sobre roca** — la roca sigue a pantalla completa, pero como paisaje; encima flotan paneles de alabastro translúcido y una navegación en píldora, con lapislázuli como acento. Solo «La Biblia» va tallado. *Marcellus + Hanken Grotesk + EB Garamond.* Riesgo: el desenfoque cuesta rendimiento en móviles modestos; es la evolución más directa de lo actual.

Descartada en esta ronda: **Vitrina** (museo oscuro con piezas iluminadas) — depende de buenas fotografías de manuscritos y también es oscura.

## Recomendación de la investigación

**E** si se quiere conservar lo que ya gusta eliminando de golpe las señales de anticuado; **A con el color por fase de C** si se quiere el salto más claro hacia lo moderno. En cualquiera, la letra tallada sobrevive solo como numeral o título gigante — un elemento por pantalla — y el cuerpo sigue compacto.

## Fuentes principales

Point'n Think (*The Art of Hades*, *Clair Obscur*); 80.lv y GDC (God of War Ragnarök); Rambling About Games (Origins vs. Odyssey); Game Developer (Pentiment, Chants of Sennaar); It's Nice That (Monument Valley 3); PRINT Magazine y BP&O (Getty); GDUSA (Alabaster × Pentagram); The Met (*Chroma*); Apple Newsroom (Liquid Glass); Michael Flarup (*The future is colourful and dimensional*); CSS-Tricks (*Grainy Gradients*).

## La línea vigente: Estela (propuesta D, implementada el 2026-10-05)

**La inscripción es el diseño.** Una sola losa de piedra por pantalla con el nombre tallado a escala monumental; todo lo demás es plano.

- **Tokens** (`src/app/globals.css`): `--piedra #ECE8E1` (el plano) · `--hormigon #D5D0C7` (fuera de la columna, nichos) · `--grafito #141312` (tinta y filetes) · `--gris #57534D` (secundarios) · `--oropimente #F2C200` (único acento, siempre como bloque con grafito encima) · `--pista #C9C4BA` (lo pendiente). `--tex-losa`: piedra gris procedural (SVG `feTurbulence` + `feDiffuseLighting`), solo en `.losa`.
- **Tipografía:** Big Shoulders 900 (la talla, vía eje óptico) · IBM Plex Mono (metadatos, navegación) · Source Serif 4 (lectura).
- **Reglas:** radio 0, filetes de 1px, cero sombras fuera de la incisión, una losa por pantalla, el amarillo solo para la acción principal y lo activo, la lectura siempre sobre plano.
- **Piezas:** `.losa` + `.display.incisa.gigante` (el rótulo se ajusta al ancho con `k()` de `src/lib/estela.ts`: ~0.54em por carácter) · `.bloque` (acción principal) · `.rejilla` / `.celda` · `.segmentos` (un segmento por parte) · `.grupo-cab` + `.fila` + `.marca` (índice: cuadro lleno = leída) · `.estudio` (cita con barra de oropimente; pausa en nicho con marca cuadrada).
- **Escritorio:** la app es una columna de 48rem — una estela — con sus cantos de 1px sobre hormigón.
- **Se conserva de «El Códice»:** la cadena *piedra → … → pantalla* al pie de Hoy y del login, y la ausencia de emojis.

### Estela en pantallas anchas (2026-10-05)

El diseño nació para teléfono; estas son sus tres formas:

| Ancho | Forma |
|---|---|
| **< 768px** (teléfono) | Una columna. Losa arriba, contenido debajo, navegación en barra inferior. |
| **768–1023px** (iPad vertical) | Una columna a todo el ancho. La losa se limita al 58% del alto de la pantalla (la inscripción se recorta), el margen lateral sube a 28px y la lectura va centrada con su medida (44rem). Barra inferior. |
| **≥ 1024px** (iPad horizontal, escritorio) | **Riel** de navegación a la izquierda (12rem) con la cadena de transmisión al pie · la **losa fija** a toda la altura, con la inscripción asentada en el canto inferior · el **cuerpo** a la derecha, que es lo único que se desplaza. Sin barra inferior. Tope de 100rem con cantos. |

- **Estructura:** cada página es `<main class="pagina">` con `<section class="losa">` + `<div class="cuerpo">`. En ancho, `.pagina` es una rejilla de dos columnas (5fr/6fr; `.pagina-lectura` usa 4fr/7fr).
- **La talla se mide contra la losa, no contra la ventana:** `.losa` es un contenedor (`container-type: inline-size`) y `.gigante` usa `cqw`, así la inscripción llena su columna en cualquier disposición.
- **En ancho, la losa hace más:** en Hoy y en el capítulo muestra libro y número apilados; en la lectura lleva el **índice de partes** del capítulo, con la actual en amarillo y un cuadro lleno por cada parte leída; en Hoy el cuerpo añade la lista de partes del capítulo en curso.
- **El margen lateral es `--pad`** (18 / 28 / 36px). Va declarado fuera de las capas CSS: dentro de `@layer` pierde contra el `:root` base.
- **El Mapa** usa `.rejilla-libros`: tantas columnas como quepan (mínimo 10.5rem por libro).
- La navegación vive en `src/components/Navegacion.tsx` (riel + barra inferior; CSS decide cuál se ve).
