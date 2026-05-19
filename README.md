# Concert Cost Tracker

A friendly web app to log concerts you attended, track costs, rate how fun they were, and see summaries and charts on a dashboard.

Built with Next.js, Tailwind CSS, daisyUI, Supabase, and Recharts.

## What you need

- [Node.js](https://nodejs.org/) (LTS version recommended)
- A [Supabase](https://supabase.com/) project named **ConcertCosts**

## Setup (plain English)

### 1. Install packages

Open a terminal in this folder and run:

```bash
npm install
```

### 2. Set up the database in Supabase

The app needs a `concerts` table with security rules so each user only sees their own data.

**Option A — SQL Editor (recommended if Cursor has not applied it yet)**

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your **ConcertCosts** project.
2. Go to **SQL Editor** → **New query**.
3. Copy the entire contents of [`supabase/migrations/20260519120000_create_concerts_table.sql`](supabase/migrations/20260519120000_create_concerts_table.sql) and run it.

**Option B — Cursor Supabase plugin**

If the Supabase MCP is connected, ask Cursor to run that migration on the ConcertCosts project.

### 3. Turn on email login

In Supabase: **Authentication** → **Providers** → **Email** → make sure Email is enabled.

For easier local testing, you can turn off **Confirm email** under Email settings so you can sign up and log in right away.

### 3b. Password reset redirect URLs

In Supabase: **Authentication** → **URL configuration** → **Redirect URLs**, add:

- `http://localhost:3000/auth/callback`
- Your production URL, e.g. `https://your-app.vercel.app/auth/callback`

For production, set `NEXT_PUBLIC_SITE_URL` in Vercel to your live URL so reset emails use the correct link.

### 4. Environment variables

1. Copy `.env.local.example` to `.env.local`.
2. In Supabase → **ConcertCosts** → **Connect** or **Settings** → **API Keys**:
   - Copy **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **publishable key** (or **anon public** key if shown) → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Do **not** put the service role or secret key in `.env.local`.

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Important:** After creating or changing `.env.local`, stop the dev server (Ctrl+C) and run `npm run dev` again.

## How to test

1. **Sign up** with email and password on the login page.
2. **Add Concert** — fill in details, costs, and fun rating → **Save concert**.
3. **My Concerts** — see your saved show with totals and Fun Points per $100.
4. **Dashboard** — stat cards and charts should reflect your data.
5. **Log out**, then **log in** again — your concerts should still be there.
6. (Optional) Create a second account — it should see an empty list (proves private data works).

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run db:apply` | Apply migration via Supabase API (needs `SUPABASE_ACCESS_TOKEN`) |
| `npm run db:setup` | Apply migration via direct DB URL (needs `DATABASE_URL` in `.env.local`) |

## Theme

Use the **Theme** dropdown on the login page or in the app header to switch daisyUI styles (Light, Dark, Cupcake, Corporate, Synthwave, Forest).
