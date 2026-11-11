"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useShop } from "@/components/ShopProvider";
import { collections, products } from "@/lib/catalog";
import { formatINR } from "@/lib/site";

export function SearchDialog() {
  const { t, searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products.filter((product) => {
      const collection = collections.find((item) => item.slug === product.category);
      return (
        product.name.toLowerCase().includes(q) ||
        collection?.title.toLowerCase().includes(q)
      );
    }).slice(0, 20);
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label={t("closeCart")} onClick={() => setSearchOpen(false)} />
      <div role="dialog" aria-label={t("searchProducts")} className="relative mx-auto mt-16 w-[min(640px,calc(100%-2rem))] overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4">
          <Search className="h-5 w-5 text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-14 flex-1 bg-transparent text-base focus:outline-none"
            aria-label={t("searchProducts")}
          />
          <button type="button" onClick={() => setSearchOpen(false)} aria-label={t("closeCart")} className="rounded-full p-2 hover:bg-card">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-muted">
              {t("noResults")} “{query}”
            </li>
          ) : (
            results.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-card"
                >
                  <img src={product.image} alt="" className="h-14 w-12 rounded-lg object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{product.name}</span>
                    <span className="text-xs text-muted">{formatINR(product.price)}</span>
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
