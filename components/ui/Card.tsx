import type { ReactNode } from "react";
import Badge from "./Badge";

type Props = {
  title: string;
  tag?: string;
  /** Highlighted cards get a blue outline and tint, for the one card that matters most. */
  highlight?: boolean;
  children: ReactNode;
  className?: string;
};

export default function Card({ title, tag, highlight, children, className = "" }: Props) {
  return (
    <article
      className={`flex h-full flex-col gap-3 rounded-xl border p-5 shadow-sm ${
        highlight ? "border-brand-600 bg-brand-50" : "border-brand-100 bg-white"
      } ${className}`}
    >
      {tag && (
        <div>
          <Badge tone={highlight ? "solid" : "neutral"}>{tag}</Badge>
        </div>
      )}
      <h3 className="text-lg font-bold text-brand-900">{title}</h3>
      <div className="text-sm leading-relaxed text-brand-800/80">{children}</div>
    </article>
  );
}
