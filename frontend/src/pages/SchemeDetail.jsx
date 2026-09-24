import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Building2, IndianRupee, Percent, FileText, ExternalLink, ListChecks, CheckCircle2 } from 'lucide-react';
import { SCHEMES } from '../mock';
import { useLanguage } from '../i18n';

export default function SchemeDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const scheme = SCHEMES.find((s) => s.id === id);

  if (!scheme) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-16 text-slate-200 text-center">
        <h2 className="text-2xl font-bold text-white">{t('Scheme not found')}</h2>
        <button onClick={() => navigate('/schemes')} className="mt-4 px-4 py-2 rounded-lg bg-orange-500 text-white">{t('Back to Directory')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 text-slate-100">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-orange-300 transition-colors"><ArrowLeft size={15} /> Back to Directory</button>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-[#0f1e37] p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium"><ShieldCheck size={11} /> Government Verified</span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 font-medium uppercase tracking-wide">{scheme.tag}</span>
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{scheme.name}</h1>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-400"><Building2 size={14} /> {scheme.ministry}</div>
        <p className="mt-4 text-slate-300 leading-relaxed">{scheme.desc}</p>

        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <Stat icon={IndianRupee} label="Max Support / Loan" value={scheme.loan} accent="orange" />
          <Stat icon={Percent} label="Interest Rate" value={scheme.rate} />
          <Stat icon={FileText} label="Application Route" value={scheme.route} />
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><ListChecks size={18} className="text-orange-400" /> Eligibility Criteria</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {[
              `Applicant should be an Indian citizen aged 18 or above.`,
              `Beneficiary group: ${scheme.beneficiary}.`,
              `Compliance with income and category rules published in the official Gazette.`,
              `Applicant should not have a defaulting record with any scheduled bank.`,
              `Business/project (if any) should fall under approved sector: ${scheme.sector}.`,
            ].map((r, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle2 size={15} className="text-emerald-400 mt-0.5" /> {r}</li>))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><FileText size={18} className="text-orange-400" /> Required Documents</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {['Aadhaar Card', 'PAN Card', 'Bank Account / Passbook', 'Income Certificate (if applicable)', 'Category / Caste Certificate (if applicable)', 'Domicile / Residence Proof'].map((d) => (
              <li key={d} className="flex items-start gap-2"><CheckCircle2 size={15} className="text-emerald-400 mt-0.5" /> {d}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-orange-500/25 bg-gradient-to-r from-orange-500/10 to-amber-500/5 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-white font-bold text-lg">{t('Ready to Apply?')}</div>
          <div className="text-slate-300 text-sm">Follow the official application route or locate a verified channel partner.</div>
        </div>
        <div className="flex gap-2">
          <Link to="/partners" className="px-4 py-2.5 rounded-lg border border-slate-700 hover:border-orange-400 hover:text-orange-300 text-slate-200 text-sm font-medium transition-colors">{t('Find Partner')}</Link>
          <a href="#apply" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-sm font-semibold transition-colors">Apply on Portal <ExternalLink size={14} /></a>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-xl bg-slate-950/40 border border-slate-800 p-4">
      <div className="flex items-center gap-2 text-xs text-slate-400"><Icon size={13} className={accent === 'orange' ? 'text-orange-400' : 'text-slate-400'} /> {label}</div>
      <div className={`mt-1 text-lg font-bold ${accent === 'orange' ? 'text-orange-300' : 'text-white'}`}>{value}</div>
    </div>
  );
}
