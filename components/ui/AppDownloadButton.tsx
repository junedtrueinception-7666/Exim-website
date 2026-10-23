/**
 * Android app download button, shown as a card. With a link it opens the file;
 * with no link yet it shows a disabled "Coming soon" state instead of a dead link.
 */
export default function AppDownloadButton({
  name,
  caption,
  href,
  soonLabel,
  compact,
  tone = "blue",
}: {
  name: string;
  /** Small line above the name, e.g. "Direct download". */
  caption: string;
  href: string | null;
  soonLabel: string;
  /** Smaller button, used in the phone layout. */
  compact?: boolean;
  /** "blue" is the highlighted button; "white" is for use on a dark blue background. */
  tone?: "blue" | "white";
}) {
  const blue = tone === "blue";
  const base = `inline-flex items-center text-left transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
    compact ? "min-w-48 gap-3 rounded-xl px-5 py-3" : "min-w-60 gap-4 rounded-2xl px-6 py-4"
  }`;
  const content = (
    <>
      <svg
        width={compact ? 24 : 32}
        height={compact ? 24 : 32}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${blue ? "text-white" : "text-brand-700"}`}
      >
        <path d="M12 4v11m0 0l-4-4m4 4l4-4" />
        <path d="M5 19h14" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-medium ${blue ? "text-brand-100" : "text-brand-800/70"} ${compact ? "text-[11px]" : "text-sm"}`}
        >
          {href ? caption : soonLabel}
        </span>
        <span
          className={`font-extrabold ${blue ? "text-white" : "text-brand-900"} ${compact ? "text-base" : "text-xl"}`}
        >
          {name}
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <button type="button" disabled className={`${base} cursor-not-allowed ${blue ? "bg-brand-700/50" : "bg-white/60"} opacity-70`}>
        {content}
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${
        blue
          ? "bg-brand-700 shadow-lg shadow-brand-700/30 hover:bg-brand-800 hover:shadow-xl hover:shadow-brand-700/40"
          : "bg-white shadow-lg shadow-brand-900/10 hover:shadow-xl hover:shadow-brand-900/15"
      }`}
    >
      {content}
    </a>
  );
}
