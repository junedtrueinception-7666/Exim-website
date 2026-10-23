import Badge from "./Badge";
import Reveal from "./Reveal";

export type CompareOption = {
  label: string;
  title: string;
  description: string;
  suggested?: boolean;
};

type Props = {
  question: string;
  options: CompareOption[];
  suggestedLabel: string;
  note?: string;
};

/** Side-by-side choices (Option A / Option B) with the suggested one marked. */
export default function OptionCompare({ question, options, suggestedLabel, note }: Props) {
  return (
    <Reveal className="rounded-xl border border-brand-200 bg-white p-4 sm:p-5">
      <p className="font-semibold text-brand-900">{question}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <div
            key={o.label}
            className={`rounded-lg border p-4 ${
              o.suggested ? "border-brand-600 bg-brand-50" : "border-brand-100 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {o.label}
              </span>
              {o.suggested && <Badge tone="solid">{suggestedLabel}</Badge>}
            </div>
            <p className="mt-1 font-bold text-brand-900">{o.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-800/80">{o.description}</p>
          </div>
        ))}
      </div>
      {note && <p className="mt-3 text-sm leading-relaxed text-brand-800/80">{note}</p>}
    </Reveal>
  );
}
