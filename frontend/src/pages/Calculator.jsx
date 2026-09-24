import React, { useState } from 'react';
import { Calculator as CalcIcon, IndianRupee, Percent, CalendarClock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n';

function emi(P, R, N) {
  if (!P || !R || !N) return 0;
  const r = R / 12 / 100;
  const n = N;
  const val = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return isFinite(val) ? val : 0;
}

export default function Calculator() {
  const { t } = useLanguage();
  const [P, setP] = useState(500000);
  const [R, setR] = useState(8.5);
  const [N, setN] = useState(36);

  const monthly = emi(P, R, N);
  const total = monthly * N;
  const interest = total - P;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 text-slate-100">
      <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300"><CalcIcon size={13} /> LOAN & SUBSIDY CALCULATOR</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{t('Financial Calculator')}</h1>
        <p className="mt-2 text-slate-400 max-w-3xl">Estimate EMI, total interest, and net cost for MUDRA, PMEGP, Stand-Up India and other scheme-backed loans.</p>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-[#0f1e37] p-6 space-y-5">
          <Slider label="Loan Amount" icon={IndianRupee} value={P} setValue={setP} min={10000} max={10000000} step={10000} format={(v) => `\u20B9 ${v.toLocaleString('en-IN')}`} />
          <Slider label="Interest Rate (per annum)" icon={Percent} value={R} setValue={setR} min={1} max={20} step={0.1} format={(v) => `${v.toFixed(1)} %`} />
          <Slider label="Tenure (months)" icon={CalendarClock} value={N} setValue={setN} min={6} max={240} step={1} format={(v) => `${v} months`} />
        </div>

        <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-6">
          <div className="text-xs text-orange-300 uppercase tracking-widest">{t('Monthly EMI')}</div>
          <div className="mt-2 text-4xl font-bold text-white">₹ {monthly.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-950/40 border border-slate-800 p-3">
              <div className="text-[10px] text-slate-400 uppercase">{t('Total Interest')}</div>
              <div className="text-lg font-semibold text-white">₹ {interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="rounded-lg bg-slate-950/40 border border-slate-800 p-3">
              <div className="text-[10px] text-slate-400 uppercase">{t('Total Payable')}</div>
              <div className="text-lg font-semibold text-white">₹ {total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-emerald-300"><TrendingUp size={13} /> Calculations are indicative. Final terms depend on the disbursing institution.</div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, icon: Icon, value, setValue, min, max, step, format }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-slate-300 inline-flex items-center gap-2"><Icon size={15} className="text-orange-400" /> {label}</label>
        <div className="text-white font-semibold">{format(value)}</div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-orange-500" />
      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
