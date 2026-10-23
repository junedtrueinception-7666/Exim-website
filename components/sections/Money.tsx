"use client";

import Callout from "@/components/ui/Callout";
import FlowRows from "@/components/ui/FlowRows";
import OptionCompare from "@/components/ui/OptionCompare";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Money() {
  const { t } = useLanguage();

  const rows = [
    { from: t("money.r1.from"), to: t("money.r1.to"), description: t("money.r1.desc") },
    { from: t("money.r2.from"), to: t("money.r2.to"), description: t("money.r2.desc") },
    { from: t("money.r3.from"), to: t("money.r3.to"), description: t("money.r3.desc") },
    { from: t("money.r4.from"), to: t("money.r4.to"), description: t("money.r4.desc") },
  ];

  return (
    <Section
      id="money"
      split
      title={t("money.title")}
      subtitle={t("money.intro")}
    >
      <div className="space-y-6">
        <FlowRows rows={rows} />
        <p className="text-sm leading-relaxed text-brand-800/80">{t("money.note")}</p>

        <OptionCompare
          question={t("money.d6.question")}
          suggestedLabel={t("opt.suggested")}
          note={t("money.d6.note")}
          options={[
            {
              label: t("opt.a"),
              title: t("money.d6.a.title"),
              description: t("money.d6.a.desc"),
            },
            {
              label: t("opt.b"),
              title: t("money.d6.b.title"),
              description: t("money.d6.b.desc"),
              suggested: true,
            },
          ]}
        />

        <OptionCompare
          question={t("money.d7.question")}
          suggestedLabel={t("opt.suggested")}
          note={t("money.d7.note")}
          options={[
            {
              label: t("opt.a"),
              title: t("money.d7.a.title"),
              description: t("money.d7.a.desc"),
              suggested: true,
            },
            {
              label: t("opt.b"),
              title: t("money.d7.b.title"),
              description: t("money.d7.b.desc"),
            },
          ]}
        />

        <Callout label={t("money.own.label")}>{t("money.own.text")}</Callout>
      </div>
    </Section>
  );
}
