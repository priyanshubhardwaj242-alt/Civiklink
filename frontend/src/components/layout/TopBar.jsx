import React from 'react';
import { Phone, Globe, ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../../mock';
import { useLanguage } from '../../i18n';

export default function TopBar({ language, setLanguage, fontSize, setFontSize }) {
  const { t } = useLanguage();
  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/70 text-slate-300 text-xs">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 h-9">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-orange-500/15 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
            GOVT OF INDIA
          </span>
          <span className="hidden md:inline text-slate-400">{t('National Welfare & Credit Guidance Platform')}</span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline text-slate-500">civiclink.gov.in</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Phone size={12} className="text-orange-400" />
            <span>{t('Helpline: 1800-11-2026 (Toll-Free)')}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSize(Math.max(14, fontSize - 1))}
              className="w-6 h-6 rounded border border-slate-700 hover:border-orange-400 hover:text-orange-400 transition-colors text-slate-400"
              aria-label={t("Decrease font size")}
            >A-</button>
            <button
              onClick={() => setFontSize(16)}
              className="w-6 h-6 rounded border border-sky-500 bg-sky-500/20 text-sky-300 transition-colors"
              aria-label={t("Reset font size")}
            >A</button>
            <button
              onClick={() => setFontSize(Math.min(20, fontSize + 1))}
              className="w-6 h-6 rounded border border-slate-700 hover:border-orange-400 hover:text-orange-400 transition-colors text-slate-400"
              aria-label={t("Increase font size")}
            >A+</button>
          </div>

          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-700 hover:border-orange-400 rounded-full pl-7 pr-7 py-1 text-slate-200 focus:outline-none focus:border-orange-400 cursor-pointer transition-colors"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <Globe size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
