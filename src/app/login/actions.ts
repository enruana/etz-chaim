"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, token } from "@/lib/auth";

export async function entrar(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const secret = process.env.APP_PASSWORD;
  if (!secret || password !== secret) {
    redirect("/login?error=1");
  }
  const jar = await cookies();
  jar.set(COOKIE, token(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
  redirect("/");
}
