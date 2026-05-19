/**
 * Apply concerts migration via Supabase Management API.
 * Requires SUPABASE_ACCESS_TOKEN (Dashboard → Account → Access Tokens).
 *
 * Usage: set SUPABASE_ACCESS_TOKEN=sbp_... && npm run db:apply
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_REF = "iguntrvlfzbaxhflxamx";
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!token) {
  console.error(`
Set SUPABASE_ACCESS_TOKEN first:
1. https://supabase.com/dashboard/account/tokens → Generate new token
2. In PowerShell: $env:SUPABASE_ACCESS_TOKEN = "sbp_your_token"
3. Run: npm run db:apply
`);
  process.exit(1);
}

const sql = readFileSync(
  join(__dirname, "../supabase/migrations/20260519120000_create_concerts_table.sql"),
  "utf8"
);

const res = await fetch(
  `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  }
);

const body = await res.text();
if (!res.ok) {
  console.error("API error:", res.status, body);
  process.exit(1);
}

console.log("Migration applied successfully.");
console.log(body);
