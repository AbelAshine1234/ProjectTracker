const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export { API_URL };

/**
 * Wrapper around fetch that automatically attaches the JWT token
 * and handles JSON responses.
 */
export async function apiFetch(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}
