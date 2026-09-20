import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE_NAME, isValidToken } from "@/lib/auth";

// Alles vereist toegang, behalve de loginpagina zelf, de login-API en statische
// bestanden die sowieso geen reisinformatie bevatten (robots.txt, manifest, icons).
export const config = {
  matcher: [
    "/((?!login|api/auth|robots.txt|manifest.webmanifest|sw.js|icons|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const ok = await isValidToken(token);

  if (!ok) {
    const loginUrl = new URL("/login", request.url);
    // Geen gevoelige reisdata in de URL: alleen het relatieve pad om na login terug te keren.
    loginUrl.searchParams.set("van", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
