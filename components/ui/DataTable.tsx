import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Right-aligns the column in the table, for numbers. */
  numeric?: boolean;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Rows that return true get a blue tint, to show which one is selected. */
  highlight?: (row: T) => boolean;
  /** On phones, put each label and its value on one line. Good for short values like numbers. */
  inlineCards?: boolean;
  /** Show a card per row on phones. Turn off when the page shows its own phone layout. */
  mobileCards?: boolean;
};

/**
 * A real table from md up. On phones every row becomes a card, with the first
 * column as the card title and the other columns as labelled lines.
 */
export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  highlight,
  inlineCards,
  mobileCards = true,
}: Props<T>) {
  const [first, ...rest] = columns;

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-brand-100 bg-white md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wider text-brand-700">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`px-4 py-3 font-semibold ${c.numeric ? "text-right" : ""}`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100 align-top text-brand-800/80">
            {rows.map((row) => (
              <tr key={rowKey(row)} className={highlight?.(row) ? "bg-brand-50" : ""}>
                {columns.map((c, i) => (
                  <td
                    key={c.key}
                    className={`px-4 py-3 ${i === 0 ? "font-semibold text-brand-900" : ""} ${c.numeric ? "text-right tabular-nums" : ""}`}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mobileCards && (
      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li
            key={rowKey(row)}
            className={`rounded-xl border p-4 ${
              highlight?.(row) ? "border-brand-600 bg-brand-50" : "border-brand-100 bg-white"
            }`}
          >
            <div className="font-bold text-brand-900">{first.render(row)}</div>
            <dl className="mt-3 space-y-2 text-sm">
              {rest.map((c) => (
                <div
                  key={c.key}
                  className={inlineCards ? "flex items-baseline justify-between gap-4" : ""}
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {c.header}
                  </dt>
                  <dd
                    className={`text-brand-800/80 ${inlineCards ? "text-right tabular-nums" : "mt-0.5"}`}
                  >
                    {c.render(row)}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      )}
    </>
  );
}
