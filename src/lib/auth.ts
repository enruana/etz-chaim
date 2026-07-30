import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE = "ec_session";

export function token(secret: string): string {
  return createHmac("sha256", secret).update("etz-chaim-session-v1").digest("hex");
}

export function verify(value: string | undefined, secret: string): boolean {
  if (!value) return false;
  const expected = token(secret);
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
