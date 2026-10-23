"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Select from "@/components/ui/Select";
import TextField from "@/components/ui/TextField";
import { formatNumber } from "@/lib/format";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { plans } from "@/lib/plans";

type Mode = "office" | "online";
type Errors = Partial<Record<"name" | "phone" | "email", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Indian mobile: 10 digits starting 6-9, with an optional +91 or 91 in front.
const phonePattern = /^(\+?91)?[6-9]\d{9}$/;

export default function Contact() {
  const { t, locale } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("none");
  const [mode, setMode] = useState<Mode>("office");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = t("contact.err.required");
    if (!phone.trim()) next.phone = t("contact.err.required");
    else if (!phonePattern.test(phone.replace(/[\s-]/g, ""))) next.phone = t("contact.err.phone");
    if (!email.trim()) next.email = t("contact.err.required");
    else if (!emailPattern.test(email.trim())) next.email = t("contact.err.email");
    return next;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Demo only: nothing is sent anywhere. Replace this timeout with a real request later.
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  };

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setPlan("none");
    setMode("office");
    setMessage("");
    setErrors({});
    setStatus("idle");
  };

  return (
    <Section id="contact" eyebrow={t("contact.eyebrow")} title={t("contact.title")} subtitle={t("contact.intro")}>
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <div className="space-y-4 rounded-xl bg-brand-50 p-5 text-sm text-brand-900">
          <h3 className="text-base font-bold">{t("footer.contactTitle")}</h3>
          <p>{t("footer.address")}</p>
          <p>{t("footer.phone")}</p>
          <p>{t("footer.email")}</p>
        </div>

        <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
          {status === "sent" ? (
            <div role="status" className="py-6 text-center">
              <p className="text-xl font-bold text-brand-900">
                {t("contact.success.title", { name: name.trim() })}
              </p>
              <p className="mx-auto mt-2 max-w-md text-brand-800/80">{t("contact.success.text")}</p>
              <Button variant="outline" className="mt-5" onClick={reset}>
                {t("contact.again")}
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900">{t("contact.form.title")}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label={t("contact.name")}
                  value={name}
                  onChange={setName}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <TextField
                  label={t("contact.phone")}
                  value={phone}
                  onChange={setPhone}
                  error={errors.phone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </div>
              <TextField
                label={t("contact.email")}
                value={email}
                onChange={setEmail}
                error={errors.email}
                type="email"
                inputMode="email"
                autoComplete="email"
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label={t("contact.plan")}
                  value={plan}
                  onChange={setPlan}
                  options={[
                    { value: "none", label: t("contact.plan.none") },
                    ...plans.map((p) => ({
                      value: String(p.tier),
                      label: t("plans.tier", { n: formatNumber(p.tier, locale) }),
                    })),
                  ]}
                />
                <Select
                  label={t("contact.mode")}
                  value={mode}
                  onChange={setMode}
                  options={[
                    { value: "office", label: t("contact.mode.office") },
                    { value: "online", label: t("contact.mode.online") },
                  ]}
                />
              </div>
              <TextField
                label={t("contact.message")}
                value={message}
                onChange={setMessage}
                multiline
              />
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? t("contact.sending") : t("contact.submit")}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
