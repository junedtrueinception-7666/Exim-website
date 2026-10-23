"use client";

import Callout from "@/components/ui/Callout";
import FlowChain from "@/components/ui/FlowChain";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/** "RK Federation (network of all FPCs)" -> the name and the part in brackets. */
function splitName(entry: string) {
  const match = entry.match(/^(.*?)\s*\((.*)\)\s*$/);
  return match ? { name: match[1], detail: match[2] } : { name: entry, detail: "" };
}

export default function BigPicture() {
  const { t } = useLanguage();

  const items = [
    { title: t("big.farmer.title"), description: t("big.farmer.desc") },
    { title: t("big.fpc.title"), description: t("big.fpc.desc") },
    { title: t("big.entrepreneur.title"), description: t("big.entrepreneur.desc"), highlight: true },
    { title: t("big.port.title"), description: t("big.port.desc") },
    { title: t("big.buyer.title"), description: t("big.buyer.desc") },
  ];

  // The three backers are written as one line in the message files, joined by " · ".
  const backers = t("big.behind.text").split(" · ").map(splitName);

  return (
    <Section id="about" tightTop title={t("big.title")} subtitle={t("big.intro")}>
      <div className="mb-3 grid grid-cols-2 gap-2 text-[11px] font-semibold uppercase leading-tight tracking-wide text-brand-700 sm:flex sm:justify-between sm:text-xs">
        <span className="rounded-lg bg-brand-50 px-2.5 py-1.5 sm:bg-transparent sm:p-0">
          {t("big.goods")}
        </span>
        <span className="rounded-lg bg-brand-50 px-2.5 py-1.5 text-right sm:bg-transparent sm:p-0">
          {t("big.money")}
        </span>
      </div>
      <FlowChain items={items} numbered zigzag />

      <Callout label={t("big.behind.label")} className="mt-5">
        <ul className="grid gap-3 sm:grid-cols-3">
          {backers.map((b) => (
            <li key={b.name}>
              <p className="font-semibold">{b.name}</p>
              {b.detail && <p className="text-xs text-brand-800/80">{b.detail}</p>}
            </li>
          ))}
        </ul>
      </Callout>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-brand-800/80">
        {t("big.outro")}
      </p>
    </Section>
  );
}
