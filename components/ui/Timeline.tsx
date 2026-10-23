import type { ReactNode } from "react";

export type TimelineItem = {
  title: string;
  description: string;
  /** Small labelled facts under the description, e.g. Who and Papers. */
  meta?: { label: string; value: string }[];
  /** Extra content shown last, such as a comparison box or a note. */
  extra?: ReactNode;
};

/** Numbered vertical steps joined by a line. */
export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-0">
      {items.map((item, i) => (
        <li key={item.title} className="relative flex gap-4 pb-8 last:pb-0">
          {i < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-5 top-10 -ml-px h-[calc(100%-2.5rem)] w-0.5 bg-brand-200"
            />
          )}
          <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-base font-bold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 pt-1.5">
            <h3 className="text-lg font-bold text-brand-900">{item.title}</h3>
            <p className="mt-1 leading-relaxed text-brand-800/80">{item.description}</p>
            {item.meta && item.meta.length > 0 && (
              <dl className="mt-3 grid gap-x-4 gap-y-2 rounded-lg bg-brand-50 p-3 text-sm sm:grid-cols-[auto_1fr]">
                {item.meta.map((m) => (
                  <div key={m.label} className="contents">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600 sm:pt-0.5">
                      {m.label}
                    </dt>
                    <dd className="mb-1 text-brand-900 sm:mb-0">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {item.extra && <div className="mt-4">{item.extra}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
