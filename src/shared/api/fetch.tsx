import { BASE_URL } from '../utils/constants';

export interface MAxiosCustomConfig {
  // custom config to add
}

export interface MAxiosRequestConfig extends RequestInit {
  custom?: MAxiosCustomConfig;
}

async function fetchWithAuthorization(url: string, config?: MAxiosRequestConfig) {
  const headers = new Headers(config?.headers);
  headers.set('Content-Type', 'application/json');
  const requestOptions: RequestInit = {
    method: config?.method || 'GET',
    headers: headers,
    body: config?.body,
  };
  try {
    const result = await fetch(BASE_URL + url, requestOptions);
    const data = await result.json();
    return {
      status: result.status,
      statusText: result.statusText,
      ok: result.ok,
      data: data,
    };
  } catch (error) {
    return {
      data: { reason: 'Failed to Fetch data.' },
      ok: false,
    };
  }
}

export async function apiGet<T = any>(resource: string, config?: MAxiosRequestConfig) {
  return fetchWithAuthorization(resource, { ...config, method: 'GET' });
}

export async function apiPost<T = any>(resource: string, data?: any, config?: MAxiosRequestConfig) {
  return fetchWithAuthorization(resource, { ...config, method: 'POST', body: JSON.stringify(data) });
}

export async function apiDelete<T = any>(resource: string, config?: MAxiosRequestConfig) {
  return fetchWithAuthorization(resource, { ...config, method: 'DELETE' });
}

export async function apiPatch<T = any>(resource: string, data?: any, config?: MAxiosRequestConfig) {
  return fetchWithAuthorization(resource, { ...config, method: 'PATCH', body: JSON.stringify(data) });
}

export async function apiPut<T = any>(resource: string, data?: any, config?: MAxiosRequestConfig) {
  return fetchWithAuthorization(resource, { ...config, method: 'PUT', body: JSON.stringify(data) });
}
