import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, FileText, ListChecks, MapPin, Building2, ChevronRight, ShieldCheck, Printer, Share2 } from 'lucide-react';

const TABS = [
  { key: 'schemes', label: 'Schemes', icon: Sparkles },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'plan', label: 'Action Plan', icon: ListChecks },
  { key: 'verify', label: 'Verify / CSC', icon: MapPin },
];

const DOCUMENTS = [
  { name: 'Aadhaar Card', why: 'Mandatory identity proof for all central welfare schemes', where: 'UIDAI / Nearest Aadhaar Seva Kendra' },
  { name: 'PAN Card', why: 'Required for financial credit and loan disbursement', where: 'NSDL / UTIITSL online portal' },
  { name: 'Income Certificate', why: 'Establishes eligibility under income-based schemes', where: 'Tehsildar / District Revenue Office' },
  { name: 'Caste / Category Certificate', why: 'Required for reservation-based benefits', where: 'District SDM / Revenue Department' },
  { name: 'Bank Passbook / Cancelled Cheque', why: 'For direct benefit transfer (DBT) crediting', where: 'Your bank branch' },
  { name: 'Domicile / Residence Proof', why: 'Confirms state and district-level eligibility', where: 'Local municipal office' },
];

export default function Results() {
  const [tab, setTab] = useState('schemes');
  const [results, setResults] = useState([]);
  const [profile, setProfile] = useState({});
  const [checked, setChecked] = useState({});

  useEffect(() => {
    try { setResults(JSON.parse(localStorage.getItem('civiclink_results') || '[]')); } catch (e) { /* ignore */ }
    try { setProfile(JSON.parse(localStorage.getItem('civiclink_profile') || '{}')); } catch (e) { /* ignore */ }
  }, []);

  const toggle = (k) => setChecked({ ...checked, [k]: !checked[k] });

  if (results.length === 0) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-16 text-center text-slate-200">
        <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-10">
          <h2 className="text-2xl font-bold text-white">No results yet</h2>
          <p className="mt-2 text-slate-400">Complete the smart matching flow first to see personalized government scheme recommendations.</p>
          <Link to="/recommendations" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-colors">Start Smart Matching</Link>
        </div>
      </div>
    );
  }

  const top = results[0];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-slate-100">
      <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium"><CheckCircle2 size={12} /> MATCHING COMPLETE</div>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Your Personalized Results</h1>
            <p className="mt-2 text-slate-400">Based on your profile{profile.name ? `, ${profile.name}` : ''}. We found <span className="text-orange-300 font-semibold">{results.length} matching schemes</span>.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-200 border border-slate-700 hover:border-orange-400 hover:text-orange-300 transition-colors"><Printer size={14} /> Print</button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-200 border border-slate-700 hover:border-orange-400 hover:text-orange-300 transition-colors"><Share2 size={14} /> Share</button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1 border-b border-slate-800">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm border-b-2 transition-colors ${tab === t.key ? 'border-orange-500 text-orange-300' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'schemes' && (
        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          {results.map(({ scheme, score, reasons }) => (
            <div key={scheme.id} className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-5 hover:border-orange-500/40 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium"><ShieldCheck size={11} /> Government Verified</span>
                  <h3 className="mt-2 text-lg font-bold text-white leading-snug">{scheme.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400"><Building2 size={12} /> {scheme.ministry}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-400">{score}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Match Score</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{scheme.desc}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-2.5">
                  <div className="text-slate-500">MAX SUPPORT</div>
                  <div className="text-orange-300 font-semibold">{scheme.loan}</div>
                </div>
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-2.5">
                  <div className="text-slate-500">INTEREST</div>
                  <div className="text-white font-semibold">{scheme.rate}</div>
                </div>
              </div>
              {reasons.length > 0 && (
                <div className="mt-3">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">Why this matches</div>
                  <ul className="space-y-1">
                    {reasons.slice(0, 3).map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300"><CheckCircle2 size={13} className="text-emerald-400 mt-0.5" /> {r}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Link to={`/schemes/${scheme.id}`} className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium">View Full Details <ChevronRight size={15} /></Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'documents' && (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
          <h3 className="text-lg font-bold text-white">Required Documents Checklist</h3>
          <p className="text-sm text-slate-400 mt-1">Keep these ready to apply for the recommended schemes. Tap each to mark as ready.</p>
          <div className="mt-5 space-y-2">
            {DOCUMENTS.map((d) => (
              <button key={d.name} onClick={() => toggle(d.name)} className={`w-full text-left rounded-xl border p-4 flex gap-3 items-start transition-colors ${checked[d.name] ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'}`}>
                <div className={`mt-0.5 w-5 h-5 rounded-md grid place-items-center border ${checked[d.name] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'}`}>{checked[d.name] && <CheckCircle2 size={13} className="text-white" />}</div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{d.name}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{d.why}</div>
                  <div className="text-xs text-slate-500 mt-1"><span className="text-slate-400">Where to obtain:</span> {d.where}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'plan' && (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
          <h3 className="text-lg font-bold text-white">Personalized Action Plan</h3>
          <p className="text-sm text-slate-400 mt-1">Based on your profile and top recommendation: <span className="text-orange-300 font-medium">{top.scheme.name}</span></p>
          <ol className="mt-5 space-y-3">
            {[
              `Register on the official ${top.scheme.ministry} portal or nearest CSC.`,
              `Prepare identity, income, and category documents listed in the Documents tab.`,
              `Complete online application for ${top.scheme.name} through the official route.`,
              `Visit or contact the nearest verified channel partner for offline assistance if required.`,
              `Track your application status regularly and respond to any officer queries.`,
              `On approval, ensure DBT / disbursal into your linked bank account.`,
            ].map((s, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 grid place-items-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                <div className="text-sm text-slate-300 leading-relaxed pt-0.5">{s}</div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === 'verify' && (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
          <h3 className="text-lg font-bold text-white">Verify with CSC / Channel Partner</h3>
          <p className="text-sm text-slate-400 mt-1">Get in-person assistance from verified government channel partners.</p>
          <Link to="/partners" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-colors"><MapPin size={15} /> Find Nearby Partners</Link>
        </div>
      )}
    </div>
  );
}
