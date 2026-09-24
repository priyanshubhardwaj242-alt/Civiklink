import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Sparkles, Calculator, MapPin, MoreHorizontal, LogIn, UserPlus, Menu, X, ChevronDown } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/schemes', label: 'Explore Schemes', icon: Search, hasCaret: true },
  { to: '/recommendations', label: 'Smart Matching', icon: Sparkles, highlight: true },
  { to: '/calculator', label: 'Financial Calculator', icon: Calculator },
  { to: '/partners', label: 'Find Nearby Partner', icon: MapPin },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-[#0b1a30]/95 backdrop-blur border-b border-slate-800/70">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 grid place-items-center shadow-lg shadow-orange-900/40">
            <span className="text-white font-bold text-lg leading-none">C</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-lg tracking-tight">CivicLink</span>
              <span className="text-[9px] font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">{t('Official')}</span>
            </div>
            <div className="text-[10px] text-slate-400">{t('Government Citizen Platform')}</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV.map(({ to, label, icon: Icon, highlight, hasCaret }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? (highlight
                    ? 'bg-orange-500 text-white'
                    : 'bg-sky-500/15 text-sky-300 border border-sky-500/30')
                  : (highlight
                    ? 'text-orange-400 hover:bg-orange-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60')}`
              }
            >
              <Icon size={15} />
              <span>{t(label)}</span>
              {hasCaret && <ChevronDown size={13} />}
            </NavLink>
          ))}
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
            <MoreHorizontal size={15} />
            More
            <ChevronDown size={13} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/login')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 transition-colors"
          >
            <LogIn size={15} />
            Citizen Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/30 transition-colors"
          >
            <UserPlus size={15} />
            Register
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-slate-200 p-2">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0b1a30] px-4 py-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-slate-800/70 text-white' : 'text-slate-300'}`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
