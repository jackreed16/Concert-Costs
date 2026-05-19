"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_THEME } from "@/lib/themes";
import {
  applyThemeToDocument,
  readStoredTheme,
  THEME_CHANGE_EVENT,
} from "@/lib/theme-utils";

export function useAppTheme() {
  const [theme, setThemeState] = useState(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = readStoredTheme();
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);

    const onThemeChange = (event: Event) => {
      const next = (event as CustomEvent<{ theme: string }>).detail.theme;
      setThemeState(next);
    };
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  }, []);

  const setTheme = useCallback((value: string) => {
    setThemeState(value);
    applyThemeToDocument(value);
  }, []);

  return { theme, setTheme, mounted };
}
