"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/components/ShopProvider";
import { useInfiniteSlice } from "@/components/useInfiniteSlice";
import { products, sortProducts } from "@/lib/catalog";

const tabs = [
  { id: "all", key: "all" },
  { id: "men", key: "men" },
  { id: "women", key: "women" },
];

export function ShopGrid() {
  const { t } = useShop();
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const filtered = tab === "all" ? products : products.filter((product) => product.category === tab);
    return sortProducts(filtered, sort);
  }, [tab, sort]);
  const { shown, sentinel, hasMore } = useInfiniteSlice(visible.length, 12, `${tab}:${sort}`);

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("collectionKicker")}</p>
          <h2 id="shop-heading" className="text-3xl font-extrabold leading-tight sm:text-4xl">
            {t("shopAll")}
          </h2>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-muted">
          {t("sortBy")}
          <select
            aria-label={t("sortBy")}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-line bg-card px-3 py-2 font-semibold text-ink focus:border-ink focus:outline-none"
          >
            <option value="featured">{t("featured")}</option>
            <option value="low">{t("low")}</option>
            <option value="high">{t("high")}</option>
          </select>
        </label>
      </div>
      <div className="-mx-4 mb-10 overflow-x-auto px-4">
        <div className="flex w-max gap-2" role="tablist">
          {tabs.map((item) => {
            const count = item.id === "all" ? products.length : products.filter((product) => product.category === item.id).length;
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(item.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selected ? "border-ink bg-ink text-bg" : "border-line bg-card hover:border-ink/50"
                }`}
              >
                {t(item.key)} {count}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4" aria-labelledby="shop-heading">
        {visible.slice(0, shown).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <p className="mt-8 text-center text-sm font-medium text-muted" aria-live="polite">
        {t("shownOf").replace("{shown}", String(shown)).replace("{total}", String(visible.length))}
      </p>
      {hasMore && <div ref={sentinel} className="h-8" aria-hidden />}
    </>
  );
}
