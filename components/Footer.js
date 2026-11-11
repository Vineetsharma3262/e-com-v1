"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useShop } from "@/components/ShopProvider";
import { site } from "@/lib/site";

const shopLinks = [
  ["/collections/men", "mensClothing"],
  ["/collections/women", "womensClothing"],
  ["/collections/all", "allProducts"],
  ["/account", "profile"],
];

const helpLinks = [
  ["/about", "about"],
  ["/contact", "contactUs"],
  ["/terms#shipping", "shippingPolicy"],
  ["/terms#returns", "returnsPolicy"],
  ["/terms#cancellation", "cancellations"],
  ["/privacy", "privacy"],
  ["/terms", "terms"],
];

export function Footer() {
  const { t } = useShop();
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t("footerBlurb")}</p>
          <div className="mt-4 flex gap-4 text-sm font-bold">
            <a href={site.instagram} className="hover:text-accent">Instagram</a>
            <a href={site.facebook} className="hover:text-accent">Facebook</a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-accent">{t("shop")}</h4>
          <ul className="space-y-2 text-sm font-semibold">
            {shopLinks.map(([href, key]) => (
              <li key={href}>
                <Link className="hover:text-accent" href={href}>{t(key)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-accent">{t("help")}</h4>
          <ul className="space-y-2 text-sm font-semibold">
            {helpLinks.map(([href, key]) => (
              <li key={href}>
                <Link className="hover:text-accent" href={href}>{t(key)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-accent">{t("newsletter")}</h4>
          {done ? (
            <p className="text-sm font-bold text-accent">{t("subscribed")}</p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setDone(true);
              }}
              className="flex overflow-hidden rounded-xl border border-line"
            >
              <label htmlFor="footer-email" className="sr-only">{t("email")}</label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder={t("email")}
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm focus:outline-none"
              />
              <button type="submit" className="bg-accent px-4 text-sm font-extrabold text-white">
                {t("subscribe")}
              </button>
            </form>
          )}
          <ul className="mt-4 space-y-1 text-sm text-muted">
            <li>
              <a href={`tel:${site.phoneTel}`} className="font-semibold text-ink hover:text-accent">{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} className="hover:text-accent">{t("chatWa")}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-accent">{site.email}</a>
            </li>
            <li>
              {site.addressLines[0]}, {site.addressLines[1]}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-xs font-semibold text-muted sm:flex-row sm:justify-between lg:px-8">
          <p>{t("rights")}</p>
          <p>{t("payments")}</p>
        </div>
      </div>
    </footer>
  );
}
