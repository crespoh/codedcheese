import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export type Theme = "light" | "dark";

// Kept in sync with the pre-paint script in index.html, which reads the same
// key so a stored choice is applied before the first frame.
export const THEME_STORAGE_KEY = "theme";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // Storage can throw in private mode; fall back to the OS preference.
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme, explicit: boolean) {
  const root = document.documentElement;
  // Only stamp data-theme for an explicit choice, so visitors who haven't
  // chosen keep following the OS live via the media query.
  if (explicit) {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
  // Keep shadcn's class-based dark mode in step with the brand tokens.
  root.classList.toggle("dark", theme === "dark");
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme());

  // Sync the shadcn `dark` class on mount, including when following the OS.
  useEffect(() => {
    applyTheme(theme, storedTheme() !== null);
  }, [theme]);

  // Follow OS changes for as long as the visitor hasn't made a choice.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (storedTheme() === null) setTheme(query.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Non-fatal: the choice just won't persist across visits.
    }
    applyTheme(next, true);
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="h-9 w-9 flex items-center justify-center rounded-md text-ink-soft hover:text-ink hover:bg-surface transition-colors"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
