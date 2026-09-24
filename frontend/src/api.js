const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  if (!API_BASE) throw new Error('CivicLink API URL is not configured');
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) {
    let message = `API request failed: ${response.status}`;
    try { const body = await response.json(); message = body.detail || message; } catch (_) {}
    throw new Error(message);
  }
  return response.json();
}

export const apiConfigured = Boolean(API_BASE);
export const getHealth = () => request('/api/health');
export const getSchemes = () => request('/api/schemes').then((data) => data.schemes || []);
export const getScheme = (id) => request(`/api/schemes/${encodeURIComponent(id)}`);
export const matchSchemes = (profile, limit = 12) =>
  request('/api/match', { method: 'POST', body: JSON.stringify({ profile, limit }) }).then((data) => data.results || []);

export default { getHealth, getSchemes, getScheme, matchSchemes, apiConfigured };
