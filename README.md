# 🌳 Etz Chaim (עץ חיים)

> «Árbol de vida es a los que de ella echan mano» — Proverbios 3:18 (RVR1960)

App personal para estudiar la Biblia **capítulo a capítulo**, con investigación profunda por capítulo, y repetición espaciada (FSRS). 100% en español. Texto base: Reina-Valera 1960.

## Cómo funciona

1. **El mapa está trazado completo** ([content/plan-de-estudio.md](content/plan-de-estudio.md)): los 66 libros / 1.189 capítulos en orden pedagógico (7 fases), no canónico — primero un Evangelio, mapa antes que microscopio, profetas en su contexto histórico.
2. **Se avanza un capítulo a la vez**: cada capítulo se investiga a fondo y se escribe en partes cortas ([content/metodologia.md](content/metodologia.md)) — ubicación, contexto, una parte por escena, y el cierre (Jesús en el capítulo, dificultades honestas, aplicación, memoria y preguntas).
3. **Tres niveles de navegación**: libro / capítulo / parte (`/estudiar/marcos/3/7-12`). Un número de versículo lleva a la parte que lo contiene (`/estudiar/marcos/3/12`), y el avance se registra parte por parte.
4. **La app** renderiza los estudios, registra el progreso, y entrena la memoria con FSRS: versículos (escalera cloze → recitación), comprensión, y pronto cronología, geografía y personajes.
5. Antes de cada libro: el video panorama de [Proyecto Biblia](https://proyectobiblia.com) (BibleProject en español).

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · SQLite (better-sqlite3) · FSRS-4.5

Diseño: **Estela** — la inscripción es el diseño: una losa de piedra por pantalla con el nombre tallado a escala monumental (Big Shoulders), y todo lo demás plano, con filetes de 1px, metadatos en IBM Plex Mono, lectura en Source Serif 4 y un único acento amarillo de oropimente. Ver [docs/investigacion-2026-10-05-estilos-modernos.md](docs/investigacion-2026-10-05-estilos-modernos.md).

## Correr local

```bash
pnpm install
pnpm dev        # http://localhost:3000 — la DB se crea sola en data/
```

## Deploy (Railway)

Servicio con un Volume montado en `/data` y variables:

- `DB_PATH=/data/etz-chaim.db`
- `APP_PASSWORD=<contraseña>` (si falta, la app queda abierta — solo para uso local)

## Estructura

```
content/            fuente de verdad: plan, metodología y estudios (una carpeta por capítulo, un archivo por parte)
docs/               investigaciones (metodología de estudio, estilos)
src/app/            Hoy · /estudiar/[libro]/[cap]/[parte] · /mapa · /memoria · /login
src/lib/            canon (66 libros + videos), studies (carga las partes), avance, db, fsrs, srs, ejercicios
src/components/     BottomNav, ReviewSession, Cadena
```

## Licencias

- Código: MIT.
- Documentos de estudio (`content/`): © Felipe Mantilla — se comparten para lectura; no reutilizar comercialmente.
- Las citas bíblicas son de la **Reina-Valera 1960** © Sociedades Bíblicas en América Latina, usadas como citas con atribución. El texto bíblico completo no se incluye en este repositorio.
