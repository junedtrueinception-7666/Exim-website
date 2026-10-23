"use client";

import Image from "next/image";
import AppDownloadButton from "@/components/ui/AppDownloadButton";
import { appLinks } from "@/lib/app";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { features, screens, type FeaturePickerProps } from "./features";

/** "The EXIM App" -> the word EXIM in blue. */
function Title({ text }: { text: string }) {
  return (
    <>
      {text.split(/(EXIM)/).map((part, i) =>
        part === "EXIM" ? (
          <span key={i} className="text-brand-600">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** App section for large screens: compact light card, coloured feature pills, phones on a soft circle. */
export default function EximAppDesktop({ active, select }: FeaturePickerProps) {
  const { t } = useLanguage();
  const current = features[active];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-linear-to-br from-white via-brand-50 to-brand-100 shadow-sm">
      {/* soft shapes behind the phones */}
      <span
        aria-hidden="true"
        className="absolute -right-24 top-1/2 h-144 w-xl -translate-y-1/2 rounded-full bg-brand-200/70"
      />
      <span aria-hidden="true" className="absolute bottom-4 left-[52%] h-16 w-16 rounded-full bg-brand-200/60" />

      <div className="relative grid grid-cols-[1.2fr_1fr] items-center gap-6 p-8 xl:p-10">
        <div className="min-w-0">
          <p className="block w-fit rounded-full bg-brand-100 px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
            {t("app.eyebrow")}
          </p>

          <h2 className="relative mt-3 block w-fit text-4xl font-extrabold tracking-tight text-brand-900 xl:text-5xl">
            <Title text={t("app.title")} />
            <svg
              aria-hidden="true"
              width="28"
              height="24"
              viewBox="0 0 40 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="absolute -right-7 -top-2 text-brand-600"
            >
              <path d="M6 18L2 6" />
              <path d="M32 24l-10-6" />
            </svg>
          </h2>

          <p className="mt-3 max-w-md text-base leading-relaxed text-brand-800/70 xl:text-lg">
            {t("app.subtitle")}
          </p>


          <div role="group" aria-label={t("app.features.label")} className="mt-5 flex flex-wrap gap-2">
            {features.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(i)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold text-brand-900 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                    on ? "border-brand-300 bg-brand-100" : "border-brand-100 bg-white/80 hover:bg-white"
                  }`}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${f.tone}`}>
                    <span className="scale-[0.8]">{f.icon}</span>
                  </span>
                  {t(`app.${f.id}.title`)}
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            className="mt-4 flex items-center gap-3 rounded-2xl border border-brand-200/60 bg-brand-100/70 p-4"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/70 ${current.tone}`}>
              {current.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-brand-900">{t(`app.${current.id}.title`)}</p>
              <p className="text-sm text-brand-800/80">{t(`app.${current.id}.desc`)}</p>
            </div>
            <button
              type="button"
              aria-label={t("app.next")}
              onClick={() => select(active + 1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* The screenshots have empty margins around the phones, so they are scaled up a little. */}
        <div className="relative flex min-w-0 flex-col items-center">
          <div className="relative aspect-738/492 w-full scale-125">
            {screens.map((n) => {
              const on = n === current.screen;
              return (
                <Image
                  key={n}
                  src={`/app-images/${n}.png`}
                  alt={on ? t(`app.shot${n}.alt`) : ""}
                  fill
                  sizes="520px"
                  className={`object-contain drop-shadow-xl transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
                />
              );
            })}
          </div>

          {/* Under the phones, so it is the last thing seen after looking at the screens. */}
          <div className="relative z-10 mt-12">
            <AppDownloadButton
              compact
              name={t("app.store.android")}
              caption={t("app.store.direct")}
              href={appLinks.androidApk}
              soonLabel={t("app.store.soon")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
