import { fetchBackend, relayBackendResponse } from "@/lib/backend-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const response = await fetchBackend(`/public/boards/${encodeURIComponent(slug)}`);
  return relayBackendResponse(response, JSON.stringify({ message: "Board not found" }));
}
