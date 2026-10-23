"use client";

export type ChecklistItem = { id: string; label: string };

type Props = {
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
};

/** A list of tick-boxes. The parent owns the ticked state so it can show progress. */
export default function Checklist({ items, checked, onToggle }: Props) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => {
        const done = !!checked[item.id];
        return (
          <li key={item.id}>
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                done ? "border-brand-600 bg-brand-50" : "border-brand-100 bg-white hover:bg-brand-50"
              }`}
            >
              <input
                type="checkbox"
                checked={done}
                onChange={() => onToggle(item.id)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-700"
              />
              <span className={`text-sm leading-snug ${done ? "text-brand-900" : "text-brand-800/90"}`}>
                {item.label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
