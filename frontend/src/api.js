import { matchSchemes as localMatchSchemes, SCHEMES } from './mock';

const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  if (!API_BASE) throw new Error('LOCAL_MODE');
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export const apiConfigured = Boolean(API_BASE);

export async function getHealth() {
  if (!API_BASE) return { status: 'ok', api: 'local', schemes: SCHEMES.length };
  try { return await request('/api/health'); } catch (_) {
    return { status: 'ok', api: 'local-fallback', schemes: SCHEMES.length };
  }
}

export async function getSchemes() {
  if (!API_BASE) return SCHEMES;
  try {
    const data = await request('/api/schemes');
    return data.schemes || SCHEMES;
  } catch (_) { return SCHEMES; }
}

export async function getScheme(id) {
  if (!API_BASE) return SCHEMES.find((s) => s.id === id) || null;
  try { return await request(`/api/schemes/${encodeURIComponent(id)}`); }
  catch (_) { return SCHEMES.find((s) => s.id === id) || null; }
}

export async function matchSchemes(profile, limit = 12) {
  if (API_BASE) {
    try {
      const data = await request('/api/match', {
        method: 'POST',
        body: JSON.stringify({ profile, limit }),
      });
      if (Array.isArray(data.results)) return data.results;
    } catch (_) {}
  }
  return localMatchSchemes(profile).slice(0, limit);
}

export default { getHealth, getSchemes, getScheme, matchSchemes, apiConfigured };
