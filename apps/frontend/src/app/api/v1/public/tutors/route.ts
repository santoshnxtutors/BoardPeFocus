import { fetchBackend, relayBackendResponse } from "@/lib/backend-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const response = await fetchBackend(`/public/tutors${query ? `?${query}` : ""}`);

  return relayBackendResponse(response, JSON.stringify([]));
}
