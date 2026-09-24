import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, ArrowRight, ShieldCheck, FileCheck2, Users2, Lock, Briefcase, Sprout, Hammer, GraduationCap, ShieldCheck as Shield, HeartPulse, ChevronRight } from 'lucide-react';
import { CATEGORIES, FOCUS_TAGS } from '../mock';
import { useLanguage } from '../i18n';

const ICONS = { Briefcase, Sprout, Hammer, GraduationCap, ShieldCheck: Shield, HeartPulse };

function NumberBadge({ n }) {
  return (
    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 grid place-items-center">
      <span className="text-xl font-bold text-orange-300">{n}</span>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const { t } = useLanguage();

  return (
    <div className="text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a30] via-[#0a1628] to-[#08111f]" />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(249,115,22,0.15), transparent 40%), radial-gradient(circle at 80% 30%, rgba(56,189,248,0.12), transparent 45%)' }} />
        <div className="relative max-w-[1400px] mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {t('Official Civic-Tech Portal')}
            <span className="text-slate-600">•</span>
            <span className="text-orange-300">{t('90 Verified Government Schemes')}</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]" style={{ fontFamily: 'Georgia, serif' }}>
            {t('Find Government Schemes That Fit You')}
          </h1>
          <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
            {t('Empowering citizens, entrepreneurs, and farmers across India with rule-based eligibility checks, official Gazette guidelines, and direct portal routes.')}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/recommendations" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/40 transition-colors">
              <Sparkles size={18} /> {t('Find Matching Schemes')} <ArrowRight size={17} />
            </Link>
            <Link to="/schemes" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-slate-100 font-semibold border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition-colors">
              <Search size={18} /> {t('Explore Scheme Catalog')}
            </Link>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      </section>

      {/* MATCHING FEATURE */}
      <section className="max-w-[1400px] mx-auto px-6 mt-14">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0f1f38] to-[#0a1628] p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 font-medium">
              <Users2 size={13} /> {t('Personalized Scheme Matching')}
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{t('Find Government Schemes You May Be Eligible For')}</h2>
            <p className="mt-3 text-slate-400">{t('Answer a few questions about your age, category, location, occupation and business needs. CivicLink checks your profile against official scheme eligibility rules.')}</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-2">
              {['Personalized scheme matching', 'Rule-based eligibility checks', 'Official government sources', 'No document upload required'].map((f) => (
                <div key={f} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-sm text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 grid place-items-center"><ShieldCheck size={10} className="text-emerald-400" /></span>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="flex md:justify-end">
            <Link to="/recommendations" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/30 transition-colors">
              <Sparkles size={18} /> {t('Find Matching Schemes')} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4-STEP PROCESS */}
      <section className="max-w-[1400px] mx-auto px-6 mt-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-300">{t('Transparent 4-Step Process')}</div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{t('How CivicLink Works for Citizens')}</h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">{t('A transparent 4-step path to discover schemes you may qualify for and access official application routes.')}</p>
        </div>
        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {[
            { n: '01', t: 'Tell us about yourself', d: 'Share basic profile details like your age, social category, location, and vocation in complete privacy.' },
            { n: '02', t: 'Check eligibility', d: 'Our deterministic engine evaluates official statutory scheme criteria against your profile.' },
            { n: '03', t: 'Discover matching schemes', d: 'Receive a curated list of government schemes with transparent match reasons and financial benefits.' },
            { n: '04', t: 'Follow official application route', d: 'Apply directly on official ministry portals or locate verified local channel partner assistance centers.' },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-5 hover:border-orange-500/40 transition-colors">
              <NumberBadge n={s.n} />
              <h3 className="mt-4 text-white font-bold">{t(s.t)}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{t(s.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="max-w-[1400px] mx-auto px-6 mt-14">
        <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
          <h3 className="text-lg font-bold text-white">{t('Search Schemes by Keyword or Focus Area')}</h3>
          <p className="text-sm text-slate-400 mt-1">{t('Quickly explore schemes using direct keywords or popular welfare topics')}</p>
          <div className="mt-4 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-orange-500">
              <Search size={16} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('Search e.g. MUDRA, women, Ayushman...')}
                className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <Link to={`/schemes?q=${encodeURIComponent(search)}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white bg-sky-600 hover:bg-sky-500 transition-colors font-semibold">
              <Search size={16} /> {t('Search')}
            </Link>
          </div>
          <div className="mt-4">
            <div className="text-xs text-slate-500 mb-2">{t('Popular Focus Areas:')}</div>
            <div className="flex flex-wrap gap-2">
              {FOCUS_TAGS.map((tag) => (
                <Link key={tag} to={`/schemes?q=${encodeURIComponent(tag)}`} className="text-xs px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-orange-400 hover:text-orange-300 transition-colors">{t(tag)}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1400px] mx-auto px-6 mt-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">{t('Targeted Welfare Portfolios')}</div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{t('Explore Schemes by Category')}</h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">{t('Browse verified government welfare portfolios organized by sector and trade.')}</p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon] || Briefcase;
            return (
              <Link to={`/schemes?cat=${c.id}`} key={c.id} className="group rounded-2xl border border-slate-800 bg-[#0f1e37] p-5 hover:border-orange-500/40 hover:bg-[#122549] transition-colors">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} grid place-items-center shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{t(c.name)}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{t(c.description)}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500 text-xs">{t(c.tag)}</span>
                  <span className="inline-flex items-center gap-1 text-orange-400 group-hover:text-orange-300">{t('View Details')} <ChevronRight size={14} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 mt-16">
        <div className="rounded-3xl border border-slate-800 bg-[#0a1628] p-8 md:p-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300">{t('Official Information Architecture')}</div>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{t('Directly Sourced from Official Government Gazettes & Portfolios')}</h2>
            <p className="mt-3 text-slate-400 max-w-3xl mx-auto">{t('CivicLink operates as an independent civic-tech portal providing deterministic eligibility guidance derived from published ministry guidelines, official portals, and authorized channel partner directories.')}</p>
          </div>
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {[
              { icon: FileCheck2, title: 'Gazette Verified', desc: 'Every scheme mapped to published ministry notifications and official source citations.' },
              { icon: ShieldCheck, title: 'Deterministic Rule Engine', desc: 'Transparent criteria evaluations without black-box estimation or guesswork.' },
              { icon: Users2, title: 'Authorized Channel Partners', desc: '120+ verified state channelizing agencies, bank branches, and facilitation centers.' },
              { icon: Lock, title: 'Privacy First', desc: 'Zero PII or document uploads required to discover and compare schemes.' },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-5">
                <div className="w-10 h-10 rounded-lg bg-orange-500/15 border border-orange-500/30 grid place-items-center">
                  <f.icon size={18} className="text-orange-400" />
                </div>
                <h4 className="mt-3 text-white font-semibold">{t(f.title)}</h4>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{t(f.desc)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[['90', 'Government Schemes'], ['100%', 'Gazette Verified'], ['12', 'Indian Languages'], ['100%', 'Private & Secure']].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-slate-950/50 border border-slate-800 py-5">
                <div className="text-3xl font-bold text-orange-400">{n}</div>
                <div className="text-xs text-slate-400 mt-1">{t(l)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6 mt-16 mb-4">
        <div className="rounded-3xl bg-gradient-to-r from-[#12213c] to-[#0f1e37] border border-orange-500/20 p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{t('Ready to Discover Schemes You May Be Eligible For?')}</h2>
          <p className="mt-3 text-slate-400">{t('Takes less than 2 minutes. Answer a few questions to get personalized government scheme guidance.')}</p>
          <Link to="/recommendations" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/30 transition-colors">
            <Sparkles size={18} /> {t('Find Matching Schemes')} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
