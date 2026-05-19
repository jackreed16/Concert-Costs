"use client";

import { useEffect } from "react";
import { readStoredTheme, applyThemeToDocument } from "@/lib/theme-utils";

/** Applies saved theme on every page (including login). */
export function ThemeInit() {
  useEffect(() => {
    applyThemeToDocument(readStoredTheme());
  }, []);

  return null;
}
