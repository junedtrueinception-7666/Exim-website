"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";
import FilterChips from "@/components/ui/FilterChips";
import SearchBar from "@/components/ui/SearchBar";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Category = "all" | "papers" | "goods" | "money" | "port" | "support";

// The service list comes from the PDF; the grouping into types is ours, for filtering.
const services = [
  { id: "s1", category: "papers" },
  { id: "s2", category: "goods" },
  { id: "s3", category: "goods" },
  { id: "s4", category: "money" },
  { id: "s5", category: "money" },
  { id: "s6", category: "port" },
  { id: "s7", category: "port" },
  { id: "s8", category: "support" },
  { id: "s9", category: "support" },
  { id: "s10", category: "support" },
  { id: "s11", category: "support" },
] as const;

type ServiceId = (typeof services)[number]["id"];

const categories: Category[] = ["all", "papers", "goods", "money", "port", "support"];

export default function Services() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");

  const rows = useMemo(
    () =>
      services.map((s) => ({
        id: s.id as ServiceId,
        category: s.category as Exclude<Category, "all">,
        name: t(`services.${s.id}.name`),
        detail: t(`services.${s.id}.detail`),
        gives: t(`services.${s.id}.gives`),
        when: t(`services.${s.id}.when`),
      })),
    [t],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (!q) return true;
      return [r.name, r.detail, r.gives, r.when].some((text) => text.toLowerCase().includes(q));
    });
  }, [rows, query, category]);

  const columns: Column<(typeof rows)[number]>[] = [
    {
      key: "service",
      header: t("services.col.service"),
      render: (r) => (
        <>
          {r.name}
          {r.detail && (
            <span className="mt-0.5 block text-xs font-normal text-brand-800/70">{r.detail}</span>
          )}
        </>
      ),
    },
    { key: "gives", header: t("services.col.gives"), render: (r) => r.gives },
    { key: "when", header: t("services.col.when"), render: (r) => r.when },
  ];

  const clearAll = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <Section
      id="services"
      title={t("services.title")}
      subtitle={t("services.intro")}
    >
      <div className="mb-6 space-y-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={t("services.search.placeholder")}
          label={t("services.search.label")}
          clearLabel={t("services.clear")}
          className="max-w-md"
        />
        <FilterChips
          ariaLabel={t("services.filter.label")}
          value={category}
          onChange={setCategory}
          options={categories.map((c) => ({ value: c, label: t(`services.filter.${c}`) }))}
        />
        <p className="text-sm text-brand-800/70" aria-live="polite">
          {t("services.count", { shown: visible.length, total: rows.length })}
        </p>
      </div>

      {visible.length > 0 ? (
        <DataTable columns={columns} rows={visible} rowKey={(r) => r.id} />
      ) : (
        <div className="rounded-xl border border-dashed border-brand-300 bg-white p-8 text-center">
          <p className="text-brand-800/80">{t("services.empty")}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>
            {t("services.clear")}
          </Button>
        </div>
      )}
    </Section>
  );
}
