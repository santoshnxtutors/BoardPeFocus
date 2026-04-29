const DEFAULT_REVALIDATE_SECONDS = 300;
const BACKEND_UNAVAILABLE_HEADER = "x-boardpe-backend-unavailable";

function backendUnavailableResponse(path: string) {
  return new Response(
    JSON.stringify({
      message: "Backend service unavailable",
      path,
    }),
    {
      status: 503,
      statusText: "Backend Unavailable",
      headers: {
        "Content-Type": "application/json",
        [BACKEND_UNAVAILABLE_HEADER]: "1",
      },
    },
  );
}

export function isBackendUnavailableResponse(response: Response) {
  return response.headers.get(BACKEND_UNAVAILABLE_HEADER) === "1";
}

export async function relayBackendResponse(
  response: Response,
  fallbackBody = JSON.stringify({ message: response.ok ? "Request succeeded" : "Request failed" }),
) {
  const payload = (await response.text().catch(() => "")) || fallbackBody;
  const contentType = response.headers.get("Content-Type") ?? "application/json";

  return new Response(payload, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type": contentType,
    },
  });
}

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
  const method = init?.method?.toUpperCase() ?? "GET";
  const isReadRequest = method === "GET" || method === "HEAD";

  try {
    return await fetch(backendApiUrl(path), {
      ...init,
      ...(isReadRequest
        ? init?.cache
          ? { cache: init.cache }
          : {
              next: init?.next ?? { revalidate: DEFAULT_REVALIDATE_SECONDS },
            }
        : {
            cache: init?.cache ?? "no-store",
          }),
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch {
    return backendUnavailableResponse(path);
  }
}
