# CivicLink — Frontend Project

Complete React + Tailwind frontend for **CivicLink**, a citizen-facing platform for discovering Indian government welfare, credit and subsidy schemes.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm (or yarn)

## Install & Run
```bash
cd frontend
npm install
npm start
```
The app will open at **http://localhost:3000**.

## Production Build
```bash
cd frontend
npm run build
```
Output goes to `frontend/build/`.

## Verified
- `npm install` — installs cleanly with **no peer-dependency conflicts**
- `npm run build` — builds successfully (~84 kB gzipped JS + 12 kB CSS)
- `npm start` — dev server on http://localhost:3000

## Project Structure
```
frontend/
├── package.json
├── craco.config.js
├── tailwind.config.js
├── postcss.config.js
├── components.json
├── jsconfig.json
├── .env.example
├── .gitignore
├── public/
│   └── index.html
└── src/
    ├── index.js            # React entry
    ├── index.css           # Tailwind + design tokens
    ├── App.js              # Router + layout shell
    ├── App.css
    ├── mock.js             # 90 schemes + rule-based match engine
    ├── components/
    │   ├── AIChatBubble.jsx
    │   ├── layout/
    │   │   ├── TopBar.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   └── ui/             # shadcn/ui primitives (46 components)
    ├── pages/
    │   ├── Home.jsx
    │   ├── Schemes.jsx
    │   ├── SchemeDetail.jsx
    │   ├── Recommendations.jsx
    │   ├── Results.jsx
    │   ├── Calculator.jsx
    │   └── Partners.jsx
    ├── constants/
    ├── hooks/
    │   └── use-toast.js
    └── lib/
        └── utils.js
```

## Features
- 90-scheme government directory with filters, sort, search
- Smart matching (chat, natural language, quick form) → deterministic rule-based engine
- Results view with match scores, reasons, documents checklist, action plan
- Financial (EMI) calculator with live sliders
- Nearby-partner locator with browser geolocation
- Voice input via Web Speech API
- 12 Indian languages in the UI switcher
- Font-size accessibility (A- / A / A+)
- Fully responsive (down to 390 px)
