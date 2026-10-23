"use client";

import Image from "next/image";
import AppDownloadButton from "@/components/ui/AppDownloadButton";
import { appLinks } from "@/lib/app";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { features, screens, type FeaturePickerProps } from "./features";

/** App section for phones and tablets: dark blue panel, chips and the matching screenshot below. */
export default function EximAppMobile({ active, select }: FeaturePickerProps) {
  const { t } = useLanguage();
  const current = features[active];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-800 via-brand-700 to-brand-600 text-white shadow-xl">
      <span aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
      <span aria-hidden="true" className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-400/20" />

      <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-10">
        <div className="min-w-0">
          <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            {t("app.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{t("app.title")}</h2>
          <p className="mt-3 max-w-lg text-lg leading-relaxed text-brand-100">{t("app.subtitle")}</p>

          <div className="mt-6">
            <AppDownloadButton
              compact
              tone="white"
              name={t("app.store.android")}
              caption={t("app.store.direct")}
              href={appLinks.androidApk}
              soonLabel={t("app.store.soon")}
            />
            <p className="mt-2 text-sm text-brand-200">{t("app.download.text")}</p>
          </div>

          <div
            role="group"
            aria-label={t("app.features.label")}
            className="scrollbar-none -mx-6 mt-8 flex gap-2 overflow-x-auto px-6 pb-1 sm:-mx-10 sm:px-10"
          >
            {features.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(i)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    on ? "border-white bg-white text-brand-800" : "border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  {t(`app.${f.id}.title`)}
                </button>
              );
            })}
          </div>

          <div aria-live="polite" className="mt-4 rounded-2xl bg-white/10 p-4 sm:p-5">
            <p className="font-bold">{t(`app.${current.id}.title`)}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-50">{t(`app.${current.id}.desc`)}</p>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-xl">
          <span aria-hidden="true" className="absolute inset-6 rounded-full bg-white/15 blur-3xl" />
          <div className="relative aspect-738/492">
            {screens.map((n) => {
              const on = n === current.screen;
              return (
                <Image
                  key={n}
                  src={`/app-images/${n}.png`}
                  alt={on ? t(`app.shot${n}.alt`) : ""}
                  fill
                  sizes="92vw"
                  className={`object-contain transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
