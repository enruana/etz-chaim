# Investigación: dirección visual de la app (el "aire de Bluey")

**Fecha:** 2026-07-30 · **Referencia del usuario:** el aire y las ilustraciones de la serie Bluey.
**Página visual con las 3 direcciones y maquetas:** https://claude.ai/code/artifact/b47b487a-fb49-4de3-aa5e-d9ad333dd151

## Principios destilados (de las directoras de arte de Ludo Studio)

1. **Luz dorada, sombra violeta** — nunca grises neutros: texto azul-violeta `#404066`, sombras coloreadas (rgba violeta), fondos crema. Regla interna de Bluey: "sombra más fría o luz más cálida que el color local".
2. **El cielo es el layout** — ~50% de aire por pantalla; una sola cosa importante por vista; gradientes de cielo sutiles.
3. **Cubos redondeados, sin aristas** — radios 16–30px, botones píldora, controles "chunky"; separar con espacio/color, no con líneas de 1px.
4. **Sin contorno negro** — bordes = color del fondo un paso más oscuro.
5. **Plano con textura** — grano de papel al 2-4% sobre el crema; nada de flat corporativo frío.
6. **Movimiento lento** — transiciones 400–500ms ease-out (estándar Headspace); jamás bounces nerviosos.
7. **Anti-infantilización** — whimsy en el sistema (fondos, empty states, celebraciones), seriedad en el contenido (la pantalla de estudio es sobria y tipográficamente impecable); paleta desaturada/empolvada; ilustrar lugares y luz, no mascotas.

## Tipografía (Google Fonts)

- **Fraunces** — títulos (serif suave, seguro anti-infantil), pesos 500–600.
- **Nunito** — UI (redondeada como la rotulación de Bluey), pesos 600–800.
- **Lora** — texto bíblico: 18px, line-height 1.7, `max-width: 65ch`. (Alternativa: Literata.)

## Motor de lectura (consenso Readwise Reader / Kindle / Play Books)

Columna ~65ch; cuerpo 16–19px ajustable (A−/A+); interlineado 1.5–1.7; la UI desaparece al leer; subrayados tipo marcador translúcido; jamás #000/#FFF; tres modos de luz con selector a un toque.

## Las tres direcciones (tokens)

**A · Mañana en Brisbane** (recomendada como base): fondo `#FFFDFA→#EAF4FD`, acento cielo `#5FB4F5`, dorado `#E2A94F`, texto `#404066`, resaltado `#FDF3CE`, cards blancas borde `#ECE3D2`.

**B · Atardecer en la veranda** (recomendada como modo lectura cálido/"sepia"): fondo `#FCEEE3→#E9E4F5` (durazno→lavanda), acento naranja Bingo `#E2793B`, jacarandá `#A7A2D6`, texto `#443329`, resaltado `#FEF3C9`.

**C · Cuaderno de acuarela** (alternativa más sobria, aire Jon Klassen): papel `#F7F5EF`, eucalipto `#7FA08C`, dorado seco `#C89B5E`, tinta `#3F4238`, resaltado `#EFE9D2`.

**Noche de cuento** (modo oscuro compartido): fondo `#23243A→#2B2C41` (azul noche de la serie, no negro), superficie `#35375A`, acento `#88CAFC`, dorado `#EDCC6F`, texto crema `#F2EEE4`.

**Recomendación:** A como identidad base + B como modo de lectura cálido + Noche como modo oscuro — los tres modos de luz de un día de Bluey (mañana, atardecer, noche). Decisión pendiente del usuario.

## Referencias clave

Entrevistas de arte de Bluey: It's Nice That (Catriona Drummond), Australian Cinematographer Magazine, Goodsniff Substack, Alice Walsh (ArtStation). Sistemas: Headspace (crema, sombras de color, 500ms), Readwise Reader (65ch, chrome invisible), Kindle (sepia `#FBF0D9/#5F4B32`), Dwell (arte por libro, tono reverente-cálido), Duolingo/Brilliant (juego sin infantilizar), Finch (cero culpa). Estilo raíz: Mary Blair / mid-century children's book, "textured flat / digital gouache"; ilustradores afines: Christian Robinson, Jon Klassen.
