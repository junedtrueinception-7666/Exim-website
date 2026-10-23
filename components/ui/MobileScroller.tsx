"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Layout from md up, where the items sit in a normal grid, e.g. "md:grid-cols-3 md:gap-4". */
  desktopClassName: string;
  /** Moves to the next item by itself on phones, and loops back to the first. */
  autoplay?: boolean;
};

const AUTO_ADVANCE_MS = 3500;
const RESUME_AFTER_TOUCH_MS = 5000;

/**
 * On phones the items sit in one row you can swipe sideways, each snapping into place with
 * the next one peeking in from the right, and dots underneath. From md up the same items are
 * laid out as a normal grid. With `autoplay` the row also moves by itself until touched.
 */
export default function MobileScroller({ children, desktopClassName, autoplay }: Props) {
  const items = Children.toArray(children);
  const rowRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateActive = () => {
    const row = rowRef.current;
    if (!row) return;
    const kids = Array.from(row.children) as HTMLElement[];
    const start = kids[0]?.offsetLeft ?? 0;
    let nearest = 0;
    let best = Infinity;
    kids.forEach((kid, i) => {
      const distance = Math.abs(kid.offsetLeft - start - row.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  // Each change of `active` re-arms the timer, so a swipe gets a full pause before the next move.
  useEffect(() => {
    if (!autoplay || paused || items.length < 2) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => {
      const row = rowRef.current;
      if (!row) return;
      const kids = Array.from(row.children) as HTMLElement[];
      const next = (active + 1) % kids.length;
      row.scrollTo({ left: kids[next].offsetLeft - kids[0].offsetLeft, behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [autoplay, paused, active, items.length]);

  const pause = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
  };
  const resumeSoon = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_TOUCH_MS);
  };

  return (
    <div>
      <div
        ref={rowRef}
        onScroll={updateActive}
        onTouchStart={pause}
        onTouchEnd={resumeSoon}
        onFocus={pause}
        onBlur={resumeSoon}
        className={`relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scroll-pl-4 scrollbar-none sm:-mx-6 sm:px-6 sm:scroll-pl-6 [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0 ${desktopClassName}`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex w-[82%] shrink-0 snap-start sm:w-[55%] md:w-auto md:shrink [&>*]:min-w-0 [&>*]:flex-1"
          >
            {item}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div aria-hidden="true" className="mt-3 flex justify-center gap-1.5 md:hidden">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-brand-700" : "w-1.5 bg-brand-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
