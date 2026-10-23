"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import EximAppDesktop from "./exim-app/EximAppDesktop";
import EximAppMobile from "./exim-app/EximAppMobile";
import { features } from "./exim-app/features";

const AUTO_ADVANCE_MS = 4500;
const RESUME_AFTER_CLICK_MS = 9000;

/**
 * App section. Phones and tablets get the dark panel, large screens (lg and up) get the
 * light card. Both show the same feature, so they share one state and one rotation timer.
 */
export default function EximApp() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Moves to the next feature by itself. Pauses while the pointer or keyboard focus is on the
  // section and for a while after a click, and stays off for visitors who asked for less motion.
  useEffect(() => {
    if (hovered || clicked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % features.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, hovered, clicked]);

  const select = (index: number) => {
    setActive(((index % features.length) + features.length) % features.length);
    setClicked(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setClicked(false), RESUME_AFTER_CLICK_MS);
  };

  return (
    <section id="app" className="bg-brand-50 py-12 sm:py-16">
      <Container>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <div className="lg:hidden">
            <EximAppMobile active={active} select={select} />
          </div>
          <div className="hidden lg:block">
            <EximAppDesktop active={active} select={select} />
          </div>
        </div>
      </Container>
    </section>
  );
}
