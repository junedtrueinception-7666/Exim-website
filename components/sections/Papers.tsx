"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Callout from "@/components/ui/Callout";
import Checklist from "@/components/ui/Checklist";
import Section from "@/components/ui/Section";
import Tabs from "@/components/ui/Tabs";
import { formatNumber } from "@/lib/format";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Group = "join" | "export" | "shipment";

// How many papers each group has. The wording lives in the message files as papers.<prefix>.<n>.
const groups: { value: Group; prefix: "join" | "export" | "ship"; count: number }[] = [
  { value: "join", prefix: "join", count: 7 },
  { value: "export", prefix: "export", count: 7 },
  { value: "shipment", prefix: "ship", count: 11 },
];

export default function Papers() {
  const { t, locale } = useLanguage();
  const [group, setGroup] = useState<Group>("join");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const current = groups.find((g) => g.value === group) ?? groups[0];

  // Ids stay the same in both languages, so ticks survive a language switch.
  const items = Array.from({ length: current.count }, (_, i) => {
    const n = i + 1;
    return {
      id: `${current.value}-${n}`,
      label: t(`papers.${current.prefix}.${n}` as Parameters<typeof t>[0]),
    };
  });

  const done = items.filter((item) => checked[item.id]).length;

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const clearGroup = () =>
    setChecked((prev) => {
      const next = { ...prev };
      items.forEach((item) => delete next[item.id]);
      return next;
    });

  return (
    <Section
      id="papers"
      title={t("papers.title")}
      subtitle={t("papers.hint")}
    >
      <div className="rounded-xl border border-brand-100 bg-white p-4 sm:p-6">
        <Tabs
          ariaLabel={t("papers.title")}
          value={group}
          onChange={setGroup}
          tabs={[
            { value: "join", label: t("papers.tab.join") },
            { value: "export", label: t("papers.tab.export") },
            { value: "shipment", label: t("papers.tab.shipment") },
          ]}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-brand-700" aria-live="polite">
              {t("papers.progress", {
                done: formatNumber(done, locale),
                total: formatNumber(items.length, locale),
              })}
            </p>
            {done > 0 && (
              <Button variant="ghost" size="sm" onClick={clearGroup}>
                {t("papers.reset")}
              </Button>
            )}
          </div>
          <Checklist items={items} checked={checked} onToggle={toggle} />
        </Tabs>
      </div>

      <p className="mt-3 text-sm text-brand-800/70">{t("papers.note")}</p>

      <Callout label={t("papers.notcovered.label")} className="mt-8 max-w-3xl">
        {t("papers.notcovered.text")}
      </Callout>
    </Section>
  );
}
