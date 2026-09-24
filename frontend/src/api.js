import { SCHEMES } from './mock';

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

function localMatchSchemes(profile, limit = 12) {
  const results = SCHEMES.map((s) => {
    let score = 40;
    const reasons = [];
    const unmet = [];
    if (profile.occupation === 'Farmer' && s.category === 'agri') { score += 25; reasons.push('Your occupation aligns with agriculture.'); }
    if (profile.occupation === 'Artisan / Craftsperson' && s.category === 'artisan') { score += 25; reasons.push('Your occupation aligns with traditional artisan support.'); }
    if (profile.occupation === 'Small Business / MSME' && s.category === 'msme') { score += 25; reasons.push('Your occupation aligns with MSME support.'); }
    if (profile.occupation === 'Student' && s.category === 'edu') { score += 25; reasons.push('Students are a target group for this scheme.'); }
    const needMap = {
      'Business Loan': 'msme',
      'Education / Scholarship': 'edu',
      'Health / Insurance': 'health',
      'Pension / Social Security': 'social',
      'Agriculture Support': 'agri'
    };
    if (needMap[profile.need] === s.category) { score += 15; reasons.push('Matches the support you selected.'); }
    if (profile.need === 'Housing' && s.sector === 'Housing') { score += 15; reasons.push('Matches your housing requirement.'); }
    if (profile.gender === 'Female' && (s.beneficiary === 'Women' || /women|girl/i.test(s.name))) { score += 10; reasons.push('Includes women or girls as beneficiaries.'); }
    const age = parseInt(profile.age || '0', 10);
    if (age >= 18 && age <= 70 && s.sector === 'Insurance') { score += 5; reasons.push('Age fits the insurance age range.'); }
    if (age >= 60 && s.category === 'social' && /pension/i.test(s.name)) { score += 8; reasons.push('Provides pension support for older citizens.'); }
    if (!reasons.length) unmet.push('No primary profile match identified.');
    return { scheme: s, score: Math.min(score, 98), reasons, unmet };
  });
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
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
  return localMatchSchemes(profile, limit);
}

export default { getHealth, getSchemes, getScheme, matchSchemes, apiConfigured };
