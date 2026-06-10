"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-4 right-4 sm:top-6 sm:right-8 text-sm tracking-wider cursor-pointer hover:text-muted-foreground"
      aria-label="Toggle theme"
    >
      {/* reserve width before mount so the label doesn't shift on hydration */}
      <span className={mounted ? "" : "invisible"}>
        [{isDark ? "LIGHT" : "DARK"}]
      </span>
    </button>
  );
}
