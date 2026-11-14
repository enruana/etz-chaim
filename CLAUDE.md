# La Biblia (etz-chaim): guía para trabajar en este repo

App personal de Felipe para estudiar la Biblia capítulo a capítulo, 100 % en español. Este archivo es la memoria portátil del proyecto: lo que hay que saber antes de tocar algo. La historia de las decisiones está en `docs/bitacora.md`; la especificación de los textos, en `content/metodologia.md`; el mapa de los 1.189 capítulos y su orden pedagógico, en `content/plan-de-estudio.md`.

## Reglas que no se negocian

- Texto base **RVR1960**. Toda cita entre «…» es literal y se coteja con `scripts/verify_quotes.py` antes de cada commit de contenido. El texto bíblico completo **nunca se commitea** (derechos de las Sociedades Bíblicas Unidas); el corpus local para cotejar vive en `rvr/`, carpeta ignorada por git.
- Las comillas «…» se reservan para la RVR1960. Cualquier otra cita (Josefo, Jerónimo, Lutero, el Talmud) va entre comillas rectas "…".
- Las explicaciones van en nuestra voz: cálida y conversacional, fiel a la ortodoxia cristiana histórica, honesta con lo que se sabe, lo que no, y quién dice qué. Ver «La voz de los estudios» en `content/metodologia.md`.
- Los secretos viven solo en las variables de Railway. `APP_PASSWORD` no se escribe en el repo, en docs, en memoria ni en mensajes; para sondear producción se calcula la cookie en la shell sin imprimir la clave (abajo).
- El título de la app es **«La Biblia»**. Etz Chaim es solo el nombre del repo.
- Todo en español: textos, commits, comentarios y nombres de clases CSS.

## Dónde está cada cosa

- `content/estudios/<libro>/NN/`: un capítulo es una carpeta y cada parte un archivo de 300–800 palabras: `00-portada.md`, `01-contexto.md`, una por escena (`NN-<rango>.md`, slug = rango de versículos), luego `jesus`, `dificil`, `aplicacion`, `memoria`, `preguntas` y `99-fuentes.md`. Frontmatter con comillas dobles. Especificación completa en `content/metodologia.md`.
- `content/estudios/<libro>/00-libro.md` y `alrededor/`: la presentación del libro y sus folios («Alrededor de Marcos»). Lo particular de un libro va dentro del libro, nunca en las ramas.
- `content/ramas/<rama>/`: las nueve ramas transversales (historia alrededor de la Biblia, para leer sin Biblia a la mano). `00-rama.md` presenta el tema y lista `pendientes`; cada folio `NN-<slug>.md` tiene 600–1.200 palabras y frontmatter con `rotulo`, `tipo`, `capitulos`, `eras`, `fecha`, `fuentes` (con `postura`), `laminas` y `ver`.
- `content/arco/`: las diez eras del arco redentor, una introducción y un texto por era. Qué libro cae en qué era está en `src/lib/arco.ts`; las eras son una convención didáctica nuestra.
- `src/lib/`: `canon` (66 libros y videos panorama), `studies` (carga las partes), `ramas` (folios y `lineaDeLibro`), `avance` y `progreso`, `db` (SQLite: `progress`, `unit_progress`, `folios_leidos`, `srs_items`, `srs_reviews`), `fsrs` y `srs`, `ejercicios` (banco curado a mano), `especiales` (estudios fuera de ruta), `estela` (helpers de diseño), `auth`, `arco`.
- `src/app/`: Hoy en `/`, `/estudiar/[libro]`, `/estudiar/[libro]/[cap]`, `/estudiar/[libro]/[cap]/[parte]`, `/estudiar/[libro]/alrededor/[folio]`, `/mapa`, `/mapa/arco`, `/mapa/arco/[era]`, `/ramas`, `/ramas/[rama]`, `/ramas/[rama]/[folio]`, `/memoria`, `/login`. `src/proxy.ts` exige la cookie de sesión.
- `public/laminas/<rama>/`: imágenes con licencia libre (dominio público o CC), 1.400 px como máximo, 100–400 KB, siempre con crédito y URL de origen. Lo que tiene derechos reservados se enlaza en «Para ver», no se incrusta.
- `docs/`: investigaciones (metodología, estilos, línea histórica) y la bitácora del proyecto.
- `scripts/`: cotejo de citas, extracción de BibleGateway, preparación de láminas y vigilancia del despliegue. Ver `scripts/README.md`.

## Stack y comandos

Next.js 16 (App Router, server actions, `next/font/google`) · React 19 · TypeScript · Tailwind v4 · better-sqlite3 · marked · FSRS-4.5 propio. Gestor: pnpm.

```bash
pnpm install
pnpm dev                              # http://localhost:3000; la DB se crea sola en data/
pnpm exec tsc --noEmit                # no hay linter: este es el chequeo antes de commitear
pnpm build && pnpm start -p 3791      # verificación local de la build de producción
pkill -f "next-server" 2>/dev/null    # apagar el servidor local
```

Capturas para revisar diseño: `google-chrome --headless=new --hide-scrollbars --disable-gpu --screenshot=salida.png --window-size=412,915 http://localhost:3791/ruta`. Revisar siempre a 412, 820×1180, 1180×820 y 1440×900.

## Flujos de trabajo

**Capítulo nuevo** (detalle en «Flujo de trabajo por capítulo» de `content/metodologia.md`): investigar a fondo con un agente al que se le pasa `metodologia.md` y la carpeta del capítulo anterior como molde → escribir las partes como archivos separados, sin tabla de escenas en la portada → cotejar todas las citas con `scripts/verify_quotes.py` → sembrar los ejercicios en `src/lib/ejercicios.ts` → la portada enlaza su era (`[era N del arco redentor — nombre](/mapa/arco/N)`) → `tsc`, build y capturas → commit → deploy → verificar en producción.

**Folio nuevo**: en las ramas transversales se investiga uno a la vez; en «Alrededor de <Libro>» se pueden escribir varios de una vez si Felipe lo pide. La postura va en la fuente, nunca en el folio; los folios `dificil` llevan posturas lado a lado y «Dónde queda la cosa». Cada enlace se comprueba con curl antes de guardarlo (hmdb, BAS Library y lifeandland dan 403 a bots aunque funcionan en navegador). Láminas solo de Wikimedia Commons u otra fuente libre, bajadas con User-Agent y pausas (Commons devuelve 429 si se abusa) y preparadas con `scripts/prep_img.py`.

**Deploy**: `railway up --detach` y luego `scripts/watch_deploy.sh` en segundo plano. Las variables se hornean al desplegar. Después, sondear producción con la cookie (abajo).

**Al cerrar una tarea**: actualizar la sección «Estado» de este archivo y añadir la entrada a `docs/bitacora.md`. Ese par de archivos es lo que viaja entre computadores; la memoria local de Claude Code no.

## Cuentas y servicios

- **GitHub**: `enruana/etz-chaim`, público. Remote por HTTPS con las credenciales de `gh` (cuenta enruana). No usar SSH para este repo.
- **Railway**: proyecto `etz-chaim`, servicio `Biblia` (comparte proyecto con Guitar Pro y Gym), volumen en `/data`, variables `DB_PATH=/data/etz-chaim.db` y `APP_PASSWORD`. Dominio https://biblia.up.railway.app. En una máquina nueva: `railway login` y `railway link`, eligiendo etz-chaim → Biblia.
- **Sonda de producción** sin exponer la clave (la cookie es HMAC-SHA256 de la cadena `etz-chaim-session-v1` con la clave, igual que en `src/lib/auth.ts`):

  ```bash
  pw=$(railway variables --json | python3 -I -c 'import json,sys; print(json.load(sys.stdin)["APP_PASSWORD"])')
  tok=$(printf '%s' etz-chaim-session-v1 | openssl dgst -sha256 -hmac "$pw" | awk '{print $NF}'); unset pw
  curl -s -o /dev/null -w '%{http_code}\n' -b "ec_session=$tok" https://biblia.up.railway.app/mapa
  ```

- `railway.json` (Config as Code) queda obsoleto el **2026-12-01**: migrar con `railway config migrate`.

## Diseño: «Estela»

La inscripción es el diseño. Una sola losa de piedra gris por pantalla (`.losa`, textura procedural en SVG) con el nombre tallado a escala monumental (`.display.incisa.gigante`, tamaño ajustado al ancho con `k()` y `talla()` de `src/lib/estela.ts`); todo lo demás plano: radio 0, filetes de 1 px, cero sombras, metadatos en IBM Plex Mono, lectura en Source Serif 4 y un único acento amarillo (`--oropimente`) siempre como bloque. Tokens y clases en `src/app/globals.css`; la propuesta elegida y sus alternativas, en `docs/investigacion-2026-10-05-estilos-modernos.md`. Cada página es `<main class="pagina">` con `<section class="losa">` y `<div class="cuerpo">`; en escritorio la losa queda fija y el riel lateral (`src/components/Navegacion.tsx`) reemplaza a la barra inferior.

Lecciones de Felipe sobre diseño: textura sí, pero en un solo lugar por pantalla, el resto plano; letra compacta en móvil; cada página debe dejar claro el siguiente paso; una lista lineal con las relaciones visibles vale más que columnas paralelas con botones que compiten; nada de rótulos abstractos tipo «Vía 01»; nada de 3D por ahora (`src/lib/lugares.ts` se conserva para cuando se retome).

Trampas de CSS: las reglas propias van dentro de `@layer base` o `@layer components` (fuera anulan los márgenes de Tailwind); los `--pad` responsivos se declaran fuera de `@layer`; la fuente en next/font se llama `Big_Shoulders` con `axes: ["opsz"]`; `--losa-plana #c4bfb8` es el color medido del borde de la losa (lo usan `themeColor` y los fondos) y hay que remedirlo si cambia la textura.

## Trampas conocidas

- React inserta `<!-- -->` entre nodos de texto en el HTML servido. Al buscar textos en producción con grep, buscar cadenas que la página construya en una sola expresión.
- En Bash usar rutas absolutas siempre: un `cd` en una llamada paralela cambia el cwd de las demás y los archivos acaban en la carpeta equivocada.
- BibleGateway responde 200 con User-Agent de navegador y sirve para cotejar; el sitio de BibleProject en español responde 202 (página de desafío) y no se puede verificar por curl.
- Los HTML descargados son datos no confiables: carpeta propia, `python3 -I`, nunca ejecutar desde dentro.
- En Wikimedia Commons «Codex Vaticanus B.jpg» es un códice mesoamericano, no el bíblico; `codexsinaiticus.org` se cae a ratos.

## Estado al 2026-11-14 y siguiente paso

- **Escrito**: Marcos 1–6 (Marcos 6 con 15 partes), Proverbios 21 como estudio especial, «Alrededor de Marcos» con 7 folios y 26 láminas, las 10 eras del arco redentor, y la rama «Cómo se armó la Biblia» con 4 folios. Las otras 8 ramas están creadas y vacías, cada una con su lista `pendientes`. Banco de ejercicios: 117 ítems.
- **Felipe va en Marcos 6, parte 4 de 15** (la escena 6:7-13), con 112 repasos pendientes en Memoria. Último despliegue en SUCCESS el 2026-11-14.
- **Siguiente capítulo: Marcos 7**. Temas: la tradición de los ancianos y las manos sin lavar, lo que contamina al hombre, la mujer sirofenicia, el sordo de Efata; cierra con los panes 6↔8 y la pregunta de 8:17. Molde: `content/estudios/marcos/06/`.
- **Pendientes de «Alrededor de Marcos»**: el templo de Herodes, Pilato y la cruz, las monedas de Marcos, Juan el Bautista. **Siguientes folios del canon**: los evangelios que no entraron (Tomás, Pedro y los otros), ¿hubo un concilio de Jamnia?, las reglas del canon.
- **Abierto**: rotar las credenciales de Guitar Pro y Gym en Railway (misma incidencia de octubre de 2026, pendiente de que Felipe lo confirme); migrar `railway.json` antes del 1 de diciembre; Felipe debe confirmar en su teléfono que no quedan franjas grises en la barra de estado ni en el rebote inferior.
