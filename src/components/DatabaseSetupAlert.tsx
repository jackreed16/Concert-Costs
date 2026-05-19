"use client";

const SQL_EDITOR_URL =
  "https://supabase.com/dashboard/project/iguntrvlfzbaxhflxamx/sql/new";

const SETUP_SQL = `-- Concert Cost Tracker: concerts table with Row Level Security

create table if not exists public.concerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  concert_name text not null,
  artist text not null,
  venue text not null,
  city text not null,
  state text not null,
  concert_date date not null,
  distance_from_home numeric(8, 2) not null default 0,
  hours_at_event numeric(6, 2) not null default 1 check (hours_at_event > 0),
  ticket_cost numeric(10, 2) not null default 0,
  ticket_fees numeric(10, 2) not null default 0,
  parking_cost numeric(10, 2) not null default 0,
  food_drink_cost numeric(10, 2) not null default 0,
  merchandise_cost numeric(10, 2) not null default 0,
  lodging_cost numeric(10, 2) not null default 0,
  travel_cost numeric(10, 2) not null default 0,
  other_cost numeric(10, 2) not null default 0,
  fun_rating integer not null check (fun_rating >= 1 and fun_rating <= 10),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists concerts_user_id_idx on public.concerts (user_id);

alter table public.concerts enable row level security;

drop policy if exists "Users can insert own concerts" on public.concerts;
drop policy if exists "Users can view own concerts" on public.concerts;

create policy "Users can insert own concerts"
  on public.concerts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can view own concerts"
  on public.concerts
  for select
  to authenticated
  using (auth.uid() = user_id);
`;

export function isMissingConcertsTable(error: string | null): boolean {
  if (!error) return false;
  return (
    error.includes("Could not find the table") ||
    error.includes("relation") && error.includes("concerts") ||
    error.includes("schema cache")
  );
}

export function DatabaseSetupAlert() {
  const copySql = () => {
    void navigator.clipboard.writeText(SETUP_SQL);
  };

  return (
    <div className="alert alert-warning flex-col items-stretch gap-4">
      <div>
        <h3 className="font-bold text-lg">Database setup needed</h3>
        <p className="text-sm mt-1">
          The <code className="text-xs">concerts</code> table is not in Supabase yet.
          Run this SQL once (takes about 30 seconds):
        </p>
      </div>
      <ol className="text-sm list-decimal list-inside space-y-1">
        <li>
          <a
            href={SQL_EDITOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary font-medium"
          >
            Open Supabase SQL Editor
          </a>{" "}
          (ConcertCosts project)
        </li>
        <li>
          Click <strong>Copy SQL</strong> below, paste into the editor, click{" "}
          <strong>Run</strong>
        </li>
        <li>Refresh this page</li>
      </ol>
      <button type="button" className="btn btn-sm btn-primary self-start" onClick={copySql}>
        Copy SQL
      </button>
      <pre className="text-xs bg-base-200 p-3 rounded-lg overflow-x-auto max-h-48">
        {SETUP_SQL.slice(0, 200)}…
      </pre>
    </div>
  );
}
