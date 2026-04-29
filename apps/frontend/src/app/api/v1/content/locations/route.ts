import { fetchBackend, relayBackendResponse } from "@/lib/backend-api";

export async function GET() {
  const response = await fetchBackend("/content/locations");
  return relayBackendResponse(response, JSON.stringify([]));
}
