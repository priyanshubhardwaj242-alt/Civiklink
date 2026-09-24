import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, BookOpen, Building2, ChevronRight, ShieldCheck, Loader2 } from 'lucide-react';
import { getSchemes } from '../api';
import { CATEGORIES } from '../mock';

export default function Schemes() {
  const [params] = useSearchParams();
  const initialQ = params.get('q') || '';
  const catFilter = params.get('cat') || '';
  const [q, setQ] = useState(initialQ);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ministry, setMinistry] = useState('All Ministries');
  const [sector, setSector] = useState('All Sectors');
  const [assistance, setAssistance] = useState('All Assistance Types');
  const [beneficiary, setBeneficiary] = useState('All Beneficiary Groups');
  const [route, setRoute] = useState('All Application Routes');
  const [sort, setSort] = useState('Most Relevant');

  useEffect(() => { setQ(initialQ); }, [initialQ]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getSchemes()
      .then((data) => { if (active) setSchemes(data); })
      .catch(() => { if (active) setError('The scheme service is unavailable. Please start the CivicLink backend and try again.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const options = useMemo(() => ({
    ministries: [...new Set(schemes.map((s) => s.ministry).filter(Boolean))].sort(),
    sectors: [...new Set(schemes.map((s) => s.sector).filter(Boolean))].sort(),
    beneficiaries: [...new Set(schemes.map((s) => s.beneficiary).filter(Boolean))].sort(),
    routes: [...new Set(schemes.map((s) => s.route).filter(Boolean))].sort(),
  }), [schemes]);

  const filtered = useMemo(() => {
    let list = schemes.slice();
    if (catFilter) list = list.filter((s) => s.category === catFilter);
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter((s) => [s.name, s.desc, s.tag, s.ministry, s.sector, s.beneficiary].some((v) => String(v || '').toLowerCase().includes(t)));
    }
    if (ministry !== 'All Ministries') list = list.filter((s) => s.ministry === ministry);
    if (sector !== 'All Sectors') list = list.filter((s) => s.sector === sector);
    if (assistance !== 'All Assistance Types') list = list.filter((s) => s.rate === assistance || s.tag === assistance);
    if (beneficiary !== 'All Beneficiary Groups') list = list.filter((s) => s.beneficiary === beneficiary);
    if (route !== 'All Application Routes') list = list.filter((s) => s.route === route);
    if (sort === 'Name (A to Z)') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'Name (Z to A)') list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [schemes, q, ministry, sector, assistance, beneficiary, route, sort, catFilter]);

  const currentCat = CATEGORIES.find((c) => c.id === catFilter);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-slate-100">
      <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium"><ShieldCheck size={12} /> CIVICLINK BACKEND CATALOG</span>
          <span className="text-xs text-slate-400">Single source: FastAPI scheme service</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <BookOpen size={26} className="text-orange-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Government Schemes Directory</h1>
        </div>
        <p className="mt-2 text-slate-400 max-w-3xl">Search and filter the CivicLink scheme catalog served by the backend.{currentCat ? ` • Filtered by: ${currentCat.name}` : ''}</p>

        <div className="mt-5 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-orange-500">
            <Search size={16} className="text-slate-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search schemes by name, keyword, ministry, or sector..." className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <Filter label="FILTER BY MINISTRY" value={ministry} set={setMinistry} options={['All Ministries', ...options.ministries]} />
          <Filter label="SECTOR & INDUSTRY" value={sector} set={setSector} options={['All Sectors', ...options.sectors]} />
          <Filter label="ASSISTANCE / FINANCIAL TYPE" value={assistance} set={setAssistance} options={['All Assistance Types', 'Loan', 'Subsidy', 'Grant', 'Insurance', 'Pension', 'Credit / Loan', 'DBT', 'Health', 'Savings']} />
          <Filter label="FILTER BY BENEFICIARY" value={beneficiary} set={setBeneficiary} options={['All Beneficiary Groups', ...options.beneficiaries]} />
          <Filter label="FILTER BY APPLICATION ROUTE" value={route} set={setRoute} options={['All Application Routes', ...options.routes]} />
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
          <div>Showing <span className="text-white font-semibold">{filtered.length}</span> of {schemes.length} backend schemes</div>
          <div className="flex items-center gap-2">
            <span>Sort:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500">
              {['Most Relevant', 'Name (A to Z)', 'Name (Z to A)'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {loading && <div className="mt-8 flex justify-center items-center gap-2 text-slate-400"><Loader2 className="animate-spin" size={18} /> Loading schemes from CivicLink API...</div>}
      {error && !loading && <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">{error}</div>}

      {!loading && !error && (
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <Link to={`/schemes/${s.id}`} key={s.id} className="group rounded-2xl border border-slate-800 bg-[#0f1e37] p-5 hover:border-orange-500/50 hover:bg-[#122549] transition-colors">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium"><ShieldCheck size={11} /> Backend Catalog</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 font-medium uppercase tracking-wide">{s.tag}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-white group-hover:text-orange-300 transition-colors leading-snug">{s.name}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400"><Building2 size={13} /> {s.ministry}</div>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">{s.desc}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-2.5"><div className="text-slate-500">SUPPORT / BENEFIT</div><div className="text-orange-300 font-semibold mt-0.5">{s.loan}</div></div>
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-2.5"><div className="text-slate-500">TYPE</div><div className="text-white font-semibold mt-0.5">{s.rate}</div></div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-orange-400 text-sm font-medium group-hover:text-orange-300">View Details <ChevronRight size={15} /></div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-slate-800 bg-[#0f1e37] p-10 text-center">
          <div className="text-slate-300 font-semibold">No matching schemes found.</div>
          <p className="text-sm text-slate-500 mt-2">Try different filters or search keywords.</p>
        </div>
      )}
    </div>
  );
}

function Filter({ label, value, set, options }) {
  return <div><div className="text-[10px] font-semibold text-slate-500 tracking-widest mb-1">{label}</div><select value={value} onChange={(e) => set(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-orange-500">{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></div>;
}
