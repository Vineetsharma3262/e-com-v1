"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useShop } from "@/components/ShopProvider";

const points = [
  ["/images/rack.jpg", "A rail of neutral-toned clothes", "why1k", "why1t", "why1b"],
  ["/images/atelier.jpg", "Blouses and shirts on wooden hangers", "why2k", "why2t", "why2b"],
  ["/images/store.jpg", "Inside a menswear store", "why3k", "why3t", "why3b"],
];

export function AboutPage() {
  const { t } = useShop();
  const title = t("aboutTitle");
  const split = title.split("you");
  const stats = [
    [t("stat30"), t("stat30l")],
    ["2", t("collections")],
    [t("statPrice"), t("statPricel")],
    [t("statIndia"), t("statIndial")],
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
              <span className="font-semibold text-ink">{t("about")}</span>
            </li>
          </ol>
        </nav>
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("ourStory")}</p>
            <h1 className="mt-3 font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl">
              {split.length > 1 ? (
                <>
                  {split[0]}
                  <span className="italic text-accent">you</span>
                  {split.slice(1).join("you")}
                </>
              ) : (
                title
              )}
            </h1>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
              <p>{t("aboutP1")}</p>
              <p>{t("aboutP2")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/collections/all" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover">
                {t("exploreCollection")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center rounded-full border border-ink/25 px-6 py-3 font-semibold transition hover:border-ink hover:bg-ink hover:text-bg">
                {t("getInTouch")}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto grid w-full max-w-[34rem] grid-cols-[1.15fr_1fr] gap-4">
            <div className="relative aspect-[4/5.4] overflow-hidden rounded-t-full rounded-b-3xl">
              <img src="/images/editorial.jpg" alt="Model in a flowing floral gown" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="relative mt-16 aspect-[4/5.4] overflow-hidden rounded-3xl">
              <img src="/images/store.jpg" alt="Inside a clothing store" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-6 rounded-3xl border border-line bg-card p-8 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <dt className="sr-only">{label}</dt>
              <dd className="font-serif text-3xl font-semibold sm:text-4xl">{value}</dd>
              <dd className="mt-1 text-sm font-medium text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-12">
        <section className="border-t border-line bg-bg-alt py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("whyKicker")}</p>
              <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t("whyTitle")}</h2>
              <p className="mt-4 text-[17px] text-muted">{t("whyBody")}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {points.map(([src, alt, k, titleKey, body]) => (
                <article key={k} className="group overflow-hidden rounded-2xl border border-line bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden [&_img]:transition [&_img]:duration-700 group-hover:[&_img]:scale-105">
                    <img src={src} alt={alt} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{t(k)}</p>
                    <h3 className="mt-1 font-serif text-xl font-semibold">{t(titleKey)}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{t(body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
