"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { useShop } from "@/components/ShopProvider";
import { mapsLink, site, whatsappLink } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 font-normal text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z" />
    </svg>
  );
}

export function ContactPage() {
  const { t } = useShop();
  const [sent, setSent] = useState(false);

  const cards = [
    {
      title: t("callUs"),
      lines: [site.phoneDisplay],
      action: t("callNow"),
      href: `tel:${site.phoneTel}`,
      icon: <Phone className="h-5 w-5" />,
    },
    {
      title: t("whatsapp"),
      lines: [t("whatsappBlurb")],
      action: t("startChat"),
      href: whatsappLink(`Hi ${site.name}, I have a question.`),
      external: true,
      icon: <WhatsAppIcon />,
    },
    {
      title: t("email"),
      lines: [site.email],
      action: t("sendEmail"),
      href: `mailto:${site.email}`,
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: t("visit"),
      lines: site.addressLines,
      action: t("directions"),
      href: mapsLink(),
      external: true,
      icon: <MapPin className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-accent">{t("home")}</Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-ink">{t("contactUs")}</span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("contactKicker")}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight sm:text-6xl">{t("contactTitle")}</h1>
          <p className="mt-4 text-[17px] text-muted">{t("contactBody")}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noreferrer" : undefined}
              className="group rounded-2xl border border-line bg-card p-6 transition hover:border-accent/50"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">{card.icon}</span>
              <h2 className="mt-4 font-serif text-xl font-semibold">{card.title}</h2>
              {card.lines.map((line) => (
                <p key={line} className="mt-1 break-words text-[15px] text-muted">{line}</p>
              ))}
              <p className="mt-3 text-sm font-semibold text-accent group-hover:underline">{card.action} →</p>
            </a>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <form
            className="rounded-3xl border border-line bg-card p-6 sm:p-8"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="font-serif text-2xl font-semibold">{t("sendUs")}</h2>
            {sent ? (
              <p className="mt-6 text-sm font-semibold text-accent">{t("thanks")}</p>
            ) : (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold">
                    {t("name")}
                    <input name="name" required placeholder={t("yourName")} className={fieldClass} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold">
                    {t("phone")}
                    <input name="phone" type="tel" placeholder="+91" className={fieldClass} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">
                    {t("email")}
                    <input name="email" required type="email" placeholder="you@example.com" className={fieldClass} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">
                    {t("message")}
                    <textarea name="message" required rows={5} placeholder={t("howHelp")} className={fieldClass} />
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover"
                >
                  {t("send")}
                </button>
              </>
            )}
          </form>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-night p-6 text-paper sm:p-8">
              <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold">
                <Clock className="h-5 w-5 text-accent" />
                {t("hours")}
              </h2>
              <dl className="mt-5 space-y-2.5 text-sm">
                {[
                  [t("mon"), t("monH")],
                  [t("sun"), t("sunH")],
                  [t("holiday"), t("callAhead")],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-2.5 last:border-0">
                    <dt className="text-paper/75">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid flex-1 place-items-center rounded-3xl border border-dashed border-line bg-bg-alt p-8 text-center">
              <div>
                <MapPin className="mx-auto h-8 w-8 text-accent" />
                <p className="mt-3 font-serif text-lg font-semibold">{t("map")}</p>
                <p className="mt-1 text-sm text-muted">{site.addressOneLine}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("faqKicker")}</p>
            <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t("faqTitle")}</h2>
          </div>
          <FaqList />
          <p className="mt-6 text-center text-sm text-muted">
            {t("faqStill")}{" "}
            <a className="font-semibold text-accent underline underline-offset-2" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>{" "}
            {t("faqOr")}{" "}
            <a className="font-semibold text-accent underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
