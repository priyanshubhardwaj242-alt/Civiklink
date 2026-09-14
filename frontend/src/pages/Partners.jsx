import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Building2, Search, Loader2 } from 'lucide-react';
import { PARTNERS } from '../mock';

export default function Partners() {
  const [q, setQ] = useState('');
  const [state, setState] = useState('All States');
  const [locating, setLocating] = useState(false);
  const [locErr, setLocErr] = useState('');

  const states = ['All States', ...Array.from(new Set(PARTNERS.map((p) => p.state)))];
  const filtered = PARTNERS.filter((p) => {
    const okQ = !q || (p.name.toLowerCase() + p.address.toLowerCase() + p.type.toLowerCase()).includes(q.toLowerCase());
    const okS = state === 'All States' || p.state === state;
    return okQ && okS;
  });

  const detect = () => {
    if (!navigator.geolocation) { setLocErr('Location is not supported in this browser.'); return; }
    setLocating(true); setLocErr('');
    navigator.geolocation.getCurrentPosition(
      () => { setLocating(false); },
      (err) => { setLocating(false); setLocErr(err.code === 1 ? 'Location permission denied. Please search manually.' : 'Unable to fetch location.'); },
      { timeout: 6000 }
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-slate-100">
      <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"><MapPin size={13} /> LOCATE VERIFIED PARTNERS</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Find Nearby Partner</h1>
        <p className="mt-2 text-slate-400 max-w-3xl">Locate authorized banks, CSCs, District Industries Centres, and channelizing agencies verified for scheme facilitation.</p>

        <div className="mt-5 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-orange-500">
            <Search size={16} className="text-slate-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, type or address..." className="flex-1 bg-transparent focus:outline-none text-slate-100 placeholder:text-slate-500" />
          </div>
          <select value={state} onChange={(e) => setState(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500">
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={detect} className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-semibold transition-colors">
            {locating ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
            Use My Location
          </button>
        </div>
        {locErr && <div className="mt-2 text-xs text-orange-400">{locErr}</div>}
      </div>

      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-5 hover:border-orange-500/40 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/15 border border-orange-500/30 grid place-items-center"><Building2 size={18} className="text-orange-400" /></div>
              <div className="text-[11px] text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">Verified</div>
            </div>
            <h3 className="mt-3 text-white font-semibold leading-snug">{p.name}</h3>
            <div className="mt-1 text-xs text-slate-400">{p.type}</div>
            <div className="mt-3 space-y-1.5 text-sm text-slate-300">
              <div className="flex items-start gap-1.5"><MapPin size={14} className="text-slate-500 mt-0.5" /> {p.address}</div>
              <div className="flex items-start gap-1.5"><Phone size={14} className="text-slate-500 mt-0.5" /> {p.phone}</div>
              <div className="flex items-start gap-1.5"><Navigation size={14} className="text-slate-500 mt-0.5" /> {p.distance} away</div>
            </div>
            <div className="mt-4 flex gap-2">
              <a href={`tel:${p.phone.replace(/[^0-9]/g, '')}`} className="flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium border border-slate-700 hover:border-orange-400 hover:text-orange-300 transition-colors">Call</a>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(p.address)}`} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-colors">Directions</a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-[#0f1e37] p-10 text-center text-slate-400">No partners found for your search.</div>
      )}
    </div>
  );
}
