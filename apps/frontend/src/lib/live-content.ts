import { fetchBackend } from "@/lib/backend-api";

export async function getLiveContent<T>(path: string): Promise<T[]> {
  try {
    const response = await fetchBackend(path);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? (data as T[]) : [];
  } catch {
    return [];
  }
}

export async function getLiveContentItem<T>(path: string): Promise<T | null> {
  try {
    const response = await fetchBackend(path);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

interface LiveFaq {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
}

export async function getLiveFaqs(params?: {
  entityType?: string;
  entityId?: string;
  pageSlug?: string;
}): Promise<LiveFaq[]> {
  const query = new URLSearchParams();
  if (params?.entityType) query.set("entityType", params.entityType);
  if (params?.entityId) query.set("entityId", params.entityId);
  if (params?.pageSlug) query.set("pageSlug", params.pageSlug);

  const suffix = query.size > 0 ? `?${query.toString()}` : "";
  return getLiveContent<LiveFaq>(`/content/faqs${suffix}`);
}
