"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// The content counts as reached once its top edge is above this line (a bit above the screen bottom).
const REVEAL_LINE = 0.88;

/**
 * On phones, fades its content in when the visitor scrolls down to it, and hides it
 * again when they scroll back up past it. From md up the content is always visible.
 * It only changes opacity and position, so the page layout never jumps.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    // Read the position directly, so it stays right even when the page jumps a long way
    // (for example after tapping a link in the bottom nav).
    const update = () => {
      frame = 0;
      setShown(el.getBoundingClientRect().top < window.innerHeight * REVEAL_LINE);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
        shown
          ? ""
          : "max-md:translate-y-8 max-md:opacity-0 motion-reduce:max-md:translate-y-0 motion-reduce:max-md:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
