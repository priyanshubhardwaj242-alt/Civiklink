import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0a1628] border-t border-slate-800/70 mt-16">
      <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 grid place-items-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-white font-bold text-lg">CivicLink</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t('CivicLink is a unified national platform connecting citizens with welfare, credit, and subsidy schemes.')}
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <ShieldCheck size={14} /> 100% Gazette Verified
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 tracking-widest mb-3">{t('QUICK LINKS')}</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/schemes" className="hover:text-orange-400 transition-colors">{t('All Schemes Directory')}</Link></li>
            <li><Link to="/recommendations" className="hover:text-orange-400 transition-colors">{t('Smart Scheme Matching')}</Link></li>
            <li><Link to="/calculator" className="hover:text-orange-400 transition-colors">Loan &amp; Subsidy Calculator</Link></li>
            <li><Link to="/partners" className="hover:text-orange-400 transition-colors">{t('Nearby Partner Centers')}</Link></li>
            <li><Link to="/login" className="hover:text-orange-400 transition-colors">{t('Sign In / Portal')}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 tracking-widest mb-3">SUPPORT &amp; HELPLINE</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2"><Phone size={14} className="text-orange-400 mt-0.5" /> 1800-11-2026 (Toll-Free, 9 AM to 6 PM)</li>
            <li className="flex items-start gap-2"><Mail size={14} className="text-orange-400 mt-0.5" /> support@civiclink.gov.in</li>
            <li className="flex items-start gap-2"><MapPin size={14} className="text-orange-400 mt-0.5" /> Ministry of Social Justice and Empowerment, New Delhi, India</li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 tracking-widest mb-3">GOVERNANCE &amp; TRUST</div>
          <p className="text-sm text-slate-400 mb-3">Designed to eliminate financial misrepresentation and opaque approvals in welfare delivery.</p>
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
            <div className="text-xs font-semibold text-slate-200 mb-1">Deterministic Engine Policy:</div>
            <p className="text-xs text-slate-400 leading-relaxed">Eligibility determinations are grounded in deterministic backend rules and official data. AI assists citizens with scheme discovery and explanation.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800/70">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-xs text-slate-500 gap-2">
          <div>© {new Date().getFullYear()} CivicLink • Government Citizen Platform. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
