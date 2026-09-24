const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export async function matchSchemes(profile, limit = 12) {
  const response = await fetch(API_BASE_URL + '/api/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, limit }),
  });
  if (!response.ok) {
    let detail = 'Matching service request failed';
    try { const data = await response.json(); detail = data.detail || detail; } catch (e) { /* ignore */ }
    throw new Error(detail);
  }
  return response.json();
}

export async function checkMatchingService() {
  const response = await fetch(API_BASE_URL + '/api/status');
  if (!response.ok) throw new Error('Matching service unavailable');
  return response.json();
}
