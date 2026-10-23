"use client";

import type { ReactNode } from "react";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { joinHref } from "@/lib/nav";
import { useActiveSection } from "@/lib/useActiveSection";

type Item = { href: string; labelKey: MessageKey; icon: ReactNode };

const svgProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const left: Item[] = [
  {
    href: "#home",
    labelKey: "bnav.home",
    icon: (
      <svg {...svgProps}>
        <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    href: "#about",
    labelKey: "bnav.about",
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
    ),
  },
  {
    href: "#app",
    labelKey: "bnav.app",
    icon: (
      <svg {...svgProps}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
];

const right: Item[] = [
  {
    href: "#how-it-works",
    labelKey: "bnav.process",
    icon: (
      <svg {...svgProps}>
        <path d="M9 6h11M9 12h11M9 18h11" />
        <circle cx="4.5" cy="6" r="1" />
        <circle cx="4.5" cy="12" r="1" />
        <circle cx="4.5" cy="18" r="1" />
      </svg>
    ),
  },
  {
    href: "#plans",
    labelKey: "bnav.plans",
    icon: (
      <svg {...svgProps}>
        <path d="M5 20V10M12 20V4M19 20v-7" />
      </svg>
    ),
  },
  {
    href: "#contact",
    labelKey: "bnav.contact",
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
];

const navIds = [...left, ...right].map((item) => item.href.slice(1));

/** Phone-only bar fixed to the bottom, with the main "Join" button raised in the middle. */
export default function BottomNav() {
  const { t } = useLanguage();
  const active = useActiveSection(navIds);

  const renderItem = (item: Item) => {
    const isActive = active === item.href.slice(1);
    return (
      <a
        key={item.href}
        href={item.href}
        aria-current={isActive ? "location" : undefined}
        className={`relative flex flex-col items-center justify-center gap-0.5 pb-2 pt-2.5 text-[10px] font-semibold leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 ${
          isActive ? "text-brand-700" : "text-brand-800/70"
        }`}
      >
        {isActive && (
          <span aria-hidden="true" className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-brand-700" />
        )}
        {item.icon}
        <span className="max-w-full truncate px-0.5">{t(item.labelKey)}</span>
      </a>
    );
  };

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-100 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(11,27,51,0.06)] lg:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-7 items-end">
        {left.map(renderItem)}
        <a
          href={joinHref}
          className="flex flex-col items-center gap-0.5 pb-2 text-[10px] font-semibold leading-tight text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg ring-4 ring-white">
            <svg {...svgProps} strokeWidth={2.5}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="max-w-full truncate px-0.5">{t("bnav.join")}</span>
        </a>
        {right.map(renderItem)}
      </div>
    </nav>
  );
}
