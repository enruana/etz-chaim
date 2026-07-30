import { NextRequest, NextResponse } from "next/server";
import { COOKIE, verify } from "@/lib/auth";

// Auth por cookie firmada (patrón del proyecto gym). Si APP_PASSWORD no está
// definida, la app queda abierta (uso local).
export default function proxy(req: NextRequest) {
  const secret = process.env.APP_PASSWORD;
  if (!secret) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/login") || pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }
  if (verify(req.cookies.get(COOKIE)?.value, secret)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
