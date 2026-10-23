"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import en, { type MessageKey, type Messages } from "./messages/en";
import mr from "./messages/mr";

export type Locale = "en" | "mr";

const dictionaries: Record<Locale, Messages> = { en, mr };
const STORAGE_KEY = "exim-locale";
const CHANGE_EVENT = "exim-locale-change";

// The saved language lives in localStorage. useSyncExternalStore reads it on the
// client and falls back to English on the server, so the first paint matches.
function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "mr" ? "mr" : "en";
  } catch {
    return "en";
  }
}

const getServerSnapshot = (): Locale => "en";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Looks up a message. `{name}` placeholders are filled from `params`. */
  t: (key: MessageKey, params?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage can be blocked; the choice then lasts only until reload
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => {
        const text = dictionaries[locale][key];
        if (!params) return text;
        return text.replace(/\{(\w+)\}/g, (match, name) =>
          name in params ? String(params[name]) : match,
        );
      },
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
