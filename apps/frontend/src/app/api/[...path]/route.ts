const backendApiBaseUrl = (
  process.env.BACKEND_API_URL || "http://127.0.0.1:3001/api"
).replace(/\/$/, "");

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

function createBackendUrl(path: string[], requestUrl: string) {
  const request = new URL(requestUrl);
  let targetPath = path.map(encodeURIComponent).join("/");

  if (backendApiBaseUrl.endsWith("/v1") && targetPath.startsWith("v1/")) {
    targetPath = targetPath.slice("v1/".length);
  }

  return `${backendApiBaseUrl}/${targetPath}${request.search}`;
}

async function proxyToBackend(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const headers = new Headers(request.headers);

  [
    "connection",
    "content-length",
    "host",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
  ].forEach((header) => headers.delete(header));

  const response = await fetch(createBackendUrl(path, request.url), {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    cache: "no-store",
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export const GET = proxyToBackend;
export const POST = proxyToBackend;
export const PUT = proxyToBackend;
export const PATCH = proxyToBackend;
export const DELETE = proxyToBackend;
export const HEAD = proxyToBackend;
