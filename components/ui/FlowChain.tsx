export type FlowItem = { title: string; description: string; highlight?: boolean };

function Arrow({ className = "", sideways }: { className?: string; sideways?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-brand-400 md:my-0 md:h-5 md:w-5 md:rotate-0 ${
        sideways ? "" : "my-1 rotate-90"
      } ${className}`}
    >
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Dashed curve from the bottom of one card to the top of the next one on the other side. */
function ZigzagConnector({ toRight }: { toRight: boolean }) {
  return (
    <div aria-hidden="true" className="relative h-10 w-full md:hidden">
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-brand-300"
      >
        <path
          d={toRight ? "M20 0 C20 24 80 14 80 36" : "M80 0 C80 24 20 14 20 36"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className={`absolute bottom-0 -translate-x-1/2 text-brand-500 ${toRight ? "left-[80%]" : "left-[20%]"}`}
      >
        <path d="M1.5 3h11L7 11z" fill="currentColor" />
      </svg>
    </div>
  );
}

type Props = {
  items: FlowItem[];
  /** Adds a step number to each step on phones. */
  numbered?: boolean;
  /**
   * On phones, steps sit alternately on the left and the right, joined by curved lines.
   * Without it (and without `scroll`) they stack full width.
   */
  zigzag?: boolean;
  /** On phones, the steps sit in one row that you swipe sideways, joined by arrows. */
  scroll?: boolean;
};

/** Steps joined by arrows. From md up the steps always run left to right. */
export default function FlowChain({ items, numbered, zigzag, scroll }: Props) {
  return (
    <ol
      className={
        scroll
          ? "-mx-4 flex snap-x snap-mandatory flex-row items-stretch overflow-x-auto px-4 pb-1 scroll-pl-4 scrollbar-none sm:-mx-6 sm:px-6 sm:scroll-pl-6 [&::-webkit-scrollbar]:hidden md:mx-0 md:snap-none md:overflow-visible md:px-0 md:pb-0"
          : "flex flex-col items-stretch md:flex-row"
      }
    >
      {items.map((item, i) => {
        const onLeft = i % 2 === 0;
        const last = i === items.length - 1;
        return (
          <li
            key={item.title}
            className={`flex md:flex-1 md:flex-row md:items-center md:gap-2 ${
              scroll
                ? "w-[46%] shrink-0 snap-start flex-row items-center gap-2 sm:w-[34%] md:w-auto md:shrink"
                : `flex-col ${zigzag ? "" : "items-center"}`
            }`}
          >
            <div
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 md:block md:w-auto md:flex-1 md:self-stretch md:p-4 ${
                scroll
                  ? "h-full min-w-0 flex-1 self-stretch"
                  : zigzag
                    ? `w-[82%] ${onLeft ? "self-start" : "self-end"}`
                    : "w-full flex-1 self-stretch"
              } ${
                item.highlight
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-brand-200 bg-white text-brand-900"
              }`}
            >
              {numbered && (
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold md:hidden ${
                    item.highlight ? "bg-white/20 text-white" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {i + 1}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-bold leading-snug">{item.title}</p>
                {item.description && (
                  <p
                    className={`mt-0.5 text-xs leading-snug ${item.highlight ? "text-brand-100" : "text-brand-800/80"}`}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            {!last &&
              (scroll ? (
                <Arrow sideways />
              ) : zigzag ? (
                <>
                  <ZigzagConnector toRight={onLeft} />
                  <Arrow className="hidden md:block" />
                </>
              ) : (
                <Arrow />
              ))}
          </li>
        );
      })}
    </ol>
  );
}
