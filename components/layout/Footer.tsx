"use client";

import Container from "@/components/ui/Container";
import DownloadLink from "@/components/ui/DownloadLink";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { navItems } from "@/lib/nav";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-900 pb-20 text-brand-100 lg:pb-0">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="max-w-sm">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-brand-200">{t("footer.tagline")}</p>
          <DownloadLink className="mt-5 bg-brand-500 hover:bg-brand-400" />
        </div>

        <nav aria-label="Footer">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.explore")}
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-1">
            {navItems.map(({ href, labelKey }) => (
              <li key={href}>
                <a href={href} className="text-brand-200 transition-colors hover:text-white">
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.contactTitle")}
          </h3>
          <ul className="space-y-2 text-sm text-brand-200">
            <li>{t("footer.address")}</li>
            <li>{t("footer.phone")}</li>
            <li>{t("footer.email")}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start gap-4 py-5 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {t("brand.by")}. {t("footer.rights")} {t("footer.draftNote")}
          </p>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a href="#home" className="font-medium text-white hover:underline">
              {t("footer.backToTop")} ↑
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
