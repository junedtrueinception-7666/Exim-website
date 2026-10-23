"use client";

import { useId, type KeyboardEvent, type ReactNode } from "react";

type Tab<V extends string> = { value: V; label: string };

type Props<V extends string> = {
  tabs: Tab<V>[];
  value: V;
  onChange: (value: V) => void;
  ariaLabel: string;
  children: ReactNode;
};

/** Tab bar with one visible panel. Left/Right arrow keys move between tabs. */
export default function Tabs<V extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
  children,
}: Props<V>) {
  const baseId = useId();
  const tabId = (v: string) => `${baseId}-tab-${v}`;
  const panelId = `${baseId}-panel`;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + step + tabs.length) % tabs.length];
    onChange(next.value);
    document.getElementById(tabId(next.value))?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex gap-1 overflow-x-auto border-b border-brand-200"
      >
        {tabs.map((tab, i) => {
          const active = tab.value === value;
          return (
            <button
              key={tab.value}
              id={tabId(tab.value)}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={panelId}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(tab.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`-mb-px shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 ${
                active
                  ? "border-brand-700 text-brand-700"
                  : "border-transparent text-brand-800/70 hover:text-brand-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div id={panelId} role="tabpanel" aria-labelledby={tabId(value)} className="pt-5">
        {children}
      </div>
    </div>
  );
}
