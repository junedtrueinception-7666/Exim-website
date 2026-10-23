/** A big number with a short caption underneath. */
export default function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-brand-100 bg-white px-4 py-3 shadow-sm">
      <p className="text-xl font-bold text-brand-700 sm:text-2xl">{value}</p>
      <p className="mt-0.5 text-xs leading-snug text-brand-800/80 sm:text-sm">{label}</p>
    </div>
  );
}
