export function backendApiUrl(path: string) {
  const rawBaseUrl =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api";
  const baseUrl = rawBaseUrl.endsWith("/v1")
    ? rawBaseUrl
    : `${rawBaseUrl.replace(/\/$/, "")}/v1`;

  return `${baseUrl}${path}`;
}

export async function fetchBackend(path: string, init?: RequestInit) {
  return fetch(backendApiUrl(path), {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
