import React, { useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIChatBubble from './components/AIChatBubble';
import { LanguageProvider } from './i18n';
import Home from './pages/Home';
import Schemes from './pages/Schemes';
import Recommendations from './pages/Recommendations';
import Results from './pages/Results';
import Calculator from './pages/Calculator';
import Partners from './pages/Partners';
import SchemeDetail from './pages/SchemeDetail';

function Shell({ children, fontSize }) {
  return (
    <div style={{ fontSize: `${fontSize}px` }} className="min-h-screen flex flex-col bg-[#0a1628] text-slate-100">
      {children}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState(16);

  return (
    <HashRouter>
      <LanguageProvider language={language} setLanguage={setLanguage}>
      <Shell fontSize={fontSize}>
        <TopBar language={language} setLanguage={setLanguage} fontSize={fontSize} setFontSize={setFontSize} />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/schemes/:id" element={<SchemeDetail />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/results" element={<Results />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/login" element={<AuthPage title="Citizen Login" />} />
            <Route path="/register" element={<AuthPage title="Register on CivicLink" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AIChatBubble />
      </Shell>
      </LanguageProvider>
    </HashRouter>
  );
}

function AuthPage({ title }) {
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="rounded-2xl border border-slate-800 bg-[#0f1e37] p-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm text-slate-400 mt-1">Authentication is optional. You can use CivicLink without an account.</p>
        <div className="mt-5 space-y-3">
          <input placeholder="Mobile number" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500" />
          <input placeholder="Password / OTP" type="password" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500" />
          <button className="w-full px-4 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-colors">{title}</button>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-20 text-center text-slate-200">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-slate-400 mt-2">This page does not exist.</p>
    </div>
  );
}

export default App;
