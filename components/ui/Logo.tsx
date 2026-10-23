"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/** Logo image (public/logo.webp) with the program name next to it. */
export default function Logo({ light = false }: { light?: boolean }) {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* The name is written next to it, so the image itself is decorative. */}
      <Image
        src="/logo.webp"
        alt=""
        width={40}
        height={40}
        priority
        className="h-10 w-10 shrink-0 rounded-lg bg-white object-contain"
      />
      <span className="flex flex-col leading-tight">
        <span className={`whitespace-nowrap text-sm font-bold sm:text-base ${light ? "text-white" : "text-brand-900"}`}>
          {t("brand.name")}
        </span>
        <span className={`whitespace-nowrap text-xs font-medium ${light ? "text-brand-200" : "text-brand-600"}`}>
          {t("brand.by")}
        </span>
      </span>
    </span>
  );
}
