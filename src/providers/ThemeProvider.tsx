'use client';

import { createContext, useContext, useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * localStorage and matchMedia are external stores, so they are read through
 * useSyncExternalStore rather than mirrored into state inside an effect —
 * that avoids the cascading render react-hooks/set-state-in-effect warns about,
 * and keeps the server snapshot explicit.
 */
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribeTheme(onChange: () => void) {
  listeners.add(onChange);
  // `storage` fires when another tab changes the preference.
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // Blocked storage: fall through to the default.
  }
  return 'system';
}

function subscribeSystem(onChange: () => void) {
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

const readSystem = (): 'light' | 'dark' =>
  window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';

/** `.dark` on <html> is the single source of truth for the applied theme. */
function applyClass(resolved: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'system' as Theme);
  const systemTheme = useSyncExternalStore(subscribeSystem, readSystem, () => 'light' as const);
  const resolvedTheme: 'light' | 'dark' = theme === 'system' ? systemTheme : theme;

  // Keep the class in sync with what this render resolved. The inline <head>
  // script already set it before first paint, so this is normally a no-op.
  if (typeof document !== 'undefined') {
    applyClass(resolvedTheme);
  }

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem('theme', next);
      document.cookie = `theme=${next};path=/;max-age=31536000;SameSite=Lax`;
    } catch {
      // Private mode: the theme still applies for this view.
    }
    emit();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
