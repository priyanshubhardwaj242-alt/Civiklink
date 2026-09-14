import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, UserRound, MessageSquare, ListChecks, ArrowRight, Check } from 'lucide-react';
import { CHAT_QUESTIONS, matchSchemes } from '../mock';

function Method({ icon: Icon, title, desc, active, onClick, color = 'orange' }) {
  const activeCls = active ? `border-${color}-500 bg-${color}-500/10` : 'border-slate-800 bg-[#0f1e37] hover:border-slate-600';
  return (
    <button onClick={onClick} className={`text-left rounded-2xl border p-5 transition-colors ${activeCls} relative`}>
      <div className="w-11 h-11 rounded-lg bg-violet-500/15 border border-violet-500/30 grid place-items-center">
        <Icon size={20} className="text-violet-300" />
      </div>
      <div className="mt-3 text-white font-semibold">{title}</div>
      <div className="mt-1 text-sm text-slate-400">{desc}</div>
      {active && <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-orange-500 grid place-items-center"><Check size={14} className="text-white" /></div>}
    </button>
  );
}

export default function Recommendations() {
  const [method, setMethod] = useState('saved');
  const [profile, setProfile] = useState({});
  const [nlq, setNlq] = useState('');
  const [step, setStep] = useState(-1);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const startChat = () => {
    setStep(0);
    setMsgs([{ from: 'bot', text: CHAT_QUESTIONS[0].q }]);
  };

  const submit = (val) => {
    if (!val) return;
    const q = CHAT_QUESTIONS[step];
    const p = { ...profile, [q.key]: val };
    setProfile(p);
    const nm = [...msgs, { from: 'user', text: String(val) }];
    if (step + 1 < CHAT_QUESTIONS.length) {
      nm.push({ from: 'bot', text: CHAT_QUESTIONS[step + 1].q });
      setStep(step + 1);
    } else {
      const results = matchSchemes(p);
      try { localStorage.setItem('civiclink_profile', JSON.stringify(p)); } catch (e) { /* ignore */ }
      try { localStorage.setItem('civiclink_results', JSON.stringify(results)); } catch (e) { /* ignore */ }
      nm.push({ from: 'bot', text: `Found ${results.length} matching schemes.` });
      setTimeout(() => navigate('/results'), 500);
    }
    setMsgs(nm);
    setInput('');
  };

  const submitNL = () => {
    const t = nlq.toLowerCase();
    const guess = {
      occupation: t.includes('farmer') ? 'Farmer' : t.includes('artisan') ? 'Artisan / Craftsperson' : t.includes('student') ? 'Student' : t.includes('business') || t.includes('shop') || t.includes('mudra') ? 'Small Business / MSME' : 'Salaried',
      gender: t.includes('woman') || t.includes('women') || t.includes('female') ? 'Female' : 'Male',
      age: '30', category: 'General', income: '2.5 \u2013 5 Lakh', state: 'Delhi',
      need: t.includes('scholarship') ? 'Education / Scholarship' : t.includes('health') || t.includes('ayushman') ? 'Health / Insurance' : t.includes('pension') ? 'Pension / Social Security' : t.includes('housing') ? 'Housing' : t.includes('kisan') || t.includes('farm') ? 'Agriculture Support' : 'Business Loan',
    };
    const results = matchSchemes(guess);
    try { localStorage.setItem('civiclink_profile', JSON.stringify(guess)); } catch (e) { /* ignore */ }
    try { localStorage.setItem('civiclink_results', JSON.stringify(results)); } catch (e) { /* ignore */ }
    navigate('/results');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-slate-100">
      <div className="rounded-2xl bg-[#0f1e37] border border-slate-800 border-l-4 border-l-orange-500 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"><Sparkles size={12} /> AI-POWERED SCHEME DISCOVERY</div>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Smart Scheme Matching</h1>
          <p className="mt-2 text-slate-400 max-w-2xl">Discover government schemes precisely matched to your demographic, financial, and occupational background.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors">
          <UserRound size={16} /> Edit Profile
        </button>
      </div>

      <div className="mt-6">
        <div className="text-sm text-slate-300 mb-3">Choose Profile Input Method</div>
        <div className="grid md:grid-cols-3 gap-3">
          <Method icon={UserRound} title="Saved Profile" desc="Use your registered citizen account details" active={method === 'saved'} onClick={() => setMethod('saved')} />
          <Method icon={MessageSquare} title="Natural Language Search" desc="Describe yourself and your goals in everyday language" active={method === 'nl'} onClick={() => setMethod('nl')} />
          <Method icon={ListChecks} title="Quick Eligibility Form" desc="Enter basic profile parameters without signing in" active={method === 'form'} onClick={() => setMethod('form')} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
        {method === 'saved' && (
          <div className="text-center py-8">
            <p className="text-slate-300">Start a guided conversation with the CivicLink Assistant. It will ask a few short questions to identify schemes you may be eligible for.</p>
            {step < 0 ? (
              <button onClick={startChat} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/30 transition-colors">
                <Sparkles size={18} /> Start Matching <ArrowRight size={17} />
              </button>
            ) : (
              <div className="mt-6 max-w-xl mx-auto text-left">
                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2">
                  {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-3 py-2 text-sm rounded-2xl ${m.from === 'user' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>{m.text}</div>
                    </div>
                  ))}
                </div>
                {step >= 0 && step < CHAT_QUESTIONS.length && CHAT_QUESTIONS[step].type === 'choice' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CHAT_QUESTIONS[step].options.map((o) => (
                      <button key={o} onClick={() => submit(o)} className="text-xs px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-orange-400 hover:text-orange-300 transition-colors">{o}</button>
                    ))}
                  </div>
                )}
                {step >= 0 && step < CHAT_QUESTIONS.length && CHAT_QUESTIONS[step].type !== 'choice' && (
                  <div className="mt-3 flex gap-2">
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit(input)} placeholder={CHAT_QUESTIONS[step].placeholder} className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                    <button onClick={() => submit(input)} className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">Send</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {method === 'nl' && (
          <div>
            <label className="block text-sm text-slate-300 mb-2">Describe your situation in a sentence or two</label>
            <textarea value={nlq} onChange={(e) => setNlq(e.target.value)} rows={4} placeholder="e.g. I am a 28-year-old woman farmer from Bihar looking for a small business loan for dairy..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 focus:outline-none focus:border-orange-500" />
            <button onClick={submitNL} className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/30 transition-colors">Find Schemes <ArrowRight size={17} /></button>
          </div>
        )}

        {method === 'form' && (
          <QuickForm onSubmit={(p) => {
            const results = matchSchemes(p);
            try { localStorage.setItem('civiclink_profile', JSON.stringify(p)); } catch (e) { /* ignore */ }
            try { localStorage.setItem('civiclink_results', JSON.stringify(results)); } catch (e) { /* ignore */ }
            navigate('/results');
          }} />
        )}
      </div>
    </div>
  );
}

function QuickForm({ onSubmit }) {
  const [f, setF] = useState({ age: '', gender: 'Female', category: 'General', income: '2.5 \u2013 5 Lakh', occupation: 'Small Business / MSME', state: 'Delhi', need: 'Business Loan' });
  const set = (k, v) => setF({ ...f, [k]: v });
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[
        { k: 'age', label: 'Age', type: 'number' },
        { k: 'gender', label: 'Gender', type: 'select', opts: ['Female', 'Male', 'Other'] },
        { k: 'category', label: 'Social Category', type: 'select', opts: ['General', 'OBC', 'SC', 'ST', 'Minority'] },
        { k: 'income', label: 'Annual Family Income', type: 'select', opts: ['Below 2.5 Lakh', '2.5 \u2013 5 Lakh', '5 \u2013 8 Lakh', 'Above 8 Lakh'] },
        { k: 'occupation', label: 'Occupation', type: 'select', opts: ['Farmer', 'Artisan / Craftsperson', 'Small Business / MSME', 'Student', 'Salaried', 'Homemaker', 'Unemployed'] },
        { k: 'state', label: 'State', type: 'select', opts: ['Delhi', 'Maharashtra', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'Bihar', 'Rajasthan', 'Gujarat'] },
        { k: 'need', label: 'Support Needed', type: 'select', opts: ['Business Loan', 'Education / Scholarship', 'Health / Insurance', 'Pension / Social Security', 'Housing', 'Agriculture Support'] },
      ].map((x) => (
        <div key={x.k}>
          <div className="text-xs text-slate-400 mb-1">{x.label}</div>
          {x.type === 'select' ? (
            <select value={f[x.k]} onChange={(e) => set(x.k, e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500">
              {x.opts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input value={f[x.k]} onChange={(e) => set(x.k, e.target.value)} type={x.type} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500" placeholder="e.g. 28" />
          )}
        </div>
      ))}
      <div className="md:col-span-2">
        <button onClick={() => onSubmit(f)} className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/30 transition-colors">
          <Sparkles size={17} /> Find Matching Schemes <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
