# EmpireHost – Heroku deployment

## Backend (API)

1. **Create Heroku app**
   ```bash
   cd backend
   heroku create your-api-name
   ```

2. **Config vars** (Heroku Dashboard → Settings → Config Vars)
   - `MONGODB_URI` or `DATABASE_URL` – MongoDB connection string
   - `SECRET` – JWT secret
   - `CORS_ORIGIN` – Comma-separated frontend/admin URLs, e.g. `https://host.empiretech.net.ng,https://admin.empiretech.net.ng`
   - Add any other vars from `backend/.env.example` (Paystack, email, etc.)

3. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   # or: push the whole repo and set Heroku root to backend in dashboard
   ```
   If the repo root is the backend folder:
   ```bash
   heroku git:remote -a your-api-name
   git push heroku main
   ```
   If the repo is a monorepo, use Heroku’s “Project path” (e.g. `backend`) or subtree push.

4. **Procfile** in `backend`: `web: npm start` (already set). Heroku sets `PORT` automatically.

5. **API URL**: `https://your-api-name.herokuapp.com` – use this as `VITE_BASE_URL` for frontend/admin builds.

---

## Frontend (user app)

1. **Build with API URL**
   - Set `VITE_BASE_URL=https://your-api-name.herokuapp.com` (your backend URL) before building.
   - On Heroku: add Config Var `VITE_BASE_URL` and run build in the release phase or use a buildpack that runs `npm run build` with env.

2. **Deploy to Heroku**
   - Use [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static) or a Node buildpack:
     - Build: `npm run build` (ensure `VITE_BASE_URL` is set)
     - Start: `npm start` (serves `dist`; uses `PORT` from Heroku)
   - Or deploy to **Vercel/Netlify**: set `VITE_BASE_URL` in the dashboard and build command `npm run build`, output `dist`.

3. **Procfile** in `frontend`: `web: npm start`. Root of the deployed app must be the `frontend` folder (or set project path).

---

## Admin

1. **Build with API URL** (optional; can be set later in Admin → API Settings)
   - `VITE_BASE_URL=https://your-api-name.herokuapp.com` for production build.

2. **Deploy** same as frontend (Heroku static or Vercel/Netlify). Admin runs on its own URL (e.g. different subdomain).

3. **CORS**: Add the admin production URL to backend’s `CORS_ORIGIN` (comma-separated).

---

## Checklist

- [ ] Backend: `MONGODB_URI`, `SECRET`, `CORS_ORIGIN` set on Heroku
- [ ] Frontend build: `VITE_BASE_URL` = backend Heroku URL
- [ ] Admin build: `VITE_BASE_URL` = backend Heroku URL (or set in API Settings after deploy)
- [ ] Backend `CORS_ORIGIN` includes both frontend and admin production URLs
