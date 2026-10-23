"use client";

import Card from "@/components/ui/Card";
import MobileScroller from "@/components/ui/MobileScroller";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function WhoIsWho() {
  const { t } = useLanguage();

  const cards = [
    { key: "entrepreneur", highlight: true },
    { key: "fpc" },
    { key: "opl" },
    { key: "rkf" },
    { key: "partners" },
    { key: "buyer" },
  ] as const;

  return (
    <Section id="who-is-who" title={t("who.title")}>
      <MobileScroller autoplay desktopClassName="md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {cards.map((c) => (
          <Card
            key={c.key}
            tag={t(`who.${c.key}.tag`)}
            title={t(`who.${c.key}.title`)}
            highlight={"highlight" in c && c.highlight}
          >
            {t(`who.${c.key}.desc`)}
          </Card>
        ))}
      </MobileScroller>
    </Section>
  );
}
