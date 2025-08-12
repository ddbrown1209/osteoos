# OsteoOS

Neon‑blue, gamified osteopathy client portal + osteopath dashboard built with **Vite + React + Tailwind**.

## Quick start (development)
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
# Upload the generated dist/ folder to your server (any static host or Nginx/Apache)
```

## What’s inside
- React 18, Vite 5
- Tailwind CSS (utility classes already in the components)
- Framer Motion (micro‑interactions)
- Recharts (lightweight charts)
- lucide‑react (icon set)

## Files
- `index.html` — app mount
- `src/main.jsx` — React bootstrap
- `src/App.jsx` — the full OsteoOS UI (client + osteopath views)
- `src/index.css` — Tailwind directives
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup
- `vite.config.js` — Vite + React plugin

## Notes
- This repo ships **source**; run the build above and deploy the `dist/` output to your server.
- If you prefer a sub‑path (e.g. `/apps/osteoos/`), set `base:'/apps/osteoos/'` in `vite.config.js`.

## Dev tests
Open the browser console; you’ll see small runtime checks (no test runner required).
