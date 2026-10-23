"use client";

import Card from "@/components/ui/Card";
import MobileScroller from "@/components/ui/MobileScroller";
import OptionCompare from "@/components/ui/OptionCompare";
import Section from "@/components/ui/Section";
import StatChip from "@/components/ui/StatChip";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Office() {
  const { t } = useLanguage();

  const stats = [
    { value: t("office.stat.cabin.value"), label: t("office.stat.cabin.label") },
    { value: t("office.stat.days.value"), label: t("office.stat.days.label") },
    { value: t("office.stat.rooms.value"), label: t("office.stat.rooms.label") },
    { value: t("office.stat.hall.value"), label: t("office.stat.hall.label") },
  ];

  return (
    <Section
      tone="tint"
      id="office"
      title={t("office.title")}
      subtitle={t("office.intro")}
    >
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <StatChip key={s.label} value={s.value} label={s.label} />
        ))}
      </div>

      <MobileScroller autoplay desktopClassName="md:grid-cols-3 md:gap-4">
        <Card title={t("office.cabin.title")}>{t("office.cabin.desc")}</Card>
        <Card title={t("office.rooms.title")}>{t("office.rooms.desc")}</Card>
        <Card title={t("office.stay.title")}>{t("office.stay.desc")}</Card>
      </MobileScroller>

      <div className="mt-6">
        <OptionCompare
          question={t("office.d8.question")}
          suggestedLabel={t("opt.suggested")}
          note={t("office.d8.note")}
          options={[
            {
              label: t("opt.a"),
              title: t("office.d8.a.title"),
              description: t("office.d8.a.desc"),
              suggested: true,
            },
            {
              label: t("opt.b"),
              title: t("office.d8.b.title"),
              description: t("office.d8.b.desc"),
            },
          ]}
        />
      </div>
    </Section>
  );
}
