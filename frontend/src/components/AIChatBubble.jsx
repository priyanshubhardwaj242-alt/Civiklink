import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Mic } from 'lucide-react';
import { CHAT_QUESTIONS } from '../mock';
import { matchSchemes } from '../api';
import { useLanguage, voiceLocale } from '../i18n';
import { useNavigate } from 'react-router-dom';

export default function AIChatBubble() {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({});
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([{ from: 'bot', text: t(CHAT_QUESTIONS[0].q) }]);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const currentQ = CHAT_QUESTIONS[step];

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceLocale(language);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch (e) { /* speech is optional */ }
  };

  const submitAnswer = async (answer) => {
    if (!answer) return;
    const newProfile = { ...profile, [currentQ.key]: answer };
    setProfile(newProfile);
    const newMsgs = [...msgs, { from: 'user', text: String(answer) }];

    if (step + 1 < CHAT_QUESTIONS.length) {
      const nextText = t(CHAT_QUESTIONS[step + 1].q);
      newMsgs.push({ from: 'bot', text: nextText });
      speak(nextText);
      setStep(step + 1);
    } else {
      const analyzingText = t('Analyzing your profile against 90 government schemes...');
      newMsgs.push({ from: 'bot', text: analyzingText });
      speak(analyzingText);
      setTimeout(async () => {
        const response = await matchSchemes(newProfile);
        try { localStorage.setItem('civiclink_profile', JSON.stringify(newProfile)); } catch (e) { /* ignore */ }
        try { localStorage.setItem('civiclink_results', JSON.stringify(response.results)); } catch (e) { /* ignore */ }
        const foundText = `${t('Found {count} matching schemes! Opening results...')}`.replace('{count}', response.results.length);
        setMsgs((m) => [...m, { from: 'bot', text: foundText }]);
        speak(foundText);
        setTimeout(() => {
          setOpen(false);
          navigate('/results');
        }, 900);
      }, 700);
    }

    setMsgs(newMsgs);
    setInput('');
  };

  const handleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert(t('Voice recognition is not supported in this browser.'));
      return;
    }
    const rec = new SR();
    rec.lang = voiceLocale(language);
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
    };
    rec.start();
  };

  const reset = () => {
    setStep(0);
    setProfile({});
    setMsgs([{ from: 'bot', text: t(CHAT_QUESTIONS[0].q) }]);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/95 border border-orange-500/40 text-orange-300 hover:text-orange-200 hover:border-orange-400 shadow-2xl shadow-orange-900/40 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 grid place-items-center">
            <Sparkles size={16} className="text-white" />
          </span>
          <span className="font-semibold">{t('CivicLink AI')}</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(92vw,380px)] h-[560px] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Sparkles size={18} />
              <div>
                <div className="font-semibold text-sm">{t('CivicLink Assistant')}</div>
                <div className="text-[11px] opacity-90">{t('Rule-based scheme guidance')}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={reset} className="text-white/80 hover:text-white text-xs px-2 py-1 rounded bg-white/10">{t('Reset')}</button>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white"><X size={18} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-slate-950">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 text-sm rounded-2xl leading-relaxed ${m.from === 'user' ? 'bg-orange-500 text-white rounded-br-md' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-md'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {currentQ && currentQ.type === 'choice' && step < CHAT_QUESTIONS.length && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => submitAnswer(opt)}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800/60 text-slate-200 hover:border-orange-400 hover:text-orange-300 transition-colors"
                  >{opt}</button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-2 border-t border-slate-800 bg-slate-900 flex items-center gap-2">
            <button
              onClick={handleVoice}
              className={`w-9 h-9 rounded-lg grid place-items-center transition-colors ${listening ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:text-orange-300'}`}
              aria-label={t("Voice input")}
            >
              <Mic size={16} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitAnswer(input)}
              placeholder={currentQ ? t(currentQ.placeholder || 'Type your answer...') : t('Ask anything')}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-orange-400"
            />
            <button
              onClick={() => submitAnswer(input)}
              className="w-9 h-9 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white grid place-items-center hover:from-orange-600 hover:to-amber-600 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
