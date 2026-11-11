"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShop } from "@/components/ShopProvider";
import { saveCheckout } from "@/lib/checkout";
import { formatINR } from "@/lib/site";

export function ProductCard({ product }) {
  const { t, addItem } = useShop();
  const router = useRouter();
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const single = product.sizes.length === 1;

  function add() {
    addItem(product.slug, size, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  }

  function buy() {
    saveCheckout({ source: "buy", lines: [{ slug: product.slug, size, qty: 1 }] });
    router.push("/checkout");
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
      <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden className="relative block aspect-[3/4] overflow-hidden bg-bg-alt">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {product.pieces > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-white px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-ink">
            {product.pieces === 3 ? t("piece3") : t("piece2")}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">
          <Link href={`/products/${product.slug}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-base font-extrabold text-accent">{formatINR(product.price)}</p>
        {single ? (
          <p className="mt-2 text-xs font-semibold text-muted">{size === "One size" ? t("oneSize") : size}</p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-1" role="radiogroup" aria-label={`${t("size")} for ${product.name}`}>
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={size === option}
                onClick={() => setSize(option)}
                className={`min-w-8 rounded-md px-1.5 py-1 text-[11px] font-bold ${
                  size === option ? "bg-ink text-bg" : "bg-bg-alt text-muted hover:text-ink"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <button type="button" onClick={add} className="rounded-lg border border-line py-2 text-[12px] font-bold hover:border-ink sm:text-sm">
            {t("addToCart")}
          </button>
          <button type="button" onClick={buy} className="rounded-lg bg-accent py-2 text-[12px] font-bold text-white hover:bg-accent-hover sm:text-sm">
            {t("buyNow")}
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {added ? t("added") : ""}
        </span>
      </div>
    </article>
  );
}
