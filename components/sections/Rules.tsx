"use client";

import FlowChain from "@/components/ui/FlowChain";
import OptionCompare from "@/components/ui/OptionCompare";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Rules() {
  const { t } = useLanguage();

  const watchFor = [t("rules.w1"), t("rules.w2"), t("rules.w3"), t("rules.w4")];

  const chain = [
    { title: t("rules.n1"), description: "" },
    { title: t("rules.n2"), description: "" },
    { title: t("rules.n3"), description: "" },
    { title: t("rules.suspension"), description: "", highlight: true },
  ];

  return (
    <Section
      id="rules"
      split
      title={t("rules.title")}
      subtitle={t("rules.intro")}
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 font-semibold text-brand-900">{t("rules.watch.title")}</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {watchFor.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-brand-100 bg-white p-3 text-sm text-brand-900"
              >
                <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <FlowChain items={chain} scroll />

        <OptionCompare
          question={t("rules.d9.question")}
          suggestedLabel={t("opt.suggested")}
          note={t("rules.d9.note")}
          options={[
            {
              label: t("opt.a"),
              title: t("rules.d9.a.title"),
              description: t("rules.d9.a.desc"),
            },
            {
              label: t("opt.b"),
              title: t("rules.d9.b.title"),
              description: t("rules.d9.b.desc"),
              suggested: true,
            },
          ]}
        />
      </div>
    </Section>
  );
}
