"use client";

import OptionCompare from "@/components/ui/OptionCompare";
import Section from "@/components/ui/Section";
import Timeline, { type TimelineItem } from "@/components/ui/Timeline";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function BecomeEntrepreneur() {
  const { t } = useLanguage();

  const businessSetup = (
    <OptionCompare
      question={t("join.d1.question")}
      suggestedLabel={t("opt.suggested")}
      note={t("join.d1.note")}
      options={[
        {
          label: t("opt.a"),
          title: t("join.d1.a.title"),
          description: t("join.d1.a.desc"),
        },
        {
          label: t("opt.b"),
          title: t("join.d1.b.title"),
          description: t("join.d1.b.desc"),
          suggested: true,
        },
      ]}
    />
  );

  const items: TimelineItem[] = [
    { title: t("join.s1.title"), description: t("join.s1.desc") },
    { title: t("join.s2.title"), description: t("join.s2.desc") },
    { title: t("join.s3.title"), description: t("join.s3.desc") },
    { title: t("join.s4.title"), description: t("join.s4.desc") },
    { title: t("join.s5.title"), description: t("join.s5.desc"), extra: businessSetup },
    { title: t("join.s6.title"), description: t("join.s6.desc") },
    {
      title: t("join.s7.title"),
      description: t("join.s7.desc"),
      extra: <p className="text-sm font-medium text-brand-700">{t("join.s7.note")}</p>,
    },
  ];

  return (
    <Section tone="tint" split id="join" title={t("join.title")} subtitle={t("join.intro")}>
      <Timeline items={items} />
    </Section>
  );
}
