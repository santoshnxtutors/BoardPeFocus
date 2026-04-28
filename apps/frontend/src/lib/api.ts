import {
  Board,
  School,
  Location,
  Subject,
  Tutor,
  Lead,
  TutorApplicationPayload,
  TutorApplicationSubmissionResponse,
} from "@/types";

function resolveApiBaseUrl() {
  if (typeof window !== "undefined") {
    return "/api/v1";
  }

  const rawApiBaseUrl =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:3001/api";

  return rawApiBaseUrl.endsWith("/v1")
    ? rawApiBaseUrl
    : `${rawApiBaseUrl.replace(/\/$/, "")}/v1`;
}

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const apiBaseUrl = resolveApiBaseUrl();
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new Error(
      "Unable to reach the application service right now. Please try again.",
    );
  }

  if (!response.ok) {
    const errorPayload = await response
      .json()
      .catch(() => ({ message: response.statusText || "Request failed" }));
    const message = Array.isArray(errorPayload?.message)
      ? errorPayload.message.join(", ")
      : errorPayload?.message;
    throw new Error(message || `API error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  content: {
    getBoards: () => fetcher<Board[]>("/public/boards"),
    getBoard: (slug: string) => fetcher<Board>(`/public/boards/${slug}`),
    getSchools: () => fetcher<School[]>("/content/schools"),
    getSchool: (slug: string) => fetcher<School>(`/content/schools/${slug}`),
    getLocations: () => fetcher<Location[]>("/content/locations"),
    getLocation: (slug: string) =>
      fetcher<Location>(`/content/locations/${slug}`),
    getSubjects: () => fetcher<Subject[]>("/content/subjects"),
  },
  tutors: {
    search: (params: Record<string, string>) => {
      const query = new URLSearchParams(params).toString();
      return fetcher<Tutor[]>(`/public/tutors?${query}`);
    },
    getOne: (slug: string) => fetcher<Tutor>(`/public/tutors/${slug}`),
  },
  leads: {
    submit: (data: Lead) =>
      fetcher<{ success: boolean; id: string }>("/public/leads", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  tutorApplications: {
    submit: (data: TutorApplicationPayload) =>
      fetcher<TutorApplicationSubmissionResponse>(
        "/public/tutor-applications",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      ),
  },
};
