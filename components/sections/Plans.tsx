"use client";

import { useState } from "react";
import Callout from "@/components/ui/Callout";
import DataTable, { type Column } from "@/components/ui/DataTable";
import FlowChain from "@/components/ui/FlowChain";
import MobileScroller from "@/components/ui/MobileScroller";
import Section from "@/components/ui/Section";
import Select from "@/components/ui/Select";
import { formatInrLakhs, formatNumber } from "@/lib/format";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { plans, totalTarget, type Plan } from "@/lib/plans";

const years = [1, 2, 3, 4, 5] as const;

export default function Plans() {
  const { t, locale } = useLanguage();
  const [selectedTier, setSelectedTier] = useState("1");

  const units = { lakh: t("plans.unit.lakh"), crore: t("plans.unit.crore") };
  const money = (lakhs: number) => formatInrLakhs(lakhs, locale, units);
  const tierName = (tier: number) => t("plans.tier", { n: formatNumber(tier, locale) });

  const selected = plans.find((p) => String(p.tier) === selectedTier) ?? plans[0];
  const maxTarget = Math.max(...selected.targets);

  const columns: Column<Plan>[] = [
    { key: "plan", header: t("plans.col.plan"), render: (p) => tierName(p.tier) },
    { key: "fee", header: t("plans.fee"), numeric: true, render: (p) => money(p.fee) },
    ...years.map((y) => ({
      key: `y${y}`,
      header: t("plans.year", { n: formatNumber(y, locale) }),
      numeric: true,
      render: (p: Plan) => money(p.targets[y - 1]),
    })),
    {
      key: "total",
      header: t("plans.total"),
      numeric: true,
      render: (p) => <strong className="text-brand-900">{money(totalTarget(p))}</strong>,
    },
  ];

  const growth = [
    { year: 1, place: t("growth.y1") },
    { year: 2, place: t("growth.y2") },
    { year: 3, place: t("growth.y3") },
    { year: 5, place: t("growth.y5") },
  ].map((g) => ({
    title: t("growth.year", { n: formatNumber(g.year, locale) }),
    description: g.place,
  }));

  return (
    <Section
      tone="tint"
      id="plans"
      title={t("plans.title")}
      subtitle={t("plans.intro")}
    >
      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <div className="space-y-4">
          <Select
            label={t("plans.select.label")}
            value={selectedTier}
            onChange={setSelectedTier}
            options={plans.map((p) => ({
              value: String(p.tier),
              label: `${tierName(p.tier)} · ${money(p.fee)}`,
            }))}
          />
          <div className="rounded-xl border border-brand-600 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-brand-600">
              {t("plans.selected.heading", { n: formatNumber(selected.tier, locale) })}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {t("plans.fee")}
                </dt>
                <dd className="mt-0.5 text-2xl font-bold text-brand-900">{money(selected.fee)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {t("plans.total")}
                </dt>
                <dd className="mt-0.5 text-2xl font-bold text-brand-700">
                  {money(totalTarget(selected))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="rounded-xl border border-brand-100 bg-white p-5">
          <p className="text-sm font-semibold text-brand-900">{t("plans.targets")}</p>
          <ul className="mt-4 flex h-48 items-end gap-2 sm:gap-4">
            {selected.targets.map((target, i) => (
              <li key={i} className="flex h-full flex-1 flex-col justify-end text-center">
                <span className="mb-1 text-[11px] font-semibold leading-tight text-brand-900 sm:text-xs">
                  {money(target)}
                </span>
                <span
                  className="w-full rounded-t-md bg-brand-600"
                  style={{ height: `${Math.max((target / maxTarget) * 75, 4)}%` }}
                />
                <span className="mt-1 text-[11px] text-brand-800/70 sm:text-xs">
                  {t("plans.year", { n: formatNumber(i + 1, locale) })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mb-3 mt-10 text-xl font-bold text-brand-900">{t("plans.compare")}</h3>
      <DataTable
        columns={columns}
        rows={plans}
        rowKey={(p) => String(p.tier)}
        highlight={(p) => p.tier === selected.tier}
        inlineCards
        mobileCards={false}
      />
      <div className="md:hidden">
        <MobileScroller desktopClassName="">
          {plans.map((p) => {
            const isSelected = p.tier === selected.tier;
            return (
              <button
                key={p.tier}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedTier(String(p.tier))}
                className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 ${
                  isSelected ? "border-brand-600 bg-brand-50" : "border-brand-100 bg-white"
                }`}
              >
                <p className="text-lg font-bold text-brand-900">{tierName(p.tier)}</p>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="font-semibold text-brand-600">{t("plans.fee")}</dt>
                    <dd className="font-semibold text-brand-900">{money(p.fee)}</dd>
                  </div>
                  {years.map((y) => (
                    <div key={y} className="flex justify-between gap-3">
                      <dt className="text-brand-800/70">{t("plans.year", { n: formatNumber(y, locale) })}</dt>
                      <dd className="text-brand-800">{money(p.targets[y - 1])}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-3 border-t border-brand-100 pt-1.5">
                    <dt className="font-semibold text-brand-600">{t("plans.total")}</dt>
                    <dd className="font-bold text-brand-900">{money(totalTarget(p))}</dd>
                  </div>
                </dl>
              </button>
            );
          })}
        </MobileScroller>
      </div>
      <p className="mt-2 text-xs text-brand-800/70">{t("plans.legend")}</p>

      <Callout label={t("plans.suggestion.label")} className="mt-6 max-w-3xl">
        {t("plans.suggestion.text")}
      </Callout>

      <h3 className="mb-4 mt-12 text-xl font-bold text-brand-900">{t("growth.title")}</h3>
      <FlowChain items={growth} scroll />
    </Section>
  );
}
