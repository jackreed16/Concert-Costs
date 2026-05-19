/**
 * One-time setup: creates the concerts table in Supabase.
 * Requires DATABASE_URL in .env.local (from Supabase Dashboard → Settings → Database → Connection string → URI).
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvLocal() {
  const envPath = join(root, ".env.local");
  if (!existsSync(envPath)) {
    console.error("Missing .env.local");
    process.exit(1);
  }
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error(`
DATABASE_URL is not set in .env.local.

1. Open Supabase Dashboard → ConcertCosts → Settings → Database
2. Under "Connection string", choose URI and copy it
3. Replace [YOUR-PASSWORD] with your database password
4. Add to .env.local:

DATABASE_URL=postgresql://postgres.iguntrvlfzbaxhflxamx:YOUR_PASSWORD@...

5. Run: npm run db:setup
`);
  process.exit(1);
}

const sqlPath = join(
  root,
  "supabase/migrations/20260519120000_create_concerts_table.sql"
);
const sql = readFileSync(sqlPath, "utf8");

const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(sql);
  console.log("Success: concerts table and security rules are ready.");
} catch (err) {
  console.error("Setup failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
