/** A short row of numbered labels, such as the five quality-check stages. */
export default function NumberedChips({ items }: { items: string[] }) {
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((label, i) => (
        <li
          key={label}
          className="flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-900"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
            {i + 1}
          </span>
          {label}
        </li>
      ))}
    </ol>
  );
}
