export type FlowRow = { from: string; to: string; description: string };

function Arrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 rotate-90 text-brand-400 sm:rotate-0"
    >
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** One line per payment: who pays, who receives, and what it is for. */
export default function FlowRows({ rows }: { rows: FlowRow[] }) {
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li
          key={r.to + r.description}
          className="flex flex-col gap-2 rounded-xl border border-brand-100 bg-white p-3 sm:flex-row sm:items-center sm:gap-3"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-bold text-brand-900">
              {r.from}
            </span>
            <Arrow />
            <span className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-bold text-brand-900">
              {r.to}
            </span>
          </div>
          <p className="text-sm text-brand-800/80 sm:ml-2">{r.description}</p>
        </li>
      ))}
    </ul>
  );
}
