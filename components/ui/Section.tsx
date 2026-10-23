import type { ReactNode } from "react";
import Container from "./Container";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** "white" and "tint" alternate so neighbouring sections are easy to tell apart. */
  tone?: "white" | "tint" | "dark";
  /** Less space above the heading on phones. For a section that follows a full-width banner. */
  tightTop?: boolean;
  /**
   * On large screens, put the heading in a narrow left column that stays in view while the
   * content scrolls beside it, instead of leaving the right half of a long section empty.
   * On phones and tablets the heading stays above the content as usual.
   */
  split?: boolean;
  children: ReactNode;
};

const tones = {
  white: "bg-white text-brand-900",
  tint: "bg-brand-50 text-brand-900",
  dark: "bg-brand-800 text-white",
};

/** Standard page section: anchor id, optional heading block, then content. */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "white",
  tightTop,
  split,
  children,
}: Props) {
  const isDark = tone === "dark";
  return (
    <section
      id={id}
      className={`pb-12 sm:pb-16 ${tightTop ? "pt-2 sm:pt-8 md:pt-16" : "pt-12 sm:pt-16"} ${tones[tone]}`}
    >
      <Container className={split ? "lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-14" : ""}>
        {(eyebrow || title || subtitle) && (
          <header
            className={`mb-8 max-w-2xl sm:mb-10 ${split ? "lg:sticky lg:top-24 lg:mb-0 lg:self-start" : ""}`}
          >
            {eyebrow && (
              <p
                className={`mb-2 text-sm font-semibold uppercase tracking-wider ${isDark ? "text-brand-200" : "text-brand-600"}`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {subtitle && (
              <p className={`mt-3 text-lg ${isDark ? "text-brand-100" : "text-brand-800/80"}`}>
                {subtitle}
              </p>
            )}
          </header>
        )}
        {split ? <div className="min-w-0">{children}</div> : children}
      </Container>
    </section>
  );
}
