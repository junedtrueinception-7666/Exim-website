import type { ReactNode } from "react";

type Tone = "brand" | "solid" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-100 text-brand-800",
  solid: "bg-brand-700 text-white",
  neutral: "border border-brand-200 bg-white text-brand-800/80",
};

/** Small uppercase label, used for tags like "Supplier" or "The main person". */
export default function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
