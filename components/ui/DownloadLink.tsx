"use client";

import { appLinks } from "@/lib/app";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Button from "./Button";

/**
 * Blue "Download App" button for the navbar and footer. It opens the Android app file;
 * if there is no link yet it shows a disabled "Coming soon" instead of a dead link.
 */
export default function DownloadLink({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { t } = useLanguage();
  const icon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v11m0 0l-4-4m4 4l4-4" />
      <path d="M5 19h14" />
    </svg>
  );
  const highlight = `shadow-md shadow-brand-700/30 ${className}`;

  if (!appLinks.androidApk) {
    return (
      <Button disabled size={size} className={className}>
        {icon}
        {t("app.store.soon")}
      </Button>
    );
  }
  return (
    <Button
      href={appLinks.androidApk}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      className={highlight}
    >
      {icon}
      {t("cta.downloadApp")}
    </Button>
  );
}
