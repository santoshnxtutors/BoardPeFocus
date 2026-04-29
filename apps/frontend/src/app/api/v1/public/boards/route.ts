import { fetchBackend, relayBackendResponse } from "@/lib/backend-api";

export async function GET() {
  const response = await fetchBackend("/public/boards");
  return relayBackendResponse(response, JSON.stringify([]));
}
