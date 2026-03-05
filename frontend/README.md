# EmpireHost Frontend

User-facing app: landing, auth, dashboard, bots, deploy, coins, logs.

## Stack

- React 19, TypeScript, Vite 7, Tailwind CSS, React Router, Zustand, Axios.

## Scripts

- `npm run dev` – Dev server (port 3000).
- `npm run build` – Production build (`dist/`).
- `npm run preview` – Preview production build.
- `npm start` – Serve `dist/` (uses `PORT` from env for Heroku).

## Env

Create `.env` from `.env.example`:

- `VITE_BASE_URL` – Backend API base URL (e.g. `http://localhost:4001` or `https://your-api.herokuapp.com`).
- `VITE_PAYSTACK_PUBLIC_KEY` – Optional, for payments.

Build-time only; change requires rebuild.

## Deploy

Build with `VITE_BASE_URL` set to your production API, then serve `dist/` (e.g. Heroku, Vercel, Netlify). See root [DEPLOY.md](../DEPLOY.md).
