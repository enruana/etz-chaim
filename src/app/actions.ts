"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { desmarcarCapitulo, desmarcarParte, desmarcarPartes, marcarPartes } from "@/lib/db";
import { estadoCapitulo, sincronizarCapitulo } from "@/lib/avance";
import { getCapitulo } from "@/lib/studies";
import { calificar } from "@/lib/srs";
import type { Rating } from "@/lib/fsrs";

// Marca la parte como leída y lleva a la siguiente (o al índice, si era la última).
export async function leerParteAction(libro: string, cap: number, slug: string) {
  const capitulo = getCapitulo(libro, cap);
  if (!capitulo) return;
  marcarPartes(libro, cap, [slug]);
  sincronizarCapitulo(libro, cap);
  revalidatePath("/", "layout");
  const i = capitulo.partes.findIndex((p) => p.slug === slug);
  const sig = capitulo.partes[i + 1];
  redirect(sig ? `/estudiar/${libro}/${cap}/${sig.slug}` : `/estudiar/${libro}/${cap}`);
}

export async function desmarcarParteAction(libro: string, cap: number, slug: string) {
  estadoCapitulo(libro, cap); // expande a partes un capítulo marcado completo "a la antigua"
  desmarcarParte(libro, cap, slug);
  sincronizarCapitulo(libro, cap);
  revalidatePath("/", "layout");
}

export async function marcarTodoAction(libro: string, cap: number) {
  const capitulo = getCapitulo(libro, cap);
  if (!capitulo) return;
  marcarPartes(libro, cap, capitulo.partes.map((p) => p.slug));
  sincronizarCapitulo(libro, cap);
  revalidatePath("/", "layout");
}

export async function desmarcarTodoAction(libro: string, cap: number) {
  desmarcarPartes(libro, cap);
  desmarcarCapitulo(libro, cap);
  revalidatePath("/", "layout");
}

export async function calificarAction(id: string, rating: Rating) {
  calificar(id, rating);
  revalidatePath("/memoria");
}
