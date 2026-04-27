import { NextRequest, NextResponse } from "next/server";

function backendUrl(path: string) {
  const rawBaseUrl =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api";
  const baseUrl = rawBaseUrl.endsWith("/v1")
    ? rawBaseUrl
    : `${rawBaseUrl.replace(/\/$/, "")}/v1`;

  return `${baseUrl}${path}`;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    const response = await fetch(
      backendUrl(`/content/redirects?from=${encodeURIComponent(pathname)}`),
      { cache: "no-store" },
    );

    if (!response.ok) {
      return NextResponse.next();
    }

    const redirect = (await response.json()) as {
      to: string;
      code: 301 | 302 | 307 | 308;
    };

    const destination = redirect.to.startsWith("http")
      ? redirect.to
      : new URL(redirect.to, request.url);

    return NextResponse.redirect(destination, redirect.code);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
