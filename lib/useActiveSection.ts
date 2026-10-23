"use client";

import { useEffect, useState } from "react";

/**
 * Tells which nav item matches the part of the page being read.
 * `navIds` are the section ids in the nav, in page order. Sections that are not in the
 * nav (like "Who is who") count towards the nav item above them.
 */
export function useActiveSection(navIds: readonly string[]) {
  const [active, setActive] = useState(navIds[0]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const order = sections.map((s) => s.id);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const position = order.indexOf(entry.target.id);
          const matching = navIds.filter((id) => order.indexOf(id) <= position);
          setActive(matching[matching.length - 1] ?? navIds[0]);
        }
      },
      // Only the thin band across the middle of the screen counts as "being read".
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navIds]);

  return active;
}
