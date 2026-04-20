import { Board, School, Location, Subject, Tutor, Lead } from '@/types';

const rawApiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_BASE_URL = rawApiBaseUrl.endsWith('/v1')
  ? rawApiBaseUrl
  : `${rawApiBaseUrl.replace(/\/$/, '')}/v1`;

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  content: {
    getBoards: () => fetcher<Board[]>('/public/boards'),
    getBoard: (slug: string) => fetcher<Board>(`/public/boards/${slug}`),
    getSchools: () => fetcher<School[]>('/content/schools'),
    getSchool: (slug: string) => fetcher<School>(`/content/schools/${slug}`),
    getLocations: () => fetcher<Location[]>('/content/locations'),
    getLocation: (slug: string) => fetcher<Location>(`/content/locations/${slug}`),
    getSubjects: () => fetcher<Subject[]>('/content/subjects'),
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
      fetcher<{ success: boolean; id: string }>('/public/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};
