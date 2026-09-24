const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  if (!API_BASE) throw new Error('API_NOT_CONFIGURED');
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export const apiConfigured = Boolean(API_BASE);

export async function getHealth() {
  return request('/api/health');
}

export async function getSchemes() {
  const data = await request('/api/schemes');
  return Array.isArray(data.schemes) ? data.schemes : [];
}

export async function getScheme(id) {
  return request(`/api/schemes/${encodeURIComponent(id)}`);
}

export async function matchSchemes(profile, limit = 12) {
  const data = await request('/api/match', {
    method: 'POST',
    body: JSON.stringify({ profile, limit }),
  });
  if (!Array.isArray(data.results)) throw new Error('Invalid matching response');
  return data.results;
}

export default { getHealth, getSchemes, getScheme, matchSchemes, apiConfigured };
