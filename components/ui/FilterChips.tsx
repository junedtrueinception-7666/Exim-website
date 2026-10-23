"use client";

type Option<V extends string> = { value: V; label: string };

type Props<V extends string> = {
  options: Option<V>[];
  value: V;
  onChange: (value: V) => void;
  ariaLabel: string;
};

/** Row of pill buttons where exactly one filter is active. Wraps on small screens. */
export default function FilterChips<V extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: Props<V>) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 ${
              active
                ? "border-brand-700 bg-brand-700 text-white"
                : "border-brand-200 bg-white text-brand-800 hover:bg-brand-50"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
