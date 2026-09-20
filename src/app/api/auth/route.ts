import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE_MAX_AGE,
  ACCESS_COOKIE_NAME,
  getExpectedToken,
  isCorrectCode,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const data = await request.formData().catch(() => null);
  const code = (data?.get("code") as string) || "";
  const van = (data?.get("van") as string) || "/";

  if (!isCorrectCode(code)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("van", van);
    url.searchParams.set("fout", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  const token = await getExpectedToken();
  const redirectTo = van.startsWith("/") ? van : "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url), {
    status: 303,
  });
  response.cookies.set(ACCESS_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_COOKIE_MAX_AGE,
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url), {
    status: 303,
  });
  response.cookies.delete(ACCESS_COOKIE_NAME);
  return response;
}
