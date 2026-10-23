"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { id: string; title: string; content: ReactNode };

/** Questions that open one at a time. Click the open one again to close it. */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-brand-100 rounded-xl border border-brand-100 bg-white">
      {items.map((item) => {
        const open = item.id === openId;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-semibold text-brand-900 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600 sm:px-5"
              >
                {item.title}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={`shrink-0 text-brand-600 transition-transform ${open ? "rotate-180" : ""}`}
                >
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-4 pb-4 text-sm leading-relaxed text-brand-800/80 sm:px-5"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
