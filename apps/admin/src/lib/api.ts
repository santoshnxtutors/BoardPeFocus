import { 
  Tutor, Board, Subject, School, Sector, Society, 
  Lead, PageRecord, SeoMeta, MediaAsset, User, AuditLog 
} from '@boardpefocus/types';

function resolveApiBaseUrl() {
  const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    if (!isLocalhost && hostname === 'admin.boardpefocus.in') {
      return '/api';
    }

    if (configuredApiBaseUrl) {
      return configuredApiBaseUrl;
    }

    if (isLocalhost) {
      return 'http://localhost:3001/api';
    }

    return `${protocol}//${hostname}/api`;
  }

  if (configuredApiBaseUrl) {
    return configuredApiBaseUrl;
  }

  return 'http://localhost:3001/api';
}

class ApiClient {
  private getAuthToken() {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem('auth_token');
  }

  private async fetcher<T>(path: string, options?: RequestInit): Promise<T> {
    const token = this.getAuthToken();
    const rawApiBaseUrl = resolveApiBaseUrl();
    const apiBaseUrl = rawApiBaseUrl.endsWith('/v1')
      ? rawApiBaseUrl
      : `${rawApiBaseUrl.replace(/\/$/, '')}/v1`;
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401 && typeof window !== 'undefined') {
        window.localStorage.removeItem('auth_token');
        window.localStorage.removeItem('auth_user');
      }

      const error = await response
        .json()
        .catch(() => ({ message: 'An unknown error occurred' }));
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message;
      throw new Error(message || 'API request failed');
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  get<T>(path: string, options?: RequestInit) {
    return this.fetcher<T>(path, { method: 'GET', ...options });
  }

  auth = {
    login: (email: string, password: string) =>
      this.fetcher<{
        accessToken: string;
        user: { id: string; email: string; name: string; role: string };
      }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () =>
      this.fetcher<{ id: string; email: string; name: string; role: string }>(
        '/auth/me',
      ),
  };

  // Tutors
  tutors = {
    list: () => this.fetcher<Tutor[]>('/admin/tutors', { method: 'GET' }),
    get: (id: string) => this.fetcher<Tutor>(`/admin/tutors/${id}`),
    create: (data: Partial<Tutor>) => this.fetcher<Tutor>('/admin/tutors', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Tutor>) => this.fetcher<Tutor>(`/admin/tutors/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => this.fetcher<void>(`/admin/tutors/${id}`, { method: 'DELETE' }),
    
    // Nested relations CRUD
    addReview: (id: string, data: any) => this.fetcher<any>(`/tutors/${id}/reviews`, { method: 'POST', body: JSON.stringify(data) }),
    addFaq: (id: string, data: any) => this.fetcher<any>(`/tutors/${id}/faqs`, { method: 'POST', body: JSON.stringify(data) }),
  };

  // Boards
  boards = {
    list: () => this.fetcher<Board[]>('/admin/boards'),
    get: (id: string) => this.fetcher<Board>(`/public/boards/${id}`),
    create: (data: any) => this.fetcher<Board>('/boards', { method: 'POST', body: JSON.stringify(data) }),
  };

  schools = {
    list: () => this.fetcher<School[]>('/admin/schools'),
  };

  lookups = {
    list: () =>
      this.fetcher<{
        boards: Board[];
        classes: any[];
        subjects: Subject[];
        schools: School[];
        sectors: Sector[];
        societies: Society[];
        tutors: Tutor[];
      }>('/admin/lookups'),
  };

  content = {
    list: <T = any>(entity: string) =>
      this.fetcher<T[]>(`/admin/content/${entity}`),
    get: <T = any>(entity: string, id: string) =>
      this.fetcher<T>(`/admin/content/${entity}/${id}`),
    create: <T = any>(entity: string, data: Record<string, unknown>) =>
      this.fetcher<T>(`/admin/content/${entity}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: <T = any>(
      entity: string,
      id: string,
      data: Record<string, unknown>,
    ) =>
      this.fetcher<T>(`/admin/content/${entity}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    archive: <T = any>(entity: string, id: string) =>
      this.fetcher<T>(`/admin/content/${entity}/${id}`, {
        method: 'DELETE',
      }),
  };

  // Leads
  leads = {
    list: () => this.fetcher<Lead[]>('/admin/leads'),
    updateStatus: (id: string, status: string) => this.fetcher<Lead>(`/admin/leads/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  };

  // Pages
  pages = {
    list: () => this.fetcher<PageRecord[]>('/admin/pages'),
    get: (id: string) => this.fetcher<PageRecord>(`/admin/pages/${id}`),
    update: (id: string, data: any) => this.fetcher<PageRecord>(`/admin/pages/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  };

  // Stats
  stats = {
    overview: () => this.fetcher<any>('/admin/stats/overview'),
  };

  // Page Generator
  pageGenerator = {
    trigger: (type: string) => this.fetcher<any>('/admin/page-generator/trigger', { method: 'POST', body: JSON.stringify({ type }) }),
    getJobs: () => this.fetcher<any[]>('/admin/page-generator/jobs'),
    getThresholds: () => this.fetcher<any>('/admin/page-generator/thresholds'),
    updateThresholds: (data: any) => this.fetcher<any>('/admin/page-generator/thresholds', { method: 'PATCH', body: JSON.stringify(data) }),
  };
}

export const api = new ApiClient();
