"use client";

import Accordion from "@/components/ui/Accordion";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const questions = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export default function Faq() {
  const { t } = useLanguage();

  const items = questions.map((n) => ({
    id: `q${n}`,
    title: t(`faq.q${n}`),
    content: t(`faq.a${n}`),
  }));

  return (
    <Section id="faq" tone="tint" split eyebrow={t("faq.eyebrow")} title={t("faq.title")}>
      <Accordion items={items} />
    </Section>
  );
}
