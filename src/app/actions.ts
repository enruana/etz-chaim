"use server";

import { revalidatePath } from "next/cache";
import { marcarCapitulo, desmarcarCapitulo } from "@/lib/db";
import { calificar } from "@/lib/srs";
import type { Rating } from "@/lib/fsrs";

export async function marcarEstudiadoAction(libro: string, cap: number) {
  marcarCapitulo(libro, cap);
  revalidatePath("/", "layout");
}

export async function desmarcarAction(libro: string, cap: number) {
  desmarcarCapitulo(libro, cap);
  revalidatePath("/", "layout");
}

export async function calificarAction(id: string, rating: Rating) {
  calificar(id, rating);
  revalidatePath("/memoria");
}
