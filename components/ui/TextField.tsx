"use client";

import { useId, type HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: HTMLInputTypeAttribute;
  /** Renders a multi-line textarea instead of a single-line input. */
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
};

const fieldClasses =
  "w-full rounded-lg border bg-white px-3 text-base text-brand-900 placeholder:text-brand-800/50 focus:border-brand-600 focus:outline-2 focus:outline-brand-600/30";

/** Label, input (or textarea) and error message wired together for screen readers. */
export default function TextField({
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline,
  rows = 4,
  required,
  autoComplete,
  inputMode,
}: Props) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    value,
    required,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `${fieldClasses} ${error ? "border-red-600" : "border-brand-200"}`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-900">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-600">
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared.className} py-2`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared.className} h-11`}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
