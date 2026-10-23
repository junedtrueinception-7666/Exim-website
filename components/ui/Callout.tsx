import type { ReactNode } from "react";

/** A highlighted note box with an optional bold label in front of the text. */
export default function Callout({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border-l-4 border-brand-600 bg-brand-50 p-4 text-sm leading-relaxed text-brand-900 ${className}`}
    >
      {label && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">{label}</p>
      )}
      {children}
    </div>
  );
}
