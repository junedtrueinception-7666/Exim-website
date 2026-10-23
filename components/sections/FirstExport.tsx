"use client";

import NumberedChips from "@/components/ui/NumberedChips";
import OptionCompare from "@/components/ui/OptionCompare";
import Section from "@/components/ui/Section";
import Timeline, { type TimelineItem } from "@/components/ui/Timeline";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Suggested = "a" | "b" | "both" | "none";

export default function FirstExport() {
  const { t } = useLanguage();

  const compare = (
    question: string,
    a: { title: string; description: string },
    b: { title: string; description: string },
    suggested: Suggested,
    note?: string,
  ) => (
    <OptionCompare
      question={question}
      suggestedLabel={t("opt.suggested")}
      note={note}
      options={[
        { label: t("opt.a"), ...a, suggested: suggested === "a" || suggested === "both" },
        { label: t("opt.b"), ...b, suggested: suggested === "b" || suggested === "both" },
      ]}
    />
  );

  const meta = (who: string, papers: string) => [
    { label: t("first.who"), value: who },
    { label: t("first.papers"), value: papers },
  ];

  const qualityChecks = [
    t("first.qc.1"),
    t("first.qc.2"),
    t("first.qc.3"),
    t("first.qc.4"),
    t("first.qc.5"),
  ];

  const items: TimelineItem[] = [
    {
      title: t("first.s1.title"),
      description: t("first.s1.desc"),
      meta: meta(t("first.s1.who"), t("first.s1.papers")),
      extra: compare(
        t("first.d2.question"),
        { title: t("first.d2.a.title"), description: t("first.d2.a.desc") },
        { title: t("first.d2.b.title"), description: t("first.d2.b.desc") },
        "both",
        t("first.d2.note"),
      ),
    },
    {
      title: t("first.s2.title"),
      description: t("first.s2.desc"),
      meta: meta(t("first.s2.who"), t("first.s2.papers")),
    },
    {
      title: t("first.s3.title"),
      description: t("first.s3.desc"),
      meta: meta(t("first.s3.who"), t("first.s3.papers")),
      extra: compare(
        t("first.d3.question"),
        { title: t("first.d3.a.title"), description: t("first.d3.a.desc") },
        { title: t("first.d3.b.title"), description: t("first.d3.b.desc") },
        "a",
      ),
    },
    {
      title: t("first.s4.title"),
      description: t("first.s4.desc"),
      meta: meta(t("first.s4.who"), t("first.s4.papers")),
      extra: (
        <div className="space-y-4">
          <NumberedChips items={qualityChecks} />
          {compare(
            t("first.d4.question"),
            { title: t("first.d4.a.title"), description: t("first.d4.a.desc") },
            { title: t("first.d4.b.title"), description: t("first.d4.b.desc") },
            "a",
            t("first.d4.note"),
          )}
        </div>
      ),
    },
    {
      title: t("first.s5.title"),
      description: t("first.s5.desc"),
      meta: meta(t("first.s5.who"), t("first.s5.papers")),
      extra: compare(
        t("first.d5.question"),
        { title: t("first.d5.a.title"), description: t("first.d5.a.desc") },
        { title: t("first.d5.b.title"), description: t("first.d5.b.desc") },
        "a",
      ),
    },
    {
      title: t("first.s6.title"),
      description: t("first.s6.desc"),
      meta: meta(t("first.s6.who"), t("first.s6.papers")),
    },
    {
      title: t("first.s7.title"),
      description: t("first.s7.desc"),
      meta: meta(t("first.s7.who"), t("first.s7.papers")),
    },
  ];

  return (
    <Section
      tone="tint"
      split
      id="how-it-works"
      title={t("first.title")}
      subtitle={t("first.intro")}
    >
      <Timeline items={items} />
    </Section>
  );
}
