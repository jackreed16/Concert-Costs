"use client";

import { useAppTheme } from "@/hooks/useAppTheme";
import { DAISY_THEMES } from "@/lib/themes";

export function AppearanceSettings() {
  const { theme, setTheme, mounted } = useAppTheme();

  return (
    <div className="card bg-base-100 shadow-md border border-base-300 max-w-lg">
      <div className="card-body">
        <h2 className="card-title text-lg">Appearance</h2>
        <p className="text-sm opacity-70">Pick a color theme for the app.</p>

        <div className="form-control w-full mt-2">
          <label className="label" htmlFor="settings-theme-select">
            <span className="label-text font-medium">Theme</span>
          </label>
          <select
            id="settings-theme-select"
            className="select select-bordered w-full"
            value={mounted ? theme : ""}
            disabled={!mounted}
            onChange={(e) => setTheme(e.target.value)}
          >
            {mounted ? (
              DAISY_THEMES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))
            ) : (
              <option>Loading…</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
