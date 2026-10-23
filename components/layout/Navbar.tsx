"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import DownloadLink from "@/components/ui/DownloadLink";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { joinHref, navItems } from "@/lib/nav";

/**
 * Top bar. From lg up it has the full link list and the Join button.
 * On phones it only has the logo and the language switcher; the links live in BottomNav.
 */
export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <a href="#home" aria-label={t("brand.name")} className="min-w-0">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navItems.map(({ href, labelKey }) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-brand-800 transition-colors hover:bg-brand-50 hover:text-brand-700 xl:px-3"
            >
              {t(labelKey)}
            </a>
          ))}
        </nav>

        <LanguageSwitcher single className="shrink-0 lg:hidden" />

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <LanguageSwitcher />
          <DownloadLink size="sm" className="whitespace-nowrap" />
          {/* Only from xl: on narrower desktops the bar has no room for a third button. */}
          <span className="hidden xl:block">
            <Button href={joinHref} size="sm" variant="outline" className="whitespace-nowrap">
              {t("cta.joinShort")}
            </Button>
          </span>
        </div>
      </Container>
    </header>
  );
}
