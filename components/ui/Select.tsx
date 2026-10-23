"use client";

import { useId } from "react";

type Option<V extends string> = { value: V; label: string };

type Props<V extends string> = {
  label: string;
  options: Option<V>[];
  value: V;
  onChange: (value: V) => void;
  className?: string;
};

/** Labelled dropdown. Uses the native select so it works well on phones. */
export default function Select<V extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: Props<V>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-900">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as V)}
          className="h-11 w-full appearance-none rounded-lg border border-brand-200 bg-white pl-3 pr-10 text-base text-brand-900 focus:border-brand-600 focus:outline-2 focus:outline-brand-600/30"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-600"
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
