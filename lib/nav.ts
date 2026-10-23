import type { MessageKey } from "./i18n/messages/en";

export type NavItem = { href: string; labelKey: MessageKey };

/** Anchor ids must match the `id` of the matching <Section>. */
export const navItems: NavItem[] = [
  { href: "#home", labelKey: "nav.home" },
  { href: "#about", labelKey: "nav.about" },
  { href: "#app", labelKey: "nav.app" },
  { href: "#how-it-works", labelKey: "nav.howItWorks" },
  { href: "#plans", labelKey: "nav.plans" },
  { href: "#contact", labelKey: "nav.contact" },
];

/** Where the main "Become an EXIM Entrepreneur" button scrolls to. */
export const joinHref = "#join";
