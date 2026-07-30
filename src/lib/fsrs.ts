// FSRS-4.5 con los pesos por defecto del optimizador.
// Retención objetivo: 0.90 (ver docs/investigacion-2026-07-30-metodologia-estudio-biblico.md).

const W = [
  0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367, 1.0461,
  2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755,
];
const DECAY = -0.5;
const FACTOR = 19 / 81;
const RETENTION = 0.9;

export type Rating = 1 | 2 | 3 | 4; // Otra vez · Difícil · Bien · Fácil

export type SrsState = {
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  state: string;
  last_review: string | null;
};

function clampD(d: number) {
  return Math.min(10, Math.max(1, d));
}

function initDifficulty(g: Rating) {
  return clampD(W[4] - Math.exp(W[5] * (g - 1)) + 1);
}

function retrievability(elapsedDays: number, stability: number) {
  return Math.pow(1 + (FACTOR * elapsedDays) / stability, DECAY);
}

function nextInterval(stability: number) {
  const days = (stability / FACTOR) * (Math.pow(RETENTION, 1 / DECAY) - 1);
  return Math.max(1, Math.round(days));
}

export function review(prev: SrsState, g: Rating, now = new Date()): SrsState & { due: string } {
  const nowIso = now.toISOString();

  if (prev.reps === 0 || !prev.last_review) {
    const stability = W[g - 1];
    const difficulty = initDifficulty(g);
    const due =
      g === 1
        ? new Date(now.getTime() + 10 * 60 * 1000).toISOString()
        : new Date(now.getTime() + nextInterval(stability) * 86400_000).toISOString();
    return { stability, difficulty, reps: 1, lapses: g === 1 ? 1 : 0, state: "review", last_review: nowIso, due };
  }

  const elapsed = Math.max(0, (now.getTime() - new Date(prev.last_review).getTime()) / 86400_000);
  const R = retrievability(elapsed, Math.max(prev.stability, 0.01));

  let difficulty = clampD(prev.difficulty - W[6] * (g - 3));
  difficulty = clampD(W[7] * initDifficulty(4) + (1 - W[7]) * difficulty);

  let stability: number;
  let lapses = prev.lapses;
  if (g === 1) {
    stability = Math.min(
      prev.stability,
      W[11] * Math.pow(difficulty, -W[12]) * (Math.pow(prev.stability + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R)),
    );
    stability = Math.max(0.01, stability);
    lapses += 1;
  } else {
    const hard = g === 2 ? W[15] : 1;
    const easy = g === 4 ? W[16] : 1;
    stability =
      prev.stability *
      (1 +
        Math.exp(W[8]) *
          (11 - difficulty) *
          Math.pow(prev.stability, -W[9]) *
          (Math.exp(W[10] * (1 - R)) - 1) *
          hard *
          easy);
  }

  const due =
    g === 1
      ? new Date(now.getTime() + 10 * 60 * 1000).toISOString()
      : new Date(now.getTime() + nextInterval(stability) * 86400_000).toISOString();

  return { stability, difficulty, reps: prev.reps + 1, lapses, state: "review", last_review: nowIso, due };
}
