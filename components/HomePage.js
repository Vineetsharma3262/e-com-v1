"use client";

import Link from "next/link";
import { BadgeCheck, RotateCcw, Truck, Wallet } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { ShopGrid } from "@/components/ShopGrid";
import { useShop } from "@/components/ShopProvider";
import { collectionStats, collections, spotlight } from "@/lib/catalog";
import { formatINR, site } from "@/lib/site";

const ticker = ["FREE OVER ₹299", "COD & UPI", "7-DAY RETURNS", "PAN-INDIA", "TEES", "SHIRTS", "SUITS", "नया कलेक्शन"];

export function HomePage() {
  const { t, addItem, setCartOpen } = useShop();

  return (
    <>
      <section className="bg-bg-alt">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[1.45fr_0.7fr] lg:px-8 lg:py-6">
          <div className="relative min-h-[26rem] overflow-hidden rounded-2xl sm:min-h-[32rem]">
            <img src="/images/hero-women.jpg" alt="Woman in a fitted ivory dress and sun hat" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
            <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-10">
              <p className="w-fit rounded-md bg-accent px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide">{t("heroBadge")}</p>
              <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.05] sm:text-6xl">
                {t("heroBefore")}
                <span className="text-saffron">{t("heroEm")}</span>
                {t("heroAfter")}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">{t("heroBody")}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/collections/women" className="rounded-lg bg-accent px-5 py-3 text-sm font-extrabold hover:bg-accent-hover">
                  {t("shopWomen")}
                </Link>
                <Link href="/collections/men" className="rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-ink">
                  {t("shopMen")}
                </Link>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link href="/collections/men" className="relative min-h-40 overflow-hidden rounded-2xl">
              <img src="/images/hero-men.jpg" alt="Man in a navy blazer and white shirt" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-extrabold text-white">{t("shopMen")}</span>
            </Link>
            <Link href={`/products/${spotlight.slug}`} className="relative min-h-40 overflow-hidden rounded-2xl">
              <img src={spotlight.image} alt={spotlight.name} className="absolute inset-0 h-full w-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 text-white">
                <span className="block text-xs font-bold uppercase tracking-wide text-white/80">{formatINR(spotlight.price)}</span>
                <span className="block text-lg font-extrabold leading-tight">{spotlight.name}</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ul className="mx-auto grid max-w-7xl gap-px bg-line px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          [Truck, "Free shipping", "On orders over ₹299"],
          [RotateCcw, "7-day returns", "Easy exchanges"],
          [Wallet, "UPI or cash", "Pay on delivery"],
          [BadgeCheck, "Checked", "Before dispatch"],
        ].map(([Icon, title, rest]) => (
          <li key={title} className="flex items-center gap-3 bg-card px-4 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-extrabold">{title}</span>
              <span className="block text-xs text-muted">{rest}</span>
            </span>
          </li>
        ))}
      </ul>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-accent">{t("shopBy")}</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t("findFit")}</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {collections.map((collection) => {
            const stats = collectionStats(collection.slug);
            const title = t(collection.slug === "men" ? "mensClothing" : collection.slug === "women" ? "womensClothing" : collection.slug);
            return (
              <Link key={collection.slug} href={`/collections/${collection.slug}`} className="group relative min-h-64 overflow-hidden rounded-2xl">
                <img src={collection.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 text-white">
                  <h3 className="text-2xl font-extrabold">{title}</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {stats.count} {t("stylesFrom")} {formatINR(stats.from)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-line bg-card lg:grid-cols-[0.9fr_1.1fr]">
          <img src={spotlight.image} alt={spotlight.name} className="h-80 w-full object-cover object-top lg:h-full" />
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-accent">{t("spotlightKicker")}</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{spotlight.name}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">{t("spotlightBody")}</p>
            <p className="mt-4 text-3xl font-extrabold text-accent">{formatINR(spotlight.price)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  addItem(spotlight.slug, spotlight.sizes[0], 1);
                  setCartOpen(true);
                }}
                className="rounded-lg bg-accent px-5 py-3 text-sm font-extrabold text-white hover:bg-accent-hover"
              >
                {t("addToCart")}
              </button>
              <Link href={`/products/${spotlight.slug}`} className="rounded-lg border border-line px-5 py-3 text-sm font-extrabold hover:border-ink">
                {t("viewDetails")}
              </Link>
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[t("perk1"), t("perk2"), t("perk3"), t("perk4")].map((perk) => (
                <li key={perk} className="rounded-lg bg-bg-alt px-3 py-2 text-sm font-semibold">
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-ink py-3 text-white">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {[...ticker, ...ticker].map((item, index) => (
                <li key={`${copy}-${item}-${index}`} className="px-4 text-xs font-extrabold uppercase tracking-widest">
                  {item}
                  <span className="ml-4 text-accent">●</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section id="shop" className="relative bg-bg-alt py-12">
        <span id="men" className="absolute top-0" aria-hidden />
        <span id="women" className="absolute top-0" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ShopGrid />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 lg:grid-cols-3 lg:px-8">
        <div className="flex flex-col justify-center rounded-2xl bg-accent p-8 text-white">
          <p className="text-xs font-extrabold uppercase tracking-widest text-white/80">{t("occasionKicker")}</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-none">{t("occasionTitle")}</h2>
          <p className="mt-4 text-sm text-white/85">{t("occasionBody")}</p>
          <Link href="/collections/women" className="mt-6 w-fit rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-ink">
            {t("shopEdit")}
          </Link>
        </div>
        <img src="/images/editorial.jpg" alt="Model in a flowing floral gown" className="h-72 w-full rounded-2xl object-cover lg:h-full" />
        <img src="/images/store.jpg" alt="Inside a clothing store" className="h-72 w-full rounded-2xl object-cover lg:h-full" />
      </section>

      <section className="border-t border-line py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-accent">{t("whyKicker")}</p>
          <h2 className="mt-2 max-w-lg text-3xl font-extrabold sm:text-4xl">{t("whyTitle")}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t("whyBody")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["01", "why1t", "why1b"],
              ["02", "why2t", "why2b"],
              ["03", "why3t", "why3b"],
            ].map(([n, title, body]) => (
              <article key={n} className="rounded-2xl border border-line p-5">
                <p className="text-sm font-extrabold text-accent">{n}</p>
                <h3 className="mt-3 text-xl font-extrabold">{t(title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-bg-alt py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t("faqTitle")}</h2>
          <div className="mt-6 rounded-2xl border border-line bg-card px-5">
            <FaqList />
          </div>
          <p className="mt-5 text-sm text-muted">
            {t("faqStill")}{" "}
            <a className="font-bold text-accent" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>{" "}
            {t("faqOr")}{" "}
            <a className="font-bold text-accent" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
