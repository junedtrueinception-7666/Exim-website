"use client";

import { useLanguage, type Locale } from "@/lib/i18n/LanguageProvider";

const options: { value: Locale; labelKey: "lang.en" | "lang.mr" }[] = [
  { value: "en", labelKey: "lang.en" },
  { value: "mr", labelKey: "lang.mr" },
];

type Props = {
  className?: string;
  /**
   * One button that shows the language you can switch to (मराठी while English is on,
   * English while मराठी is on). Used in the phone header, where space is tight.
   */
  single?: boolean;
};

/** English / मराठी switch. Two side-by-side buttons by default, or one toggle with `single`. */
export default function LanguageSwitcher({ className = "", single }: Props) {
  const { locale, setLocale, t } = useLanguage();

  if (single) {
    const other = options.find((o) => o.value !== locale) ?? options[0];
    return (
      <button
        type="button"
        onClick={() => setLocale(other.value)}
        aria-label={`${t("lang.label")}: ${t(other.labelKey)}`}
        className={`inline-flex h-9 items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600 ${className}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
        {t(other.labelKey)}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`inline-flex rounded-lg border border-brand-200 bg-white p-0.5 ${className}`}
    >
      {options.map(({ value, labelKey }) => {
        const active = locale === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(value)}
            className={`h-8 rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 ${
              active ? "bg-brand-700 text-white" : "text-brand-700 hover:bg-brand-50"
            }`}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
}
