# EmpireHost

Deploy, run, and scale messaging bots with a coin-based runtime system. Users deploy bots (e.g. WhatsApp), manage them from a dashboard, and view live logs.

## Repo structure

- **`backend/`** – Node.js (Express) API: auth, bots, coins, Heroku log streams, payments.
- **`frontend/`** – User app (React + Vite): landing, dashboard, bots, coins, deploy.
- **`admin/`** – Admin app (same stack): sign-in only, dashboard, API settings (set/update Heroku backend URL).

## Quick start

1. **Backend**
   ```bash
   cd backend && npm install && npm run dev
   ```
   Runs on `http://localhost:4001` (or `PORT` from env).

2. **Frontend**
   ```bash
   cd frontend && npm install && npm run dev
   ```
   Runs on `http://localhost:3000`. Set `VITE_BASE_URL=http://localhost:4001` in `.env` for local API.

3. **Admin**
   ```bash
   cd admin && npm install && npm run dev
   ```
   Runs on `http://localhost:3001`. Can set backend URL in Dashboard → API Settings.

## Deployment

See **[DEPLOY.md](./DEPLOY.md)** for Heroku (backend, frontend, admin), config vars, and CORS.

## Env

- **Backend:** `.env` or Heroku Config Vars – `MONGODB_URI`, `SECRET`, `CORS_ORIGIN`, `HEROKU_API_KEY`, etc. See `backend/.env.example`.
- **Frontend / Admin:** `VITE_BASE_URL` = backend API URL (no trailing slash). See `frontend/.env.example` and `admin/.env.example`.

## License

See [LICENSE](./LICENSE).
