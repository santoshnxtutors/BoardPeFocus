const backendApiBaseUrl = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:3001/api"
).replace(/\/$/, "");

const allowedOrigins = new Set([
  "https://www.boardpefocus.in",
  "https://admin.boardpefocus.in",
]);

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

function createCorsHeaders(request: Request) {
  const headers = new Headers();
  const origin = request.headers.get("origin");

  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Vary", "Origin");
  }

  headers.set(
    "Access-Control-Allow-Methods",
    "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT",
  );
  headers.set(
    "Access-Control-Allow-Headers",
    request.headers.get("access-control-request-headers") ||
      "Authorization, Content-Type",
  );

  return headers;
}

function withCors(response: Response, request: Request) {
  const headers = new Headers(response.headers);
  createCorsHeaders(request).forEach((value, key) => {
    if (key.toLowerCase() === "vary" && headers.has("Vary")) {
      headers.set("Vary", `${headers.get("Vary")}, ${value}`);
      return;
    }

    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

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

  let response: Response;
  try {
    response = await fetch(createBackendUrl(path, request.url), {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      cache: "no-store",
      duplex: "half",
    } as RequestInit & { duplex: "half" });
  } catch {
    return withCors(
      Response.json(
        {
          statusCode: 503,
          message:
            "Backend service is unavailable. Start the backend and try again.",
        },
        { status: 503 },
      ),
      request,
    );
  }

  return withCors(
    new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }),
    request,
  );
}

export function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: createCorsHeaders(request),
  });
}

export const GET = proxyToBackend;
export const POST = proxyToBackend;
export const PUT = proxyToBackend;
export const PATCH = proxyToBackend;
export const DELETE = proxyToBackend;
export const HEAD = proxyToBackend;
