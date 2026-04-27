import { 
  Tutor, Board, Subject, School, Sector, Society, 
  Lead, PageRecord
} from '@boardpefocus/types';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  role: string;
  roles: string[];
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserPayload {
  name: string;
  email: string;
  password?: string;
  role: string;
  isActive: boolean;
}

export interface SeoMetadataTarget {
  id: string;
  targetType: string;
  targetId: string;
  label: string;
  slug: string | null;
  status: string | null;
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  noIndex: boolean;
  updatedAt: string;
}

export interface RedirectRule {
  id: string;
  from: string;
  to: string;
  code: number;
  isActive: boolean;
  createdAt: string;
}

export interface MediaAssetRecord {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  provider: string;
  bucket?: string | null;
  key?: string | null;
  altText?: string | null;
  metadata?: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface LookupRecord {
  id: string;
  name?: string;
  title?: string;
  slug?: string | null;
}

export interface LookupCatalog {
  boards: Board[];
  classes: LookupRecord[];
  subjects: Subject[];
  schools: School[];
  sectors: Sector[];
  societies: Society[];
  tutors: LookupRecord[];
  resources: LookupRecord[];
  results: LookupRecord[];
  processContent: LookupRecord[];
  pages: LookupRecord[];
}

function resolveApiBaseUrl() {
  const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (typeof window !== 'undefined') {
    if (configuredApiBaseUrl) {
      return configuredApiBaseUrl;
    }

    return '/api';
  }

  if (configuredApiBaseUrl) {
    return configuredApiBaseUrl;
  }

  return 'http://127.0.0.1:3001/api';
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
    let response: Response;
    try {
      response = await fetch(`${apiBaseUrl}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options?.headers,
        },
      });
    } catch {
      throw new Error(
        'Unable to reach the admin API. Make sure the backend service is running.',
      );
    }

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
    list: () => this.fetcher<Board[]>('/admin/content/boards'),
    get: (id: string) => this.fetcher<Board>(`/admin/content/boards/${id}`),
    create: (data: any) => this.fetcher<Board>('/admin/content/boards', { method: 'POST', body: JSON.stringify(data) }),
  };

  schools = {
    list: () => this.fetcher<School[]>('/admin/content/schools'),
  };

  lookups = {
    list: () => this.fetcher<LookupCatalog>('/admin/lookups'),
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

  // Admin Users
  adminUsers = {
    list: () => this.fetcher<AdminUser[]>('/admin/users'),
    create: (data: AdminUserPayload) =>
      this.fetcher<AdminUser>('/admin/users', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<AdminUserPayload>) =>
      this.fetcher<AdminUser>(`/admin/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      this.fetcher<AdminUser>(`/admin/users/${id}`, { method: 'DELETE' }),
  };

  // Pages
  pages = {
    list: () => this.fetcher<PageRecord[]>('/admin/pages'),
    get: (id: string) => this.fetcher<PageRecord>(`/admin/pages/${id}`),
    create: (data: any) => this.fetcher<PageRecord>('/admin/pages', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => this.fetcher<PageRecord>(`/admin/pages/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => this.fetcher<PageRecord>(`/admin/pages/${id}`, { method: 'DELETE' }),
  };

  seo = {
    list: () => this.fetcher<SeoMetadataTarget[]>('/admin/seo'),
    update: (targetType: string, id: string, data: Record<string, unknown>) =>
      this.fetcher<any>(`/admin/seo/${targetType}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  };

  redirects = {
    list: () => this.fetcher<RedirectRule[]>('/admin/redirects'),
    create: (data: Record<string, unknown>) =>
      this.fetcher<RedirectRule>('/admin/redirects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Record<string, unknown>) =>
      this.fetcher<RedirectRule>(`/admin/redirects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      this.fetcher<RedirectRule>(`/admin/redirects/${id}`, {
        method: 'DELETE',
      }),
  };

  media = {
    list: (query?: string) =>
      this.fetcher<MediaAssetRecord[]>(
        `/admin/media${query ? `?q=${encodeURIComponent(query)}` : ''}`,
      ),
    create: (data: Record<string, unknown>) =>
      this.fetcher<MediaAssetRecord>('/admin/media', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Record<string, unknown>) =>
      this.fetcher<MediaAssetRecord>(`/admin/media/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      this.fetcher<MediaAssetRecord>(`/admin/media/${id}`, {
        method: 'DELETE',
      }),
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
