import {
  DAISY_THEMES,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
} from "@/lib/themes";

export function readStoredTheme(): string {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved && DAISY_THEMES.some((t) => t.value === saved)) return saved;
  return DEFAULT_THEME;
}

export const THEME_CHANGE_EVENT = "concert-cost-tracker-theme-change";

export function applyThemeToDocument(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } })
  );
}
