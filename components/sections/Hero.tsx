"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { appLinks } from "@/lib/app";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const desktopBanners = {
  en: "/home-banner/hero-banner.png",
  mr: "/home-banner/hero-banner-marathi.png",
} as const;

// One English banner for phones, used for both languages.
const mobileBanner = "/home-banner/mobile-hero-banner.png";
const mobileBannerAlt =
  "India's Farmer, Global Markets! RK Federation's T.E.C.H EXIM EDP – Empowering FPCs, EXIM Entrepreneurs, and a Stronger India in Global Trade.";

/**
 * Just the banner. From md up it is the wide banner in the chosen language.
 * On phones it is the tall banner, with Explore and Download buttons placed in the
 * empty band under "in Global Trade." The heading is for screen readers and search engines only.
 */
export default function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section id="home" className="bg-white">
      <h1 className="sr-only">{t("hero.title")}</h1>

      <Image
        src={desktopBanners[locale]}
        alt={t("hero.bannerAlt")}
        width={1918}
        height={820}
        sizes="100vw"
        className="hidden h-auto w-full md:block"
      />

      <div className="relative md:hidden">
        <Image
          src={mobileBanner}
          alt={mobileBannerAlt}
          lang="en"
          width={941}
          height={1672}
          sizes="100vw"
          priority
          className="h-auto w-full"
        />
        {/* The empty band in the banner sits at about 79% of its height. */}
        <div className="absolute inset-x-0 top-[79.5%] flex -translate-y-1/2 gap-3 px-6 sm:px-10">
          <Button
            href="#about"
            variant="outline"
            size="sm"
            className="flex-1 bg-white sm:h-11 sm:px-5 sm:text-base"
          >
            {t("hero.explore")}
          </Button>
          <Button
            href={appLinks.androidApk ?? "#app"}
            {...(appLinks.androidApk ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            size="sm"
            className="flex-1 shadow-md shadow-brand-700/30 sm:h-11 sm:px-5 sm:text-base"
          >
            {t("hero.download")}
          </Button>
        </div>
      </div>
    </section>
  );
}
