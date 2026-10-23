import type { Locale } from "./i18n/LanguageProvider";

/** Formats a number with the digits of the chosen language (१२३ in Marathi). */
export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "mr" ? "mr-IN" : "en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
}

/** Turns an amount given in lakhs into "₹25 L" or "₹1 Cr" (100 lakhs = 1 crore). */
export function formatInrLakhs(
  lakhs: number,
  locale: Locale,
  units: { lakh: string; crore: string },
) {
  const inCrores = lakhs >= 100;
  const value = inCrores ? lakhs / 100 : lakhs;
  return `₹${formatNumber(value, locale)} ${inCrores ? units.crore : units.lakh}`;
}
